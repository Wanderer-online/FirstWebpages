import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.css';
import "./index.css";
import reportWebVitals from "./reportWebVitals";
//если webpack-у не указать в import имя импортируемого js файла, а только папку, то он будет искать в ней index.js
import App from "./components/app"




const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<App />
	// <React.StrictMode>
	//   <App />
	// </React.StrictMode>
);


reportWebVitals();
