import React, { useState } from 'react';
import { Container, Row, Col, DropdownButton, Button } from 'react-bootstrap';
import RegionFilter from './filters/RegionFilter';
import PriceFilter from './filters/PriceFilter';

const Filter = ({ onFilter }) => {
    const [selectedRegions, setSelectedRegions] = useState([]);
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });

    const handleRegionFilter = (regions) => {
        setSelectedRegions(regions);
        applyFilters(regions, priceRange);
    };

    const handlePriceFilter = (price) => {
        setPriceRange(prevPrice => {
            const newPrice = { ...prevPrice, ...price };
            applyFilters(selectedRegions, newPrice);
            return newPrice;
        });
    };

    const applyFilters = (regions, price) => {
        const filters = {
            regions: regions,
            price: price
        };
        onFilter(filters);
    };

    return (
        <Container>
            <Row className="d-flex justify-content-between firaGoBold" style={{ marginTop: '10px' }}>
                <Col className="d-flex" style={{ border: '1px solid #DBDBDB', borderRadius: '12px' }}>
                    <DropdownButton variant="white" title="რეგიონი" autoClose="outside">
                        <RegionFilter onRegionFilter={handleRegionFilter} />
                    </DropdownButton>
                    <DropdownButton variant="white" title="საფასო კატეგორია" autoClose="outside">
                        <PriceFilter onPriceFilter={handlePriceFilter} />
                    </DropdownButton>
                </Col>
                <Col className="d-flex justify-content-end">
                    <Button variant="danger" className="me-2">
                        <span style={{ marginRight: '5px' }}>+</span>ლისტინგის დამატება
                    </Button>
                    <Button variant="outline-danger">
                        <span style={{ marginRight: '5px' }}>+</span>აგენტის დამატება
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default Filter;
