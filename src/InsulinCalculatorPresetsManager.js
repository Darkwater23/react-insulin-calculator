import React, { useRef, useState, useEffect } from 'react'

export default function InsulinCalculatorPresetsManager(props) {
    
    const localStorageKey = props.localStorageKey;

    const prefixNameRef = useRef();
    const baselineRef = useRef();
    const correctionFactorRef = useRef();
    const carbRatioRef = useRef();

    const [prefixes, setPrefixes] = useState(new Array())

    useEffect(() => {
        
        if(!localStorageKey) return;
        
        const dataString = localStorage.getItem(localStorageKey);

        if(dataString)
        {
            const data = JSON.parse(dataString);

            setPrefixes(data);
        }
        
    }, [])

    useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(prefixes));
      }, [prefixes]);

    const handleAddClick = (e) => {
        let newPrefix = {
            name: prefixNameRef.current.value,
            baseline: baselineRef.current.value,
            correctionFactor: correctionFactorRef.current.value,
            carbRatio: carbRatioRef.current.value
        }

        //TODO: prevent duplicate names

        // Add prefix to state
        setPrefixes([...prefixes, newPrefix])

        // Clear inputs, set focus
        prefixNameRef.value = null;
        baselineRef.value = null;
        correctionFactorRef.value = null;
        carbRatioRef.value = null;
    }

    const handlePresetDelete = (presetName) => {
        
        let data = JSON.parse(localStorage.getItem(localStorageKey))

        let newData = data.map(p => p.name !== presetName)

        console.log(newData)

        setPrefixes(newData)

        localStorage.setItem(localStorageKey, JSON.stringify(newData))
    }
  
    return (
    <div>
        <table>
            <thead>
                <tr>
                    <th>Prefix Name</th>
                    <th>Baseline</th>
                    <th>Correction Factor</th>
                    <th>Carb Ratio</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input type="text" ref={prefixNameRef} /></td>
                    <td><input type="text" ref={baselineRef} /></td>
                    <td><input type="text" ref={correctionFactorRef} /></td>
                    <td><input type="text" ref={carbRatioRef} /></td>
                    <td><button onClick={handleAddClick}>Add</button></td>
                </tr>
        {prefixes.map(function(prefix){
                    return <tr key={prefix.name}>
                            <td>{prefix.name}</td>
                            <td>{prefix.baseline}</td>
                            <td>{prefix.correctionFactor}</td>
                            <td>{prefix.carbRatio}</td>
                            <td><button onClick={() => handlePresetDelete(prefix.name)}>Delete</button></td>
                        </tr>;
                  })}
            </tbody>
        </table>
    </div>
  );
}
