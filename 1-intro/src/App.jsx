import { useState, useEffect } from 'react';

function App() {

  const [toggleONState, setToggleONState] = useState(0);

  const toggleChanged = (isToggle) => {
    if(isToggle) setToggleONState((c) => c+1);
  }

  return (
    <div> 
      <h1>Hello w51</h1>

      <Toggle onToggle={toggleChanged} />
      <p>Number of time it was set to ON : {toggleONState}</p>
      <Counter min={4} max={12} init={6}/>

      <Box children={[
        <Message props="Hello world" />,
        <Message props="test" />
      ]} />
    </div>
  )
}

function Message({props}) {
  return <p>{props}</p>
}

function Toggle({onToggle}) {
  const [state, setState] = useState(false);

  const toggle = () => {
    setState((s) => !s);
  }

  useEffect(() => {
    onToggle(state);
  }, [state])

  return (
    <div>
      <button onClick={toggle}>
        Turn {state ? "OFF" : "ON"}
      </button>
      <p> Toggle is {state ? "ON" : "OFF"} </p>
    </div>
    
  )
}

function Counter(props) {
  const [count, setCount] = useState(props.init);

  const add = () => {
    if (count < props.max) setCount((s) => s+1);
  }

  const sub = () => {
    if (count > props.min) setCount((s) => s-1);
  }

  return (
    <div>
      <p>Count : {count}</p>
      <button onClick={add}>+</button>
      <button onClick={sub}>-</button>
    </div>
  )
}

function Box(props) {

  return (
    <div style={{border: "1px solid black", padding: "10px"}}>
    {props.children}
    </div>
  )
}

export default App;