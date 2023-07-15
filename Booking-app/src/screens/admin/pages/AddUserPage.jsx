import React from 'react'
import AddNewUser from '../components/add-new/AddNewUser'
import Navbar from '../components/navbar/Navbar'
import Sidebar from '../components/sidebar/Sidebar'

function AddUserPage() {
    return (
        <div className='add-new'>
            <Sidebar />
            <div className="add-new__container">
                <Navbar />
                <div className='p-2'>
                    <h2 className='add-new__title'>Add user</h2>
                    <AddNewUser />
                </div>
            </div>
        </div>
    )
}

export default (AddUserPage);
