5-users
===

Faire un nouveau dossier `5-users` à la racine de votre dépôt avec `vite` :
```
cd w51
npm create vite@latest 5-users -- --template react
# ou la ligne suivante avec npm 6.x
npm create vite@latest 5-users --template react
```

Comme pour les sujets précédents, écraser le fichier `src/index.css` par celui fourni dans le dossier `ressources`, et supprimer le fichier `src/App.css`.

Récupérer le fichier `src/main.jsx` ainsi que tout le dossier `routes` (qui contient normalement les fichiers `root.jsx`, `cocktails.jsx`, `cocktail.jsx`, `lists.jsx`, `list.jsx` et `listItems.jsx`).
Récupérer également le fichier `vite.config.js` et écraser celui présent à la racine de votre projet.

---

On va étendre l'application précédente en ajoutant une gestion d'utilisateurs et une logique d'inscription / connexion / déconnexion.

- récupérer l'archive `5_users_server.zip` dans le dossier `ressources`.
- une fois décompréssée, installer les dépendances en exécutant `npm install`, puis lancer le serveur avec `npm run start`.
- de nouvelles routes sont définies dans le fichier `routes/user.js`.
- toutes les routes définies dans `routes/list.js` et `routes/item.js` sont maintenant protégées et commencent par vérifier la présence d'un JWT dans la requête, puis le cas échéant, que l'utilisateur en question a bien le droit d'effectuer les accès / écritures qu'il souhaite faire.

Un store de données externe
---

Afin de stocker les informations sur l'utilisateur actuellement connecté ainsi que des fonctions permettant de manipuler ces données en lien avec l'API, on va utiliser un *store* de données externe, grâce à la bibliothèque `Zustand` (https://github.com/pmndrs/zustand).

- installer la bibliothèque `Zustand`
```sh
npm install zustand
```

Cette bibliothèque permet de créer un *store* de données, colocalisées avec des fonctions permettant d'agir sur ces données. Le hook retourné à la création du *store* permet de sélectionner une partie des données en lecture au sein d'un élément `React`, où qu'il soit dans la hiérarchie d'éléments. Cette lecture de données est *réactive* au sens où elle s'accompagne automatiquement d'un *abonnement* au changement qui déclenche la réévaluation du composant quand les données qu'il lit sont modifiées dans le *store*.

- créer un nouveau module `src/auth.jsx`.
- créer un nouveau *store* grâce à un appel à la fonction `create` de `Zustand` et l'exporter sous le nom `useAuth`.

Dans le *store* ainsi créé, on va stocker :
- `user` : un objet qui représente l'utilisateur courant (de valeur initiale `null`).
- `token` : le JWT retourné par l'API en cas de connexion (de valeur initiale `''`).
- `signup` : une fonction qui prend en paramètre un objet contenant les champs `username` et `password`, puis retourne la Promise de l'appel à l'API à la route `POST /users/signup`.
- `signin` : une fonction qui prend en paramètre un objet contenant les champs `username` et `password`, puis retourne la Promise de l'appel à l'API à la route `POST /users/signin`. En cas de succès, stocke l'objet `user` et le `token` reçus dans le *store*.
- `signout` : une fonction qui écrase le `user` contenu dans le *store* par la valeur `null` et le `token` par la valeur `''`.

Comme dans les cas précédents, les appels à l'API que l'on déclenche ici doivent être écrits dans des fonctions exportées depuis le module `src/api.js`.

Pour toutes les autres fonctions du module `src/api.js` qui font appel à des routes "protégées", l'API s'attend à trouver le JWT dans le header `Authentication` (au format `Bearer [TOKEN]`). En cas d'absence (ou d'obsolescence) de ce token, l'API répond avec un status code **401 Unauthorized** (on se servira de cela par la suite).

Dans ces fonctions, on se trouve en-dehors de l'arborescence d'éléments React. On ne peut donc pas y utiliser les fonctions de lecture "réactive" de Zustand pour accéder au token stocké dans le *store*. Heureusement, la bibliothèque permet également de lire le contenu d'un *store* de manière plus "classique", en écrivant par exemple :
```js
let token = useAuth.getState().token;
```

