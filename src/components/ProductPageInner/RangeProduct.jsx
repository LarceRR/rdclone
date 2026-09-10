import React, { useState, useEffect } from 'react';
import { Range } from 'react-range';
import { isDisabled } from 'bootstrap/js/src/util/index.js';
import { useResize } from '../../hooks/useRisize.js';

const RangeProduct = () => {
    const [values, setValues] = React.useState([50]);

    const screenWidth = useResize();

    return screenWidth < 510 ? (
        <span>{`${values}%`}</span>
    ) : (
        <Range
            step={0.1}
            min={0}
            max={100}
            values={values}
            onChange={(values) => setValues(values)}
            disabled={true}
            renderTrack={({ props, children }) => (
                <div
                    {...props}
                    style={{
                        ...props.style,

                        // position: "absolute",
                        height: '6px',
                        width: '70%',
                        backgroundColor: '#333333',
                        // left:"55%",
                        // top: "65%",
                    }}
                >
                    {children}
                </div>
            )}
            renderThumb={({ props }) => (
                <div
                    {...props}
                    key={props.key}
                    style={{
                        ...props.style,
                        height: '10px',
                        width: '5px',
                        backgroundColor: '#ffcc33',
                    }}
                >
                    {' '}
                    <span
                        style={{ top: '10px', left: '-6px' }}
                    >{`${values}%`}</span>{' '}
                </div>
            )}
        />
    );
};

export default RangeProduct;
