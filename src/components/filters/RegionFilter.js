import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

const RegionFilter = ({ onRegionFilter }) => {
    const [regions, setRegions] = useState([]);
    const [selectedRegions, setSelectedRegions] = useState([]);

    useEffect(() => {
        const fetchRegions = async () => {
            try {
            const response = await fetch('https://api.real-estate-manager.redberryinternship.ge/api/regions');
            const data = await response.json();
            setRegions(data);
            } catch (error) {
            console.error('Error fetching regions:', error);
            }
        };

        fetchRegions();
    }, []);

    const handleRegionSelect = (regionId) => {
        setSelectedRegions((prevSelected) =>
            prevSelected.includes(regionId)
                ? prevSelected.filter(id => id !== regionId)
                : [...prevSelected, regionId]
        );
    };

    const handleFilterApply = () => {
        onRegionFilter(selectedRegions);
        setSelectedRegions([]);
    };

    return (
        <Container style={{ padding: '20px', width: '731px' }}>
                <Row>
                    <label style={{ marginBottom: '20px' }}>რეგიონის მიხედვით</label>
                    {regions.map((region) => (
                        <Col className='firaGoBook' key={region.id} xs={4}>
                            <Form.Check
                                type="checkbox"
                                id={`region-${region.id}`}
                                value={region.id}
                                checked={selectedRegions.includes(region.id)}
                                onChange={() => handleRegionSelect(region.id)}
                                label={region.name}
                                style={{ '--bs-form-check-input-active-bg': 'green' }}
                            />
                        </Col>
                    ))}
                </Row>
            <Row className="d-flex justify-content-end" style={{ margin: '20px 20px 5px 0px' }}>
                <Button                     
                    style={{ marginTop: '20px', width: '85px', backgroundColor: '#F93B1D', borderColor: '#F93B1D' }} 
                    onClick={handleFilterApply}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#DF3014'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#F93B1D'}>
                    არჩევა
                </Button>
            </Row>
        </Container>
    );
};

export default RegionFilter;
