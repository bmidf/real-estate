import React, { useState, useEffect } from 'react';
import { Container, Row, Col, DropdownButton, Button } from 'react-bootstrap';
import RegionFilter from './filters/RegionFilter';
import PriceFilter from './filters/PriceFilter';
import AreaFilter from './filters/AreaFilter';
import BedroomCount from './filters/BedroomCount';

const Filter = ({ onFilter, filters }) => {
    const [selectedRegions, setSelectedRegions] = useState(filters.regions);
    const [priceRange, setPriceRange] = useState(filters.price);
    const [areaRange, setAreaRange] = useState(filters.area);
    const [bedroomCount, setBedroomCount] = useState(filters.bedrooms || '');

    useEffect(() => {
        setSelectedRegions(filters.regions);
        setPriceRange(filters.price);
        setAreaRange(filters.area);
        setBedroomCount(filters.bedrooms || '');
    }, [filters]);

    const handleRegionFilter = (regions) => {
        setSelectedRegions(regions);
        applyFilters(regions, priceRange, areaRange, bedroomCount);
    };

    const handlePriceFilter = (price) => {
        setPriceRange(price);
        applyFilters(selectedRegions, price, areaRange, bedroomCount);
    };

    const handleAreaFilter = (area) => {
        setAreaRange(area);
        applyFilters(selectedRegions, priceRange, area, bedroomCount);
    };

    const handleBedroomCountFilter = (bedrooms) => {
        setBedroomCount(bedrooms);
        applyFilters(selectedRegions, priceRange, areaRange, bedrooms);
    };

    const applyFilters = (regions, price, area, bedrooms) => {
        const filters = { regions, price, area, bedrooms };
        onFilter(filters);
    };

    return (
        <Container>
            <Row className="d-flex justify-content-between firaGoBold" style={{ marginTop: '10px' }}>
                <Col className="d-flex" style={{ border: '1px solid #DBDBDB', borderRadius: '12px' }}>
                    <DropdownButton variant="white" title="რეგიონი" autoClose="outside">
                        <RegionFilter onRegionFilter={handleRegionFilter} selectedRegions={selectedRegions} />
                    </DropdownButton>
                    <DropdownButton variant="white" title="საფასო კატეგორია" autoClose="outside">
                        <PriceFilter onPriceFilter={handlePriceFilter} priceRange={priceRange} />
                    </DropdownButton>
                    <DropdownButton variant="white" title="ფართობის კატეგორია" autoClose="outside">
                        <AreaFilter onAreaFilter={handleAreaFilter} areaRange={areaRange} />
                    </DropdownButton>
                    <DropdownButton variant="white" title="საძინებლების რაოდენობა" autoClose="outside">
                        <BedroomCount onBedroomCountFilter={handleBedroomCountFilter} />
                    </DropdownButton>
                </Col>
                <Col className="d-flex justify-content-end">
                    <Button                     
                        style={{backgroundColor: '#F93B1D', borderColor: '#F93B1D' }} 
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#DF3014'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#F93B1D'} 
                        className="me-2">
                        <span style={{ marginRight: '5px' }}>+</span>ლისტინგის დამატება
                    </Button>
                    <Button style={{ borderColor: '#F93B1D', color: '#F93B1D' }} 
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#F93B1D';
                            e.target.style.borderColor = '#F93B1D';
                            e.target.style.color = 'white'
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'transparent';
                            e.target.style.borderColor = '#F93B1D';
                            e.target.style.color = '#F93B1D'
                        }}>
                        <span style={{ marginRight: '5px' }}>+</span>აგენტის დამატება
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default Filter;
