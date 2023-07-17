import React, { useEffect, useState } from 'react'
import Chart from '../components/charts/Chart'
import Navbar from '../components/navbar/Navbar'
import Sidebar from '../components/sidebar/Sidebar'
import TotalRevenue from '../components/total-revenue/TotalRevenue'
import WidgetItem from '../components/widget/WidgetItem'
import { useDispatch, useSelector } from 'react-redux'
import { getAllDestination } from '../../../redux/destinationSlice'
import { getAllRoom } from '../../../redux/roomSlice'
import { getAllManager } from '../../../redux/userSlice'
import { getAllService } from '../../../redux/serviceSlice'
import { getAllStatistical } from '../../../redux/statisticalSlice'
import roomApi from '../../../api/roomApi'
import statisticalApi from '../../../api/statisticalApi'

function AdminHomePage() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const [statisticalsByUser, setStatisticalsByUser] = useState([]);

  useEffect(() => {
    dispatch(getAllDestination());
    dispatch(getAllRoom());
    dispatch(getAllManager());
    dispatch(getAllService());
    dispatch(getAllStatistical());
  }, [dispatch])

  useEffect(() => {
    const getStatisticalByUser = async () => {
      const response = await roomApi.getRoomByUser(user?._id);

      if (response === undefined || response === null) {
        setStatisticalsByUser([]);
        return;
      } else {
        const response1 = await statisticalApi.getStatisticalByRoom(response?._id);
        if (response1?.length !== 0) {
          setStatisticalsByUser(response1);
        }
      }
    }
    getStatisticalByUser();
  }, [user])
  
  const totalRevenueByUser = statisticalsByUser.length > 0 ? [...statisticalsByUser].map(item => item?.total).reduce((prev, curr) => prev + curr, 0) : 0;

  return (
    <div className='admin'>
      <Sidebar />
      <div className="admin-container">
        <Navbar />
        <div className="list-widget">
          <WidgetItem type='user' />
          <WidgetItem type='order' />
          <WidgetItem type='room' />
          <WidgetItem type='total' total={totalRevenueByUser}/>
        </div>
        <div className="charts">
          <TotalRevenue total={totalRevenueByUser} />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
      </div>
    </div>
  )
}

export default AdminHomePage;