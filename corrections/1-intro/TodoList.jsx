import { useState } from 'react';

export function TodoList() {
    let [items, setItems] = useState([
        { id: 1, text: 'Learn React', done: false },
        { id: 2, text: '...', done: true },
        { id: 3, text: 'Rule the world', done: false },
    ]);
    let [nextId, setNextId] = useState(4);

    let addItem = (text) => {
        setItems([{ id: nextId, text, done: false }, ...items]);
        setNextId(nextId + 1);
    };

    let removeItem = (id) => {
        setItems(items.filter((i) => i.id !== id));
    };

    let updateItem = (id, changes) => {
        setItems(items.map((i) => i.id !== id ? i : { ...i, ...changes }));
    };

    return <>
        <AddItemForm onAdd={addItem} />
        <ItemsList items={items} onRemove={removeItem} onUpdate={updateItem} />
    </>;
}

function ItemsList({ items, onRemove, onUpdate }) {
    return <ul>
        {items.map((i) => (
            <li style={{ textDecoration: i.done ? 'line-through' : '' }} key={i.id}>
                <button className='small danger' onClick={() => { onRemove(i.id) }}>X</button>
                {' '}
                <input type='checkbox' checked={i.done} onChange={(e) => onUpdate(i.id, { done: e.target.checked })} />
                {' '}
                {i.text}
            </li>
        ))}
    </ul>;
}

function AddItemForm({ onAdd }) {
    let handleSubmit = (e) => {
        e.preventDefault();
        onAdd(e.target['text'].value);
        e.target['text'].value = '';
    };
    return <form onSubmit={handleSubmit}>
        <input name='text' />
        {' '}
        <button>Add</button>
    </form>;
}
