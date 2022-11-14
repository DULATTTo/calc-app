import React, {useReducer} from "react"
import DigitButton from "./DigitButton"
import "./styles.css"

export const ACTIONS = {
  ADD_DIGIT: "add-digit"
}

function reducer(state, {type, payload}) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      return {
        ...state,
        currentVal: `${state.currentVal || ""}${payload.digit}`
      }
  }
}

function App() {
  const [{currentVal, prevVal, operation}, dispatch] = useReducer(reducer, {})
  return (
    <div className="calc-grid">
      <div className="output">
        <div className="prev-val">{prevVal} {operation}</div>
        <div className="current-val">{currentVal}</div>
      </div>
      <button>AC</button>
      <button>+/-</button>
      <button>%</button>
      <button>÷</button>
      <DigitButton digit="7" dispatch={dispatch}/>
      <DigitButton digit="8" dispatch={dispatch}/>
      <DigitButton digit="9" dispatch={dispatch}/>
      <button>x</button>
      <DigitButton digit="4" dispatch={dispatch}/>
      <DigitButton digit="5" dispatch={dispatch}/>
      <DigitButton digit="6" dispatch={dispatch}/>
      <button>-</button>
      <DigitButton digit="1" dispatch={dispatch}/>
      <DigitButton digit="2" dispatch={dispatch}/>
      <DigitButton digit="3" dispatch={dispatch}/>
      <button>+</button>
      <DigitButton digit="0" dispatch={dispatch} className="span-two"/>
      <DigitButton digit="." dispatch={dispatch}/>
      <button>=</button>
    </div>
  );
}


export default App;
