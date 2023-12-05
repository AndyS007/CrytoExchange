import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles/Transaction.css";
import TransactionBoard from "../components/TransactionBoard";
import TradingBoard from "../components/TradingBoard";

function Transaction() {
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);
    
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    return (
        <div className="transaction-container">
            <div className="transaction-content">
                <section className="trade-block">
                    <p className="trading-label">Trading</p>
                    <TradingBoard />
                </section>
                <section className="history-block">
                    <p className="history-label">History</p>
                    <TransactionBoard />
                </section>
            </div>
        </div>
    )
}

export default Transaction