import React, { Component } from "react";
import "./charDetails.css";
import GoTService from "../../services/GOT-service";

const Field = ({ element, field, label }) => {
	//element - это объект
	//element[field] - обращение к объекту типа element.name если field= "name"
	// console.log(element.name);
	return (
		<li className="list-group-item d-flex justify-content-between">
			<span className="term">{label}</span>
			<span>{element[field]}</span>
		</li>
	);
};
export { Field };

export default class CharDetails extends Component {
	getService = new GoTService();

	state = {
		element: null,
	};

	componentDidMount() {
		this.updateCharacter();
	}

	updateCharacter() {
		const { charID } = this.props;
		// console.log("id ", charID);
		if (!charID) {
			return;
		}
		this.getService.getCharacter(charID).then((response) => {
			this.setState({ element: response });
		});

		// сгенерировать ошибку
		// this.a.b=0;
	}

	componentDidUpdate(prevProps) {
		if (this.props.charID !== prevProps.charID) {
			this.updateCharacter();
		}
	}

	render() {
		if (!this.state.element) {
			return <span className="select-error">Select a element</span>;
		}

		// console.log(this.state.element);
		const { name, gender, born, died, culture } = this.state.element;

		return (
			<div className="char-details rounded">
				<h4>{name}</h4>
				<ul className="list-group list-group-flush">
					{/* компоненты нельзя менять, но их можно клонировать и уже клоны модифицировать как угодно: */}
					{React.Children.map(this.props.children, (child) => {
						return React.cloneElement(child, {
							element: this.state.element,
						});
					})}
					{/* <li className="list-group-item d-flex justify-content-between">
						<span className="term">Gender</span>
						<span>{gender}</span>
					</li>
					<li className="list-group-item d-flex justify-content-between">
						<span className="term">Born</span>
						<span>{born}</span>
					</li>
					<li className="list-group-item d-flex justify-content-between">
						<span className="term">Died</span>
						<span>{died}</span>
					</li>
					<li className="list-group-item d-flex justify-content-between">
						<span className="term">Culture</span>
						<span>{culture}</span>
					</li> */}
				</ul>
			</div>
		);
	}
}
