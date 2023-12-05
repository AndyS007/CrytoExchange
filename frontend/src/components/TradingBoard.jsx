import { useState } from 'react';
import "../styles/Transaction.css";

const TradingBoard = () => {
    const [formData, setFormData] = useState({
        fromCurrency: '',
        toCurrency: '',
        fromAmount: 0,
        toAmount: 0
    })

    const { fromCurrency, toCurrency, fromAmount, toAmount } = formData

    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
    
        const tradingData = {
            fromCurrency,
            toCurrency,
            fromAmount,
            toAmount
        }
    
        console.log(tradingData);
    }

    return (
        <section className="form trading-form">
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <p className='trading-form-label'>from</p>
                    <input
                    type='text'
                    className='form-control'
                    id='fromAmount'
                    name='fromAmount'
                    value={fromAmount}
                    placeholder='Enter amount you want to trade'
                    onChange={onChange}
                    />
                </div>
                <div className='form-group'>
                    <p className='trading-form-label'>to</p>
                    <input
                    type='text'
                    className='form-control'
                    id='toAmount'
                    name='toAmount'
                    value={toAmount}
                    placeholder='To amount'
                    onChange={onChange}
                    />
                </div>
                <div className='form-group'>
                    <button type='submit' className='btn btn-block'>
                        Submit
                    </button>
                </div>
            </form>
        </section>
    )
}

export default TradingBoard;