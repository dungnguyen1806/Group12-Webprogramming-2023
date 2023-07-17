import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import roomApi from '../../../api/roomApi';
import { calDiffDates } from '../../../utils/calDiffDates';
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'

export default function HotelDetail(props) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [room, setRoom] = useState(null);
    const numNight = calDiffDates(props.dates[0].startDate, props.dates[0].endDate);

    const photos = [
        "https://luxurynhatle.muongthanh.com/images/hotels/rooms/original/1-giuong_1678439248.jpg",
        "https://luxurynhatle.muongthanh.com/images/rooms/2023/03/10/original/z4171313190619_90c1f42c0f552fb6a3ab7eabf46898a5_1678439245.jpg",
        "https://luxurynhatle.muongthanh.com/images/rooms/2023/03/10/original/z4171312347166_18bdb79a501fa6ae7bd7b009df19849b_1678439161.jpg",
        "https://luxurynhatle.muongthanh.com/images/rooms/2023/03/10/original/z4171312177603_072e5bad4bace80032ebb31565dca3ff_1678439190.jpg",
        "https://luxurynhatle.muongthanh.com/images/rooms/2023/03/10/original/z4171312905406_00735fbb992d38e170e3f61c2d78a1ae_1678439234.jpg",
    ]

    useEffect(() => {
        const getRoom = async() => {
            const response = await roomApi.getRoomById(id);
            setRoom(response);
        }

        getRoom();
    }, [id])

    return (
        <div>
            <Header />
            <div className="container hotel-detail">
                <div className="hotel-detail__top">
                    <div className="hotel-detail__top-left">
                        <h2>{room?.type_of_room}</h2>
                        {/* <div className="hotel-address">
                            <LocationOn fontSize='18' />
                            <span>{room?.address}</span>
                        </div> */}
                        <p className="hotel-distance">
                            Excellent location - 300m from center
                        </p>
                        <p className="hotel-price">
                            Book a stay over ${room?.cost_per_day * numNight} at this property and get a
                            free airport taxi
                        </p>
                    </div>                    
                </div>    
                <div className="row detail-img">
                    {photos.map((photo, index) => (
                        <div className='col-3 col-md-4 col-sm-6 mb-1' key={index}>
                            <img src={photo} alt="" className="hotel-image-item" />
                        </div>
                    ))}
                </div>
                <div className="hotel-detail__bottom">
                    <div className="hotel-detail__bottom-text">
                        <h3>Stay in the heart of city</h3>
                        <p className="desc-detail-hotel">
                            {room?.other_information}
                        </p>
                    </div>
                    <div className="hotel-detail__bottom-price">
                        <h3>Property Highlights</h3>
                        <span>
                            Highly rated by recent guests (9.0)
                        </span>
                        <p>
                            <b style={{ fontSize: '22px'}}>${room?.cost_per_day * numNight}</b> 
                            {" "}({numNight}{" "}nights)
                        </p>
                        <button
                            className='book-now'
                            onClick={() => navigate('/booking', { state: { price: room?.cost_per_day, id_room: id }})}
                        >
                            Reserve or Book Now!
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
