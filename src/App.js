import "./styles.css"
import React from "react"

function App() {
  return (
    <div className="calc-grid">
      <div className="output">
        <div className="prev-val">123,123 +</div>
        <div className="current-val">321,321</div>
      </div>
      <button>AC</button>
      <button>+/-</button>
      <button>%</button>
      <button>÷</button>
      <button className="numbers">7</button>
      <button className="numbers">8</button>
      <button className="numbers">9</button>
      <button>x</button>
      <button className="numbers">4</button>
      <button className="numbers">5</button>
      <button className="numbers">6</button>
      <button>-</button>
      <button className="numbers">1</button>
      <button className="numbers">2</button>
      <button className="numbers">3</button>
      <button>+</button>
      <button className="numbers span-two">0</button>
      <button>,</button>
      <button>=</button>
    </div>
  );
}

export default App;
