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

  const handleClear = (e) => {
    baselineRef.current.value = null;
    correctionFactorRef.current.value = null;
    bloodSugarRef.current.value = null;

    setResult(null);

    if(props.resultCallback)
    {
      props.resultCallback(null);
    }
  };

  return (
    <div>
      <div>Units: {result}</div>
      <label>
        Target: <input ref={baselineRef} type="text" value={props.baseline} />
      </label>
      <label>
        Correction Factor: <input ref={correctionFactorRef} type="text" value={props.correctionFactor} />
      </label>
      <label>
        Blood Sugar: <input ref={bloodSugarRef} type="text" />
      </label>
      <button onClick={handleCalculate}>Calculate</button>
      <button onClick={handleClear}>Clear</button>
    </div>
  );
}
