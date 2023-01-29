import React, { useRef, useState, useEffect } from 'react'

export default function InsulinCalculatorPresetsManager(props) {
    
    const dataKeyName = props.key;

    const [prefixes, setPrefixes] = useState(new Array())

    useEffect(() => {
        
        if(!dataKeyName) return;
        
        const dataString = localStorage.getItem(dataKeyName);

        if(dataString)
        {
            const data = JSON.parse(dataString);

            setPrefixes(data);
        }
        
    }, [])
  
    return (
    <div>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Baseline</th>
                    <th>Correction Factor</th>
                    <th>Carb Ratio</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
        {prefixes.map(function(prefix){
                    return <tbody><tr>
                            <td>prefix.name</td>
                            <td>prefix.baseline</td>
                            <td>prefix.correctionFactor</td>
                            <td>prefix.carbRatio</td>
                            <td><button onclick={handledPresetDelete}>Delete</button></td>
                        </tr></tbody>;
                  })}
        </table>
    </div>
  );
}
