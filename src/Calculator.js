import React from "react";
import { useState, useRef, useEffect } from "react";
import Decimal from "decimal.js";

export default function Calculator() {
  //const [baseline, setBaseline] = useState();
  //const [carbRatio, setCarbRatio] = useState();
  //const [bloodSugar, setBloodSugar] = useState();
  //const [mealCarbs, setMealCarbs] = useState();
  const [result, setResult] = useState(null);

  const baselineRef = useRef();
  const carbRatioRef = useRef();
  const bloodSugarRef = useRef();
  const mealCarbsRef = useRef();

  const handleCalculate = (e) => {
    try {
      const baselineInput = new Decimal(baselineRef.current.value);
      const ratioInput = new Decimal(carbRatioRef.current.value);
      const bloodSugarInput = new Decimal(bloodSugarRef.current.value);
      const carbInput = new Decimal(mealCarbsRef.current.value);

      var ratio = new Decimal(1).dividedBy(ratioInput);
      
      var bloodUnits = bloodSugarInput
        .minus(baselineInput)
        .dividedBy(new Decimal(50));

      if (bloodUnits.lessThan(0)) {
        bloodUnits = new Decimal(0);
      }

      var carbUnits = carbInput.times(ratio);

      var totalUnits = bloodUnits.plus(carbUnits); // round?

      if (totalUnits.isNaN()) {
        console.log("TotalUnits isNaN");
        setResult(null);
      } else {
        setResult(totalUnits.toFixed(1));
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
        Carb Ratio <small>(1/x)</small>:{" "}
        <input ref={carbRatioRef} type="text" />
      </label>
      <label>
        Blood Sugar: <input ref={bloodSugarRef} type="text" />
      </label>
      <label>
        Meal Carbs <small>(g)</small>: <input ref={mealCarbsRef} type="text" />
      </label>
      <button onClick={handleCalculate}>Calculate</button>
    </div>
  );
}
