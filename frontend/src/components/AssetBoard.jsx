import { useSelector, useDispatch } from "react-redux";
import { getCoins, reset } from "../features/coins/coinSlice";
import { useEffect } from "react";
import btcIcon from "../assets/bitcoin.webp";
import ethIcon from "../assets/ethereum.webp";
import maticIcon from '../assets/matic-icon.webp';
import arbIcon from '../assets/arb.webp';
import "../styles/Wallet.css";

const AssetBoard = ( {wallets} ) => {
    const dispatch = useDispatch();

    const { coins } = useSelector((state) => state.coins);

    useEffect(() => {
        dispatch(getCoins());
        return () => {
            dispatch(reset());
        }
    }, [dispatch]);

    const walletDetails = [];
    let totalValue = 0;
    wallets.forEach((wallet) => {
        switch (wallet.currency) {
            case 'BTC':
                const btcWallet = {
                    currency: wallet.currency,
                    balance: wallet.balance,
                    value: wallet.balance * coins['bitcoin'].hkd,
                    address: wallet.address,
                    imgSrc: btcIcon
                }
                totalValue += btcWallet.value;
                walletDetails.push(btcWallet);
                break;
            case 'ETH':
                const ethWallet = {
                    currency: wallet.currency,
                    balance: wallet.balance,
                    value: wallet.balance * coins['ethereum'].hkd,
                    address: wallet.address,
                    imgSrc: ethIcon
                }
                totalValue += ethWallet.value;
                walletDetails.push(ethWallet);
                break;
            case 'MATIC':
                const maticWallet = {
                    currency: wallet.currency,
                    balance: wallet.balance,
                    value: wallet.balance * coins['matic-network'].hkd,
                    address: wallet.address,
                    imgSrc: maticIcon
                }
                totalValue += maticWallet.value;
                walletDetails.push(maticWallet);
                break;
            case 'ARB':
                const arbWallet = {
                    currency: wallet.currency,
                    balance: wallet.balance,
                    value: wallet.balance * coins['arbitrum'].hkd,
                    address: wallet.address,
                    imgSrc: arbIcon
                }
                totalValue += arbWallet.value;
                walletDetails.push(arbWallet);
                break;
        }
    }) 

    let walletList = null;
    if (walletDetails.length > 0) {
        walletList = walletDetails.map(wallet => (
            <tr key={wallet.address}>
                <td>
                    <span style={{ display: "flex",  alignItems: "center", justifyContent: "start" }}>
                        <img src={wallet.imgSrc} className="coin-icon"/>
                        <span className="coin-label">{wallet.currency}</span>
                    </span>
                </td>
                <td>{wallet.balance.toFixed(6)}</td>
                <td>{wallet.value.toFixed(6)}</td>
            </tr>
        ))
    } 

    return (
        <section className="assets-container">
            <div className="assets-block">
                <div className="value-block">
                    <div className="info-label">
                        Total Value (HKD):
                    </div>
                    <div className="value-content">
                        { totalValue.toFixed(6) }
                    </div>
                </div>
                <div className="currency-block">
                    <table>
                        <thead>
                            <tr className="info-label">
                                <th>Currency</th>
                                <th>Balance</th>
                                <th>Value (HKD)</th>
                            </tr>
                        </thead>
                        <tbody>
                            { walletList }
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}

export default AssetBoard;