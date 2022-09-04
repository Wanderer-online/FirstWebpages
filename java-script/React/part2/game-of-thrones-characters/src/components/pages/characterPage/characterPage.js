import React, { Component } from "react";
import ItemList from "../../itemList";
import ItemDetails, {Field} from "../../itemDetails";
import GoTService from "../../../services/GOT-service";
import ErrorMessage from "../../errorMessage/errorMessage";
import RowBlock from "../../rowBlock/rowBlock";

class CharacterPage extends Component {
	state = {
		selectedItem: 130,
		error: false,
	};

	getService = new GoTService();

	componentDidCatch() {
		console.log(
			"componentDidCatch have been raised by error on characterPage.js"
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
						"Encountered some error in CharacterPage module"
					}
				/>
			);
		}

		const itemsList = (
			<ItemList
				onElementSelected={this.onItemSelected}
				getData={this.getService.getAllCharacters}
				renderItemName={(item) => `${item.name} (${item.gender})`}
				startCounter={41}
			/>
		);

		const characterDetails = (
			<ItemDetails itemID={this.state.selectedItem} getItemData={this.getService.getCharacter}>
                <Field field="gender" label="Gender"/>
                <Field field="born" label="Born"/>
                <Field field="died" label="Died"/>
                <Field field="culture" label="Culture"/>
            </ItemDetails>
		);

		return <RowBlock leftPart={itemsList} rightPart={characterDetails} />;
	}
}

export default CharacterPage;
