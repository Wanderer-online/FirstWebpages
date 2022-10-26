import React, { Component } from "react";
import "./randomChar.css";
import GoTService from "../../services/GOT-service";
import GOTSpinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/errorMessage";
import PropTypes from "prop-types"

export default class RandomChar extends Component {
	state = {
		character: {},
		loading: true,
		error: false,
	};

	getService = new GoTService();

	onCharacterLoaded = (character) => {
		this.setState({ character, loading: false });
	};

	onError = (err) => {
		this.setState({ error: true, loading: false });
		console.error(err);
	};

	updateCharacter = () => {
		const id = Math.floor(Math.random() * 140 + 25); //начинается с 25 и заканчивается 165
		this.getService
			.getCharacter(id)
			.then(this.onCharacterLoaded)
			.catch(this.onError);
	};

	componentDidMount() {
		this.updateCharacter(); //при создании инстанса этого класса сразу будет вызван его метод updateCharacter()
		this.randomCharacterUpdateInterval = setInterval(
			this.updateCharacter,
			this.props.updateInterval
		); //без переданного updateInterval функция будет срабатывать слишком часто!
	}
	componentWillUnmount = () => {
		clearInterval(this.randomCharacterUpdateInterval);
	};
	componentDidUpdate() {}

	render() {
		const { character, loading, error } = this.state;

		//Если идет загрузка - вернуть spinner, если нет - вернуть основной контент
		const spinner = loading ? <GOTSpinner /> : null;
		const errMessage = error ? (
			<ErrorMessage
				messageStr={
					"Encountered some error while try to get data from server"
				}
			/>
		) : null;
		//Если есть ошибка или идет загрузка - выводит сообщение об ошибке,
		const mainContent = !(loading || error) ? (
			<MainContent char={character} />
		) : (
			errMessage
		);

		return (
			<div className="random-block rounded mb-4">
				{spinner}
				{mainContent}
			</div>
		);
	}
}

const MainContent = ({ char }) => {
	const { name, gender, born, died, culture } = char;
	return (
		<>
			<h4>Random Character: {name}</h4>
			<ul className="list-group list-group-flush">
				<li className="list-group-item d-flex justify-content-between">
					<span className="term">Gender </span>
					<span>{gender}</span>
				</li>
				<li className="list-group-item d-flex justify-content-between">
					<span className="term">Born </span>
					<span>{born}</span>
				</li>
				<li className="list-group-item d-flex justify-content-between">
					<span className="term">Died </span>
					<span>{died}</span>
				</li>
				<li className="list-group-item d-flex justify-content-between">
					<span className="term">Culture </span>
					<span>{culture}</span>
				</li>
			</ul>
		</>
	);
};

RandomChar.defaultProps = {
	updateInterval: 15000,
};

RandomChar.propTypes = {
	// updateInterval: (props, propName, ComponentName) => {
	// 	// props - список всех свойств
	// 	// propName - имя желаемого свойства
	// 	// ComponentName - имя компонента
	// 	const val = props[propName];
	// 	if (typeof val === "number" && isNaN(val)) {
	// 		return null;
	// 	}
	// 	else{
	// 		return console.error(`${ComponentName} : ${propName} must be a number`)
	// 	}
	// },
	updateInterval: PropTypes.number
};
