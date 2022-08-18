class GoTService {
	constructor() {
		this._apiBase = "https://anapioficeandfire.com/api";
	}
	async getRes(url) {
		const response = await fetch(`${this._apiBase}${url}`);

		if (!response.ok) {
			throw new Error(`could not fetch ${url}, status: ${response.status}`);
		}

		return await response.json();
	}
	getAllCharacters() {
		return this.getRes("/characters?page=5&pageSize=10");
	}
	getCharacter(id) {
		return this.getRes(`/characters/${id}`);
	}

	getAllBooks(){
		return this.getRes("/books");
	}
	getBook(id) {
		return this.getRes(`/books/${id}`);
	}
	
	getAllHouses(){
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
