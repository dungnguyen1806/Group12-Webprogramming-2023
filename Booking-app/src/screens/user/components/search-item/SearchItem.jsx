import React from 'react'
import { Link } from 'react-router-dom'

export default function SearchItem({ item }) {
    const imagesRandom = [
        "https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=",
        "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
        "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
        "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
        "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg",
    ];

    const number = Math.floor(Math.random() * imagesRandom.length);
    
    return (
        <div className='search-item'>
            <img src={imagesRandom[number]} alt="search-img"/>
            <div className='search-item__desc'>
                <h1 className='desc-name'>{item?.type_of_room}</h1>
                <span className="desc-distance">300m from center</span>
                <span className="desc-taxi">Free airport taxi</span>
                <span className="desc-subtitle">
                    Studio Apartment with Air conditioning
                </span>
                <span className="desc-feature">Entire studio, 1 bathroom 21m<sup>2</sup> full bed</span>
                <span className="desc-cancel">Free cancellation</span>
                <span className="desc-cancel-subtitle">
                    You can cancel later, so lock in this great price today!
                </span>
            </div>
            <div className="search-item__detail">
                <div className="detail-rating">
                    <span>Excellent</span>
                    <button>7.4</button>
                </div>
                <div className="detail-text">
                    <p>
                        <b style={{ fontSize: '22px'}}>${item?.cost_per_day}</b> night
                    </p>                
                    <span className="detail-text__tax">Includes taxes and fees</span>
                    <Link to={`/homestays/${item._id}`}>
                        <button className="detail-text__btn">See availability</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
