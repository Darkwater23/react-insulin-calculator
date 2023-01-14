import React from "react";
import { useState, useRef, useEffect } from "react";
import * as calculator from "./InsulinCalculatorCore.js";

export default function BolusCalculator(props) {
  const [result, setResult] = useState(null);

  const carbRatioRef = useRef();
  const mealCarbsRef = useRef();

  const handleCalculate = (e) => {
    try {

      var insulinUnits = calculator.calculateBolus(carbRatioRef.current.value, mealCarbsRef.current.value)

      setResult(insulinUnits);
      
      if(props.resultCallback)
      {
        props.resultCallback(insulinUnits);
      }

    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div>Units: {result}</div>
      <div></div>
      <label>
        Carb Ratio <small>(1/x)</small>: <input ref={carbRatioRef} type="text" />
      </label>
      <label>
        Meal Carbs <small>(g)</small>: <input ref={mealCarbsRef} type="text" />
      </label>
      <button onClick={handleCalculate}>Calculate</button>
    </div>
  );
}
