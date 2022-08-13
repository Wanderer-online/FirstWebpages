import React, { Component } from "react";

import "./app-header.css";

import styledComponent from "styled-components";

const AppHeaderDiv = styledComponent.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
        h1 {
        color: ${(props) => (props.colored ? "#2c8fff" : "red")};
        font-size: 26px;
            :hover{
                color:blue;
                cursor:default;
            }
        }

        h2 {
            font-size: 1.2rem;
            color: grey;
        }
`;

class AppHeader extends Component {

	render() {
        const {totalCount,likedCount} = this.props;
		return (
			// <div className="app-header d-flex">
			<AppHeaderDiv colored as="span">
				<h1>Alex Brodianoy</h1>
				<h2>{totalCount} records, liked {likedCount}</h2>
			</AppHeaderDiv>
		);
	}
}
export default AppHeader;
