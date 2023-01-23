import React, { useRef, useState } from 'react'

export default function InsulinCalculatorPresets() {
  
    const [preset, setPreset] = useState();
    const presetSelectRef = useRef();

    const handleOnChange = (e) => { 
        setPreset(presetSelectRef.current.value)
    };
  
    return (
    <div>
        <select ref={presetSelectRef} onChange={handleOnChange} value={preset}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
        </select>
    </div>
  );
}
