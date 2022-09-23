import React, { useState } from "react";
import ItemList from "../itemList";
import ItemDetails, {Field} from "../itemDetails";
import GoTService from "../../services/GOT-service";
import ErrorMessage from "../errorMessage/errorMessage";
import RowBlock from "../rowBlock/rowBlock";
import {Outlet, useNavigate} from "react-router-dom"
import { createBrowserHistory } from "history";

// error= false, selectedItem:
function  BookPage () {
	let [error, errorChangeFnc] = useState("false");
	// let [stateVar, stateChangeFnc] = useState("1");
	// console.log("stateVar",stateVar);

	const getService = new GoTService();


	const browserHistory = createBrowserHistory();
	// console.log("history",history);
	// history.go("/")

	const navigate = useNavigate();


	// function componentDidCatch() {
	// 	console.log(
	// 		"componentDidCatch have been raised by error on BookPage.js"
	// 	);
	// 	this.setState({ error: true });
	// }

	//принимает индекс в массиве принятых от сервера 10-и персонажей
	// const onItemSelected = (index) => {
	// 	this.setState({ selectedItem: index });
	// };
	// const onItemSelected = (index) => {
	// 	stateChangeFnc( stateVar = index );
	// };


		// if (this.state.error) {
		// 	return (
		// 		<ErrorMessage
		// 			messageStr={
		// 				"Encountered some error in BookPage module"
		// 			}
		// 		/>
		// 	);
		// }

		const itemsList = (

			<>
			<ItemList
				// onElementSelected={onItemSelected}
				onElementSelected={
					(IDofBookInList)=>{navigate(`/books/${IDofBookInList}`); console.log("navigated")}
				}
				getData={getService.getAllBooks}
				renderItemName={(item) => `${item.name} (${item.numberOfPages})`}
			/>
			<Outlet/>
			</>
		);
		// const bookDetails = (
		// 	<ItemDetails itemID={stateVar.selectedItem} getItemData={getService.getBook}>
        //         <Field field="numberOfPages" label="Number of pages"/>
        //         <Field field="released" label="Released"/>
        //         <Field field="publisher" label="Publisher"/>
        //     </ItemDetails>
		// );

		// return <RowBlock leftPart={itemsList} rightPart={bookDetails} />;
		return itemsList;

}

export default BookPage;
