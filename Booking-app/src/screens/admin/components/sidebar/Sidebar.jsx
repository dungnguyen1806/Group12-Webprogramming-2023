import React from 'react'
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { removeManager } from '../../redux/authSlice';

export default function Sidebar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);

    const logout = () => {
        dispatch(removeManager());
        localStorage.removeItem("managerInfo");
        navigate("/admin-login");
    }

    return (
        <div className="sidebar">
            <div className="sidebar-top">
                <Link to="/admin" style={{ textDecoration: "none" }}>
                    <span className="sidebar-top__logo">Booking Hotel</span>
                </Link>
            </div>
            <hr />
            <div className="sidebar-center">
                <ul>
                    <p className="sidebar-center__title">MAIN</p>
                    <Link to="/admin" style={{ textDecoration: "none" }}>
                        <li>
                            <DashboardIcon className="icon" />
                            <span>Dashboard</span>
                        </li>
                    </Link>
                    <p className="sidebar-center__title">LISTS</p>
                    {
                        user?.role === 'admin' && (

                            <Link to='/admin/users' style={{ textDecoration: "none" }}>
                                <li>
                                    <PersonOutlineIcon className="icon" />
                                    <span>Users</span>
                                </li>
                            </Link>

                        )
                    }
                    <Link to="/admin/rooms" style={{ textDecoration: "none" }}>
                        <li>
                            <StoreIcon className="icon" />
                            <span>Rooms</span>
                        </li>
                    </Link>
                    <Link to="/admin/services" style={{ textDecoration: "none" }}>
                        <li>
                            <RoomServiceIcon className="icon" />
                            <span>Services</span>
                        </li>
                    </Link>
                    {
                        user?.role === 'admin' && <>
                            <Link to="/admin/statistical" style={{ textDecoration: "none" }}>
                                <li>
                                    <StackedLineChartIcon className="icon" />
                                    <span>Statisticals Customer</span>
                                </li>
                            </Link>
                        </>
                    }
                    <p className="sidebar-center__title">USEFUL</p>
                    <li>
                        <InsertChartIcon className="icon" />
                        <span>Stats</span>
                    </li>
                    <li>
                        <NotificationsNoneIcon className="icon" />
                        <span>Notifications</span>
                    </li>
                    <p className="sidebar-center__title">SERVICE</p>
                    <li>
                        <SettingsSystemDaydreamOutlinedIcon className="icon" />
                        <span>System Health</span>
                    </li>
                    <li>
                        <PsychologyOutlinedIcon className="icon" />
                        <span>Logs</span>
                    </li>
                    <li>
                        <SettingsApplicationsIcon className="icon" />
                        <span>Settings</span>
                    </li>
                    <p className="sidebar-center__title">USER</p>
                    <li>
                        <AccountCircleOutlinedIcon className="icon" />
                        <span>Profile</span>
                    </li>
                    <li onClick={logout}>
                        <ExitToAppIcon className="icon" />
                        <span>Logout</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}
