import React from 'react'
import { useNavigate } from 'react-router-dom'

export function CardItemFirst({ item, img }) {
    const navigate = useNavigate();
    const handleSearch = async () => {
        navigate('/rooms',
            {
                state: {
                    destination: item?.name_location,
                }
            });
    }

    return (
        <div className='card-item' onClick={handleSearch} >
            <img src={img} alt="error" className="card-item__img" />
            <div className="card-item__props">
                <h2>{item?.name_location}</h2>
            </div>
        </div>
    )
}