import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'

const WidgetItem = ({ type, total }) => {
    let data;
    const { statisticals } = useSelector(state => state.statistical);
    const { managers } = useSelector(state => state.manager);
    const { rooms } = useSelector(state => state.room);
    const user = useSelector(state => state.auth.user);

    const diff = 20;

    const totalRevenue = [...statisticals].map(item => item?.total).reduce((prev, curr) => prev + curr, 0);
    
    switch (type) {
        case "user":
            data = {
                title: "USERS",
                isMoney: false,
                name: "See all users",
                link: "/admin/users",
                icon: (
                    <PersonOutlinedIcon
                        className="widget-icon"
                        style={{ color: "crimson", backgroundColor: "rgba(255, 0, 0, 0.2)" }}
                    />
                ),
                amount: managers?.length
            };
            break;
        case "order":
            data = {
                title: "ORDERS",
                isMoney: false,
                name: "View all orders",
                link: "/admin/statistical",
                icon: (
                    <ShoppingCartOutlinedIcon
                        className="widget-icon"
                        style={{ backgroundColor: "rgba(218, 165, 32, 0.2)", color: "goldenrod" }}
                    />
                ),
                amount: statisticals?.length
            };
            break;
        case "homestay":
            data = {
                title: "HOMESTAYS",
                isMoney: false,
                name: "View all homestays",
                link: "/admin/homestays",
                icon: (
                    <AccountBalanceWalletOutlinedIcon
                        className="widget-icon"
                        style={{ backgroundColor: "rgba(128, 0, 128, 0.2)", color: "purple" }}
                    />
                ),
                amount: rooms?.length
            };
            break;
        case "total":
            data = {
                title: "TOTAL",
                isMoney: true,
                link: "See details",
                icon: (
                    <MonetizationOnOutlinedIcon
                        className="widget-icon"
                        style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
                    />
                ),                
                amount: user?.role === 'admin' ? `${totalRevenue}` : total
            };
            break;
        default:
            break;
    }

    return (
        <div className="list-widget__item">
            <div className="list-widget__item-left">
                <span className="widget-title">{data?.title}</span>
                <span className="widget-counter">
                    {data?.isMoney && "$"} {data?.amount}
                </span>
                <Link to={data?.link} style={{ textDecoration: 'none', color: '#333'}}>
                    <span className="widget-link">{data?.name}</span>
                </Link>
            </div>
            <div className="list-widget__item-right">
                <div className="widget-percent positive">
                    <KeyboardArrowUpIcon />
                    {diff} %
                </div>
                {data?.icon}
            </div>
        </div>
    );
};

export default WidgetItem;
