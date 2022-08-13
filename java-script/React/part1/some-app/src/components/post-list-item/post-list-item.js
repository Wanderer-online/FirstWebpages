import React, { Component } from "react";

import "./post-list-item.sass";

class PostListItem extends Component {
	// constructor(properties) {
	// 	super(properties);
	// 	this.state = { important: false };
	// 	this.state = { liked: false };
	// }

	//дополнительные скобки после => нужны для соответствия форматированию jsx - результат должен быть в ()
	// onImportant = () => {
	// 	this.setState(({ important }) => ({
	// 		//{important}===state.important
	// 		important: !important,
	// 	}));
	// 	// console.log(this.state.important);
	// };
	// onLike = () => {
	// 	this.setState(({ liked }) => ({
	// 		//{important}===state.important
	// 		liked: !liked,
	// 	}));
	// 	// console.log(this.state.important);
	// };

	render() {
		const {
			label,
			onDeletePostListItem,
			important,
			liked,
			onLikeSet,
			onImportantSet,
		} = this.props; //достаем из переданных аргументов
		// const { important, liked } = this.state;//достаем из объекта хранящего состояние данного элемента
		// console.log(important, liked);
		let namesOfClasses = "app-list-item d-flex justify-content-between";
		if (important) {
			namesOfClasses += " important";
		}
		if (liked) {
			namesOfClasses += " like";
		}
		return (
			<div className={namesOfClasses}>
				<span className="app-list-item-label" onClick={onLikeSet}>
					{label}
				</span>
				<div className="d-flex justify-content-center align-items-center">
					<button
						type="button"
						className="btn-star btn-sm"
						onClick={onImportantSet}
					>
						<i className="bi bi-star"></i>
					</button>
					<button
						type="button"
						className="btn-trash btn-sm"
						onClick={onDeletePostListItem}
					>
						<i className="bi bi-trash3"></i>
					</button>
					<i className="bi bi-heart-fill"></i>
				</div>
			</div>
		);
	}
}

export default PostListItem;
