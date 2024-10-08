import React from 'react';
import Card from 'react-bootstrap/Card';
import { IoIosBed } from "react-icons/io";
import { PiCheckSquareOffsetFill } from "react-icons/pi";
import { BsSignpostFill } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const CustomCard = ({ realEstate }) => {
    const navigate = useNavigate();

    const handleExploreClick = () => {
        navigate(`/real-estate/${realEstate.id}`);
    };

    return (
        <Card 
            style={{ height: '455px', width: '386px', cursor: 'pointer', transition: 'box-shadow 0.3s', border: '1px solid #dedede', borderRadius: '15px'}} 
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = '4px 4px 12px rgba(0, 0, 0, 0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
            onClick={handleExploreClick}
        >
            <div style={{ position: 'relative' }}>
                <Card.Img variant="top" src={realEstate.image} alt={realEstate.address} 
                    style={{ height: '307px', borderTopLeftRadius: '15px', borderTopRightRadius: '15px', width: '100%', objectFit: 'cover'}}
                />
                <button className='firaGoBook'
                    style={{width: '90px', position: 'absolute', top: '20px', left: '20px', backgroundColor: '#02152680', color: 'white',  
                        borderRadius: '15px', padding: '5px 10px', fontSize: '12px', textAlign: 'center',  border: '0px solid #02152680' }}>
                    {realEstate.is_rental === 0 ? "იყიდება" : "ქირავდება"}
                </button>
            </div>
            <Card.Body className='firaGoBook'  style={{ textAlign: 'left' }}>
                <Card.Title className='firaGoBold' style={{ fontWeight: 'bold', fontSize: '30px' }}>
                    {realEstate.price} ₾
                </Card.Title>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '15px', color: 'grey' }}>
                    <FaMapMarkerAlt />
                    <Card.Text style={{ marginLeft: '9px' }}>
                        {realEstate.city.name}, {realEstate.address}
                    </Card.Text>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '15px', color: 'grey' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <IoIosBed />
                        <Card.Text style={{ marginLeft: '5px' }}>
                            {realEstate.bedrooms}
                        </Card.Text>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '25px' }}>
                        <PiCheckSquareOffsetFill />
                        <Card.Text style={{ marginLeft: '5px' }}>
                            {realEstate.area} მ²
                        </Card.Text>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '25px' }}>
                        <BsSignpostFill />
                        <Card.Text style={{ marginLeft: '5px' }}>
                            {realEstate.zip_code}
                        </Card.Text>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default CustomCard;
