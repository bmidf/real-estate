import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import CustomCard from './Card';
import { IoArrowForwardOutline, IoArrowBackOutline } from "react-icons/io5";
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

const Carousel = ({ currentRealEstateId }) => {
    const [relatedRealEstates, setRelatedRealEstates] = useState([]);

    useEffect(() => {
        const fetchRelatedRealEstates = async () => {
            try {
                const response = await fetch('https://api.real-estate-manager.redberryinternship.ge/api/real-estates', {
                    headers: {
                        'Authorization': 'Bearer 9cfc6240-ffc9-44ab-b4ed-b792a03c592f',
                    },
                });
                const data = await response.json();
                const filteredData = data.filter(realEstate => realEstate.id !== currentRealEstateId);
                setRelatedRealEstates(filteredData);
            } catch (error) {
                console.error('Error fetching related real estates:', error);
            }
        };

        fetchRelatedRealEstates();
    }, [currentRealEstateId]); 

    const SamplePrevArrow = (props) => {
        const { className, onClick } = props;
        return(
          <div onClick={onClick} className={`arrow ${className}`} >
            <IoArrowBackOutline className="arrows" style={{color:"black"}}/>
          </div>
        )
    }
  
    const SampleNextArrow = (props) => {
        const { className, onClick } = props;
        return(
          <div onClick={onClick} className={`arrow ${className}`} >
            <IoArrowForwardOutline className="arrows" style={{color:"black"}}/>
          </div>
        )
    }

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 992, 
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <Slider {...settings}>
            {relatedRealEstates.map((realEstate, index) => (
                <div key={index}>
                    <CustomCard realEstate={realEstate} />
                </div>
            ))}
        </Slider>
    );
};

export default Carousel;
