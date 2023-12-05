import { useEffect, useState } from 'react';
// import { env } from 'process';
import axios from 'axios';
import Spinner from './Spinner';
import "../styles/Exchange.css";
import dropin from "braintree-web-drop-in"
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { getWallets } from '../features/wallets/walletSlice';

function BraintreeDropIn(props){
    const dispatch = useDispatch();
    const { show, onPaymentCompleted } = props;
    const { buyData } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [braintreeInstance, setBraintreeInstance] = useState(undefined);

    useEffect(() => {
        if (show) {
            const initBraintree = () => dropin.create({
                authorization: "sandbox_tvyt7y3z_qhv78knk96njfhdg",
                container: "#dropin-container",
            }, function(error, instance) {
                if (error) {
                    console.log(error);
                    return;
                }
                setBraintreeInstance(instance);
            });
            
            if (braintreeInstance) {
                braintreeInstance.teardown().then(() => {
                    initBraintree();
                });
            } else {
                initBraintree();
            }
        } else {
            setBraintreeInstance(undefined);
        }
    }, [show]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if(!braintreeInstance){
            console.log("Braintree not initialized");
            return;
        }

        braintreeInstance.requestPaymentMethod((error, payload) => {
            if(error){
                console.log(error);
                return;
            }else{
                setIsLoading(true);
                axios.post('/api/checkout', {
                    paymentMethodNonce: payload.nonce,
                    ...buyData
                })
                    .then((response) => {
                        toast.success(`Buy ${buyData.amount} ${buyData.currency} Successfully! Pay ${(buyData.amount * buyData.coinPrice).toFixed(6)} dollar`);
                        setIsLoading(false);
                        dispatch(getWallets());
                    })
                    .catch((error) => {
                        toast.error('Buy Crypto failed!');
                        setIsLoading(false);
                    });

                    onPaymentCompleted();
            }
        });
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className={'braintree-dropIn-container'}>
            <div id={"dropin-container"}/>
            {braintreeInstance && 
                <button 
                    className={"btn btn-block"}
                    type="primary"
                    onClick={ handleSubmit }
                >
                    {"Pay"}
                </button>
            }
        </div>
    )
}

export default BraintreeDropIn;