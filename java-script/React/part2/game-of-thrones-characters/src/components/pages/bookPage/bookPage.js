import React, { Component } from "react";
import ItemList from "../../itemList";
import ItemDetails, {Field} from "../../itemDetails";
import GoTService from "../../../services/GOT-service";
import ErrorMessage from "../../errorMessage/errorMessage";
import RowBlock from "../../rowBlock/rowBlock";

class BookPage extends Component {
	state = {
		selectedItem: 1,
		error: false,
	};

	getService = new GoTService();

	componentDidCatch() {
		console.log(
			"componentDidCatch have been raised by error on BookPage.js"
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
						"Encountered some error in BookPage module"
					}
				/>
			);
		}

		const itemsList = (
			<ItemList
				onElementSelected={this.onItemSelected}
				getData={this.getService.getAllBooks}
				renderItemName={(item) => `${item.name} (${item.numberOfPages})`}
			/>
		);

		const bookDetails = (
			<ItemDetails itemID={this.state.selectedItem} getItemData={this.getService.getBook}>
                <Field field="numberOfPages" label="Number of pages"/>
                <Field field="released" label="Released"/>
                <Field field="publisher" label="Publisher"/>
            </ItemDetails>
		);

		return <RowBlock leftPart={itemsList} rightPart={bookDetails} />;
	}
}

export default BookPage;
