import React from 'react';

const Display = ({ items, moveHandler, mode, }) => {
    return (
        <div className='  col-6 border border-denger' style={{
            minHeight: "500px",
        }}>
            {
                items.map(
                    (items, i) => {
                        return <div key={i} className={`p-3 my-3 ${mode} text-white  position-relative`} >
                            {items}
                            <span key={i} className=' position-absolute fw-bold fs-5' onClick={(event) => {
                                event.stopPropagation();
                                moveHandler(i)

                            }} style={{
                                right: 10,
                                cursor: "pointer"
                            }}>X</span>
                        </div>

                    }
                )
            }

        </div>
    );
}

export default Display;
