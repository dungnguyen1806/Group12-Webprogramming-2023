import React, { useState } from 'react'
import { Bed } from '@mui/icons-material'
import { Button } from '@mui/material'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchData } from '../../../../redux/searchSlice'

export default function Header({ type }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [destination, setDestination] = useState("");    

    const handleSubmit = () => {
        const values = {
            destination,
        }
        dispatch(setSearchData(values));
        navigate('/homestays', { state: values });
    }

    return (
        <div className='header'>
            <div className={`${type === "search" ? "container header-has-search" : "container"}`}>
                <div className="header-top">
                    <h2><Link to='/'>Booking Hotel</Link></h2>
                    {/* <div className="header-top__right">
                        <Button variant='contained' size='small' sx={{ marginRight: 1}}>login</Button>
                        <Button color='success' variant='contained' size='small'>register</Button>
                    </div> */}
                </div>
                {type === "search" && <>
                    <div className="header-center">
                        <h3>best quantity - best price</h3>
                        <p>We give you a lovely welcome, everytime you come back</p>
                    </div>
                    <div className="header-search">
                        <div className="header-search__item">
                            <Bed color='disabled' />
                            <input
                                type="text"
                                placeholder="Where are you going?"
                                className="header-search__input"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                            />
                        </div>                       
                        <div className="header-search__item search-btn">
                            <Button
                                color='success'
                                variant='contained'
                                size='small'
                                onClick={handleSubmit}
                            >
                                Search
                            </Button>
                        </div>
                    </div>
                </>}
            </div>
        </div>
    )
}
