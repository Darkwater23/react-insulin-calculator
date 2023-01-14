import Decimal from "decimal.js";

export function calculateBolus(carbRatio, mealCarbs) { // expect strings here
    
    if(!carbRatio) return null;
    if(!mealCarbs) return null;
    
    const carbRatioDecimal = new Decimal(carbRatio);
    const mealCarbsDecimal = new Decimal(mealCarbs);

    var insulinUnits = mealCarbsDecimal.dividedBy(carbRatioDecimal);

    if (insulinUnits.isNaN()) {
        return null;
    } else {
        return insulinUnits.toFixed(2);
    }
}

export function calculateCorrection(baseline, correctionFactor, bloodGlucose)
{
    if(!baseline) return null;
    if(!correctionFactor) return null;
    if(!bloodGlucose) return null;

    const baselineDecimal = new Decimal(baseline);
    const correctionFactorDecimal = new Decimal(correctionFactor);
    const bloodGlucoseDecimal = new Decimal(bloodGlucose);

    var correctionAmount = bloodGlucoseDecimal.minus(baselineDecimal);

    var insulinUnits = new Decimal(0);

    if(correctionAmount > 0)
    {
        insulinUnits = correctionAmount.dividedBy(correctionFactorDecimal);
    }

    if (insulinUnits.isNaN()) {
        return null;
    } else {
        return insulinUnits.toFixed(2);
    }
}