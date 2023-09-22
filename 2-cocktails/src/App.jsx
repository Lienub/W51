import { useState } from 'react'
import './index.css'

function App() {
    return (
        <div>
            <h1>Cocktails</h1>
            <Cocktail />
        </div>
    )
}

let Cocktail = () => {
    let api_base = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="
    let [cocktails, setCocktails] = useState([])
    let [cocktail, setCocktail] = useState([])

    let searchCocktail = (text) => {
      setCocktail([])
        fetch(api_base+text)
        .then(response => {
            return response.json(); // pour parser le corps de la réponse au format JSON (retourne une nouvelle Promise)
        })
        .then(data => {
            setCocktails(data.drinks??[])
            
        });
      };

    return <div>
        <SearchCocktailForm searchCocktail={searchCocktail}/>
        <CocktailsInfos cocktail={cocktail}/>
        <CocktailsList cocktails={cocktails} setCocktail={setCocktail}/>
    </div>;
}

function CocktailsList({ cocktails, setCocktail }) {

    return <div className="cocktails">
        {cocktails.map((c) => <div key={c.idDrink}>
            <p>{c.strDrink}</p>
            <img src={c.strDrinkThumb} onClick={() => setCocktail(c) }/>
        </div>)}
    </div>;
}

function SearchCocktailForm({ searchCocktail, setCocktail }) {
    function handleSubmit(event) {
        event.preventDefault()
        searchCocktail(event.target.text.value)
        event.target.text.value = ""
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="text" required autoFocus />
            <button type="submit">Search</button>
        </form>
    )
}

function CocktailsInfos({ cocktail }) {
  let ingredients = []
  for(let i = 1; i <= 15; i++){
    let ingredient = cocktail["strIngredient"+i]
    if(ingredient != null){
      ingredients.push(ingredient)
    }
  }

  return (cocktail.strDrink?
    <div>
      <hr/>
      <h2>{cocktail.strDrink}</h2>
      <p>{cocktail.strInstructions}</p>
      <p>Ingredients :</p>
      <ul>
        {ingredients.map((ingredient) => <li>{ingredient}</li>)}
      </ul>
      <p>Instructions:</p>
      <p>{cocktail.strInstructions}</p>
      <hr/>
    </div> : <div></div>
  )
}

export default App