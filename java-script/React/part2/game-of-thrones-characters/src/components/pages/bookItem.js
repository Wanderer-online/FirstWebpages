import React, { useState } from "react";
import GoTService from "../../services/GOT-service";
import ItemDetails from "../itemDetails/itemDetails";
import { Field } from "../itemDetails/itemDetails";
import {useParams, useLocation, useHistory, matchPath} from "react-router-dom"



// const match = matchPath("/");


export default function  BookItem  () {
	const getService = new GoTService();
	// getService.getBook(3).then((response) => console.log("a = getService", response));

	// const [stateVar, changeStateFnc] = useState("3");
	const {idOfBook: bookID} = useParams();

	// console.log("bookID", bookID);


        // console.log("Match", match);
		return(
		<ItemDetails
			itemID={bookID}
			getItemData={async (bookID)=> await getService.getBook(parseInt(bookID))}
		>
			<Field field="numberOfPages" label="Number of pages" />
			<Field field="released" label="Released" />
			<Field field="publisher" label="Publisher" />
		</ItemDetails>)

}
