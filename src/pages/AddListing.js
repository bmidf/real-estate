import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CiCirclePlus } from 'react-icons/ci';
import { IoMdCheckmark } from "react-icons/io";
import TrashButton from '../assets/icons/TrashButton.svg';
import AddAgent from '../components/AddAgent';

const AddListing = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [imageSizeError, setImageSizeError] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [regions, setRegions] = useState([]);
    const [cities, setCities] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);
    const [agents, setAgents] = useState([]);
    const [showAgentModal, setShowAgentModal] = useState(false);
    const [realEstate, setRealEstate] = useState({
        price: '',
        zip_code: '',
        description: '',
        area: '',
        city_id: '',
        address: '',
        bedrooms: '',
        is_rental: '0',
        image: '',
        agent_id: '',
        region_id: '', 
    });

    useEffect(() => {
        fetch('https://api.real-estate-manager.redberryinternship.ge/api/regions')
            .then(response => response.json())
            .then(data => setRegions(data))
            .catch(error => console.error('Error fetching regions:', error));
    }, []);

    useEffect(() => {
        fetch('https://api.real-estate-manager.redberryinternship.ge/api/cities')
            .then(response => response.json())
            .then(data => {
                setCities(data);
                setFilteredCities(data);
            })
            .catch(error => console.error('Error fetching cities:', error));
    }, []);
    
    useEffect(() => {
        fetch('https://api.real-estate-manager.redberryinternship.ge/api/agents', {
            headers: {
                'Authorization': 'Bearer 9cfc6240-ffc9-44ab-b4ed-b792a03c592f',
            },
        })
        .then(response => response.json())
        .then(data => setAgents(data))
        .catch(error => console.error('Error fetching agents:', error));
    }, []);
    
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('realEstate')) || {};
        setRealEstate(prevState => ({ ...prevState, ...storedData }));
        if (storedData.image) setImagePreview(storedData.image);

        if (storedData.region_id) {
            const selectedRegionId = parseInt(storedData.region_id, 10);
            const filtered = cities.filter(city => city.region_id === selectedRegionId);
            setFilteredCities(filtered);
            setRealEstate(prevState => ({
                ...prevState,
                city_id: filtered.length > 0 ? filtered[0].id : '',
            }));
        }
    }, [cities]);
    
    const handleChange = ({ target: { name, value } }) => {
        setRealEstate(prevState => {
            const newState = { ...prevState, [name]: value };
            localStorage.setItem('realEstate', JSON.stringify(newState));
            return newState;
        });
    
        setErrors(prevErrors => {
            const newErrors = { ...prevErrors };
    
            if (name === 'address') {
                if (value.length < 2 && value.length > 0) {
                    newErrors.address = 'ჩაწერეთ ვალიდური მონაცემები';
                } else {
                    delete newErrors.address;
                }
            }

            if (name === 'description') {
                if (value.split(' ').length < 5 && value.length > 0) {
                    newErrors.description = 'ჩაწერეთ ვალიდური მონაცემები';
                } else {
                    delete newErrors.description;
                }
            }
    
            if (name === 'bedrooms') {
                if (value > 255) {
                    newErrors.bedrooms = '255-ზე ნაკლები რიცხვი';
                } else if (value.length > 0 && value <= 0) {
                    newErrors.bedrooms = 'აუცილებლად პოზიტიური რიცხვი';
                } else {
                    delete newErrors.bedrooms;
                }
            }

            if (name === 'image') {
                if (imageSizeError) newErrors.image = imageSizeError;
                else delete newErrors.image;
            }

    
            return newErrors;
        });
    
        if (name === 'region_id') {
            const selectedRegionId = parseInt(value, 10);
            const filtered = cities.filter(city => city.region_id === selectedRegionId);
            setFilteredCities(filtered);
            setRealEstate(prevState => ({
                ...prevState,
                city_id: filtered.length > 0 ? filtered[0].id : '',
            }));
        }
    };

    const handleImageChange = ({ target: { files } }) => {
        const file = files[0];
        if (file) {
            if (file.size > 1 * 950 * 950) {
                setImageSizeError('ფაილის ზომა არ უნდა აღემატებოდეს 1 მბ');
                setErrors(prevErrors => ({ ...prevErrors, image: 'ფაილის ზომა არ უნდა აღემატებოდეს 1 მბ' }));
                return;
            }
            setImageSizeError('');
            setErrors(prevErrors => {
                const newErrors = { ...prevErrors };
                if (newErrors.image) delete newErrors.image;
                return newErrors;
            });

            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setRealEstate(prevState => ({ ...prevState, image: base64String }));
                localStorage.setItem('realEstate', JSON.stringify({ ...realEstate, image: base64String }));
                setImagePreview(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageRemove = () => {
        setRealEstate(prevState => ({ ...prevState, image: '' }));
        localStorage.setItem('realEstate', JSON.stringify({ ...realEstate, image: '' }));
        setImagePreview(null);
        setImageSizeError('');
        setErrors(prevErrors => {
            const newErrors = { ...prevErrors };
            if (newErrors.image) delete newErrors.image;
            return newErrors;
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(realEstate); 
    
        const formData = new FormData();
        formData.append('price', realEstate.price);
        formData.append('zip_code', realEstate.zip_code);
        formData.append('description', realEstate.description);
        formData.append('area', realEstate.area);
        formData.append('city_id', realEstate.city_id);
        formData.append('address', realEstate.address);
        formData.append('bedrooms', realEstate.bedrooms);
        formData.append('is_rental', realEstate.is_rental);
    
        if (realEstate.image) {
            try {
                const blob = await fetch(realEstate.image).then(res => res.blob());
                formData.append('image', blob, 'image.png');
            } catch (error) {
                console.error('Error converting image to blob:', error);
            }
        }
    
        formData.append('agent_id', realEstate.agent_id);
        formData.append('region_id', realEstate.region_id);
    
        try {
            const response = await fetch('https://api.real-estate-manager.redberryinternship.ge/api/real-estates', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer 9cfc6240-ffc9-44ab-b4ed-b792a03c592f',
                    'Accept': 'application/json'
                },
                body: formData,
            });
    
            if (response.ok) {
                const result = await response.json();
                console.log(result);
                localStorage.removeItem('realEstate');
                setImagePreview(null);
                navigate('/');
            } else {
                const errorData = await response.json();
                console.error('Error creating real estate listing:', errorData);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };
    
    const handleCancel = () => {
        localStorage.removeItem('realEstate');
        navigate('/');
    }
    
    const handleAgentChange = (e) => {
        const value = e.target.value;

        if (value === 'add-agent') {
            setShowAgentModal(true); 
        } else {
            setRealEstate(prevState => ({ ...prevState, agent_id: value }));
            localStorage.setItem('realEstate', JSON.stringify({ ...realEstate, agent_id: value }));
        }
    };

    const handleAgentClose = () => setShowAgentModal(false);

    return (
        <Container style={{ maxWidth: '812px', fontSize: '14px'}} className="input-decoration firaGoBold">
            <Row className="align-items-center" style={{textAlign: "center", height: '120px'}} >
                <span style={{fontSize: '38px'}}>ლისტინგის დამატება</span>
            </Row>
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Label style={{fontSize: '16px'}}>გარიგების ტიპი</Form.Label>
                    <Form.Group className='d-flex firaGoBook'>
                        <Form.Check 
                            type="radio" 
                            label="იყიდება" 
                            name="is_rental" 
                            value="0" 
                            checked={realEstate.is_rental === '0'}
                            onChange={handleChange}
                            style={{width: '200px'}}
                        />
                        <Form.Check 
                            type="radio" 
                            label="ქირავდება" 
                            name="is_rental" 
                            value="1"
                            checked={realEstate.is_rental === '1'}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Label style={{fontSize: '16px',  marginTop: '50px'}}>მდებარეობა</Form.Label>
                    <Col>
                        <Form.Group controlId="address">
                            <Form.Label>მისამართი *</Form.Label>
                            <Form.Control 
                                className="firaGoBook"
                                type="text" 
                                name="address" 
                                value={realEstate.address} 
                                onChange={handleChange} 
                                minLength="2"
                                required
                                style={{
                                    borderColor: realEstate.address.length > 0 ? (errors.address ? 'red' : 'grey') : 'grey',
                                    borderWidth: '1px'
                                }}
                            />
                            <Form.Text className="firaGoBook" style={{ color: realEstate.address.length === 0 ? '#021526' : errors.address ? 'red' : '#45A849' }}>
                                <IoMdCheckmark/>{errors.address || 'მინიმუმ ორი სიმბოლო' }
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="zip_code">
                            <Form.Label>საფოსტო ინდექსი *</Form.Label>
                            <Form.Control 
                                className="firaGoBook"
                                type="number" 
                                name="zip_code" 
                                value={realEstate.zip_code} 
                                onChange={handleChange} 
                                required
                                style={{
                                    borderColor: 'grey',
                                    borderWidth: '1px'
                                }}
                            />
                            <Form.Text className="firaGoBook" style={{ color: realEstate.zip_code.length === 0 ? '#021526' : '#45A849' }}>
                                <IoMdCheckmark/>მხოლოდ რიცხვები
                            </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                <Col>
                    <Form.Group controlId="region_id">
                        <Form.Label>რეგიონი</Form.Label>
                                <Form.Control className="firaGoBook" as="select" value={realEstate.region_id} name="region_id" onChange={handleChange} required>
                                    <option value="">აირჩიეთ რეგიონი</option>
                                    {regions.map((region) => (
                                        <option key={region.id} value={region.id}>{region.name}</option>
                                    ))}
                                </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        {realEstate.region_id && (
                            <Form.Group controlId="city_id">
                                <Form.Label>ქალაქი</Form.Label>
                                <Form.Control className="firaGoBook" as="select" value={realEstate.city_id} name="city_id" onChange={handleChange} required>
                                    <option value="">აირჩიეთ ქალაქი</option>
                                    {filteredCities.map((city) => (
                                        <option key={city.id} value={city.id}>{city.name}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        )}
                    </Col>
                </Row>
                <Form.Label style={{fontSize: '16px', marginTop: '50px'}}>ბინის დეტალები</Form.Label>
                <Row className="mb-3">
                    <Col style={{height: '83px'}}>
                        <Form.Group controlId="price">
                            <Form.Label>ფასი *</Form.Label>
                            <Form.Control 
                                className="firaGoBook"
                                type="number" 
                                name="price" 
                                value={realEstate.price} 
                                onChange={handleChange} 
                                required
                                style={{
                                    borderColor: 'grey',
                                    borderWidth: '1px'
                                }}
                            />
                            <Form.Text className="firaGoBook" style={{color: realEstate.price.length === 0 ? '#021526' : '#45A849' }}>
                                <IoMdCheckmark/>მხოლოდ რიცხვები
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="area">
                            <Form.Label>ფართობი *</Form.Label>
                            <Form.Control 
                                className="firaGoBook"
                                type="number" 
                                name="area" 
                                value={realEstate.area} 
                                onChange={handleChange} 
                                required
                                style={{
                                    borderColor: 'grey',
                                    borderWidth: '1px'
                                }}
                            />
                            <Form.Text className="firaGoBook" style={{ color: realEstate.area.length === 0 ? '#021526' : '#45A849' }}>
                                <IoMdCheckmark/>მხოლოდ რიცხვები
                            </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="bedrooms">
                            <Form.Label>საძინებლების რაოდენობა *</Form.Label>
                            <Form.Control 
                                className="firaGoBook"
                                type="number" 
                                name="bedrooms" 
                                value={realEstate.bedrooms} 
                                onChange={handleChange} 
                                required
                                style={{
                                    borderColor: 'grey',
                                    borderWidth: '1px'
                                }}
                            />
                            <Form.Text className="firaGoBook" style={{ color: errors.bedrooms ? 'red' : realEstate.bedrooms.length === 0 ? '#021526' : '#45A849' }}>
                                <IoMdCheckmark/>{errors.bedrooms || 'მხოლოდ რიცხვები'}
                            </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="description">
                            <Form.Label>აღწერა *</Form.Label>
                            <Form.Control 
                                className="firaGoBook"
                                as="textarea" 
                                rows={5} 
                                name="description" 
                                value={realEstate.description} 
                                onChange={handleChange} 
                                required 
                                minLength="5"
                                style={{
                                    borderColor: realEstate.description.length > 0 ? (errors.description ? 'red' : 'grey') : 'grey',
                                    borderWidth: '1px'
                                }}
                            />
                            <Form.Text className="firaGoBook" style={{ color: errors.description ? 'red' : realEstate.description.length > 0 ? '#45A849' : '#021526' }}>
                                <IoMdCheckmark/>{errors.description ||'მინიმუმ ხუთი სიტყვა'}
                            </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                        <Col>
                        <Form.Group controlId="image">
                            <Form.Label>ატვირთეთ ფოტო *</Form.Label>
                            <div
                                style={{
                                    border: '2px dashed grey',
                                    borderRadius: '8px',
                                    height: '120px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}
                                onClick={() => document.getElementById('imageInput').click()}
                            >
                                {imagePreview ? (
                                    <div style={{ position: 'relative'}}>
                                        <img src={imagePreview} alt="Preview"
                                            style={{
                                                maxWidth: '84px',
                                                objectFit: 'cover',
                                                borderRadius: '8px',
                                            }}
                                        />
                                        <img src={TrashButton} alt="trash"
                                            style={{
                                                position: 'absolute',
                                                bottom: '-7px',
                                                right: '-7px',
                                                width: '20px',
                                                height: '20px',
                                            }}
                                            onClick={handleImageRemove}
                                        />
                                    </div>
                                ) : (
                                    <CiCirclePlus style={{ fontSize: '34px', color: 'grey' }} />
                                )}
                                <Form.Control type="file" id="imageInput" onChange={handleImageChange}
                                    accept="image/*"  style={{ display: 'none' }}
                                />
                            </div>
                            <Form.Text className="firaGoBook">
                                {errors.image && <div className="text-danger">{errors.image}</div>}
                            </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Label style={{fontSize: '16px', marginTop: '50px'}}>აგენტი</Form.Label>
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="agent_id">
                            <Form.Label>აირჩიე</Form.Label>
                            <Form.Control className="firaGoBook" as="select" value={realEstate.agent_id} name="agent_id" onChange={handleAgentChange} required>
                                <option value="">აირჩიეთ აგენტი</option>
                                <option value="add-agent">დაამატეთ აგენტი</option> 
                                {agents.map((agent) => (
                                    <option key={agent.id} value={agent.id}>{agent.name} {agent.surname}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <AddAgent show={showAgentModal} handleClose={handleAgentClose} onHide={() => setShowAgentModal(false)} />
                <Row className='d-flex justify-content-end firaGoBook'>
                    <Col className='d-flex justify-content-end' style={{height: '47px', marginTop: '20px', fontSize: '16px'}}>
                        <button onClick={handleCancel} className="custom-button-2" style={{width: '103px', marginRight: '10px'}}>
                            გაუქმება
                        </button>
                        <button className="custom-button" type="submit" style={{width: '200px'}}>
                            დაამატე ლისტინგი
                        </button>
                    </Col>
                </Row>
                <Row style={{height: '25px'}}></Row>
            </Form>
        </Container>
    );
};

export default AddListing;