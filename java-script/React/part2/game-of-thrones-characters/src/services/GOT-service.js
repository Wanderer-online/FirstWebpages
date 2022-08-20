class GoTService {
	constructor() {
		this._apiBase = "https://anapioficeandfire.com/api";
	}
	async getRes(url) {
		const response = await fetch(`${this._apiBase}${url}`);

		if (!response.ok) {
			throw new Error(
				`could not fetch ${url}, status: ${response.status}`
			);
		}

		return await response.json();
	}

	_transformCharacter(character) {
		return {
			name: this._checkIfEmpty(character.name),
			gender: this._checkIfEmpty(character.gender),
			born: this._checkIfEmpty(character.born),
			died: this._checkIfEmpty(character.died),
			culture: this._checkIfEmpty(character.culture),
		};
	}

	_transformHouse(house) {
		return {
			name: this._checkIfEmpty(house.name),
			region: this._checkIfEmpty(house.region),
			// founded: house.founded,
			// founder: house.founder,
			// diedOut: house.diedOut,
			// swornMembers: house.swornMembers,
			ancestralWeapons: this._checkIfEmpty(house.ancestralWeapons),
			titles: this._checkIfEmpty(house.titles),
			words: this._checkIfEmpty(house.words),
			overlord: this._checkIfEmpty(house.overlord),
		};
	}

	_transformBook(book) {
		return {
			name: this._checkIfEmpty(book.name),
			// authors: book.authors,
			numberOfPages: this._checkIfEmpty(book.numberOfPages),
			released: this._checkIfEmpty(book.released),
			publiser: this._checkIfEmpty(book.publiser),
		};
	}

	_checkIfEmpty(inpString) {
		if (inpString === "") {
			return "- not found in DataBase";
		} else {
			return inpString;
		}
	}

	async getAllCharacters() {
		const result = await this.getRes("/characters?page=5&pageSize=10");
		return result.map((val) => {
			return this._transformCharacter(val);
		});
	}
	async getCharacter(id) {
		const result = await this.getRes(`/characters/${id}`);
		return this._transformCharacter(result);
	}

	getAllBooks() {
		return this.getRes("/books");
	}
	getBook(id) {
		return this.getRes(`/books/${id}`);
	}

	getAllHouses() {
		return this.getRes("/houses");
	}
	getHouse(id) {
		return this.getRes(`/houses/${id}`);
	}
	//дома и книги
}

const exemplarOfGotService = new GoTService();
exemplarOfGotService.getAllCharacters().then((response) => {
	console.log("exemplarOfGotService", response);
	response.forEach((element) => {
		console.log(element.name);
	});
});

exemplarOfGotService
	.getCharacter(120)
	.then((response) => console.log("exemplarOfGotService", response));

export default GoTService;
