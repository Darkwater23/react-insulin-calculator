import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import InsulinCalculator from "./InsulinCalculator";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Calculators</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
            <Route path='/about' element={<About/>} />
            <Route path='/' element={<Home/>} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return <InsulinCalculator baseline='120' correctionFactor='50' carbRatio='10' />;
}

function About() {
  return <>
        <h2>About</h2>
        <p>My original insulin calculator app was created when my daughter, Angel, was diagnosed with type 1 diabetes. I had that app side-loaded on my Android phone and used it to calculate the insulin she needed until she upgraded to a PDM and pump. The original app was HTML, CSS, and vanilla Javascript in an Android webview.</p>
        <p>This version was built using ReactJS as a learning exercise. The decimal.js library was used to make sure the math comes out as expected (floating-point math vs decimal math). The formulas were extracted from documentation provided by NationwideChildrens.org. (<a href="https://www.nationwidechildrens.org/family-resources-education/health-wellness-and-safety-resources/resources-for-parents-and-kids/managing-your-diabetes/chapter-seven-calculating-bolus-injections" target="_blank">link</a>)</p>
        <p>This app has not been verified by NationwideChildrens.org or any other medical professionals and should be used at your own risk.</p>
    </>;
}
