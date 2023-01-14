import React from "react";
import { useState, useRef, useEffect } from "react";
import * as calculator from "./InsulinCalculatorCore.js";

export default function CorrectionCalculator(props) {

  const [result, setResult] = useState(null);

  const baselineRef = useRef();
  const correctionFactorRef = useRef();
  const bloodSugarRef = useRef();

  const handleCalculate = (e) => {
    try {

      var insulinUnits = calculator.calculateCorrection(baselineRef.current.value, correctionFactorRef.current.value, bloodSugarRef.current.value);

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
      <label>
        Baseline: <input ref={baselineRef} type="text" />
      </label>
      <label>
        Correction Factor: <input ref={correctionFactorRef} type="text" />
      </label>
      <label>
        Blood Sugar: <input ref={bloodSugarRef} type="text" />
      </label>
      <button onClick={handleCalculate}>Calculate</button>
    </div>
  );
}
