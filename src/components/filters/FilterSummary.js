import React from 'react';
import { Row, Col } from 'react-bootstrap';

const FilterSummary = ({ filters }) => {
    const { regions, price, area, bedrooms } = filters;

    const renderRegions = () => {
        if (regions.length > 0) {
            return (
                <button 
                    className="firaGoBook"
                    style={{
                        backgroundColor: 'transparent',
                        borderRadius: '30px',
                        padding: '5px',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        border: '1px solid #DBDBDB'
                    }}
                >
                {regions.join(', ')}
            </button>
            );
        }
    };

    const renderPrice = () => {
        const minPrice = price.min ? `${price.min}₾` : '';
        const maxPrice = price.max ? `${price.max}₾` : '';
        if (minPrice || maxPrice) {
            return (
                <button 
                    className="firaGoBook"
                    style={{
                        backgroundColor: 'transparent',
                        borderRadius: '30px',
                        padding: '5px',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        border: '1px solid #DBDBDB'
                    }}
                >
                    {minPrice} {minPrice && maxPrice ? '-' : ''} {maxPrice}
                </button>
            );
        }
    };

    const renderArea = () => {
        const minArea = area.min ? `${area.min} მ²` : '';
        const maxArea = area.max ? `${area.max} მ²` : '';
        if (minArea || maxArea) {
            return (
                <button 
                    className="firaGoBook"
                    style={{
                        backgroundColor: 'transparent',
                        borderRadius: '30px',
                        padding: '5px',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        border: '1px solid #DBDBDB'
                    }}
                >
                    {minArea} {minArea && maxArea ? '-' : ''} {maxArea}
                </button>
            );
        }
    };

    const renderBedrooms = () => {
        if (bedrooms) {
            return (
                <button 
                    className="firaGoBook"
                    style={{
                        backgroundColor: 'transparent',
                        borderRadius: '30px',
                        padding: '5px',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        border: '1px solid #DBDBDB'
                    }}
                >
                    {bedrooms}
                </button>
            );
        }
    };

    return (
        <Row className="mb-2 align-items-center" style={{marginTop: '6px'}}>
            <Col>
                {renderRegions()} {renderPrice()} {renderArea()} {renderBedrooms()}
            </Col>
        </Row>
    );
};

export default FilterSummary;
