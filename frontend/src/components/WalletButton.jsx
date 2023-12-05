import { useDispatch } from "react-redux";
import { createWallets } from "../features/wallets/walletSlice";

const WalletButton = ({ token }) => {
    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(createWallets(token));
    }

    return (
        <div className="btn-container">
            <button onClick={onSubmit} className='btn wallet-btn'>
                Create Wallet
            </button>
        </div>
    )
}

export default WalletButton;