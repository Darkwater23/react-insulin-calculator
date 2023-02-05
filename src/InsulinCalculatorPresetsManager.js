import React, { useRef, useState, useEffect } from 'react'

export default function InsulinCalculatorPresetsManager(props) {
    
    const localStorageKey = props.localStorageKey;

    const presetNameRef = useRef();
    const baselineRef = useRef();
    const correctionFactorRef = useRef();
    const carbRatioRef = useRef();

    const [presets, setPresets] = useState(new Array())

    useEffect(() => {
        
        if(!localStorageKey) return;
        
        const dataString = localStorage.getItem(localStorageKey);

        if(dataString)
        {
            const data = JSON.parse(dataString);

            setPresets(data);
        }
        
    }, [])

    useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(presets));
      }, [presets]);

    const handleAddClick = (e) => {
        let newPreset = {
            name: presetNameRef.current.value,
            baseline: baselineRef.current.value,
            correctionFactor: correctionFactorRef.current.value,
            carbRatio: carbRatioRef.current.value
        }

        //TODO: prevent duplicate names
        if(!presets.find(p => p.name === newPreset.name))
        {
            // Add preset to state
            setPresets([...presets, newPreset])

            // Clear inputs
            presetNameRef.current.value = null;
            baselineRef.current.value = null;
            correctionFactorRef.current.value = null;
            carbRatioRef.current.value = null;

            // Set focus
            presetNameRef.current.focus();
        }
    }

    const handlePresetDelete = (presetName) => {
        
        console.log(presetName)
        
        let data = JSON.parse(localStorage.getItem(localStorageKey))

        let newData = data.filter(p => p.name !== presetName)

        console.log(newData)

        setPresets(newData)

        localStorage.setItem(localStorageKey, JSON.stringify(newData))
    }
  
    return (
    <div>
        <table>
            <thead>
                <tr>
                    <th>Preset Name</th>
                    <th>Baseline</th>
                    <th>Correction Factor</th>
                    <th>Carb Ratio</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input type="text" ref={presetNameRef} /></td>
                    <td><input type="text" ref={baselineRef} /></td>
                    <td><input type="text" ref={correctionFactorRef} /></td>
                    <td><input type="text" ref={carbRatioRef} /></td>
                    <td><button onClick={handleAddClick}>Add</button></td>
                </tr>
        {presets.map(function(preset){
                    return <tr key={preset.name}>
                            <td>{preset.name}</td>
                            <td>{preset.baseline}</td>
                            <td>{preset.correctionFactor}</td>
                            <td>{preset.carbRatio}</td>
                            <td><button onClick={() => handlePresetDelete(preset.name)}>Delete</button></td>
                        </tr>;
                  })}
            </tbody>
        </table>
    </div>
  );
}
