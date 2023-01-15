import Decimal from "decimal.js";
import React, { useState } from "react";
import BolusCalculator from "./BolusCalculator";
import CorrectionCalculator from "./CorrectionCalculator";

export default function InsulinCalculator(props) {

    const [correctionInsulinUnits, setCorrectionInsulinUnits] = useState(new Decimal(0));
    const [bolusInsulinUnits, setBolusInsulinUnits] = useState(new Decimal(0));

    function correctionCalculatorResultCallback(result) // expecting a string representing a number
    {
        if(result)
        {
            setCorrectionInsulinUnits(new Decimal(result));
        }
        else
        {
            setCorrectionInsulinUnits(new Decimal(0));
        }
    }

    function bolusCalculatorResultCallback(result) // expecting a string representing a number
    {
        if(result)
        {
            setBolusInsulinUnits(new Decimal(result));
        }
        else
        {
            setBolusInsulinUnits(new Decimal(0));
        }
    }

    function roundInsulinWholeUnits(correctionInsulinUnits, bolusInsulinUnits) // expecting a decimal objects
  {
      if(!correctionInsulinUnits) return new Decimal(0).toFixed(0);
      if(!bolusInsulinUnits) return new Decimal(0).toFixed(0);

      return correctionInsulinUnits.plus(bolusInsulinUnits).round().toFixed(0);
  }

  function roundInsulinHalfUnits(correctionInsulinUnits, bolusInsulinUnits) // expecting a decimal objects
  {
    if(!correctionInsulinUnits) return new Decimal(0).toFixed(1);
    if(!bolusInsulinUnits) return new Decimal(0).toFixed(1);

    const roundDown = ['1','2','3'];
    const roundMid = ['4','5','6','7'];
    const roundUp = ['8','9'];

    var totalInsulinUnits = correctionInsulinUnits.plus(bolusInsulinUnits).toFixed(2);

    var decimalPosition = totalInsulinUnits.indexOf(".");

    var tenthPlaceDigit = totalInsulinUnits.substring(decimalPosition + 1, decimalPosition + 2);

    var result = new Decimal(0).toFixed(1);

    if(roundDown.includes(tenthPlaceDigit))
    {
        result = new Decimal(totalInsulinUnits).floor().toFixed(1);
    }

    if(roundMid.includes(tenthPlaceDigit))
    {
        result = new Decimal(totalInsulinUnits).floor().plus('0.5').toFixed(1);
    }

    if(roundUp.includes(tenthPlaceDigit))
    {
        result = new Decimal(totalInsulinUnits).ceil().toFixed(1);
    }

    return result;
  }

    return (
        <>
            <div>Whole Units: {roundInsulinWholeUnits(correctionInsulinUnits, bolusInsulinUnits)}</div>
            <div>Half Units: {roundInsulinHalfUnits(correctionInsulinUnits, bolusInsulinUnits)}</div>
            <CorrectionCalculator baseline={props.baseline} correctionFactor={props.correctionFactor} resultCallback={correctionCalculatorResultCallback} />
            <BolusCalculator carbRatio={props.carbRatio} resultCallback={bolusCalculatorResultCallback} />
            <fieldset>
                <legend>Notes:</legend>
                <ul>
                    <li>These calculators are for rapid-acting insulin.</li>
                    <li>Create presets to quickly change your correction target, correction factor, and carb ratio for meals, nighttime, etc.</li>
                </ul>
            </fieldset>
        </>
    );
}