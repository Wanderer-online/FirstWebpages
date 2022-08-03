import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
//если webpack-у не указать в import имя импортируемого js файла, а только папку, то он будет искать в ней index.js
import App from "./components/app"


// const elem1 = React.createElement("h2",null,"some text");//преобразованием кода ниже в такой код занимается babel автоматически
// const elem1 = <h2>Hello</h2>;
// const elem2 = <div></div>;


class WhoAmI extends Component {
	constructor(props){
		super(props);
		this.state = {
			years:26,
			nationality: "US"
		}
		this.nextYear = this.nextYear.bind(this);//привязка метода к создаваемому объекту, чтобы контекст вызова метода был равен создаваемому объекту
		//либо так:
		// this.nextYear = ()=>{//стрелочная функция сохраняет контекст вызова родителя
		// 	this.setState(state=>({
		// 		years: ++state.years
		// 	}))
		// }

	}
	nextYear(){
		//неверный способ! this.state.years++
		this.setState(state=>({
			years: ++state.years
		}))
	}
	render(){
		const {name, surname,link} = this.props;
		const age = this.state.years;
		return (
			<>
			<button onClick={this.nextYear}>++</button>
			<h1>My name is {name}, surname - {surname}, age - {age}</h1>
			<a href={link}>My profile</a>
			<br/>
			</>
		)
	}
}


const All=()=>{
	return (
		<>
		<WhoAmI name="Sam" surname="Johnes" link="google.com"/>
		<WhoAmI name="Jack" surname="O'Neil" link="google.com"/>
		<WhoAmI name="Daniel" surname="Jackson" link="google.com"/>
		</>
	)
}


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<All />
	// <React.StrictMode>
	//   <App />
	// </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
