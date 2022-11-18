import React from "react"
import Home from './components/home'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Details from "./components/details";
export default function App() {
	return (
		<Router>
		<div>
			<Routes>
				<Route exact path="/" element={<Home/>}/>
				<Route exact path="/:ccn3" element={<Details/>}/>
			</Routes>
		</div>
		</Router>
	);
}
