import React, { useRef, useState } from 'react'

export default function InsulinCalculatorPresets(props) {
  
    const [presetName, setPresetName] = useState();
    const presetSelectRef = useRef();

    const notify = props.prefixChangeCallback;

    const handleOnChange = (e) => { 

        setPresetName(presetSelectRef.current.value)
        
        let presets = JSON.parse(localStorage.getItem(props.key))

        let preset = presets.find(p => p.name === presetName);

        notify(preset);
    };
  
    return (
    <div>
        <label>Select Preset: <select ref={presetSelectRef} onChange={handleOnChange} value={presetName}></select></label>
    </div>
  );
}
