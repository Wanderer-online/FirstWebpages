import React, { Component } from "react";
import "./itemList.css";
// import GoTService from "../../services/GOT-service";
import GOTSpinner from "../spinner/spinner";
import PropTypes from "prop-types";

function ItemList(props) {
	// getService = new GoTService();
	console.log(props);
	const renderItems = (arr) => {
		return arr.map((item, i) => {
			const label = props.renderItemName(item);

			return (
				<li
					key={item.name + i}
					className="list-group-item"
					onClick={() =>
						props.onElementSelected(
							props.startCounter ? props.startCounter + i : i + 1 //сделано для того чтобы персонажи начинались с 41-го, а не первого
						)
					}
				>
					{/* {console.log(item)} */}
					{label}
				</li>
			);
		});
	};

	return (
		<ul className="item-list list-group">
			{renderItems(props.itemList)}
			{/* <li className="list-group-item">John Snow</li>
				<li className="list-group-item">Brandon Stark</li>
				<li className="list-group-item">Geremy</li> */}
		</ul>
	);
}

ItemList.defaultProps = {
	onElementSelected: () => {
		console.log("onElementSelected placeholder, check ItemList props");
	},
};
ItemList.propTypes = {
	onElementSelected: PropTypes.func,
};

const hocFunctionWithData = (ComponentNameToShow) => {
	return class extends React.Component {
		state = {
			data: null,
		};
		componentDidMount() {
			// console.log("hocFunction props: ", this.props); //hocFunction {startCounter: 41, onElementSelected: ƒ, getData: ƒ, renderItemName: ƒ}
			const { getData } = this.props;
			//41+i

			// this.getService.getAllCharacters().then((response) => {
			getData().then((response) => {
				this.setState({ data: response });
			});
		}
		render() {
			// console.log("data ",this.state.data);
			const { data } = this.state;

			if (!data) {
				return <GOTSpinner />;
			}
			return <ComponentNameToShow {...this.props} itemList={data} />;
		}
	};
};

export default hocFunctionWithData(ItemList);
// export ItemList
