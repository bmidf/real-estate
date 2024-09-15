import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Col, Row, Image } from 'react-bootstrap';
import { IoIosBed } from "react-icons/io";
import { PiCheckSquareOffsetFill } from "react-icons/pi";
import { BsSignpostFill } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import { LuPhoneCall } from "react-icons/lu";
import { FaMapMarkerAlt} from "react-icons/fa";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import Carousel from '../components/Carousel';
import DeleteListingModal from '../components/DeleteListingModal';

const Listing = () => {
    const { id } = useParams();
    const [realEstate, setRealEstate] = useState(null);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRealEstate = async () => {
            try {
                const response = await fetch(`https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${id}`, {
                    headers: {
                        'Authorization': 'Bearer 9cfc6240-ffc9-44ab-b4ed-b792a03c592f',
                    },
                });
                const data = await response.json();
                setRealEstate(data);
            } catch (error) {
                console.error('Error fetching real estate details:', error);
            }
        };

        fetchRealEstate();
    }, [id]);

    const deleteRealEstate = async () => {
        try {
            await fetch(`https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer 9cfc6240-ffc9-44ab-b4ed-b792a03c592f',
                },
            });
            navigate(-1);
        } catch (error) {
            console.error('Error deleting real estate:', error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    
    if (!realEstate) {
        return;
    }

    return (
        <Container>
            <button className='firaGoBook' onClick={() => navigate(-1)} 
                style={{ backgroundColor: 'white',  border: '0px',  fontSize: '21px', cursor: 'pointer', }}
            >
                <IoArrowBackOutline style={{ marginRight: '5px' }} />
            </button>
            <Row style={{ height: '714px', marginTop: '10px'}}>
                <Col md={7} style={{ position: 'relative' }}>
                    <Card.Img variant="top" src={realEstate.image} alt={realEstate.address}
                        style={{ borderRadius: '14px 14px 0 0', height: '90%'}}
                    />
                    <div className='firaGoBook'
                        style={{width: '142px', position: 'absolute', top: '30px', left: '30px', backgroundColor: '#02152680', color: 'white',  
                            borderRadius: '20px', padding: '5px 10px', fontSize: '20px', textAlign: 'center'}}>
                        <span>
                            {realEstate.is_rental === 0 ? "იყიდება" : "ქირავდება"}
                        </span>
                    </div>
                    <div className="firaGoBook d-flex justify-content-end align-items-center" style={{ marginTop: '20px', fontSize: '16px' }}>
                        გამოქვეყნების თარიღი {formatDate(realEstate.created_at)}
                    </div>
                </Col>

                <Col style={{ padding: '40px'}}>
                    <span className='firaGoBold' style={{ fontSize: '48px'}}>
                        {realEstate.price} ₾
                    </span>
                    <div className="firaGoBook" style={{ marginTop: '20px', fontSize: '24px', color: '#808A93'}}>
                        <div>
                            <FaMapMarkerAlt />
                            <span style={{ marginLeft: '5px' }}>
                                {realEstate.city.name}, {realEstate.address}
                            </span>
                        </div>
                        <div style={{ marginTop: '10px' }}>
                            <PiCheckSquareOffsetFill />
                            <span style={{ marginLeft: '5px' }}>
                                ფართი {realEstate.area} მ²
                            </span>
                        </div>
                        <div style={{ marginTop: '10px' }}>
                            <IoIosBed />
                            <span style={{ marginLeft: '5px' }}>
                                საძინებელი {realEstate.bedrooms}
                            </span>
                        </div>
                        <div style={{ marginTop: '10px' }}>
                            <BsSignpostFill />
                            <span style={{ marginLeft: '5px' }}>
                                საფოსტო ინდექსი {realEstate.zip_code}
                            </span>
                        </div>
                        <div style={{ marginTop: '30px' }}>
                            <span style={{ marginLeft: '5px', fontSize: '16px' }}>
                                {realEstate.description}
                            </span>
                        </div>
                    </div>

                    <div style={{ marginTop: '30px', height:'174px', border: '1px solid #DBDBDB', borderRadius: '8px', padding: '20px' }}>
                        <Row className="align-items-center">
                                <Col xs={3} sm={2} md={3} className="d-flex justify-content-center">
                                    <Image src={realEstate.agent.avatar} roundedCircle style={{ width: '72px', height: '72px' }} />
                                </Col>
                                <Col xs={9} sm={10} md={9} className="d-flex flex-column align-items-start justify-content-center">
                                    <span className='firaGoBold' style={{fontSize: '16px' }}>
                                        {realEstate.agent.name} {realEstate.agent.surname}
                                    </span>
                                    <span className='firaGoBook' style={{fontSize: '14px',  color: '#808A93'}}>
                                        აგენტი
                                    </span>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{ marginTop: '15px', fontSize: '14px', color: '#808A93', display: 'flex', alignItems: 'center' }}>
                                    <MdOutlineEmail style={{ marginRight: '8px' }} />
                                    {realEstate.agent.email}
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{ marginTop: '5px', fontSize: '14px', color: '#808A93', display: 'flex', alignItems: 'center' }}>
                                    <LuPhoneCall style={{ marginRight: '8px' }} />
                                    {realEstate.agent.phone}
                                </Col>
                            </Row>
                    </div>
                    <div className='firaGoBold'>
                        <DeleteListingModal show={show} handleClose={() => setShow(false)} handleOpen={() => setShow(true)} deleteRealEstate={deleteRealEstate} />
                    </div>
                </Col>
                <Row className="firaGoBold d-flex" style={{fontSize: '32px', padding: '25px'}}>
                    ბინები მსგავს ლოკაციაძე
                </Row>
                <Row style={{height: '500px'}}>
                    <Carousel currentRealEstateId={realEstate.id} />
                </Row>
            </Row>
        </Container>
    );
};

export default Listing;
