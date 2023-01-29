import Decimal from "decimal.js";
import React, { useState, useRef } from "react";
import * as calculator from "./InsulinCalculatorCore.js";

export default function InsulinCalculator(props) {
  const [correctionInsulinUnits, setCorrectionInsulinUnits] = useState(new Decimal(0));
  const [bolusInsulinUnits, setBolusInsulinUnits] = useState(new Decimal(0));

  const baselineRef = useRef();
  const correctionFactorRef = useRef();
  const bloodSugarRef = useRef();
  const carbRatioRef = useRef();
  const mealCarbsRef = useRef();

  function handleCalculate()
  {
    let correction = calculator.calculateCorrection(baselineRef.current.value, correctionFactorRef.current.value, bloodSugarRef.current.value);
    let bolus = calculator.calculateBolus(carbRatioRef.current.value, mealCarbsRef.current.value);

    if(correction)
    {
        setCorrectionInsulinUnits(new Decimal(correction));
    }
    else
    {
        setCorrectionInsulinUnits(new Decimal(0));
    }

    if(bolus)
    {
        setBolusInsulinUnits(new Decimal(bolus));
    }
    else
    {
        setBolusInsulinUnits(new Decimal(0));
    }
  }

  function handleClear()
  {
    baselineRef.current.value = (props.baseline) ? props.baseline : null;
    correctionFactorRef.current.value = (props.correctionFactor) ? props.correctionFactor : null;
    carbRatioRef.current.value = (props.carbRatio) ? props.carbRatio : null;
    bloodSugarRef.current.value = null;
    mealCarbsRef.current.value = null;
  }

  function roundInsulinWholeUnits(correctionInsulinUnits, bolusInsulinUnits) {
    // expecting a decimal objects
    if (!correctionInsulinUnits) return new Decimal(0).toFixed(0);
    if (!bolusInsulinUnits) return new Decimal(0).toFixed(0);

    return correctionInsulinUnits.plus(bolusInsulinUnits).round().toFixed(0);
  }

  function roundInsulinHalfUnits(correctionInsulinUnits, bolusInsulinUnits) {
    // expecting a decimal objects
    if (!correctionInsulinUnits) return new Decimal(0).toFixed(1);
    if (!bolusInsulinUnits) return new Decimal(0).toFixed(1);

    const roundDown = ["1", "2", "3"];
    const roundMid = ["4", "5", "6", "7"];
    const roundUp = ["8", "9"];

    var totalInsulinUnits = correctionInsulinUnits
      .plus(bolusInsulinUnits)
      .toFixed(2);

    var decimalPosition = totalInsulinUnits.indexOf(".");

    var tenthPlaceDigit = totalInsulinUnits.substring(
      decimalPosition + 1,
      decimalPosition + 2
    );

    var result = new Decimal(0).toFixed(1);

    if (roundDown.includes(tenthPlaceDigit)) {
      result = new Decimal(totalInsulinUnits).floor().toFixed(1);
    }

    if (roundMid.includes(tenthPlaceDigit)) {
      result = new Decimal(totalInsulinUnits).floor().plus("0.5").toFixed(1);
    }

    if (roundUp.includes(tenthPlaceDigit)) {
      result = new Decimal(totalInsulinUnits).ceil().toFixed(1);
    }

    return result;
  }

  return (
    <>
      <div className="output-container">
        Whole Units<br/>{roundInsulinWholeUnits(correctionInsulinUnits, bolusInsulinUnits)}
      </div>
      <div className="output-container">
        Half Units<br/>{roundInsulinHalfUnits(correctionInsulinUnits, bolusInsulinUnits)}
      </div>
      <div className="clear">&nbsp;</div>
      <hr />
      <label>
        Target: <input ref={baselineRef} type="text" defaultValue={props.baseline} />
      </label>
      <label>
        Correction Factor: <input ref={correctionFactorRef} type="text" defaultValue={props.correctionFactor} />
      </label>
      <label>
        Blood Sugar: <input ref={bloodSugarRef} type="text" />
      </label>
      <label>
        Carb Ratio <small>(1/x)</small>: <input ref={carbRatioRef} type="text" defaultValue={props.carbRatio} />
      </label>
      <label>
        Meal Carbs <small>(g)</small>: <input ref={mealCarbsRef} type="text" />
      </label>
      <div className="grid">
        <div>
          <button role="button" onClick={handleCalculate}>
            Calculate
          </button>
        </div>
        <div>
          <button role="button" onClick={handleClear}>
            Reset
          </button>
        </div>
      </div>
      <fieldset>
        <legend><strong>Notes</strong></legend>
        <ul>
          <li>This calculator is for rapid-acting insulin.</li>
          <li>
            Create presets to quickly change your correction target, correction
            factor, and carb ratio for meals, nighttime, etc.
          </li>
        </ul>
      </fieldset>
    </>
  );
}
