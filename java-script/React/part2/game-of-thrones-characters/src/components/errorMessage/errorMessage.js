import React from "react";
import errImg from "./error-army.jpg";
const ErrorMessage = () => {
	return (
		<>
			<img src={errImg} alt="error" />
			<span>Encountered some error, can't resist the darkness...</span>
		</>
	);
};
export default ErrorMessage;
