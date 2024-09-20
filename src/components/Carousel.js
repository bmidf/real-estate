import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import CustomCard from './Card';
import { IoArrowForwardOutline, IoArrowBackOutline } from "react-icons/io5";
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

const Carousel = ({ currentRealEstateId, currentRegionId }) => {
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
                const filteredData = data.filter(realEstate => 
                    realEstate.id !== currentRealEstateId && realEstate.city.region.id === currentRegionId
                );
                setRelatedRealEstates(filteredData);
            } catch (error) {
                console.error('Error fetching related real estates:', error);
            }
        };

        fetchRelatedRealEstates();
    }, [currentRealEstateId, currentRegionId]);

    const showArrows = relatedRealEstates.length >= 4;

    const SamplePrevArrow = (props) => {
        const { className, onClick } = props;
        return showArrows ? (
            <div onClick={onClick} className={`arrow ${className}`}>
                <IoArrowBackOutline className="arrows" style={{ color: "black" }} />
            </div>
        ) : null;
    };

    const SampleNextArrow = (props) => {
        const { className, onClick } = props;
        return showArrows ? (
            <div onClick={onClick} className={`arrow ${className}`}>
                <IoArrowForwardOutline className="arrows" style={{ color: "black" }} />
            </div>
        ) : null;
    };

    const settings = {
        infinite: relatedRealEstates.length >= 4,
        speed: 500,
        slidesToShow: Math.min(4, relatedRealEstates.length),
        slidesToScroll: Math.min(4, relatedRealEstates.length),
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1620,
                settings: {
                    slidesToShow: Math.min(3, relatedRealEstates.length),
                },
            },
            {
                breakpoint: 1250,
                settings: {
                    slidesToShow: Math.min(2, relatedRealEstates.length),
                },
            },
            {
                breakpoint: 870,
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
