import { useState } from 'react';

function App() {
  let [cocktails, setCocktails] = useState([]);
  let [error, setError] = useState('');
  let [searching, setSearching] = useState(false);
  let [selected, setSelected] = useState(null);

  let onSubmit = (e) => {
    e.preventDefault();
    setSearching(true);
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + e.target['search'].value)
      .then((res) => res.json())
      .then((data) => {
        setCocktails(data.drinks ? data.drinks : []);
      })
      .catch((err) => {
        setError(err.message);
        setTimeout(() => { setError(''); }, 5000);
      })
      .finally(() => {
        setSearching(false);
      });
  };

  return (
    <>
      <h1>Cocktails</h1>
      {error ? <p style={{ color: 'red' }}>{error}</p> : null}
      <form onSubmit={onSubmit}>
        <input type="text" name="search" />
        {' '}
        <button disabled={searching}>{searching ? 'Searching...' : 'Search'}</button>
      </form>
      {selected ? <Cocktail cocktail={selected} /> : null}
      <div className="cocktails">
        {cocktails.length > 0 ?
          cocktails.map((c) => <div key={c.idDrink} onClick={() => { setSelected(c); }}>
            <p>{c.strDrink}</p>
            <img src={c.strDrinkThumb} />
          </div>) :
          <p>Aucun cocktail ne correspond à la recherche</p>}
      </div>
    </>
  );
}

function Cocktail({ cocktail }) {
  let ingr = '';
  let i = 1;
  while (cocktail['strIngredient' + i]) {
    ingr += ', ' + cocktail['strIngredient' + i];
    i++;
  }
  return <div>
    <hr />
    <h3>{cocktail.strDrink}</h3>
    <p><em>Ingredients: </em>{ingr}</p>
    <p><em>Instructions: </em> {cocktail.strInstructions}</p>
    <hr />
  </div>;
}

export default App;
