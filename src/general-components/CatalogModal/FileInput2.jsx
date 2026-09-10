import React from 'react';

const FileInput2 = ({ value, onChange }) => (
    <div>
        {/*{value && (<div>Selected files: {value.name}</div>)}*/}

        <label className={'yellow-but mb-3 h-30 w-30'}>
            <div style={{ fontSize: '14px' }}>
                {value ? value.name : '*Загрузить Изображение'}
            </div>
            <input
                multiple={false}
                style={{ display: 'none' }}
                type="file"
                onChange={(e) => onChange([...e.target.files])}
            />
        </label>
    </div>
);

export default FileInput2;
