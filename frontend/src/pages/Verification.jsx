import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify'
import { verify, reset } from "../features/verification/verificationSlice";
import "../styles/Exchange.css";
import Spinner from '../components/Spinner';

function Verification() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        legalName : '',
        country: '',
        phone: '',
        identity: '',
    })

    const { legalName, country, phone, identity } = formData

    const { user } = useSelector((state) => state.auth);
    const { verification, isLoading, isError, isSuccess, message } = useSelector((state) => state.verification);
    
    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        
        if (!user) {
            navigate('/login');
        }

        if (isSuccess || verification) {
            navigate('/');
        }

        dispatch(reset())
    }, [user, verification, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
    }
    
    const onSubmit = (e) => {
        e.preventDefault()
    
        const verificationData = {
            legalName,
            country,
            phone,
            identity,
        }
    
        dispatch(verify(verificationData))
    }

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
        <section className='heading'>
          <h1>
            Verification
          </h1>
          <p>Please finish the following KYC process to use the platform.</p>
        </section>
  
        <section className='form'>
          <form onSubmit={onSubmit}>
            <div className='form-group'>
                <input
                  type='text'
                  className='form-control'
                  id='legalName'
                  name='legalName'
                  value={legalName}
                  placeholder='Enter your name as shown on your ID'
                  onChange={onChange}
                />
            </div>
            <div className='form-group'>
                <input
                  type='text'
                  className='form-control'
                  id='country'
                  name='country'
                  value={country}
                  placeholder='Enter your country or region of residence'
                  onChange={onChange}
                />
            </div>
            <div className='form-group'>
              <input
                type='number'
                className='form-control'
                id='phone'
                name='phone'
                value={phone}
                placeholder='Enter your phone number'
                onChange={onChange}
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                className='form-control'
                id='identity'
                name='identity'
                value={identity}
                placeholder='Enter your identity'
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
      </>
    )
}

export default Verification