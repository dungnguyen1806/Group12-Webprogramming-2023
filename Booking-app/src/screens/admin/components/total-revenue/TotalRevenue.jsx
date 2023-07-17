import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { useSelector } from 'react-redux'

const TotalRevenue = ({ total }) => {
    const user = useSelector(state => state.auth.user);
    const { statisticals } = useSelector(state => state.statistical);

    const dayDiff = (firstDate, secondDate) => {
        const startDay = new Date(firstDate);
        const endDay = new Date(secondDate);
        const milis = startDay.getTime() - endDay.getTime();
        const day = milis / (1000 * 3600 * 24);

        return Math.round(Math.abs(day));
    }

    const totalRevenue = [...statisticals].map(item => item?.total* +dayDiff(item?.timeCome, item?.timeLeave)).reduce((prev, curr) => prev + curr, 0);

    return (
        <div className="total-revenue">
            <div className="total-revenue__top">
                <h1 className="title">Total Revenue</h1>
                <MoreVertIcon fontSize="small" />
            </div>
            <div className="total-revenue__bottom">
                <div className="cir-progressbar">
                    <CircularProgressbar value={total === 0 ? 0 : 70} text={total === 0 ? "0%" : "70%"} strokeWidth={5} />
                </div>
                <p className="title">Total sales made today</p>
                <p className="amount">$
                    {user?.role === 'admin' ? `${totalRevenue}` : total}
                </p>
                <p className="desc">
                    Previous transactions processing. Last payments may not be included.
                </p>
                <div className="summary">
                    <div className="item">
                        <div className="item-title">Target</div>
                        <div className="item-result negative">
                            <KeyboardArrowDownIcon fontSize="small" />
                            <div>$12.4k</div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="item-title">Last Week</div>
                        <div className="item-result positive">
                            <KeyboardArrowUpOutlinedIcon fontSize="small" />
                            <div>$12.4k</div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="item-title">Last Month</div>
                        <div className="item-result positive">
                            <KeyboardArrowUpOutlinedIcon fontSize="small" />
                            <div>$12.4k</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TotalRevenue;
