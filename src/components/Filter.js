import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Dropdown} from 'react-bootstrap';
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
    const [activeDropdown, setActiveDropdown] = useState(null);

    useEffect(() => {
        setSelectedRegions(filters.regions);
        setPriceRange(filters.price);
        setAreaRange(filters.area);
        setBedroomCount(filters.bedrooms || '');
    }, [filters]);

    const handleDropdownToggle = (dropdown) => {
        setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    };

    const handleRegionFilter = (regions) => {
        setSelectedRegions(regions);
        applyFilters(regions, priceRange, areaRange, bedroomCount);
        setActiveDropdown(null);
    };

    const handlePriceFilter = (price) => {
        setPriceRange(price);
        applyFilters(selectedRegions, price, areaRange, bedroomCount);
        setActiveDropdown(null);
    };

    const handleAreaFilter = (area) => {
        setAreaRange(area);
        applyFilters(selectedRegions, priceRange, area, bedroomCount);
        setActiveDropdown(null);
    };

    const handleBedroomCountFilter = (bedrooms) => {
        setBedroomCount(bedrooms);
        applyFilters(selectedRegions, priceRange, areaRange, bedrooms);
        setActiveDropdown(null);
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
            <Row className="firaGoBold" style={{ marginTop: '10px'}}>
                <Col xs={6} style={{ border: '1px solid #dbdbdb', borderRadius: '10px', height: '47px' }}>
                    <Row className="align-items-center" style={{ height: '100%' }}>
                        <Col>
                            <Dropdown onToggle={() => handleDropdownToggle('region')} show={activeDropdown === 'region'}>
                                <Dropdown.Toggle variant="white" className="custom-dropdown" id="dropdown-region">
                                    რეგიონი
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <RegionFilter onRegionFilter={handleRegionFilter} selectedRegions={selectedRegions} />
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>

                        <Col>
                            <Dropdown onToggle={() => handleDropdownToggle('price')} show={activeDropdown === 'price'}>
                                <Dropdown.Toggle variant="white" className="custom-dropdown" id="dropdown-price">
                                    საფასო კატეგორია
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <PriceFilter onPriceFilter={handlePriceFilter} priceRange={priceRange} />
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>

                        <Col>
                            <Dropdown onToggle={() => handleDropdownToggle('area')} show={activeDropdown === 'area'}>
                                <Dropdown.Toggle variant="white" className="custom-dropdown" id="dropdown-area">
                                    ფართობი
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <AreaFilter onAreaFilter={handleAreaFilter} areaRange={areaRange} />
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>

                        <Col xs="auto">
                            <Dropdown onToggle={() => handleDropdownToggle('bedrooms')} show={activeDropdown === 'bedrooms'}>
                                <Dropdown.Toggle variant="white" className="custom-dropdown" id="dropdown-bedrooms">
                                    საძინებლების რაოდენობა
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <BedroomCount onBedroomCountFilter={handleBedroomCountFilter} />
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                </Col>


                <Col className="d-flex justify-content-end">
                    <button className="custom-button firaGoBold me-2" onClick={handleAddListing} style={{ width: '230px' }}>
                        <span>+</span> ლისტინგის დამატება
                    </button>
                    <button className="custom-button-2" onClick={handleOpen} style={{ width: '203px' }}>
                        <span style={{ marginRight: '5px' }}>+</span>აგენტის დამატება
                    </button>
                    <AddAgent show={show} handleClose={handleClose} handleOpen={handleOpen} />
                </Col>
            </Row>
        </Container>
    );
};

export default Filter;
