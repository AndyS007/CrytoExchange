import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../styles/Transfer.css";
import TransferBoard from "../components/TransferBoard";
import TransferHistoryBoard from "../components/TransferHistoryBoard";
import Spinner from '../components/Spinner';
import { getTransfers } from "../features/transfers/transferSlice";
import { toast } from "react-toastify";

function Transfer() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { transfers, isLoading, message, isError, isCreateFailed, isCreateSuccess} = useSelector(
        (state) => state.transfers
      )

    useEffect(() => {
        if (isCreateFailed) {
            toast.error(`Transfer failed. ${message}`);
        }

        if (isCreateSuccess) {
            toast.success('Transfer Successfully.');
        }
        if (!user) {
            navigate('/login');
        }

        dispatch(getTransfers());
    }, [user, navigate, message, dispatch, isError, isCreateFailed, isCreateSuccess]);


    if (isLoading) {
        return <Spinner />;
    }

    return (
        user ?          
        <div className="transfer-container">
            <div className="transfer-content">
                <section className="transfer-block">
                    <p className="transfer-label">Transfer</p>
                    <TransferBoard />
                </section>
                <section className="history-block">
                    <p className="transfer-label">History</p>
                    <TransferHistoryBoard transfers={transfers}/>
                </section>
            </div>
        </div> 
        : 
        null
    )
}

export default Transfer