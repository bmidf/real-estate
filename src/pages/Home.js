import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Filter from '../components/Filter';
import CustomCard from '../components/Card';
import FilterSummary from '../components/filters/FilterSummary';
import Button from 'react-bootstrap/Button';

const Home = () => {
    const [realEstates, setRealEstates] = useState([]);
    const [filteredRealEstates, setFilteredRealEstates] = useState([]);
    const [filters, setFilters] = useState({regions: [], price: { min: '', max: '' },area: { min: '', max: '' }, bedrooms: '',});

    useEffect(() => {
        const savedFilters = JSON.parse(localStorage.getItem('filters'));
        if (savedFilters) {
            setFilters(savedFilters);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.real-estate-manager.redberryinternship.ge/api/real-estates', {
                    headers: {
                        'Authorization': 'Bearer 9cfc6240-ffc9-44ab-b4ed-b792a03c592f',
                    },
                });
                const data = await response.json();
                setRealEstates(data);
                setFilteredRealEstates(data); 
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (realEstates.length > 0) {
            applyFilters(filters);
        }
    }, [filters, realEstates]);

    const applyFilters = (activeFilters) => {
        let filtered = realEstates;

        if (activeFilters.regions.length > 0) {
            filtered = filtered.filter((realEstate) =>
                activeFilters.regions.includes(realEstate.city.region.name)
            );
        }

        if (activeFilters.price.min || activeFilters.price.max) {
            const min = parseFloat(activeFilters.price.min) || 0;
            const max = parseFloat(activeFilters.price.max) || Infinity;
            filtered = filtered.filter((realEstate) =>
                realEstate.price >= min && realEstate.price <= max
            );
        }

        if (activeFilters.area.min || activeFilters.area.max) {
            const minArea = parseFloat(activeFilters.area.min) || 0;
            const maxArea = parseFloat(activeFilters.area.max) || Infinity;
            filtered = filtered.filter((realEstate) =>
                realEstate.area >= minArea && realEstate.area <= maxArea
            );
        }

        if (activeFilters.bedrooms) {
            filtered = filtered.filter((realEstate) =>
                realEstate.bedrooms === parseInt(activeFilters.bedrooms)
            );
        }

        setFilteredRealEstates(filtered);
    };

    const handleFilter = ({ regions, price, area, bedrooms }) => {
        const newFilters = { regions, price, area, bedrooms };
        setFilters(newFilters);
        localStorage.setItem('filters', JSON.stringify(newFilters));
    };

    const clearFilters = () => {
        const defaultFilters = {regions: [], price: { min: '', max: '' }, area: { min: '', max: '' }, bedrooms: '',};
        setFilters(defaultFilters);
        setFilteredRealEstates(realEstates);
        localStorage.removeItem('filters');
    };

    const isFilterApplied = filters.regions.length > 0 || filters.price.min || filters.price.max || filters.area.min || filters.area.max || filters.bedrooms;

    if (realEstates.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Filter onFilter={handleFilter} filters={filters} />
            <Row className="d-flex justify-content-start align-items-center firaGoBold" style={{ marginTop: '20px' }}>
                <Col xs="auto">
                    <FilterSummary filters={filters} />
                </Col>
                {isFilterApplied && (
                    <Col xs="auto">
                        <Button variant='white' onClick={clearFilters} style={{fontSize: '14px'}}>გასუფთავება</Button>
                    </Col>
                )}
            </Row>

            {filteredRealEstates.length === 0 ? (
                <div className="firaGoBook d-flex justify-content-start" style={{ marginTop: '60px', textAlign: 'center' }}>
                    აღნიშნული მონაცემებით განცხადება არ იძებნება
                </div>
            ) : (
                <Row>
                    {filteredRealEstates.map((realEstate, index) => (
                        <Col key={index} xs={12} sm={6} md={4} lg={3}>
                            <CustomCard realEstate={realEstate} />
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default Home;
