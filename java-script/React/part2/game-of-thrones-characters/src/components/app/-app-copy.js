import { Outlet, Link, Routes, Route } from "react-router-dom";
import Invoices from "./-invoices";
import Invoice from "./-invoice";
import Expenses from "./-expenses";

export default function App() {
	return (
		<Routes>
			<Route
				path="/"
				element={
					<div>
						<h1>Bookkeeper</h1>
						<nav
							style={{
								borderBottom: "solid 1px",
								paddingBottom: "1rem",
							}}
						>
							<Link to="/invoices">Invoices</Link> {" | "}
							<Link to="/expenses">Expenses</Link>
						</nav>

						<Outlet />
					</div>
				}
			>
				<Route path="/expenses" element={<Expenses />} />
				<Route path="/invoices" element={<Invoices />} />

				<Route
					index
					element={
						<main style={{ padding: "1rem" }}>
							<p>Select an invoice</p>
						</main>
					}
				/>
				<Route path="invoices/:invoiceId" element={<Invoice />} />
			</Route>
		</Routes>
	);
}
