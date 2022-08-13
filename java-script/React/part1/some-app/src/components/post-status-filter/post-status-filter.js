import React from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

import "./post-status-filter.css";

class PostStatusFilter extends React.Component {
	state = {
		buttons: [
			{ name: "all", label: "All" },
			{ name: "liked", label: "Favorites" },
		],
	};
	render() {
		const { onFilter } = this.props;

		const allButtons = this.state.buttons.map(({ name, label }) => {
			const active = this.props.filter === name;
            const clazz = active? "primary":"outline-secondary";
			return (
				<Button
					key={name}
					variant={clazz}
					onClick={() => {
						onFilter( name );
					}}
				>
					{label}
				</Button>
			);
		});
		return (
			<ButtonGroup>{allButtons}</ButtonGroup>

			// <ButtonGroup>
			//     <Button variant="primary" onClick={()=>{onFilter("all")}}>All</Button>
			//     <Button variant="outline-secondary" onClick={()=>{onFilter("liked")}}>Favorites</Button>
			// </ButtonGroup>
			//или
			//  <div className="btn-group">
			// <button type="button" className="btn btn-info">All</button>
			// <button type="button" className="btn btn-outline-secondary">Favorites</button>
			// </div>
		);
	}
}
export default PostStatusFilter;
