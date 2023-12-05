import { useState, useEffect } from 'react';
import "../styles/Transfer.css";
import Select from "react-select";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getWallets } from '../features/wallets/walletSlice';
import { toWalletObject } from "../utils/walletUtil";

const CryptoTradingBoard = ( { onValueChange, onButtonClick } ) => {
    const dispatch = useDispatch();

    const { wallets } = useSelector((state) => state.wallets);
    const wallet = toWalletObject(wallets);

    const options = [
        { value: 'BTC', label: 'BTC' },
        { value: 'ETH', label: 'ETH' },
        { value: 'MATIC', label: 'MATIC' },
        { value: 'ARB', label: 'ARB' }
    ];
    const defaultOption = { value: 'BTC', label: 'BTC' };

    const [formData, setFormData] = useState({
        currency: 'BTC',
        amount: 0
    })

    const { currency, amount } = formData;

    useEffect(() => {
        dispatch(getWallets());
    }, [dispatch]);

    const balance = wallet[currency] && wallet[currency].balance ? wallet[currency].balance : 0;
    const toAddress = wallet[currency] && wallet[currency].address ? wallet[currency].address : '';

    const onAmountChange = (e) => {
        e.preventDefault();
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
        onValueChange(currency, e.target.value);
    }

    const onCurrencyChange = (selectedOption) => {
        setFormData((prevState) => ({
          ...prevState,
          currency: selectedOption.value,
        }));
        onValueChange(selectedOption.value, amount);
    };

    const onSubmit = (e) => {
        e.preventDefault()

        if (amount <= 0) {
            toast.info('Please enter amout ( > 0 ) that you want to transfer');
        } else if (!toAddress) {
            toast.info('Please create wallet first');
        } else {
            const data = {
                currency,
                toAddress,
                amount
            }
        
            onButtonClick(data);
        }
    }

    return (
        <section className="transfer-form">
            <h3 className='crypto-tranding-header'>Buy Crypto</h3>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <p className='transfer-form-label'>Currency</p>
                    <Select 
                        options={options} 
                        onChange={onCurrencyChange} 
                        defaultValue={defaultOption}
                        className='currency-select'
                    />
                    <p className='balance-info'>
                        balance: { balance.toFixed(6) }
                    </p>
                </div>
                <div className='form-group'>
                    <p className='transfer-form-label'>Amout </p>
                    <input
                    type='text'
                    className='form-control'
                    id='amount'
                    name='amount'
                    value={amount}
                    placeholder={`Enter amount you want to buy`}
                    onChange={onAmountChange}
                    />
                </div>
                <div className='form-group'>
                    <button type='submit' className='btn btn-block'>
                        Buy
                    </button>
                </div>
            </form>
        </section>
    )
}

export default CryptoTradingBoard;