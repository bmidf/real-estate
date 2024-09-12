import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Dropdown from 'react-bootstrap/esm/Dropdown';
import DropdownButton from 'react-bootstrap/esm/DropdownButton';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';

const Filter = ({ onFilter }) => {
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
                ? prevSelected.filter((id) => id !== regionId)
                : [...prevSelected, regionId]
        );
    };

    const handleFilterApply = () => {
        onFilter(selectedRegions);
    };

    return (
        <Container>
            <Row className="d-flex justify-content-between" style={{ marginTop: '10px' }}>
                <Col className="d-flex firaGoBold" style={{border: '1px solid #DBDBDB', borderRadius: '12px'}}>
                    <DropdownButton variant="white" title="რეგიონი" autoClose="outside">
                        <Container style={{padding: '20px',  width: '731px'}}>
                            <Row>
                                <label style={{marginBottom: '20px'}}>რეგიონის მიხედვით</label>
                                {regions.map((region) => (
                                    <Col key={region.id} xs={4}>
                                        <Form.Check
                                            type="checkbox"
                                            id={`region-${region.id}`}
                                            name={`region-${region.id}`}
                                            value={region.id}
                                            checked={selectedRegions.includes(region.id)}
                                            onChange={() => handleRegionSelect(region.id)}
                                            label={region.name}
                                        />
                                    </Col>
                                ))}
                            </Row>
                            <Row className="d-flex justify-content-end" style={{margin: '20px 20px 5px 0px'}}>
                                <Button variant="danger" onClick={handleFilterApply} style={{width: '85px'}}>
                                    არჩევა
                                </Button>
                            </Row>
                        </Container>
                    </DropdownButton>
                    <DropdownButton variant="white" title="საფასო კატეგორია">
                        <Dropdown.Item>Action</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton variant="white" title="ფართობი">
                        <Dropdown.Item>Action</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton variant="white" title="საძინებლების რაოდენობა">
                        <Dropdown.Item>Action</Dropdown.Item>
                    </DropdownButton>
                </Col>
                <Col className="d-flex justify-content-end firaGoBold">
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
