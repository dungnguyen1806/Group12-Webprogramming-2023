import React from 'react'
import AddNewService from '../components/add-new/AddNewService'
import Navbar from '../components/navbar/Navbar'
import Sidebar from '../components/sidebar/Sidebar'

function AddServicePage() {
    return (
        <div className='add-new'>
            <Sidebar />
            <div className="add-new__container">
                <Navbar />
                <div className='p-2'>
                    <h2 className='add-new__title'>add service</h2>
                    <AddNewService />
                </div>
            </div>
        </div>
    )
}

export default (AddServicePage);