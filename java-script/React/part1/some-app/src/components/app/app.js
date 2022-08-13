import React, { Component } from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import PostStatusFilter from "../post-status-filter";
import PostList from "../post-list";
import PostAddForm from "../post-add-form";

import "./app.css";
import styledComponent from "styled-components";

const AppBlockDiv = styledComponent.div`
margin: 0 auto;
max-width: 800px;
`;
const AppBlockDivWithAdditionalStyles = styledComponent(AppBlockDiv)`
background-color:ghostwhite;
`;

// const App = () => {
class App extends Component {
	state = {
		dataFromServer: [
			{
				label: "Going to learn React",
				important: false,
				id: "a1",
				liked: false,
			},
			{
				label: "Start learning",
				important: false,
				id: "a2",
				liked: false,
			},
			{
				label: "Strange, but intresting sintax",
				important: false,
				id: "a3",
				liked: false,
			},
		],
		// newPostText: "",
		searchString: "",
		// likedPostsCounter: 0,
		filterType: "all",
	};

	minID = 4;

	deleteItem = (id) => {
		this.setState(({ dataFromServer }) => {
			const index = dataFromServer.findIndex((elem) => elem.id === id);
			const firstPartOfSplit = dataFromServer.slice(0, index);
			const secondPartOfSplit = dataFromServer.slice(index + 1);
			const joinedParts = [...firstPartOfSplit, ...secondPartOfSplit];

			//нельзя (по правилам) менять напрямую state
			// dataFromServer.splice(index,1);// вырезает 1 ненужный элемент из массива... но это мутирует исходный массив!
			return { dataFromServer: joinedParts };
		});
	};

	// onChangeNewPostText = (inputedText) => {
	// 	this.setState(({ newPostText }) => {
	// 		const someTemp = inputedText;
	// 		return { newPostText: someTemp };
	// 	});
	// };

	addItem = (newPostText) => {
		this.setState(({ dataFromServer }) => {
			if (newPostText !== "") {
				const newItemToAdd = {
					label: newPostText,
					important: false,
					id: "a" + this.minID++,
					liked: false,
				};
				const joinedParts = [...dataFromServer, newItemToAdd];
				return { dataFromServer: joinedParts, newPostText: "" };
			}
		});
	};

	likeSet = (id) => {
		this.setState((prevState) => {
			//prevState = this.state
			const postIndex = prevState.dataFromServer.findIndex((elem) => {
				return elem.id === id;
			});

			// решение тренера
			// const old = prevState.dataFromServer[postIndex];
			// const newItem = {...old, like: !old.like}//в newItem будет все то же, что и в old, но 1 свойство будет изменено
			// const firstPartOfSplit = prevState.dataFromServer.slice(0, postIndex);
			// const secondPartOfSplit = prevState.dataFromServer.slice(postIndex + 1);
			// const joinedParts = [...firstPartOfSplit, newItem, ...secondPartOfSplit];
			// return {dataFromServer:joinedParts};

			const safePostsVar = [...prevState.dataFromServer];
			safePostsVar[postIndex].liked = !safePostsVar[postIndex].liked;
			// const likedCounter = prevState.dataFromServer.filter(
			// 	(item) => item.liked
			// ).length;
			console.log(id);
			return {
				dataFromServer: safePostsVar,
				// likedPostsCounter: likedCounter,
			};
		});
	};
	importantSet = (id) => {
		this.setState((prevState) => {
			//prevState = this.state
			const postIndex = prevState.dataFromServer.findIndex((elem) => {
				return elem.id === id;
			});
			const safePostsVar = [...prevState.dataFromServer];
			safePostsVar[postIndex].important =
				!safePostsVar[postIndex].important;
			console.log(id);
			return { dataFromServer: safePostsVar };
		});
	};

	onSearchUpdate = (str) => {
		this.setState({ searchString: str });
	};
	onSearch(inpArray, strToFind) {
		if (strToFind.length === 0) {
			return inpArray;
		} else {
			return inpArray.filter((item) => {
				//фильтр проходится по всем элементам массива
				return (
					item.label.toLowerCase().indexOf(strToFind.toLowerCase()) >
					-1
				); //если в свойстве элемента массива label есть strToFind - значение будет не -1 и элемент
			});
		}
	}

	filterPosts(postsArray, filter) {
		if (filter === "liked") {
			return postsArray.filter((item) => item.liked === true);
		} else if (filter === "all") {
			return postsArray;
		}
	}

	onFilterSet = (filter) =>{
		this.setState({filterType:filter })
	}

	render = () => {
		// const {filterType, dataFromServer, searchString} = this.setState;
		const likedPosts = this.state.dataFromServer.filter(
			(item) => item.liked
		);
		//сначала ищем совпадения со строкой поиска, потом еще и фильтруем результат по указанному фильтру
		const visiblePosts = this.filterPosts(
			this.onSearch(this.state.dataFromServer, this.state.searchString), this.state.filterType
		);

		return (
			<AppBlockDivWithAdditionalStyles>
				<AppHeader
					totalCount={this.state.dataFromServer.length}
					likedCount={likedPosts.length}
				/>
				<div className="search-panel d-flex">
					<SearchPanel onSearchStart={this.onSearchUpdate} />
					<div className=" d-flex">
						<PostStatusFilter onFilter={this.onFilterSet} filter={this.state.filterType}/>
					</div>
				</div>

				<PostList
					//добавить здесь if
					//text.search("blue"); -1 if no match.

					posts={visiblePosts}
					// posts={this.state.dataFromServer}
					onDeletePostListItem={this.deleteItem}
					onLikeSet={this.likeSet}
					onImportantSet={this.importantSet}
				/>
				<PostAddForm
					onAddPost={this.addItem}
					// onChangeNewPostText={this.onChangeNewPostText}
					// formValue={this.state.newPostText}
				/>
				<br/>
				<h4>Описание:</h4>
				<p> "Посты" можно:</p>
				<ul>
					<li>"Лайкнуть" щелкнув по тексту.</li>
					<li>Выделить цветом щелкнув по звездочке.</li>
					<li>Удалить щелкнув по корзине.</li>
					<li>Добавить, введя текст и нажав Enter или кнопку "Add post".</li>
					<li>Отфильтровать "лайкнутые" кнопками "All"/ "Favorites"</li>
					<li>Найти те, которые содержат текст введенный в строку поиска</li>
				</ul>
				<p> Сервера нет, так что при обновлении страницы все изменения слетают</p>
			</AppBlockDivWithAdditionalStyles>

		);
	};
}

export default App;
