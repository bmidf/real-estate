import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { IoMdCheckmark } from 'react-icons/io';
import { CiCirclePlus } from 'react-icons/ci';
import TrashButton from '../assets/icons/TrashButton.svg';


const AddAgent = ({ show, handleOpen, handleClose }) => {
    const [formData, setFormData] = useState({ name: '', surname: '', email: '', phone: '', avatar: '' });
    const [errors, setErrors] = useState({});
    const [imagePreview, setImagePreview] = useState(null);
    const [imageSizeError, setImageSizeError] = useState('');

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('agentData')) || {};
        setFormData(prevState => ({ ...prevState, ...storedData }));
        if (storedData.avatar) setImagePreview(storedData.avatar);
    }, []);

    const validateForm = () => {
        const newErrors = {};

        if (formData.name.length < 2) newErrors.name = 'მინიმუმ ორი სიმბოლო';
        if (formData.surname.length < 2) newErrors.surname = 'მინიმუმ ორი სიმბოლო';
        if (!formData.email.endsWith('@redberry.ge')) newErrors.email = 'ელ.ფოსტა უნდა მთავრდებოდეს @redberry.ge-ით';
        if (!!/^\d+$/.test(formData.phone)) newErrors.phone = 'მხოლოდ რიცხვები';
        if (!/^[5]\d{8}$/.test(formData.phone)) newErrors.phone = 'ნომრის ფორმატი: 5XXXXXXXXX';

        if (imageSizeError) newErrors.avatar = imageSizeError;

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = ({ target: { name, value } }) => {
        setFormData(prevState => {
            const updatedData = { ...prevState, [name]: value };
            localStorage.setItem('agentData', JSON.stringify(updatedData));
            return updatedData;
        });
        
        setErrors(prevErrors => {
            const newErrors = { ...prevErrors };
            if (name === 'name' && value.length < 2) newErrors.name = 'მინიმუმ ორი სიმბოლო';
            else if (name === 'name') delete newErrors.name;
            if (name === 'surname' && value.length < 2) newErrors.surname = 'მინიმუმ ორი სიმბოლო';
            else if (name === 'surname') delete newErrors.surname;
            if (name === 'email' && !value.endsWith('@redberry.ge')) newErrors.email = 'გამოიყენეთ @redberry.ge ფოსტა';
            else if (name === 'email') delete newErrors.email;
            if (name === 'phone' && !/^\d+$/.test(value)) newErrors.phone = 'მხოლოდ რიცხვები';
            else if (name === 'phone' && !/^[5]\d{8}$/.test(value)) newErrors.phone = 'ნომრის ფორმატი: 5XXXXXXXXX';
            else if (name === 'phone') delete newErrors.phone;

            if (name === 'avatar') {
                if (imageSizeError) newErrors.avatar = imageSizeError;
                else delete newErrors.avatar;
            }

            return newErrors;
        });
    };

    const handleImageChange = ({ target: { files } }) => {
        const file = files[0];
        if (file) {
            if (file.size > 1 * 1024 * 1024) {
                setImageSizeError('ფაილის ზომა არ უნდა აღემატებოდეს 1 მბ');
                setErrors(prevErrors => ({ ...prevErrors, avatar: 'ფაილის ზომა არ უნდა აღემატებოდეს 1 მბ' }));
                return;
            }
            setImageSizeError('');
            setErrors(prevErrors => {
                const newErrors = { ...prevErrors };
                if (newErrors.avatar) delete newErrors.avatar;
                return newErrors;
            });

            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setFormData(prevState => ({ ...prevState, avatar: base64String }));
                localStorage.setItem('agentData', JSON.stringify({ ...formData, avatar: base64String }));
                setImagePreview(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageRemove = () => {
        setFormData(prevState => ({ ...prevState, avatar: '' }));
        localStorage.setItem('agentData', JSON.stringify({ ...formData, avatar: '' }));
        setImagePreview(null);
        setImageSizeError('');
        setErrors(prevErrors => {
            const newErrors = { ...prevErrors };
            if (newErrors.avatar) delete newErrors.avatar;
            return newErrors;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('surname', formData.surname);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('phone', formData.phone);
            if (formData.avatar) {
                const blob = await fetch(formData.avatar).then(res => res.blob());
                formDataToSend.append('avatar', blob, 'avatar.png');
            }

            const response = await fetch('https://api.real-estate-manager.redberryinternship.ge/api/agents', {
                method: 'POST',
                headers: { 'Authorization': 'Bearer 9d0860ee-f016-45fd-96cf-aa55fdee790b' },
                body: formDataToSend,
            });

            if (response.ok) {
                handleClose();
                localStorage.removeItem('agentData');
                setFormData({ name: '', surname: '', email: '', phone: '', avatar: '' });
                setImagePreview(null);
            }
        } catch (error) {
            console.error('Error adding agent:', error);
        }
    };

    return (
        <>
            <button className="custom-button-2" onClick={handleOpen}>
                <span style={{ marginRight: '5px' }}>+</span>აგენტის დამატება
            </button>
            <Modal
                className="firaGoBold input-decoration"
                size='xl'
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={show}
                onHide={handleClose}
                animation={false}
                style={{ backdropFilter: 'blur(5px)' }}
            >
                <Modal.Body className="align-items-center d-flex flex-column justify-content-center" style={{ height: '788px', borderRadius: '20px' }}>
                    <div style={{ width: '800px' }}>
                        <Row className="justify-content-center mb-4 firaGoBold" style={{ fontSize: '32px' }}>
                            აგენტის დამატება
                        </Row>
                        <Form onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Col>
                                    <Form.Group controlId="formName">
                                        <Form.Label style={{ fontSize: '14px' }}>სახელი *</Form.Label>
                                        <Form.Control
                                            className="firaGoBook"
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            style={{ borderColor: formData.name.length > 0 ? (errors.name ? 'red' : '#021526') : '#021526'}}
                                        />
                                        <Form.Text className="firaGoBook" style={{ color: errors.name ? 'red' : formData.name.length === 0 ? '#021526' : 'green' }}>
                                            <IoMdCheckmark style={{ fontSize: '14px' }} />მინიმუმ ორი სიმბოლო
                                        </Form.Text>
                                    </Form.Group>
                                </Col>

                                <Col>
                                    <Form.Group controlId="formSurname">
                                        <Form.Label style={{ fontSize: '14px' }}>გვარი *</Form.Label>
                                        <Form.Control
                                            className="firaGoBook"
                                            type="text"
                                            name="surname"
                                            value={formData.surname}
                                            onChange={handleChange}
                                            style={{ borderColor: formData.surname.length > 0 ? (errors.surname ? 'red' : '#021526') : '#021526'}}
                                        />
                                        <Form.Text className="firaGoBook" style={{ color: errors.surname ? 'red' : formData.surname.length === 0 ? '#021526' : 'green' }}>
                                            <IoMdCheckmark style={{ fontSize: '14px' }} />{errors.surname || 'მინიმუმ ორი სიმბოლო'}
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col>
                                    <Form.Group controlId="formEmail">
                                        <Form.Label style={{ fontSize: '14px' }}>ელ.ფოსტა *</Form.Label>
                                        <Form.Control
                                            className="firaGoBook"
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            style={{ borderColor: formData.email.length > 0 ? (errors.email ? 'red' : '#021526') : '#021526'}}
                                        />
                                        <Form.Text className="firaGoBook" style={{ color: errors.email ? 'red' : formData.email.length === 0 ? '#021526' : 'green' }}>
                                            <IoMdCheckmark style={{ fontSize: '14px' }} />{errors.email || 'გამოიყენეთ @redberry.ge ფოსტა'}
                                        </Form.Text>
                                    </Form.Group>
                                </Col>

                                <Col>
                                    <Form.Group controlId="formPhone">
                                        <Form.Label style={{ fontSize: '14px' }}>ტელეფონის ნომერი *</Form.Label>
                                        <Form.Control
                                            className="firaGoBook"
                                            type="text"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            style={{ borderColor: formData.phone.length > 0 ? (errors.phone ? 'red' : '#021526') : '#021526'}}
                                        />
                                        <Form.Text className="firaGoBook" style={{ color: errors.phone ? 'red' : formData.phone.length === 0 ? '#021526' : 'green' }}>
                                            <IoMdCheckmark style={{ fontSize: '14px' }} />{errors.phone || 'ნომრის ფორმატი: 5XXXXXXXXX'}
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                            </Row>

                        <Row className="mb-3">
                            <Col>
                                <Form.Group controlId="image">
                                    <Form.Label style={{ fontSize: '14px' }}>ატვირთეთ ფოტო *</Form.Label>
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
                                            <div style={{ position: 'relative' }}>
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
                                                        cursor: 'pointer',
                                                    }}
                                                    onClick={handleImageRemove}
                                                />
                                            </div>
                                        ) : (
                                            <CiCirclePlus style={{ fontSize: '34px', color: 'grey' }} />
                                        )}
                                        <Form.Control type="file" id="imageInput" onChange={handleImageChange}
                                            accept="image/*" required style={{ display: 'none' }}
                                        />
                                    </div>
                                    <Form.Text className="firaGoBook">
                                        {errors.avatar && <div className="text-danger">{errors.avatar}</div>}
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="d-flex justify-content-end firaGoBook me-2" style={{fontSize: '16px', marginTop: '70px'}}>
                            <button className='custom-button-2' onClick={handleClose} style={{ width: '103px', marginRight: '10px', height: '47px', borderRadius: '10px' }}>
                                გაუქმება
                            </button>
                            <button className='custom-button' type="button" onClick={handleSubmit} style={{ width: '161px', borderRadius: '10px' }}>
                                დაამატე აგენტი
                            </button>
                        </Row>
                    </Form>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default AddAgent;
