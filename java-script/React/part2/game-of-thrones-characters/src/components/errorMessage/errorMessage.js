import React from "react";
import "./errorMessage.css";
import errImg from "./error-army.jpg";
const ErrorMessage = ({messageStr}) => {
	//Encountered some error while try to get data from server

	return (
		<div className="err-container">
			<img src={errImg} alt="error" />
			<p>{messageStr?messageStr:"Encountered some error"}, can't resist the darkness...</p>
		</div>
	);
};
export default ErrorMessage;
