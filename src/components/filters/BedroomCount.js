import React, { useState } from 'react';
import { Button, Form, Row } from 'react-bootstrap';

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
                />
            </Form.Group>
            <Row className="justify-content-end me-2">
                <Button                     
                    style={{ marginTop: '20px', width: '85px', backgroundColor: '#F93B1D', borderColor: '#F93B1D' }} 
                    onClick={handleApply}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#DF3014'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#F93B1D'}>
                    არჩევა
                </Button>
            </Row>
        </div>
    );
};

export default BedroomCount;
