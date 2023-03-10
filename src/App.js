import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import InsulinCalculator from "./InsulinCalculator";
import InsulinCalculatorPresets from "./InsulinCalculatorPresets";
import InsulinCalculatorPresetsManager from "./InsulinCalculatorPresetsManager";

const LOCAL_STORAGE_DATA_KEY = 'Insulin-Calculator-Presets'

export default function App() {
  return (
    <Router>
      <CssBaseline />
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Calculator</Link>
            </li>
            <li>
              <Link to="/presets">Presets</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/privacy">Privacy</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path='/privacy' element={<Privacy/>} />
            <Route path='/about' element={<About/>} />
            <Route path='/presets' element={<Presets/>} />
            <Route path='/' element={<Home/>} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {

  const [baselinePreset, setBaselinePreset] = useState()
  const [correctionFactorPreset, setCorrectionFactorPreset] = useState()
  const [carbRatio, setCarbRatio] = useState()
  
  const handlePresetChange = (preset) => {

    console.log('Component event fired up to App')
    setBaselinePreset(preset.baseline)
    setCorrectionFactorPreset(preset.correctionFactor)
    setCarbRatio(preset.carbRatio)
  }

  return <div className="container">
          <InsulinCalculatorPresets presetChangeCallback={handlePresetChange} localStorageKey={LOCAL_STORAGE_DATA_KEY} />
          <InsulinCalculator baseline={baselinePreset} correctionFactor={correctionFactorPreset} carbRatio={carbRatio} />
        </div>;
}

function Presets()
{
  return <>
    <InsulinCalculatorPresetsManager localStorageKey={LOCAL_STORAGE_DATA_KEY} />
  </>
}

function About() {
  return <>
        <p>The original version of this insulin calculator was created when my daughter, Angel, was diagnosed with type 1 diabetes. It was side-loaded on my Android phone and used it to calculate the insulin she needed until she upgraded pump. However, there are still times when she has to do a correction or bolus manually, so I always keep this app handy.</p>
        <p>This version was built using ReactJS as a learning exercise. It also uses the decimal.js library to make sure the math comes out as expected (floating-point math vs decimal math). The formulas were extracted from documentation provided by NationwideChildrens.org. (<a href="https://www.nationwidechildrens.org/family-resources-education/health-wellness-and-safety-resources/resources-for-parents-and-kids/managing-your-diabetes/chapter-seven-calculating-bolus-injections" target="_blank">link</a>)</p>
        <p>This app is provided free of charge and free of ads.</p>
        <p>This app is open source and is hosted on <a href="https://github.com/Darkwater23/react-insulin-calculator" target="_blank">GitHub.com</a></p>
        <p>This app has not been verified by NationwideChildrens.org or any other medical professionals and should be used at your own risk.</p>
    </>;
}

function Privacy()
{
  return <>
    <p>Privacy statement will go here.</p>
  </>;
}
