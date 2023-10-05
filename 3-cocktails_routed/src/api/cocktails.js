export const getCocktailByID = (id) => {
    return fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + id)
    .then((res) => res.json());
}

export const getCocktails = (name) => {
    return fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + name)
    .then((res) => res.json());
}

export const getCocktailsByIngredient = (name) => {
    return fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + name)
    //if no result it returns a text/html
    .then((res) => {
        if (res.headers.get('Content-Type').startsWith('application/json')) {
            return res.json();
        } else {
            return {drinks: []};
        }
    })

}