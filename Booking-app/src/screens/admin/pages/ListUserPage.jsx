import React from 'react'
import DataTable from "../components/data-table/DataTable";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";

function ListUserPage({ columns, title, name }) {
    return (
        <div className="admin-list">
            <Sidebar />
            <div className="admin-list__container">
                <Navbar />
                <DataTable columns={columns} title={title} name={name} />
            </div>
        </div>
    )
}

export default ListUserPage;