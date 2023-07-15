import React, { useEffect, useState } from 'react'
import { getAllRoom } from '../../../redux/roomSlice'
import { getAllService } from '../../../redux/serviceSlice'
import { CardItemFirst } from '../components/card-item/CardItem'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import { useDispatch, useSelector } from 'react-redux'
import { getAllDestination } from '../../../redux/destinationSlice'

export default function UserHomePage() {
    const dispatch = useDispatch();
    const { destinations } = useSelector(state => state.destination);
    const [listDestination, setListDestination] = useState([]);
    
    const listImageRandom = [
        "https://www.anhdulich.vn/storage/sliders/slide4.jpg",
        "https://35express.org/wp-content/uploads/2020/01/hinh-anh-thap-rua-ho-guom-1.jpg",
        "https://res.klook.com/image/upload/q_85/c_fill,w_750/v1621916181/blog/f92h9yixqmatd5vbdv4n.jpg",
        "https://statics.vinpearl.com/du-lich-phu-quoc-2-ngay-1-dem-1_1645345403.jpg",
        "https://toquoc.mediacdn.vn/2019/5/3/thai-nguyen-15568686026931675250665.jpg",
        "https://thamhiemmekong.com/wp-content/uploads/2020/04/muicamau5.jpg",
        "https://images.vietnamtourism.gov.vn/vn/images/2017/DaLat.jpg",
        "https://amia.vn/wp-content/uploads/2017/09/tranh-phong-canh-vinh-ha-long-989-718x380.jpg",
        "https://vn.blog.kkday.com/wp-content/uploads/7-min.jpg",
        "https://wiki-travel.com.vn/Uploads/Post/myyen97-194528094519-du-lich-thanh-pho-ho-chi-minh.jpg",
        "https://photo-cms-sggp.zadn.vn/Uploaded/2022/ageslysofyr/2022_05_25/hinh1_dxxx.jpg",
        "https://images.squarespace-cdn.com/content/v1/5930dc9237c5817c00b10842/1507710422199-61H6KAP5447Z79LBMYAA/12.jpg?format=1000w",
        "https://thuongtruong-fileserver.nvcms.net/2019/02/du_l%E1%BB%8Bch_vn-14_15_58_634.jpg",
        "https://du-lich-da-lat.com/wp-content/uploads/2018/10/da-lat-thang-11.jpg",
        "https://www.sunlife.com.vn/content/dam/sunlife/regional/vietnam/images/du-lich-viet-nam-2020-1.jpg",
        "https://static.tapchitaichinh.vn/600x315/images/upload/tranhuyentrang/03052020/at_8-dia-diem-du-lich-viet-nam-dep-nhat-nam-2018_638fdfa9fc355a5e3c0967964d0f5867-1626.jpg",
        "https://dulichocean.vn/wp-content/uploads/2021/03/7.2._QUE_Garden_-_tieu_Nhat_Ban_giua_long_Da_Lat_1.jpg",
        "https://baoquocte.vn/stores/news_dataimages/lananh/092020/25/10/in_article/0508_giai-nhat-thuyen-hoa-1600926369.jpg?rt=20200925144306",
        "https://cdnimg.vietnamplus.vn/t620/uploaded/ngtnnn/2021_02_09/0902dulich.jpg",
        "http://anhnendep.net/wp-content/uploads/2016/03/anh-dep-du-lich-viet-nam-vietnam-travel-ha-long-bay-01.jpg"
    ]

    useEffect(() => {
        dispatch(getAllDestination());
        dispatch(getAllService());
        dispatch(getAllRoom());
    }, [dispatch])

    useEffect(() => {
        setListDestination([...destinations]);
    }, [destinations])

    return (
        <div className='user'>
            <Header type="search" />
            <div className="user-container container">
                {/* 1 */}
                <h1 className="user-home__title">Destination</h1>
                <div className='row'>
                    {listDestination.map((item, index) => {
                        return (
                            <div className='col-4 col-md-6 col-sm-12' key={index}>
                                <CardItemFirst item={item} img={listImageRandom[index]} />
                            </div>
                        )
                    })}
                </div>                
            </div>
            <Footer />
        </div>
    )
}
