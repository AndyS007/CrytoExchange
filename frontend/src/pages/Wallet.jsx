import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../styles/Wallet.css";
import UserBoard from "../components/UserBoard";
import AssetBoard from "../components/AssetBoard";
import Spinner from '../components/Spinner';
import { getWallets, reset } from "../features/wallets/walletSlice";
import WalletButton from "../components/WalletButton";

function Wallet() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { wallets, isLoading, isError, message } = useSelector((state) => state.wallets);
    
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }

        dispatch(getWallets());
    }, [user, navigate, isError, message, dispatch]);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            {!user ? 
            null :
            <>
                <UserBoard user={user}/>
                { wallets.length > 0 ? 
                    <AssetBoard wallets={wallets}/> 
                    :
                    <>
                        <WalletButton token={user.token}/>
                        <h2 className="wallet-info">You haven't create wallet yet.</h2>
                    </>
                }
            </>
        }
        </>
    )
}

export default Wallet