import React from 'react';

const header = props => {
    return (
        <div style={{
            backgroundColor: 'lightgreen',
            textAlign : 'center',
            fontSize: '2rem'
        }}>
            <h3>
                Weather App
            </h3>
        </div>
    );
}

export default header;