import { useLoaderData, useNavigation } from 'react-router-dom';

export function loader({ params }) {
  let { cocktailId } = params;
  return fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`)
    .then(res => res.json())
    .then(data => data.drinks[0]);
}

export default function Cocktail() {
  let cocktail = useLoaderData();

  let navigation = useNavigation();
  let loading = navigation.state === 'loading';

  let ingredients = [];
  let ingredientIdx = 1;
  while (cocktail['strIngredient' + ingredientIdx]) {
    ingredients.push(cocktail['strIngredient' + ingredientIdx]);
    ingredientIdx++;
  }

  return <div key={cocktail.idDrink} style={{
    opacity: loading ? 0.5 : 1.0
  }}>
    <p>
      <strong>{cocktail.strDrink}</strong>
    </p>
    <img width="250" src={cocktail.strDrinkThumb} />
    <hr />
    <p><em>Ingredients</em>: {ingredients.join(", ")}</p>
    <p><em>Instructions</em>: {cocktail.strInstructions}</p>
  </div >;
}
