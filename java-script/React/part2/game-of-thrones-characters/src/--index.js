import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/app/-app-copy";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

import Expenses from "./components/app/-expenses";
import Invoices from "./components/app/-invoices";
import Invoice from "./components/app/-invoice";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
);
