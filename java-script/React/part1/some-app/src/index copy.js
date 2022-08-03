import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
import reportWebVitals from "./reportWebVitals";

// const elem1 = React.createElement("h2",null,"some text");//преобразованием кода ниже в такой код занимается babel автоматически
// const elem1 = <h2>Hello</h2>;
// const elem2 = <div></div>;

const Header = () => {
	return <h2>hello</h2>;
};
const Field = () => {
	const holder = "enter your login here";
	const styledField = {
		width: "300px",
	};
	return (
		<input
			style={styledField}
			type="text"
			placeholder={holder}
			autoComplete=""
			className="first"
		/>
	);
};
const Btn = () => {
	const textForBtn = "Login"; //для вызова: {textForBtn}
	// const res = ()=>{
	//   return "Log in now"
	// }//для вызова: {res()}
	// const paragraph = <p>log in</p>//для вызова: {p}
	const logged = false;
	return <button>{logged ? "enter" : textForBtn}</button>;
};
const MyApp = () => {
	return (
		<div>
			<Header />
			<Field />
			<Btn />
		</div>
	);
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<MyApp />
	// <React.StrictMode>
	//   <App />
	// </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
