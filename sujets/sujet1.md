1-intro
===

Afin d'initialiser un dossier `1-intro` à la racine de votre dépôt contenant l'ensemble des outils nécessaires au développement, on utilise le module `vite` (https://vitejs.dev/) :
```
cd w51
npm create vite@latest 1-intro -- --template react
# ou la ligne suivante avec npm 6.x
npm create vite@latest 1-intro --template react
```

Ensuite, comme indiqué par la CLI, aller dans le dossier `1-intro`, puis installer les dépendances :
```
cd 1-intro
npm install
```
Enfin, on peut lancer le serveur de dev local, qui sera normalement accessible à l'adresse http://localhost:5173 :
```
npm run dev
```
Ouvrir maintenant le dossier `1-intro` (ou tout votre dossier `w51`) dans un éditeur de code.

- Écraser le contenu du fichier `src/index.css` par le contenu du fichier du même nom situé dans le dossier `ressources`.
- Supprimer le fichier `src/App.css`
- Modifier le fichier `src/App.jsx` de manière à ce qu'il ne contienne plus que les lignes suivantes :
```js
import { useState, useEffect } from 'react';

function App() {
  return (
    <div>
      <h1>Hello w51</h1>
    </div>
  )
}

export default App;
```

---

Message
===

- Écrire un composant `Message` qui affiche un paragraphe de texte dans l'interface.
- Ajouter plusieurs instances de ce composant dans l'interface.
- Faire en sorte que le composant reçoive en `props` le texte à afficher.
- Constater que chaque instance de `Message` est indépendante.
- Regarder le résultat produit dans le DOM lors de l'évaluation de cette interface.

> ***Les données ne font que descendre dans l'arborescence des composants.***

---

Toggle
===

- Écrire un composant `Toggle` qui stocke une valeur boolénne dans son `state` (-> `useState`) de valeur initiale : `false`.
- Afficher la valeur courante de l'état du composant sous la forme d'une chaîne valant "Toggle is ON" ou "Toggle is OFF" selon les cas.
- Ajouter une instance de ce composant dans l'application.
- Ajouter un bouton dans l'interface de ce composant dont le texte vaut "Turn ON" ou "Turn OFF" selon les cas.
- Au clic sur le bouton, modifier la valeur contenue dans le `state`.
- Constater que l'interface est automatiquement réévaluée et le document mis à jour en conséquence.

---

Faire remonter des informations ?
===

Comment faire depuis l'extérieur d'un composant `Toggle` pour, par exemple, compter et afficher le nombre de fois que la valeur du `Toggle` est passée à `true` ?

- Passer au composant `Toggle` une `prop` de type `function` nommée par exemple `onToggle`.
- Dans le composant `Toggle`, faire en sorte d'appeler cette fonction avec la nouvelle valeur du booléen contenu en `state` à chaque fois que cette valeur a changé (-> `useEffect` déclenché quand la valeur est différente).
- Dans le composant `App`, déclarer un élément de `state` dans lequel stocker le nombre de fois que le `Toggle` est passé à `true`, et afficher la valeur de ce nombre dans l'interface.
- Écrire une fonction `toggleChanged`, qui attend en paramètre un booléen, et qui incrémente le nombre stocké en `state` uniquement si ce booléen vaut `true`.
- Passer cette fonction comme valeur pour la `prop` `onToggle` de l'instance de `Toggle`.

> ***Les données ne font toujours que descendre dans l'arborescence des composants. Afin de faire "remonter" des informations, on fait descendre une fonction. Le composant qui la reçoit peut alors l'appeler en passant des valeurs. Ces valeurs sont alors accessibles dans le contexte du composant parent qui a fourni la fonction.***

---

Counter
===

- Écrire un composant `Counter` qui stocke une valeur entière dans son `state` de valeur initiale `0`.
- Afficher la valeur courante ainsi qu'un bouton permettant de l'incrémenter et un bouton permettant de le décrémenter.
- Au clic sur le bouton, modifier la valeur contenue dans le `state` en l'incrémentant de 1.
- Constater que l'interface est automatiquement réévaluée et le document mis à jour en conséquence.
- Ajouter un élément de `state` qui stocke la valeur à ajouter ou retrancher et l'utiliser à chaque clic sur un bouton.
- Ajouter un `input` de type `number` permettant de contrôler la valeur de cet incrément (attention au fait que la valeur lue dans l'`input` est toujours une chaîne de caractères).

---

Box
===

- Écrire un composant `Box` qui rend les éléments enfants (`children`) qu'il reçoit à l'intérieur d'une boîte (dessinée à l'aide de propriétés CSS).
- Déclarer un composant `Box` dans l'interface, et y inclure d'autres composants (des morceaux de l'interface précédemment écrite par exemple).
- Constater que si l'on intègre pas explicitement les `children` dans le résultat de l'évaluation du composant, ces derniers ne font tout simplement pas partie du résultat (comme n'importe quel paramètre qui serait ignoré par une fonction).
- Faire en sorte que ce composant `Box` reçoive la couleur et l'épaisseur de la boîte en entrée dans ses `props`.

---

Clock
===

- Écrire un composant `Clock` qui affiche l'heure (hh:mm:ss) courante, et en ajouter une instance dans l'interface (voir l'objet standard `Date` et sa méthode `toLocaleTimeString`).
- Sans logique supplémentaire, ce composant ne fait qu'afficher l'heure au moment de son évaluation, sans la mettre à jour à chaque seconde.
- Constater que lorsqu'un composant "plus haut" dans la hiérarchie est réévalué (le composant `App` lors d'une modification de son `state` par exemple), notre instance de `Clock` est réévaluée, et rafraichit donc l'heure affichée dans le document.

Pour pouvoir demander à React de réévaluer le composant, il faut commencer par stocker la date courante en `state`, et utiliser cette valeur dans le rendu du composant. Ainsi, à chaque fois que ce `state` sera modifié, React réévaluera l'interface retournée par notre composant.

Pour déclencher une modification de ce `state` à intervalle régulier, on peut utiliser la fonction standard `setInterval`.
La question à se poser est à nouveau où mettre en place cet intervalle ?
On ne peut pas le faire directemenet dans le corps du composant, car ce dernier est évalué à chaque fois que quelque chose est modifié "au-dessus" de lui, et on ne veut pas mettre en place *plusieurs* intervalles.

La réponse est un `effect` !

- Déclarer un `effect` qui met en place l'exécution d'une fonction qui met à jour la date stockée en `state` toutes les 1000ms.
- Faire un `console.log` dans cet `effect` et dans la fonction appelée par `setInterval` et constater la manière dont elles sont appelées...
- Faire en sorte que cet `effect` ne soit exécuté que lorsque le composant `Clock` intègre l'interface, et plus lors des réévaluations suivantes de cette instance de composant.
- Constater que les choses sont conformes à ce qui est attendu.

Faire en sorte que le composant `Clock` ne soit rendu dans l'interface que quand le `Toggle` vaut `true`.

Que se passe-t-il au moment où la `Clock` quitte l'interface ?

Corriger le problème en renvoyant une fonction de "nettoyage" dans l'`effect` de mise en place de l'intervalle du composant `Clock`.

---

TodoList
===

Écrire un composant `TodoList` qui encapsule une interface qui permet de stocker, afficher et marquer/démarquer une liste de choses à faire.

On va découper cette interface en 3 composants :
- `TodoList` :
  - stocke en `state` un tableau d'objets de la forme `{id, text, done}`
  - définit une fonction d'ajout `addItem(formData)`
  - définit une fonction de modification `updateItem(id, changes)`
  - définit une fonction de suppression `removeItem(id)`
- `ItemsList` :
  - reçoit en entrée (`props`) le tableau d'items, la fonction de modification et la fonction de suppression
  - affiche les différents items de la liste ainsi que, pour chacun, un bouton permettant de le marquer/démarquer et un bouton permettant de le supprimer
- `AddItemForm`
  - reçoit en entrée (`props`) la fonction d'ajout
  - affiche un formulaire composé d'un `input` et d'un bouton

Ajouter une instance de `TodoList` dans le composant principal.

Si le coeur vous en dit, afin de persister localement les données manipulées par ce composant, écrire un *custom hook* `useLocalState` qui :
- prend en paramètre une chaîne de caractère `key` et une valeur initiale
- synchronise un state local avec une entrée en `localStorage`
- retourne la même chose que le hook `useState` standard, à savoir la valeur courante du state et une fonction de modification

*Attention au fait que les entrées en localStorage sont stockées sous forme de chaînes de caractères. Il faut donc sérialiser (`JSON.stringify`) / désérialiser (`JSON.parse`) les données.*
