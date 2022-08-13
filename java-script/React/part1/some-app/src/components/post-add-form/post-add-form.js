import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./post-add-form.css";

class PostAddForm extends React.Component {
	// keyHandle = (event)=>{
	// 	const { onAddPost}= this.props;
	// 	if (event.keyCode === 13){
	// 		onAddPost();
	// 	}
	// }

	state = { newPostText: "" };

	onChangeNewPostText = (event) => {
		this.setState({ newPostText: event.target.value });
	};

	addPost = (e) => {
		e.preventDefault();
		this.props.onAddPost(this.state.newPostText);
		this.setState({ newPostText: "" });
	};
	render() {
		// const { onAddPost } = this.props;
		return (
			<Form onSubmit={this.addPost}>
				<Form.Group className="bottom-panel d-flex">
					<Form.Control
						type="text"
						placeholder="What's on your mind?"
						className="form-control new-post-label"
						value={this.state.newPostText}
						onChange={this.onChangeNewPostText}
						// onKeyDown={this.keyHandle}
					/>
					<Button
						variant="outline-primary"
						type="submit"
						// onClick={() => onAddPost()}
					>
						Add post
					</Button>
					{/* <Form.Control type="submit" className="btn btn-outline-secondary">Add post</Form.Control> */}
				</Form.Group>
			</Form>
			// <form className="bottom-panel d-flex">
			// 	<input
			// 		type="text"
			// 		placeholder="What's on your mind?"
			// 		className="form-control new-post-label"
			// 	/>
			// 	<button type="submit" className="btn btn-outline-secondary">
			// 		Add post
			// 	</button>
			// </form>
		);
	}
}
export default PostAddForm;
