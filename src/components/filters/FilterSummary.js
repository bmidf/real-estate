import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { IoCloseOutline } from "react-icons/io5";

const FilterSummary = ({ filters, onRemoveFilter }) => {
    const { regions, price, area, bedrooms } = filters;

    const renderButtonWithClose = (label, filterType, value) => (
        <button
            className="firaGoBook"
            style={{
                backgroundColor: 'transparent',
                borderRadius: '43px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                border: '1px solid #DBDBDB',
                marginRight: '5px',
                height: '29px',
                padding: '6px 10px 6px 10px'
            }}
        >
            {label}
            <span
                onClick={() => onRemoveFilter(filterType, value)}
                style={{
                    marginLeft: '10px',
                    cursor: 'pointer',
                    fontSize: '14px',
                }}
            >
                <IoCloseOutline/>
            </span>
        </button>
    );

    const renderRegions = () => {
        return regions.map(region => renderButtonWithClose(region, 'regions', region));
    };

    const renderPrice = () => {
        const minPrice = price.min ? `${price.min}₾` : '';
        const maxPrice = price.max ? `${price.max}₾` : '';
        if (minPrice || maxPrice) {
            return renderButtonWithClose(`${minPrice} ${minPrice && maxPrice ? '-' : ''} ${maxPrice}`, 'price', {});
        }
    };

    const renderArea = () => {
        const minArea = area.min ? `${area.min} მ²` : '';
        const maxArea = area.max ? `${area.max} მ²` : '';
        if (minArea || maxArea) {
            return renderButtonWithClose(`${minArea} ${minArea && maxArea ? '-' : ''} ${maxArea}`, 'area', {});
        }
    };

    const renderBedrooms = () => {
        if (bedrooms) {
            return renderButtonWithClose(`${bedrooms}`, 'bedrooms', '');
        }
    };

    return (
        <Row className="mb-2 align-items-center" style={{marginTop: '6px'}}>
            <Col style={{fontSize: '14px'}}>
                {renderRegions()} {renderPrice()} {renderArea()} {renderBedrooms()}
            </Col>
        </Row>
    );
};

export default FilterSummary;
