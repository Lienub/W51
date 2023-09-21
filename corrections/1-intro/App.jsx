import { useState, useEffect } from 'react';
import { TodoList } from './TodoList';

function App() {
  let [nbOn, setNbOn] = useState(0);

  let toggleChanged = (v) => {
    if (v) {
      setNbOn(nbOn + 1);
    }
  };

  return (
    <div>
      <h1>Hello :-)</h1>
      <TodoList />
    </div>
  )
}

function Message({ text }) {
  return <p>{text}</p>;
}

function Toggle({ onToggle }) {
  let [value, setValue] = useState(false);
  let handleClick = () => {
    setValue(!value);
  };
  useEffect(() => {
    onToggle(value);
  }, [value]);
  return <div>
    <span>Toggle is {value ? "ON" : "OFF"}</span>
    {' '}
    <button onClick={handleClick} className="small">Turn {!value ? "ON" : "OFF"}</button>
  </div>;
}

function Counter({ min = 0, max = 10 }) {
  let [count, setCount] = useState(min);
  let [incr, setIncr] = useState(1);
  let decrement = () => {
    setCount(count - incr >= min ? count - incr : min);
  };
  let increment = () => {
    setCount(count + incr <= max ? count + incr : max);
  };
  useEffect(() => {
    if (count < min || count > max)
      setCount(count < min ? min : max);
  }, [min, max]);
  return <>
    <span>Count value: {count}</span>
    {' '}
    <button className="small" onClick={decrement}>-</button>
    {' '}
    <button className="small" onClick={increment}>+</button>
    {' '}
    <input type="range" min={0} max={10} value={incr} onChange={(e) => { setIncr(Number(e.target.value)); }} />
  </>;
}

function Box({ children }) {
  let style = {
    border: '1px solid black',
    padding: '0 1rem',
    boxShadow: '0px 0px 15px 5px rgba(249,69,255,0.64)'
  };
  return <div style={style}>
    {children}
  </div>;
}

export default App;
