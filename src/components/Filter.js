import React, { useState, useEffect } from 'react';
import { Container, Row, Col, DropdownButton} from 'react-bootstrap';
import RegionFilter from './filters/RegionFilter';
import PriceFilter from './filters/PriceFilter';
import AreaFilter from './filters/AreaFilter'
import BedroomCount from './filters/BedroomCount';
import { useNavigate } from 'react-router-dom';
import AddAgent from './AddAgent';

const Filter = ({ onFilter, filters }) => {
    const [selectedRegions, setSelectedRegions] = useState(filters.regions);
    const [priceRange, setPriceRange] = useState(filters.price);
    const [areaRange, setAreaRange] = useState(filters.area);
    const [bedroomCount, setBedroomCount] = useState(filters.bedrooms || '');
    const navigate = useNavigate();

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

    const handleAddListing = () => {
        navigate(`/add-listing`);
    };
    const [show, setShow] = useState(false);

    const handleOpen = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <Container fluid style={{ maxWidth: '1596px', margin: '0 auto' }}>
            <Row className="d-flex justify-content-between  firaGoBold" style={{ marginTop: '10px' }}>
                <Col xs={4} md={4} lg={8} className="d-flex flex-wrap justify-content-start">
                    <DropdownButton variant="white" title="რეგიონი" autoClose="outside" className="mb-2 mb-md-0 me-2">
                        <RegionFilter onRegionFilter={handleRegionFilter} selectedRegions={selectedRegions} />
                    </DropdownButton>
                    <DropdownButton variant="white" title="საფასო კატეგორია" autoClose="outside" className="mb-2 mb-md-0 me-2">
                        <PriceFilter onPriceFilter={handlePriceFilter} priceRange={priceRange} />
                    </DropdownButton>
                    <DropdownButton variant="white" title="ფართობის კატეგორია" autoClose="outside" className="mb-2 mb-md-0 me-2">
                        <AreaFilter onAreaFilter={handleAreaFilter} areaRange={areaRange} />
                    </DropdownButton>
                    <DropdownButton variant="white" title="საძინებლების რაოდენობა" autoClose="outside" className="mb-2 mb-md-0">
                        <BedroomCount onBedroomCountFilter={handleBedroomCountFilter} />
                    </DropdownButton>
                </Col>
                <Col lg={4} className="d-flex justify-content-end" style={{ maxHeight: '50px' }}>
                    <button className="custom-button firaGoBold me-2" onClick={handleAddListing} 
                        style={{ width: '230px'}}>
                        <span>+</span> ლისტინგის დამატება
                    </button>
                    <AddAgent show={show} handleClose={handleClose} handleOpen={handleOpen} 
                        style={{ width: '203px', height: '47px' }} />
                </Col>
            </Row>
        </Container>
    );
};

export default Filter;
