import { useEffect } from 'react';
import { Form, Outlet, useLoaderData, useNavigation } from 'react-router-dom';
import { NavLinkWithQuery } from '@/linkWithQuery';

export function loader({ request }) {
  let url = new URL(request.url);
  let search = url.searchParams.get('search');
  if (!search) {
    return { drinks: [], search };
  }
  return fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`)
    .then((res) => res.json())
    .then((data) => {
      return { drinks: data.drinks, search };
    });
}

export default function Cocktails() {
  let { drinks, search } = useLoaderData();

  useEffect(() => { document.getElementById('cocktail-search').value = search; }, [search]);

  let navigation = useNavigation();
  let isSearching = navigation.state === 'loading' && navigation.location.pathname === '/cocktails';

  return <>
    <div id="sidebar">
      <h1>Cocktails</h1>
      <Form>
        <input name="search" id="cocktail-search" defaultValue={search} />{' '}
        <button disabled={isSearching}>{isSearching ? 'Searching' : 'Search'}</button>
      </Form>
      <nav>
        <ul>
          {drinks.map((c) => <li key={c.idDrink}>
            <NavLinkWithQuery to={`${c.idDrink}`} className={({ isActive, isPending }) => isActive ? 'active' : isPending ? 'pending' : ''}>
              {c.strDrink}
            </NavLinkWithQuery>
          </li>)}
        </ul>
      </nav>
    </div>
    <div id="detail">
      <Outlet />
    </div>
  </>
}
