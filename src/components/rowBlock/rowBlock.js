import React from 'react';
import {Col, Row} from 'reactstrap';

const RowBlock = ({left, right}) => { //itemList и charDetails мы будем получать теперь из пропсов. Либо что другое угодно
    return (
        <>
        <Row>
            <Col md='6'>
                {left} 
            </Col>
            <Col md='6'>
                {right}
            </Col>
        </Row>
        </>
    )
}

export default RowBlock;
