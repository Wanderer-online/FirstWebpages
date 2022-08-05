import React from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import PostStatusFilter from "../post-status-filter";
import PostList from "../post-list";
import PostAddForm from "../post-add-form";

import "./app.css";

const App = () => {
	const dataFromServer = [
		{
			label: "Going to learn React",
			important: true,
			id: "a1"
		},
		{
			label: "Start learning",
			important: false,
			id: "a2"
		},
		{
			label: "Strange, but intresting sintax",
			important: false,
			id: "a3"
		}
	];

	return (
		<div className="app">
			<AppHeader />
			<div className="search-panel d-flex">
				<SearchPanel />
				<div className=" d-flex">
					<PostStatusFilter />
				</div>
			</div>

			<PostList posts={dataFromServer}/>
			<PostAddForm />
		</div>
	);
};

export default App;
