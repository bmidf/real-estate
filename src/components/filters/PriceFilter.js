import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, InputGroup } from 'react-bootstrap';

const PriceFilter = ({ onPriceFilter }) => {
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [error, setError] = useState('');

    const handleApply = () => {
        if (Number(maxPrice) < Number(minPrice)) {
            setError('გთხოვთ შეიყვანოთ ვალიდური რიცხვები');
        } else {
            setError('');
            onPriceFilter({ min: minPrice, max: maxPrice });
            setMinPrice(''); 
            setMaxPrice(''); 
        }
    };

    const handleMinPriceSelect = (price) => {
        setMinPrice(price);
        if (Number(price) > Number(maxPrice) && maxPrice !== '') {
            setError('გთხოვთ შეიყვანოთ ვალიდური რიცხვები');
        } else {
            setError('');
        }
    };

    const handleMaxPriceSelect = (price) => {
        setMaxPrice(price);
        if (Number(price) < Number(minPrice) && minPrice !== '') {
            setError('გთხოვთ შეიყვანოთ ვალიდური რიცხვები');
        } else {
            setError('');
        }
    };
    
    return (
        <Container style={{ padding: '20px', width: '382px' }}>
            <Form.Label>ფასის მიხედვით</Form.Label>
            <Row style={{ marginTop: '20px' }}>
                <Col>
                    <Form.Group>
                        <InputGroup>
                            <Form.Control
                                type="number"
                                value={minPrice}
                                placeholder='დან'
                                className='firaGoBook'
                                onChange={(e) => setMinPrice(e.target.value)}
                                style={error ? { borderColor: 'red', boxShadow: '0 0 0 .1rem rgba(255, 0, 0, .25)' } : {}}
                            />
                            <InputGroup.Text>₾</InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <InputGroup>
                            <Form.Control
                                type="number"
                                value={maxPrice}
                                placeholder="მდე"
                                className='firaGoBook'
                                onChange={(e) => setMaxPrice(e.target.value)}
                                style={error ? { borderColor: 'red', boxShadow: '0 0 0 .1rem rgba(255, 0, 0, .25)' } : {}}
                            />
                            <InputGroup.Text>₾</InputGroup.Text>
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
                    <Form.Label>მინ. ფასი</Form.Label>
                    {[50000, 100000, 150000, 200000, 250000, 300000].map((price) => (
                        <Form.Label 
                            className='firaGoBook'
                            key={price}
                            onClick={() => handleMinPriceSelect(price)}
                            style={{ cursor: 'pointer', display: 'block', marginBottom: '5px' }}
                        >
                            {price.toLocaleString()} ₾
                        </Form.Label>
                    ))}
                </Col>
                <Col>
                    <Form.Label>მაქს. ფასი</Form.Label>
                    {[50000, 100000, 150000, 200000, 250000, 300000].map((price) => (
                        <Form.Label
                            className='firaGoBook'
                            key={price}
                            onClick={() => handleMaxPriceSelect(price)}
                            style={{ cursor: 'pointer', display: 'block', marginBottom: '5px' }}
                        >
                            {price.toLocaleString()} ₾
                        </Form.Label>
                    ))}
                </Col>
            </Row>

            <Row className="justify-content-end me-2">
                <Button                     
                    style={{ marginTop: '20px', width: '85px', backgroundColor: '#F93B1D', borderColor: '#F93B1D' }} 
                    onClick={handleApply}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#DF3014'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#F93B1D'}>
                    არჩევა
                </Button>
            </Row>
        </Container>
    );
};

export default PriceFilter;
