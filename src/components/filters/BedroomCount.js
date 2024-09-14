import React, { useState } from 'react';
import {Form, Row } from 'react-bootstrap';

const BedroomCount = ({ onBedroomCountFilter }) => {
    const [bedroomCount, setBedroomCount] = useState('');

    const handleApply = () => {
        onBedroomCountFilter(bedroomCount);
    };

    return (
        <div style={{ padding: '10px' }}>
            <Form.Group>
                <Form.Label>საძინებლების რაოდენობა</Form.Label>
                <Form.Control
                    className='firaGoBook'
                    type="number"
                    value={bedroomCount}
                    onChange={(e) => setBedroomCount(e.target.value)}
                    placeholder="რაოდენობა"
                    style={{boxShadow: '0 0 0 0 #fff'}}
                />
            </Form.Group>
            <Row className="justify-content-end me-2">
                <button className="custom-button firaGoBold" style={{ marginTop: '20px', width: '85px'}} onClick={handleApply}>
                    არჩევა
                </button>
            </Row>
        </div>
    );
};

export default BedroomCount;
