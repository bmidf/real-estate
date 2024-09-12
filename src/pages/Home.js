import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Filter from '../components/Filter';
import CustomCard from '../components/Card';

const Home = () => {
    const [realEstates, setRealEstates] = useState([]);
    const [filteredRealEstates, setFilteredRealEstates] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.real-estate-manager.redberryinternship.ge/api/real-estates', {
                    headers: {
                        'Authorization': 'Bearer 9cfc6240-ffc9-44ab-b4ed-b792a03c592f'
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

    const handleFilter = (selectedRegions) => {
        if (selectedRegions.length === 0) {
            setFilteredRealEstates(realEstates); 
        } else {
            const filtered = realEstates.filter((realEstate) =>
                selectedRegions.includes(realEstate.city.region_id) 
            );
            setFilteredRealEstates(filtered);
        }
    };

    if (realEstates.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Filter onFilter={handleFilter} />
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
