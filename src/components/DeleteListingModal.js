import React from 'react';
import { Modal, Row, Button } from 'react-bootstrap';

const DeleteListingModal = ({ show, handleOpen, handleClose, deleteRealEstate }) => {
    return (
        <>
        <Button  style={{marginTop: '30px', backgroundColor: 'white', borderColor: '#808A93', color: '#808A93'}} 
            onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#808A93';
                e.target.style.borderColor = '#808A93';
                e.target.style.color = 'white'
            }}
            onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.borderColor = '#808A93';
                e.target.style.color = '#808A93'
            }}
            onClick={handleOpen}>
            ლისტინგის წაშლა
        </Button>
        <Modal 
            size='lg' 
            aria-labelledby="contained-modal-title-vcenter" 
            centered 
            show={show} 
            onHide={handleClose} 
            animation={false}
            style={{ backdropFilter: 'blur(5px)' }} 
        >
            <Modal.Body 
                className="text-center d-flex flex-column justify-content-center" 
                style={{ height: '222px', fontSize: '20px', borderRadius: '20px' }}
            >
                <button 
                    type="button" 
                    onClick={handleClose}
                    style={{
                        background: 'none',
                        border: 'none',
                        position: 'absolute',
                        right: '15px',
                        top: '10px',
                        cursor: 'pointer',
                        fontSize: '47px',
                        width: '47px',
                        height: '47px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: '#2D3648'
                    }}
                >
                    &times;
                </button>
                <Row className="justify-content-center mb-4 firaGoBook">
                    გსურთ წაშალოთ ლისტინგი?
                </Row>
                <Row className="d-flex justify-content-center firaGoBook" style={{fontSize: '16px'}}>
                    <button className='custom-button-2' onClick={handleClose} style={{ width: '103px', marginRight: '10px', height: '47px' }}>
                        გაუქმება
                    </button>
                    <button className='custom-button' onClick={deleteRealEstate} style={{ width: '145px' }}>
                        დადასტურება
                    </button>
                </Row>
            </Modal.Body>
        </Modal>
        </>
    );
};

export default DeleteListingModal;
