import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "../styles/Transfer.css";
import Select from "react-select";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { createTransfer } from '../features/transfers/transferSlice';
import { getWallets } from '../features/wallets/walletSlice';
import { toWalletObject } from "../utils/walletUtil";

const TransferBoard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
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
        amount: 0,
        toUser: ''
    })

    const { currency, amount, toUser } = formData;

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }

        dispatch(getWallets());
    }, [dispatch]);

    const balance = wallet[currency] && wallet[currency].balance ? wallet[currency].balance : 0;
    const fromAddress = wallet[currency] && wallet[currency].address ? wallet[currency].address : '';

    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
    }

    const onCurrencyChange = (selectedOption) => {
        setFormData((prevState) => ({
          ...prevState,
          currency: selectedOption.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault()

        if (amount <= 0) {
            toast.info('Please enter amout ( > 0 ) that you want to transfer');
        } else if (amount > balance) {
            toast.info('Amount could not > balance');
        } else if (!toUser) {
            toast.info('Please enter a user email');
        } else if (!fromAddress) {
            toast.info('Please create wallet first');
        } else {
            const transferData = {
                currency,
                fromAddress,
                amount,
                toUser
            }
        
            dispatch(createTransfer(transferData));
        }
    }

    return (
        <section className="transfer-form">
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
                    placeholder='Enter amount you want to transfer'
                    onChange={onChange}
                    />
                </div>
                <div className='form-group'>
                    <p className='transfer-form-label'>To User</p>
                    <input
                    type='email'
                    className='form-control'
                    id='toUser'
                    name='toUser'
                    value={toUser}
                    placeholder='Enter user email you want to transfer to'
                    onChange={onChange}
                    />
                </div>
                <div className='form-group'>
                    <button type='submit' className='btn btn-block'>
                        Transfer
                    </button>
                </div>
            </form>
        </section>
    )
}

export default TransferBoard;