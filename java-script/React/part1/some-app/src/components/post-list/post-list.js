import React from "react";

import PostListItem from "../post-list-item";

import "./post-list.css";

const PostList = ({ posts }) => {
	const elements = posts.map((item) => {

        const  {id, ...allPropsExceptID} = item;//id="a1"; {label: "Going to learn React",important: true}

		return (
			<li className="list-group-item" key={id}>
				<PostListItem
					// label={item.label}
					// important={item.important}
                    {...allPropsExceptID}
				/>
			</li>
		);
	});

	return (
		<ul className="app-list list-group">
			{/* <PostListItem label={posts[0].label} important={posts[0].important} /> */}
            {elements}
			{/* <PostListItem label="Going to learn React" important/>
            <PostListItem label="Start learning"/>
            <PostListItem label="Strange, but intresting sintax"/> */}
		</ul>
	);
};
export default PostList;
