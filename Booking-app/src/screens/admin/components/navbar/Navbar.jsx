import React, { useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { Menu, MenuItem } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { removeManager } from "../../redux/authSlice";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    dispatch(removeManager());
    localStorage.removeItem("managerInfo");
    navigate("/admin-login");
  }

  return (
    <div className="navbar">
      <div className="navbar-wrapper">
        <div className="navbar-wrapper__search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className="navbar-list">
          <div className="navbar-list__item">
            <LanguageOutlinedIcon sx={{ fontSize: '20px' }} />
            <span style={{ marginLeft: '5px' }}>English</span>
          </div>
          <div className="navbar-list__item">
            <DarkModeOutlinedIcon sx={{ fontSize: '20px' }} />
          </div>
          <div className="navbar-list__item">
            <FullscreenExitOutlinedIcon sx={{ fontSize: '20px' }} />
          </div>
          <div className="navbar-list__item">
            <NotificationsNoneOutlinedIcon sx={{ fontSize: '20px' }} />
            <div className="navbar-list__item-counter">1</div>
          </div>
          <div className="navbar-list__item">
            <ChatBubbleOutlineOutlinedIcon sx={{ fontSize: '20px' }} />
            <div className="navbar-list__item-counter">2</div>
          </div>
          <div className="navbar-list__item">
            <ListOutlinedIcon sx={{ fontSize: '20px' }} />
          </div>
          <div className="navbar-list__item">
            <h4
              style={{ cursor: 'pointer' }}
              aria-controls={open ? 'basic-menu' : undefined}
              onClick={handleClick}
            >
              {user?.username}
            </h4>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem>
                <Link to={`/admin/users/${user?._id}`} style={{ textDecoration: 'none', color: 'black' }}>My profile</Link>
              </MenuItem>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
}
