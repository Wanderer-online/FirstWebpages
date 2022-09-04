import React, { Component } from "react";
import "./itemList.css";
// import GoTService from "../../services/GOT-service";
import GOTSpinner from "../spinner/spinner";

export default class ItemList extends Component {
	// getService = new GoTService();

	state = {
		itemList: null,
	};
	componentDidMount() {
		const { getData } = this.props;
		//41+i

		// this.getService.getAllCharacters().then((response) => {
		getData().then((response) => {
			this.setState({ itemList: response });
		});
	}

	renderItems(arr) {
		return arr.map((item, i) => {
			const label = this.props.renderItemName(item);

			return (
				<li
					key={item.name + i}
					className="list-group-item"
					onClick={() =>
						this.props.onElementSelected(
							this.props.startCounter
								? this.props.startCounter + i
								: i+1
						)
					}
				>
					{/* {console.log(item)} */}
					{label}
				</li>
			);
		});
	}

	render() {
		// console.log("itemList ",this.state.itemList);
		const { itemList } = this.state;

		if (!itemList) {
			return <GOTSpinner />;
		}

		return (
			<ul className="item-list list-group">
				{this.renderItems(itemList)}
				{/* <li className="list-group-item">John Snow</li>
				<li className="list-group-item">Brandon Stark</li>
				<li className="list-group-item">Geremy</li> */}
			</ul>
		);
	}
}
