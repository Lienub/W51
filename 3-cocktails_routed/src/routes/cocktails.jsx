import { useState, useEffect } from 'react';
import { NavLink, Outlet, useLoaderData, Form  } from 'react-router-dom';
import { getCocktails, getCocktailsByIngredient, getCocktailByID } from '../api/cocktails';
import { LinkWithQuery } from '../linkWithQuery';



export function CocktailsApp(){
    return(
        <>
            <Cocktails />
        </>
    )
}

export function CocktailApp(){
    return(
        <>
            <Cocktail />
        </>
    )
}

export async function cocktailsLoader({ request }) {
    const url = new URL(request.url);
    const search = url.searchParams.get("search");
    const searchBy = url.searchParams.get("searchBy");
    if (search) {
        if (searchBy === "name") {
            const data = await getCocktails(search);
            return {cocktails: data.drinks ??[], search: search, searchBy: searchBy};
        }
        else if (searchBy === "ingredient") {
            const data = await getCocktailsByIngredient(search);
            return {cocktails: data.drinks ??[], search: search, searchBy: searchBy};
        }
    } else {
        return {cocktails: [], search: "", searchBy: searchBy};
    }
}

export async function cocktailLoader({ params }) {
    const data = await getCocktailByID(params.id);
    return data.drinks[0] ??[];
}


function Cocktails(){
    const [state, setState] = useState("name");
    let data = useLoaderData();  
    useEffect(() => {
        document.getElementById('cocktailList').value = data.search
    }, [data.search]);
    
    return(
        <>
            <div id="sidebar">
                <Form>
                    <input type="text" id="cocktailList" name="search" required autoFocus />
                    <button type="submit">Search</button>

                    <input type="radio" id="name" name="searchBy" value="name" checked={state === "name"} onChange={() => setState("name")}/>
                    <label htmlFor="name"> by Name</label>
                    <br />
                    <input type="radio" id="ingredient" name="searchBy" value="ingredient" checked={state === "ingredient"} onChange={() => setState("ingredient")}/>
                    <label htmlFor="ingredient"> by Ingredient</label>
                </Form>
                <nav>
                    <ul>
                        {data.cocktails.length > 0 ? data.cocktails.map((c) => <li key={c.idDrink}>
                            <LinkWithQuery to={c.idDrink}>{c.strDrink}</LinkWithQuery>
                        </li>) : <p>No results</p>}
                    </ul>
                </nav>
            </div>
            <div id="detail">
                <Outlet /> 
            </div>
        </>
    )
}

function CocktailsInfos( data ) {
    let ingredients = []
    if (data !== undefined) {
        for(let i = 1; i <= 15; i++){
            let ingredient = data["strIngredient"+i]
            if(ingredient !== null){
              ingredients.push(ingredient)
            }
          }
        return ingredients
    }
}

function Cocktail(){
    let data = useLoaderData();
    let ingredients = CocktailsInfos(data);  
    return(
        <>
            <h2>{data.strDrink}</h2>
            <img src={data.strDrinkThumb} width="400px" />
            {ingredients !== undefined ? <p>Ingredients:</p> : <p>Not any ingredients</p>}
            <ul>
                {ingredients !== undefined ? ingredients.map((c) => <li key={c} >{c}</li>) : <a></a>}
            </ul>

            <p>Instructions:</p>
            <p>{data.strInstructions}</p>
        </>
    )
}
