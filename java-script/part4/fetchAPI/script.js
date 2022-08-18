"use strict";

const url1 = "https://jsonplaceholder.typicode.com/posts/1",
	dataToSend = { someVar: "Example" },
	url2 = "https://jsonplaceholder.typicode.com/posts/";

//GET
fetch(url1)
	.then((response) => {
		return response.json();
	})
	.then((myJson) => console.log(myJson));

//POST
fetch(url2, {
	method: "POST",
	body: JSON.stringify(dataToSend),
	headers: {
		"Content-type": "application/json",
	},
})
	.then((response) => {
		return response.json();
	})
	.then((myJson) => console.log("success ", myJson))
	.catch((err) => console.log("failed ", err));

//custom function using fetch
const getResource = async (url) => {
	const result = await fetch(url);
	if (!result.ok) {
		throw new Error(`could not fetch ${url}, status: ${result.status}`);
	}
	const resp = await result.json();
	return resp;
};

getResource(url1)
	.then((response) => console.log("getResource success ", response))
	.catch((err) => console.log("getResource failed ", err));

//########### использование класса для получения ресурсов из  реального сервера

class GoTService {
	constructor(){
		this._apiBase="https://anapioficeandfire.com/api";
	}
	async getRes(url) {
		const response = await fetch(`${this._apiBase}${url}`);

		if (!response.ok) {
			throw new Error(`could not fetch ${url}, status: ${response.status}`);
		}

		return await response.json();
	}
	getAllCharacters() {
		return this.getRes(
			"/characters?page=5&pageSize=10"
		);
	}
	getCharacter(id) {
		return this.getRes(
			`/characters/${id}`
		);
	}
}

const exemplarOfGotService = new GoTService();
exemplarOfGotService.getAllCharacters().then((response) => {
	console.log(
		"exemplarOfGotService",
		response);
	response.forEach((element) => {console.log(element.name)})
});

exemplarOfGotService
	.getCharacter(120)
	.then((response) => console.log("exemplarOfGotService", response));
