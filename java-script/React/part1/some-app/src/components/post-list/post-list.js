import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

import PostListItem from "../post-list-item";

import "./post-list.css";

const PostList = ({ posts, onDeletePostListItem, onLikeSet, onImportantSet }) => {
	const elements = posts.map((item) => {
		const { id, ...allPropsExceptID } = item; //id="a1"; {label: "Going to learn React",important: true}

		return (
			<ListGroup.Item key={id}>
				<PostListItem
					// label={item.label}
					// important={item.important}
					{...allPropsExceptID}
					onDeletePostListItem={()=>onDeletePostListItem(id)}
					onLikeSet={()=>{onLikeSet(id)}}
					onImportantSet={()=>onImportantSet(id)}
				/>
			</ListGroup.Item>
			// <li className="list-group-item" key={id}>
			// 	<PostListItem
			// 		// label={item.label}
			// 		// important={item.important}
			// 		{...allPropsExceptID}
			// 	/>
			// </li>
		);
	});

	return (
		<ListGroup className="app-list">{elements}</ListGroup>

		// <ul className="app-list list-group">
		// 	{/* <PostListItem label={posts[0].label} important={posts[0].important} /> */}
		//     {elements}

		// 	{/* <PostListItem label="Going to learn React" important/>
		//     <PostListItem label="Start learning"/>
		//     <PostListItem label="Strange, but intresting sintax"/> */}
		// </ul>
	);
};
export default PostList;