- ajouter le header `Authentication` dans toutes les requêtes à l'API vers des routes protégées.

Gestion des erreurs en provenance de l'API
---

La `Promise` retournée par un appel à la fonction `fetch` est résolue à partir du moment où une réponse arrive, et ce quel que soit le `status` HTTP reçu dans cette réponse. Dans l'objet `Response`, la propriété `ok` permet de distinguer les réponses ayant un `status` dans la famille des 200 (les succès) des autres.

Comme nous appelons nos fonctions qui contactent l'API dans des `loader` et des `action`, il est possible de déclencher la logique de gestion d'erreur de `React Router` (rendre les `errorElement` définis dans les routes) en faisant un `throw` de la `Response` quand le `status` obtenu n'est pas `ok`.

Pour cela, on peut définir la fonction utilitaire suivante (à exporter depuis un nouveau module, ou à définir dans le module `src/api.js` puisqu'on ne s'en servira que là *a priori*) :
```js
function checkStatus(res) {
  if (res.ok) {
    return res;
  } else {
    throw res;
  }
};
```

On peut ensuite intercaler un appel à cette fonction après chaque requête `fetch`. Par exemple, la fonction `getLists` pourra ressembler à cela :
```js
export function getLists() {
  let token = useAuth.getState().token;
  return fetch(`${prefix}/lists`, {
    headers: { Authorization: 'Bearer ' + token }
  })
    .then(checkStatus)
    .then(res => res.json());
}
```

- ajouter un appel à la fonction `checkStatus` dans toutes les fonctions définies dans le module `src/api.js` qui font un appel à l'API.

Un composant de gestion du statut
---

Afin de pouvoir afficher l'état courant de connexion de l'utilisateur et lui proposer des actions différentes en fonction de cet état, on va écrire un composant `AuthStatus`, que l'on pourra intégrer dans le header de notre interface.

- dans le module `src/auth.jsx`, exporter un nouveau composant `AuthStatus`.
- dans ce composant, récupérer la valeur `user` du *store*.
- si le `user` est `null`, rendre un paragraphe indiquant que l'utilisateur n'est pas connecté, ainsi que deux liens : un vers la route `/signin` et un vers la route `/signup`.
- si le `user` n'est pas `null`, rendre un paragraphe indiquant le nom de l'utilisateur actuellement connecté, ainsi qu'un bouton lui permettant de se déconnecter.

Pour la déconnexion, il faudra réagir au clic sur le bouton et appeler la fonction `signout` du *store*. Afin de ne pas continuer à afficher une interface qui n'est plus cohérente avec l'état courant de l'application, on va également rediriger l'utilisateur vers la route `/`. Pour cela on peut appeler la fonction `navigate` de `React Router`, que l'on obtient en appelant le hook `useNavigate` (https://reactrouter.com/en/main/hooks/use-navigate).

Si on souhaite que les liens menant aux routes d'inscription et de connexion soient dans un style cohérent, on peut également les rendre comme des boutons, et au clic, appeler la fonction `navigate` pour déclencher la navigation.

- ajouter un élément `AuthStatus` dans le header de l'interface dans le composant `Root` qui est défini dans le module `routes/root.jsx`.

Évidemment, nous n'avons pas encore déclaré d'interface pour les routes `/signup` et `/signin` pour le moment. Mais c'est ce que nous allons faire maintenant.

Interface pour l'inscription
---

- mettre en place une route `/signup` et y associer un élément d'un nouveau composant `Signup`. Ce composant doit être exporté par un nouveau module `src/routes/signup.jsx`. Le layout de ce composant sera le suivant :
```js
<div className="authform">
  <Form method="POST">
    <fieldset>
      <label>Username</label>
      <input type="text" name="username" required />

      <label>Password</label>
      <input type="password" name="password" required />

      <label>Confirm password</label>
      <input type="password" name="passwordCheck" required />
    </fieldset>

    <button>Signup</button>
  </form>
</div>
```

On déclare ici un `Form` avec la `method` `POST` et l'`action` par défaut, à savoir la route courante (donc `/signup`).

