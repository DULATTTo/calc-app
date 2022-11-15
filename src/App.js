import React, {useReducer} from "react"
import DigitButton from "./DigitButton"
import OperationButton from "./OperationButton"
import "./styles.css"

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "add-operation",
  CLEAR: "clear",
  EVALUATE: "evaluate",
  CHOOSE_POLARITY: "choose-polarity",
  GET_PERCENTAGE: "get_percentage"
}

function reducer(state, {type, payload}) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentVal: payload.digit,
          overwrite: false
        }
      }
      if (payload.digit === "0" && !state.currentVal) return state
      if (state.currentVal && payload.digit === "." && state.currentVal.includes(".")) return state
      if (payload.digit !== "0" && payload.digit !== "." && !state.currentVal) {
        return {
          ...state,
          currentVal: payload.digit
        }
      }
      return {
        ...state,
        currentVal: `${state.currentVal || "0"}${payload.digit}`
      }
    
    case ACTIONS.CHOOSE_OPERATION:
      if (!state.prevVal) {
        return {
          ...state,
          operation: payload.operation,
          currentVal: null,
          prevVal: state.currentVal ? state.currentVal : "0"
        }
      }
      if (!state.currentVal) {
        return {
          ...state,
          operation: payload.operation
        }
      }
      return {
        ...state,
        prevVal: evaluate(state),
        operation: payload.operation,
        currentVal: null
      }
    case ACTIONS.CLEAR:
      return {}

    case ACTIONS.EVALUATE:
      if (state.currentVal && state.prevVal && state.operation) {
        return {
          ...state,
          currentVal: evaluate(state),
          operation: null,
          prevVal: null,
          overwrite: true
        }
      } else {
        return state
      }
    case ACTIONS.CHOOSE_POLARITY:
      if (state.currentVal) {
        return {
          ...state,
          currentVal: state.currentVal * -1
        }
      } else {
        return state
      }
    case ACTIONS.GET_PERCENTAGE:
      if (state.currentVal) {
        return {
          ...state,
          currentVal: state.currentVal / 100
        }
      } else return state
    default:
      return state
  }
}

function evaluate({currentVal, prevVal, operation}) {
  const current = parseFloat(currentVal) 
  const prev = parseFloat(prevVal) 
  if (isNaN(current) && isNaN(prev)) return ""
  let result = ""
  switch (operation) {
    case "÷":
      result =  prev / current
      break
    case "x":
      result =  prev * current
      break
    case "+":
      result = prev + current
      break
    case "-":
      result = prev - current
      break
    default:
      result = ""
  }
  return result.toPrecision().toString()
}

function App() {
  const [{currentVal = 0, prevVal, operation}, dispatch] = useReducer(reducer, {})
  return (
    <div className="calc-grid">
      <div className="output">
        <div className="prev-val">{prevVal} {operation}</div>
        <div className="current-val">{currentVal}</div>
      </div>
      <button onClick={() => dispatch({type: ACTIONS.CLEAR})}>AC</button>
      <button onClick={() => dispatch({type: ACTIONS.CHOOSE_POLARITY})}>+/-</button>
      <button onClick={() => dispatch({type: ACTIONS.GET_PERCENTAGE})}>%</button>
      <OperationButton operation="÷" dispatch={dispatch}/>
      <DigitButton digit="7" dispatch={dispatch}/>
      <DigitButton digit="8" dispatch={dispatch}/>
      <DigitButton digit="9" dispatch={dispatch}/>
      <OperationButton operation="x" dispatch={dispatch}/>
      <DigitButton digit="4" dispatch={dispatch}/>
      <DigitButton digit="5" dispatch={dispatch}/>
      <DigitButton digit="6" dispatch={dispatch}/>
      <OperationButton operation="-" dispatch={dispatch}/>
      <DigitButton digit="1" dispatch={dispatch}/>
      <DigitButton digit="2" dispatch={dispatch}/>
      <DigitButton digit="3" dispatch={dispatch}/>
      <OperationButton operation="+" dispatch={dispatch}/>
      <DigitButton digit="0" dispatch={dispatch} className="span-two"/>
      <DigitButton digit="." dispatch={dispatch}/>
      <button onClick={() => dispatch({type: ACTIONS.EVALUATE})}>=</button>
    </div>
  );
}


export default App;
