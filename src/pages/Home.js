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
    const [filters, setFilters] = useState({ regions: [], price: { min: '', max: '' } });

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

    const handleFilter = ({ regions, price }) => {
        setFilters({ regions, price });

        let filtered = realEstates;

        if (regions.length > 0) {
            filtered = filtered.filter((realEstate) =>
                regions.includes(realEstate.city.region_id)
            );
        }

        if (price.min || price.max) {
            const min = parseFloat(price.min) || 0;
            const max = parseFloat(price.max) || Infinity;
            filtered = filtered.filter((realEstate) =>
                realEstate.price >= min && realEstate.price <= max
            );
        }

        setFilteredRealEstates(filtered);
    };

    const clearFilters = () => {
        setFilters({ regions: [], price: { min: '', max: '' } }); 
        setFilteredRealEstates(realEstates);
    };

    const isFilterApplied = filters.regions.length > 0 || filters.price.min || filters.price.max;
    
    if (realEstates.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Filter onFilter={handleFilter} />
            <Row className="d-flex justify-content-start align-items-center firaGoBold" style={{marginTop: '10px'}}>
                <Col xs="auto">
                    <FilterSummary filters={filters} />
                </Col>
                {isFilterApplied && (
                    <Col xs="auto">
                        <Button variant='white' onClick={clearFilters}>გასუფთავება</Button>
                    </Col>
                )}
            </Row>
            <Row>
                {filteredRealEstates.map((realEstate, index) => (
                    <Col key={index} xs={12} sm={6} md={4} lg={3}>
                        <CustomCard realEstate={realEstate} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Home;
