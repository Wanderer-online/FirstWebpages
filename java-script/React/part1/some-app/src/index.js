import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
//если webpack-у не указать в import имя импортируемого js файла, а только папку, то он будет искать в ней index.js
import App from "./components/app"


// const elem1 = React.createElement("h2",null,"some text");//преобразованием кода ниже в такой код занимается babel автоматически
// const elem1 = <h2>Hello</h2>;
// const elem2 = <div></div>;


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<App />
	// <React.StrictMode>
	//   <App />
	// </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
