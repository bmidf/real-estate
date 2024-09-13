import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, InputGroup } from 'react-bootstrap';

const AreaFilter = ({ onAreaFilter }) => {
    const [minArea, setMinArea] = useState('');
    const [maxArea, setMaxArea] = useState('');
    const [error, setError] = useState('');

    const handleApply = () => {
        if (Number(maxArea) < Number(minArea)) {
            setError('გთხოვთ შეიყვანოთ ვალიდური რიცხვები');
        } else {
            setError('');
            onAreaFilter({ min: minArea, max: maxArea });
            setMinArea(''); 
            setMaxArea(''); 
        }
    };

    const handleMinAreaSelect = (area) => {
        setMinArea(area);
        if (Number(area) > Number(maxArea) && maxArea !== '') {
            setError('გთხოვთ შეიყვანოთ ვალიდური რიცხვები');
        } else {
            setError('');
        }
    };

    const handleMaxAreaSelect = (area) => {
        setMaxArea(area);
        if (Number(area) < Number(minArea) && minArea !== '') {
            setError('გთხოვთ შეიყვანოთ ვალიდური რიცხვები');
        } else {
            setError('');
        }
    };
    
    return (
        <Container style={{ padding: '20px', width: '382px' }}>
            <Form.Label>ფართობის მიხედვით</Form.Label>
            <Row style={{ marginTop: '20px' }}>
                <Col>
                    <Form.Group>
                        <InputGroup>
                            <Form.Control
                                type="number"
                                value={minArea}
                                placeholder='დან'
                                className='firaGoBook'
                                onChange={(e) => setMinArea(e.target.value)}
                                style={error ? { borderColor: 'red', boxShadow: '0 0 0 .2rem rgba(255, 0, 0, .25)' } : {}}
                            />
                            <InputGroup.Text>მ²</InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <InputGroup>
                            <Form.Control
                                type="number"
                                value={maxArea}
                                placeholder="მდე"
                                className='firaGoBook'
                                onChange={(e) => setMaxArea(e.target.value)}
                                style={error ? { borderColor: 'red', boxShadow: '0 0 0 .2rem rgba(255, 0, 0, .25)' } : {}}
                            />
                            <InputGroup.Text>მ²</InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                </Col>
            </Row>
            {error && (
                <Row>
                    <Col>
                        <div style={{ color: 'red', marginTop: '5px', fontSize: '10px' }}>
                            {error}
                        </div>
                    </Col>
                </Row>
            )}
            <Row style={{ marginTop: '20px' }}>
                <Col>
                    <Form.Label>მინ. მ²</Form.Label>
                    {[50, 100, 150, 200, 250, 300].map((area) => (
                        <Form.Label 
                            className='firaGoBook'
                            key={area}
                            onClick={() => handleMinAreaSelect(area)}
                            style={{ cursor: 'pointer', display: 'block', marginBottom: '5px' }}
                        >
                            {area.toLocaleString()} მ²
                        </Form.Label>
                    ))}
                </Col>
                <Col>
                    <Form.Label>მაქს. მ²</Form.Label>
                    {[50, 100, 150, 200, 250, 300].map((area) => (
                        <Form.Label
                            className='firaGoBook'
                            key={area}
                            onClick={() => handleMaxAreaSelect(area)}
                            style={{ cursor: 'pointer', display: 'block', marginBottom: '5px' }}
                        >
                            {area.toLocaleString()} მ²
                        </Form.Label>
                    ))}
                </Col>
            </Row>

            <Row className="justify-content-end me-2">
                <Button 
                    style={{ marginTop: '20px', width: '85px', backgroundColor: '#F93B1D', borderColor: '#F93B1D' }} 
                    onClick={handleApply}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#DF3014'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#F93B1D'}
                >
                    არჩევა
                </Button>
            </Row>
        </Container>
    );
};

export default AreaFilter;
