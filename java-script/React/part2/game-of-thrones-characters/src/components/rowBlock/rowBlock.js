import React from "react";
import { Col, Row} from "react-bootstrap";

const RowBlock = ({ leftPart, rightPart }) => {
	return (
		<Row>
			<Col md="6">{leftPart}</Col>
			<Col md="6">{rightPart}</Col>
		</Row>
	);
};
export default RowBlock;
