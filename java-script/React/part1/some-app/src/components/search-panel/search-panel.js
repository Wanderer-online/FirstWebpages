import React from "react";
import Form from "react-bootstrap/Form";

import "./search-panel.css";

class SearchPanel extends React.Component {
	render() {
        const {onSearchStart} = this.props;

		return (
			<Form.Control type="text" placeholder="search in records" onChange={(event)=>onSearchStart(event.target.value)} />

			// <input
			// className="form-control search-input"
			// type="text"
			// placeholder="search in records"
			// />
		);
	}
}
export default SearchPanel;
