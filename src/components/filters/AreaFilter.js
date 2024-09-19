import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, InputGroup } from 'react-bootstrap';

const AreaFilter = ({ onAreaFilter }) => {
    const [minArea, setMinArea] = useState('');
    const [maxArea, setMaxArea] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (Number(maxArea) < Number(minArea) && minArea !== '' && maxArea !== '') {
            setError('გთხოვთ შეიყვანოთ ვალიდური რიცხვები');
        } else {
            setError('');
        }
    }, [minArea, maxArea]);

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
    };

    const handleMaxAreaSelect = (area) => {
        setMaxArea(area);
    };
    
    return (
        <Container style={{ padding: '20px', width: '382px' }}>
            <Form.Label>ფართობის მიხედვით</Form.Label>
            <Row style={{ marginTop: '20px' }}>
                <Col>
                    <Form.Group>
                        <InputGroup>
                            <Form.Control type="number" value={minArea} placeholder='დან' className='firaGoBook'
                                onChange={(e) => handleMinAreaSelect(e.target.value)}
                                style={error ? { borderColor: 'red', boxShadow: '0 0 0 .1rem rgba(255, 0, 0, .25)' } : { boxShadow: '0 0 0 0 #fff' }}
                            />
                            <InputGroup.Text>მ²</InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <InputGroup>
                            <Form.Control type="number" value={maxArea} placeholder="მდე" className='firaGoBook'
                                onChange={(e) => handleMaxAreaSelect(e.target.value)}
                                style={error ? { borderColor: 'red', boxShadow: '0 0 0 .1rem rgba(255, 0, 0, .25)' } : { boxShadow: '0 0 0 0 #fff' }}
                            />
                            <InputGroup.Text>მ²</InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                </Col>
            </Row>
            {error && (
                <Row>
                    <Col>
                        <div className='firaGoBook' style={{ color: 'red', marginTop: '5px', fontSize: '14px' }}>
                            {error}
                        </div>
                    </Col>
                </Row>
            )}
            <Row style={{ marginTop: '20px' }}>
                <Col>
                    <Form.Label>მინ. მ²</Form.Label>
                    {[50, 100, 150, 200, 250, 300].map((area) => (
                        <Form.Label className='firaGoBook' key={area} onClick={() => handleMinAreaSelect(area)}
                            style={{ cursor: 'pointer', display: 'block', marginBottom: '5px' }}
                        >
                            {area.toLocaleString()} მ²
                        </Form.Label>
                    ))}
                </Col>
                <Col>
                    <Form.Label>მაქს. მ²</Form.Label>
                    {[50, 100, 150, 200, 250, 300].map((area) => (
                        <Form.Label className='firaGoBook' key={area} onClick={() => handleMaxAreaSelect(area)}
                            style={{ cursor: 'pointer', display: 'block', marginBottom: '5px' }}
                        >
                            {area.toLocaleString()} მ²
                        </Form.Label>
                    ))}
                </Col>
            </Row>

            <Row className="justify-content-end me-2">
                <button className="custom-button firaGoBold" style={{ marginTop: '20px', width: '85px'}} onClick={handleApply}>
                    არჩევა
                </button>
            </Row>
        </Container>
    );
};

export default AreaFilter;
