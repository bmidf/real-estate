import React from 'react';
import { Row, Col } from 'react-bootstrap';

const FilterSummary = ({ filters }) => {
    const { regions, price } = filters;

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


    return (
        <Row className="mb-2 align-items-center" style={{marginTop: '6px'}}>
            <Col>
                {renderRegions()} {renderPrice()}
            </Col>
        </Row>
    );
};

export default FilterSummary;
