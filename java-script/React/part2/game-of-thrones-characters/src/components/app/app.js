import React, { Component } from "react";
import { Col, Row, Container, Button } from "react-bootstrap";
import { Routes, Route, Outlet } from "react-router-dom";
import Header from "../header";
import RandomChar from "../randomChar";
import GoTService from "../../services/GOT-service";
import { CharacterPage } from "../pages";
import { HousePage } from "../pages";
import { BookPage } from "../pages";
import { BookItem } from "../pages";
import ErrorMessage from "../errorMessage/errorMessage";

class App extends Component {
	state = {
		randomCharVisible: true,

		error: false,
	};

	getService = new GoTService();

	componentDidCatch() {
		console.log("componentDidCatch have been raised by error on app.js");
		this.setState({ error: true });
	}

	toggleRandomChar = () => {
		this.setState(({ randomCharVisible }) => {
			const temp = !randomCharVisible;
			return { randomCharVisible: temp };
		});
	};

	//30:00

	render() {
		const { randomCharVisible, error } = this.state;

		if (error) {
			return (
				<ErrorMessage
					messageStr={"Encountered some error in main app module"}
				/>
			);
		}

		return (
			<>
				<Container>
					<Header />
				</Container>
				<Container>
					<Row>
						<Col lg={{ size: 5, offset: 0 }}>
							{randomCharVisible ? <RandomChar /> : null}
						</Col>
					</Row>
					<Button
						variant="dark"
						className="mb-4"
						onClick={this.toggleRandomChar}
					>
						{randomCharVisible
							? "Hide random character"
							: "Show random character"}
					</Button>
					<Outlet />
					<Routes>
						<Route path="/characters" element={<CharacterPage />} />
						<Route path="/houses" element={<HousePage />} />
						<Route path="/books" element={<BookPage />} />
						<Route path="/books/:idOfBook" element={<BookItem />} />
						<Route
							path="*"
							element={
								<main
									style={{ padding: "1rem", color: "white" }}
								>
									<p>There's not such page...</p>
								</main>
							}
						/>
					</Routes>

					{/* <CharacterPage />
						<BookPage />
						<HousePage /> */}
					{/* <Row>
					<Col md="6">
						<ItemList onElementSelected={this.onItemSelected}
									getData={this.getService.getAllBooks}
									/>
					</Col>
					<Col md="6">
						<CharDetails charID={this.state.selectedCharacter} />
					</Col>
				</Row>
				<Row>
					<Col md="6">
						<ItemList onElementSelected={this.onItemSelected}
									getData={this.getService.getAllHouses}
									/>
					</Col>
					<Col md="6">
						<CharDetails charID={this.state.selectedCharacter} />
					</Col>
				</Row> */}
				</Container>
			</>
		);
	}
}

export default App;
