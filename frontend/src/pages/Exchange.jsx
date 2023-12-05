import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles/Exchange.css";
import Fiat from "../components/Fiat";

function Exchange() {
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);
    
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }

    }, [user, navigate]);

    return (
        <div className="exchange-container">
            <div className="exchange-content">
                <section className="fiat-block">
                    <Fiat />
                </section>
            </div>
        </div>
    )
}

export default Exchange