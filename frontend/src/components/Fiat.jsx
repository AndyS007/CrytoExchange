import { useState, useEffect } from 'react';
import "../styles/Exchange.css";
import BraintreeDropIn from './Braintree';
import { calculateValue, getCoinPrice } from '../utils/walletUtil';
import CryptoTradingBoard from './CryptoTrandingBoard';
import { getCoins } from '../features/coins/coinSlice';
import { useDispatch, useSelector } from 'react-redux';

function Fiat() {
    const dispatch = useDispatch();
    const [showBraintreeDropIn, setShowBraintreeDropIn] = useState(false);
    const [value, setValue] = useState(0);
    const [buyData, setBuyData] = useState(null);

    const { coins } = useSelector((state) => state.coins);

    useEffect(() => {
        dispatch(getCoins());
    }, [dispatch]);

    const onValueChange = (currency, amount) => {
        const currentValue = calculateValue(coins, currency, amount);
        setValue(currentValue);
    }


    const onBuyButtonClick = (data) => {
        const buyData = {
            ...data,
            coinPrice: getCoinPrice(coins, 'usd', data.currency),
        }
        setBuyData(buyData);
        setShowBraintreeDropIn(true);
    }

    return (
        <section className="fiat-container">
            <div className='fiat-board'>
                <div className='exchange-block'>
                    <CryptoTradingBoard 
                        onValueChange={onValueChange} 
                        onButtonClick={onBuyButtonClick}
                    />
                    <div>Need: ${ value.toFixed(6) } </div>
                </div>
            </div>
            <BraintreeDropIn
                show={showBraintreeDropIn}
                onPaymentCompleted={() => {setShowBraintreeDropIn(false)}}
                buyData={buyData}
                />
        </section>
    )
}

export default Fiat;