import React, { Component } from "react";
import ItemList from "../../itemList";
import ItemDetails, {Field} from "../../itemDetails";
import GoTService from "../../../services/GOT-service";
import ErrorMessage from "../../errorMessage/errorMessage";
import RowBlock from "../../rowBlock/rowBlock";

class HousePage extends Component {
	state = {
		selectedItem: 1,
		error: false,
	};

	getService = new GoTService();

	componentDidCatch() {
		console.log(
			"componentDidCatch have been raised by error on HousePage.js"
		);
		this.setState({ error: true });
	}

	//принимает индекс в массиве принятых от сервера 10-и персонажей
	onItemSelected = (index) => {
		this.setState({ selectedItem: index });
	};

	render() {
		if (this.state.error) {
			return (
				<ErrorMessage
					messageStr={
						"Encountered some error in HousePage module"
					}
				/>
			);
		}

		const itemsList = (
			<ItemList
				onElementSelected={this.onItemSelected}
				getData={this.getService.getAllHouses}
				renderItemName={(item) => `${item.name} (${item.region})`}
			/>
		);

		const houseDetails = (
			<ItemDetails itemID={this.state.selectedItem} getItemData={this.getService.getHouse}>
                <Field field="region" label="Region"/>
                <Field field="ancestralWeapons" label="Ancestral weapons"/>
                <Field field="titles" label="Titles"/>
                <Field field="words" label="Words"/>
                <Field field="overlord" label="Overlord"/>
            </ItemDetails>
		);

		return <RowBlock leftPart={itemsList} rightPart={houseDetails} />;
	}
}

export default HousePage;
