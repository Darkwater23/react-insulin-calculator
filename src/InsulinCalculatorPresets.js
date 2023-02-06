import React, { useEffect, useRef, useState } from 'react'

export default function InsulinCalculatorPresets(props) {
  
    const [prefixes, setPrefixes] = useState(new Array())
    const presetSelectRef = useRef();

    const localStorageKey = props.localStorageKey;
    const notify = props.presetChangeCallback;

    useEffect(() => {
        
        if(!localStorageKey) return;
        
        const dataString = localStorage.getItem(localStorageKey);

        if(dataString)
        {
            const data = JSON.parse(dataString);

            setPrefixes(data);
        }
        
    }, [])

    const handleOnChange = (e) => { 

        let preset;
        
        if(presetSelectRef.current.value =='none'){
            
            preset = {name: null, baseline: null, correctionFactor: null, carbRatio: null}

        }
        else
        {
            let presets = JSON.parse(localStorage.getItem(localStorageKey))

            preset = presets.find(p => p.name === presetSelectRef.current.value)
        }
        
        notify(preset);
    };
  
    return (
    <div>
        <label>Select Preset: <select ref={presetSelectRef} onChange={handleOnChange}>
                <option key="none" value="none">No Preset</option>
                {prefixes.map(function(prefix){
                    return  <option key={prefix.name} value={prefix.name}>{prefix.name} ({prefix.baseline},{prefix.correctionFactor},{prefix.carbRatio})</option>;
                })}    
            </select>
        </label>
    </div>
  );
}
