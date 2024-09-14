import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';

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
        const selectedRegionNames = selectedRegions.map((regionId) => {
            const region = regions.find(r => r.id === regionId);
            return region ? region.name : '';
        });

        onRegionFilter(selectedRegionNames);
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
                                className="custom-checkbox" 
                            />
                        </Col>
                    ))}
                </Row>
            <Row className="justify-content-end me-2">
                <button className="custom-button firaGoBold" style={{ marginTop: '20px', width: '85px'}} onClick={handleFilterApply}>
                    არჩევა
                </button>
            </Row>
        </Container>
    );
};

export default RegionFilter;