- déclarer une `action` associée à la route `/signup`. Cette fonction doit également être exportée par le module `src/routes/signup.jsx`.
- dans cette `action`, récupérer la fonction `signup` du *store* `useAuth` (lecture non-réactive puisqu'on est en-dehors d'un composant). Récupérer ensuite le contenu des données du formulaire depuis l'objet `request` puis appeler la fonction `signup` avec ces données. En cas de succès, rediriger (`redirect`) l'interface vers la route `/signin` (qui n'existe pas encore).

Validation de données de formulaire
---

Au sein de la fonction `signup` définie dans le module `src/api.js`, on peut réaliser une vérification des données fournies, avant de réaliser l'appel à l'API.

- vérifier que les champs `password` et `passwordCheck` sont bien égaux. S'ils ne le sont pas, la fonction va `throw` quelque chose (que l'on va définir) afin de faire échouer la chaîne de `Promise`. S'ils sont égaux, la fonction va simplement `return` la `Promise` retournée par `fetch`.

Retour dans notre `action`. Si on ne `catch` pas ici l'erreur potentiellement produite par notre vérification de champs lors de l'appel à `signup`, alors c'est le composant indiqué dans la propriété `errorElement` de la route parente la plus proche qui sera rendu. On aura alors quitté notre interface courante avec notre formulaire d'inscription :-/. Afin de gérer ces erreurs ici, on va reprendre la main sur la gestion d'erreur et faire un `catch` à la fin de cette chaîne d'appels.

Dans ce `catch`, on doit pouvoir distinguer une erreur générée par notre vérification de champs, tout en restant compatible avec d'autres erreurs pouvant provenir de l'API et qu'il pourrait être intéressant de traiter ici également. Pour cela :
- faire en sorte qu'en cas de non-validation des données fournies, la fonction `signup` (définie dans `src/api.js`) `throw` un nouvel objet standard `Response` (https://developer.mozilla.org/en-US/docs/Web/API/Response/Response) construit avec du texte (de votre choix) en body et un `status` valant `422`.

