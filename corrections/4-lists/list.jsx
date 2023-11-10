import { Form, useLoaderData, useFetcher, useNavigation, useParams, redirect } from 'react-router-dom';

export function loader({ params }) {
  return Promise.all([
    fetch(`http://localhost:4200/lists/${params.listId}`)
      .then(res => res.json()),
    fetch(`http://localhost:4200/lists/${params.listId}/items`)
      .then(res => res.json()),
  ])
    .then(([list, items]) => ({ list, items }));
}

export function action({ request, params }) {
  switch (request.method) {
    case 'DELETE': {
      return fetch(`http://localhost:4200/lists/${params.listId}`, {
        method: 'DELETE'
      })
        .then(() => redirect('/lists'));
    }
  }
}

export default function List() {
  let { list, items } = useLoaderData();
  let { listId } = useParams();

  let navigation = useNavigation();
  let deletingList = navigation.formMethod == 'DELETE' && navigation.formAction === `/lists/${listId}`; // true while submitting & subsequent loading

  let fetcher = useFetcher();
  let creatingItem = fetcher.formMethod === 'POST'; // true while submitting & subsequent loading
  let createdItem = fetcher.state === 'loading'; // true right after submission
  if (createdItem) {
    document.getElementById('list-item-text').value = '';
  }

  return <div>
    <h2>
      {list.title}{' '}
      <Form method="DELETE" style={{ float: 'right', display: "inline" }} onSubmit={e => {
        if (!confirm('Really delete the list?')) {
          e.preventDefault();
        }
      }}>
        <button className="small danger" disabled={deletingList ? 'disabled' : ''}>
          {deletingList ? 'Deleting...' : 'Delete list'}
        </button>
      </Form>
    </h2>
    <hr />
    <fetcher.Form method="POST" action="items">
      <input type="text" id="list-item-text" name="text" />{' '}
      <button disabled={creatingItem ? 'disabled' : ''}>{creatingItem ? 'Adding...' : 'Add item'}</button>
    </fetcher.Form>
    {items.length ? (
      <ul>
        {items.map(i => <ListItem key={i.id} item={i} />)}
        {fetcher.formData ? <li><em style={{ color: 'gray' }}>{fetcher.formData.get('text')}</em></li> : null}
      </ul>
    ) : (
      <p>No items yet!</p>
    )}
  </div>;
}

function ListItem({ item }) {
  let fetcher = useFetcher();

  let deletingItem = fetcher.formMethod === 'DELETE'; // true while submitting & subsequent loading

  return <li>
    {item.text}{' '}
    <fetcher.Form method="DELETE" style={{ display: "inline" }} action="items">
      <button
        className="small danger"
        name="id"
        value={item.id}
        disabled={deletingItem ? 'disabled' : ''}
      >
        {deletingItem ? 'Removing...' : 'Remove'}
      </button>
    </fetcher.Form>
  </li>;
}
