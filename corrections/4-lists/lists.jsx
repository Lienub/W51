import { Link, Outlet, Form, NavLink, useLoaderData, useNavigation, redirect } from 'react-router-dom';

export function loader() {
  return fetch('http://localhost:4200/lists')
    .then(res => res.json())
    .then(lists => ({ lists }));
}

export function action({ request }) {
  return request.formData()
    .then(formData => {
      let list = Object.fromEntries(formData);
      return fetch('http://localhost:4200/lists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(list)
      });
    })
    .then(res => res.json())
    .then(list => redirect(`/lists/${list.id}`));
}

export default function Lists() {
  let { lists } = useLoaderData();

  let navigation = useNavigation();
  let creating = navigation.formMethod === 'POST' && navigation.formAction === '/lists'; // true while submitting & subsequent loading
  let created = navigation.state === 'loading' && navigation.formAction === '/lists'; // true right after submitting
  if (created) {
    document.getElementById('lists-title').value = '';
  }

  return (
    <>
      <div id="sidebar">
        <h1><Link to="/lists">Lists</Link></h1>
        <Form method="POST">
          <input type="text" id="lists-title" name="title" />{' '}
          <button disabled={creating ? 'disabled' : ''}>{creating ? 'Creating' : 'Create'}</button>
        </Form>
        <nav>
          {lists.length ? (
            <ul>
              {lists.map(l => (
                <li key={l.id}>
                  <NavLink
                    to={`${l.id}`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? 'active'
                        : isPending
                          ? 'pending'
                          : ''
                    }>
                    {l.title}
                  </NavLink>
                </li>
              ))}
              {navigation.formAction === '/lists' && navigation.formData ? <li><em style={{ color: 'gray' }}>{navigation.formData.get('title')}</em></li> : null}
            </ul>
          ) : (
            <p>No list yet!</p>
          )}
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