Ainsi, quand on va capturer une erreur dans l'`action`, si la valeur de sa propriété `status` est égale à `422`, alors l'`action` va **retourner** le texte contenu dans la réponse (`return res.text()`). Ce texte sera alors disponible au sein du composant `Signup` en faisant appel à la fonction `useActionData` (de la même manière qu'on récupère les données retournée par les `loader` avec `useLoaderData`). Dans les autres cas, l'`action` va **propager** l'erreur (`throw res`) et laisser la main à la gestion d'erreur standard de `React Router`, c'est-à-dire rendre l'`errorElement` le plus proche.

- récupérer un éventuel message d'erreur dans le composant `Signup` et s'il y en a un, l'afficher en rouge sous le formulaire.

Si on analyse l'API, on peut constater qu'en cas de demande d'inscription avec un nom d'utilisateur déjà utilisé, elle retourne une réponse avec un `status` valant `409`. Grâce à notre fonction `checkStatus`, cette réponse (qui n'est pas `ok`) sera `throw` et on va également la récupérer dans le `catch` de notre `action`.

- faire en sorte que dans ce cas également, on ne quitte pas l'interface d'inscription et que le message renvoyé par l'API s'affiche sous le formulaire.

Interface pour la connexion
---

- mettre en place une route `/signin` et y associer un élément d'un nouveau composant `Signin`. Ce composant doit être exporté par un nouveau module `src/routes/signin.jsx`.
- sur le même modèle que pour le composant `Signup`, rendre un `Form` avec des champs `username` et `password`.
- ce `Form` sera soumis à la route courante en `POST` à destination d'une `action`.
- dans cette `action`, récupérer la fonction `signin` du *store* `useAuth`. Récupérer ensuite le contenu des données du formulaire depuis l'objet `request` puis appeler la fonction `signin` avec ces données. En cas de succès, rediriger (`redirect`) l'interface vers la route `/` (on fera mieux plus tard).
- comme pour le cas du `signup`, capturer une éventuelle erreur. Si la propriété `status` est égale à `403` (ce que retourne l'API en cas de nom d'utilisateur ou de mot passe invalide (voir le code de l'API)), **retourner** le texte contenu dans la réponse et le récupérer dans le composant `Signin` pour affichage. Sinon, **propager** l'erreur.

> À ce stade, vous devriez être en mesure de réaliser une inscription, de vous connecter et de vous déconnecter.

Amélioration de l'UX
---

- tout comme pour les formulaires précédents, changer le texte et désactiver les boutons de soumission pendant la durée de la requête d'inscription ou de connexion.
- en cas de présence d'une erreur, vider les champs des formulaire d'inscription ou de connexion.

Restaurer le `user` courant
---

***Problème*** : quand on recharge la page du navigateur, l'état courant de la connexion est perdu. Cela est dû au fait qu'au démarrage de l'application, le *store* contient les données initiales, à savoir un `user` `null` et un `token` vide :-(

Il faut donc trouver un moyen de persister de l'information au niveau du navigateur. La bibliothèque `Zustand` propose un mécanisme de middleware pour composer des comportements de gestion d'un *store*. En particulier, un middleware permettant de persister un *store* existe déjà : https://github.com/pmndrs/zustand/blob/main/docs/integrations/persisting-store-data.md.

- mettre en place l'utilisation du middleware `persist` en donnant le nom de votre choix pour la clé et en laissant la destination de stockage par défaut (`localStorage`).

Par défaut, `Zustand` persiste (et restaure) toutes les propriétés sérialisables du *store*. Cependant, afin de ne pas mettre l'interface dans un état où on restaure un objet `user` alors que le `token` associé est déjà obsolète, on va contraindre la bibliothèque à ne persister que le `token`.

- utiliser l'option `partialize` pour ne sélectionner que le `token` parmi les données à persister.

Maintenant que le `token` est persisté et restauré au démarrage de l'application, on peut se retrouver dans la situation où on a un `token` valide, mais où l'objet `user` reste à `null` (sa valeur initiale). C'est à nouveau un état incohérent puisque l'API répond aux requêtes faites aux routes protégées, mais on considère l'utilisateur comme non-connecté au niveau de l'interface.

L'API expose une route qui pourra nous servir ici : `GET /users/whoami`. Cette route ne fait qu'échanger un `token` contre un objet `user`, si tant est que le `token` est valide évidemment. Il suffit donc de faire une requête à cette route au démarrage de l'application pour récupérer l'objet `user` correspondant au `token` restauré dans le *store*.

- écrire la fonction `whoami` dans le module `src/api.js` : cette fonction prend un `token` en paramètre puis retourne la Promise de l'appel à l'API à la route `GET /users/whoami` avec le `token` dans le header `Authorization`. Ici aussi, on utilisera la fonction `checkStatus` afin de faire échouer la chaîne de `Promise` en cas de réponse non-`ok` (ce qui sera le cas si le `token` n'est pas valide).

Afin de déclencher un appel à cette fonction au moment de la restauration du *store*, le middleware `persist` de `Zustand` accepte une nouvelle option : `onRehydrateStorage` (https://github.com/pmndrs/zustand/blob/main/docs/integrations/persisting-store-data.md#onrehydratestorage). La fonction que l'on définit ici est appelée au démarrage de la restauration du *store*, et la fonction qui est retournée par cette fonction est appelée une fois que la restauration du *store* a été effectuée. C'est à ce moment là qu'on va déclencher une requête `whoami`.

- mettre en place l'option `onRehydrateStorage`. Si l'appel à `whoami` est un succès, écrire l'objet `user` reçu dans le *store*. Si c'est un échec, écraser le `token` par une chaîne vide (on ne souhaite pas conserver un `token` invalide). Pour modifier le *store* ici, on peut utiliser la fonction `setState` (cette dernière fonctionne comme la fonction `set` utilisée dans la définition du *store*).

Si l'API met un peu de temps à répondre à cette requête, on pourrait afficher une information erronée pendant quelques temps dans notre composant `AuthStatus` (et on n'aime pas ça). Afin de pouvoir indiquer dans l'interface que l'on est en attente d'une réponse dans ce processus de restauration de l'utilisateur, on va faire les choses suivantes :
- ajouter un booléen `checked` dans le *store*, de valeur initiale `false`
- après l'appel à `whoami`, écraser la valeur de `checked` à `true` en cas de succès et en cas d'échec (dans les deux cas, la vérification a bien été faite).
- dans le composant `AuthStatus`, récupérer la valeur de `checked` et afficher un message d'attente si sa valeur est `false` (la réévaluation du composant se fera seule lors de la modification du *store* car on fait ici une lecture *réactive*).

Flux d'authentification automatique
---

Une dernière petite touche pour parfaire l'expérience :-)

Pour le moment, si un utilisateur non-connecté tente d'accéder par exemple directement à la route `/lists`, il se retrouve avec un message d'erreur de l'API, affiché par un `errorElement`. Cela arrive parce que dans le `loader` de la route `/signin`, on fait un appel à l'API. Cette dernière renvoie une réponse avec un `status` `401`, ce qui déclenche un `throw` par notre fonction `checkStatus`.

Ce n'est pas l'expérience utilisateur la plus agréable.

Étant donné que quand on récupère une réponse avec un `status` `401`, l'API nous signifie qu'il faut que l'utilisateur soit authentifié pour qu'elle puisse répondre à la requête, on pourrait réagir en redirigeant automatiquement l'utilisateur vers le formulaire de connexion.

- dans le composant `Error`, appeler la fonction `isRouteErrorResponse` de `React Router` qui permet de déterminer si l'objet `error` que l'on traite est bien un objet `Response`. Si c'est le cas et que sa propriété `status` vaut `401`, alors rendre un composant `Navigate` (https://reactrouter.com/en/main/components/navigate) qui amène l'utilisateur à la route `/signin`.
- ajouter la propriété `replace` à ce composant afin que la route courante (celle qui a déclenché l'erreur) ne s'empile pas dans l'historique de navigation du navigateur.

> Vous pouvez expérimenter ce qu'il se passe si vous n'ajoutez pas la propriété `replace`.

C'est une première étape intéressante, mais dans l'état actuel, le scénario est le suivant : l'utilisateur tente d'accéder à la route `/lists`; il est redirigé sur la route `/signin`; après une connexion réussie il est renvoyé sur la route `/`. Bon, il est maintenant connecté, mais lui ce qu'il voulait, c'était accéder à la route `/lists`...

Au moment où l'utilisateur non-connecté accède pour la première fois à la route `/lists`, et que l'on se retrouve à rendre le composant d'erreur suite à la réponse `401` de l'API, on peut sauvegarder la route courante (le chemin auquel l'utilisateur voulait se rendre) et la transmettre à la route `/signin`. Pour faire cela, le composant `Navigate` dispose d'une propriété `state` à laquelle on peut passer ce que l'on souhaite :
```js
let location = useLocation();
...
if (...) {
  return <Navigate to="/signin" state={{ from: location }} replace />;
}
```
On transmet ici la valeur de l'objet `location` qui contient donc le chemin auquel l'utilisateur avait souhaité accéder en premier lieu.

Dans le composant `Signin`, on peut récupérer cette valeur, dans la propriété `state` de l'objet `location` courant :
```js
let location = useLocation();
let from = location.state?.from?.pathname || '/';
```

La syntaxe avec un `?` lors de l'accès à une propriété d'un objet permet d'arrêter l'évaluation avec la valeur `undefined` si le champ auquel on cherche à accéder n'existe pas. Ici au final, soit on trouve une propriété `pathname` dans un objet `from` contenu dans un objet `state` de l'objet `location`, soit notre variable vaudra `/`.

Maintenant qu'on a récupéré cette valeur `from`, il faut la passer à l'`action` qui est appelée quand le formulaire est soumis. On peut faire ça très simplement en ajoutant un `<input type="hidden" />` avec cette valeur dans le formulaire.

On retrouve donc ce champ avec les autres champs du formulaire dans notre `action` dans l'objet `formData`, et il ne reste plus qu'à rediriger l'utilisateur vers cette route suite à une connexion réussie, au lieu de l'envoyer vers la route `/` de manière systématique comme on le faisait avant.

Dernière chose, l'idéal serait que ce petit passage temporaire par la route `/signin` n'apparaisse pas dans l'historique de navigation de l'utilisateur. Là aussi, on peut ajouter la propriété `replace` dans la déclaration du `Form` de connexion.

Et voilà :-)

- tester tous les scénarios possibles et s'assurer que tout se déroule de manière convenable.
