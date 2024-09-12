import React from 'react';
import Card from 'react-bootstrap/Card';
import { IoIosBed } from "react-icons/io";
import { PiCheckSquareOffsetFill } from "react-icons/pi";
import { BsSignpostFill } from "react-icons/bs";
import  { FaMapMarkerAlt } from "react-icons/fa";

const CustomCard = ({ realEstate }) => {
    const handleExploreClick = () => {
        window.location.href = `/`;
    };

    return (
        <Card 
            style={{
                marginTop: '10px', 
                width: '20rem', 
                height: '455px', 
                cursor: 'pointer', 
                transition: 'box-shadow 0.3s', 
                border: '1px solid #dedede', 
                borderRadius: '15px'
            }} 
            className="hoverable-card"
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = '4px 4px 12px rgba(0, 0, 0, 0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
            onClick={handleExploreClick}
        >
            <div style={{ position: 'relative' }}>
                <Card.Img 
                    variant="top" 
                    style={{ 
                        height: '307px', 
                        borderTopLeftRadius: '15px', 
                        borderTopRightRadius: '15px' 
                    }} 
                    src={realEstate.image} 
                    alt={realEstate.address} 
                />
                <button 
                    className='firaGoBook'
                    style={{ 
                        position: 'absolute', 
                        top: '20px',  
                        left: '20px', 
                        backgroundColor: '#02152680', 
                        color: 'white',  
                        border: '0px solid #02152680',
                        borderRadius: '15px', 
                        padding: '5px 10px', 
                        cursor: 'pointer'  
                    }}
                >
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
