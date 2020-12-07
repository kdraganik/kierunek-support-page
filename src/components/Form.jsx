import styled from 'styled-components';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51Hv3gHBv2MyjoHSJroyyc5ztvGhTYIjNEdV4eVIf2pKfFcfZtJE1xP6W1FhzTJBUOTiXVPgLeDfjAEa8PiHVMen400OIuPN5CX');

const Form = () => {

  const [showLoader, setShowLoader] = useState(false);
  const [amount, setAmount] = useState(1);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowLoader(true);
    const data = {
      amount
    }

    const stripe = await stripePromise;

    const response = await fetch('/api/create-checkout', { 
      method: 'POST',
      body: JSON.stringify(data)
    });

    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error.message);
    }
  };

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/^0+/, '') || 0;
    if(value < 0){
      setAmount(0)
    }
    else{
      setAmount(value);
    }
	};

  return (
    <Wrapper onSubmit={handleSubmit}>
        <AmountInputBox>
          <DecreaseButton onClick={ () => amount > 1 ? setAmount( amount - 1) : setAmount(1) }/>
          <AmountInput value={ amount } onChange={ handleAmountChange } style={{width: amount.toString().length + 1 + 'ch'}}/>
          <CurrencyText>zł</CurrencyText>
          <IncreaseButton onClick={ () => setAmount( amount + 1) }/>
        </AmountInputBox>
        <DropdownInputBox>
          <DropdownInput>
            <option value="mostImportant">Najbardziej pilny cel</option>
            <option value="sprzet">Sprzęt do streamowania</option>
            <option value="poczatek">Konferencja Początek</option>
          </DropdownInput>
        </DropdownInputBox>
        { showLoader ? 
          <Loader><div></div><div></div><div></div><div></div></Loader> :
          <SubmitButton value="Wspieram" /> 
        }
    </Wrapper>
  )
}

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  @media (min-width: 600px) { width: 60% }
  @media (min-width: 768px) { width: 40% }
  @media (min-width: 1200px) { width: 25% }
`;

const AmountInputBox = styled.div`
  display: flex;
  align-items: center;
`;

const AmountInput = styled.input.attrs({
  type: 'number'
})`
  width: 1ch;
  font-size: 3rem;
  border: none;
  outline: none;
  text-align: center;

  ::-webkit-inner-spin-button, 
  ::-webkit-outer-spin-button { 
    -webkit-appearance: none; 
    margin: 0; 
  }
`;

const CurrencyText = styled.div`
  font-size: 3rem;
`;

const IncreaseButton = styled.div`
  position: relative;
  width: 2rem;
  height: 2rem;
  margin-left: .8rem;

  :before, :after{
    position: absolute;
    left: 1rem;
    content: '';
    height: 2rem;
    width: 2px;
    background-color: #231F20;
  }

  :before {
    transform: rotate(90deg);
  }
`;

const DecreaseButton = styled.div`
  position: relative;
  width: 2rem;
  height: 2rem;

  :before {
    position: absolute;
    left: 1rem;
    content: '';
    height: 2rem;
    width: 2px;
    background-color: #231F20;
  }

  :before {
    transform: rotate(90deg);
  }
`;

const DropdownInputBox = styled.div`
  display: flex;
  align-items: center;
`;

const DropdownInput = styled.select`
  margin: 1.5rem 0;
  border: none;
  font-size 2rem;
  > option{
    text-align: center;
  }
`;

const SubmitButton = styled.input.attrs({
    type: 'submit'
})`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 1.2rem;
  width: 180px;
  height: 2.8rem;
  font-weight: bold;
  cursor: pointer;
  border-radius: 2px;
  border: 2px solid #231F20;
  background-color: #fff;
  transition: all .3s ease-out;

  &:hover{
    background-color: #231F20;
    color: #fff;
  }
`

const Loader = styled.div`
  display: inline-block;
  position: relative;
  width: 4rem;
  height: 4rem;

  & div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 2px;
    background: #231F20;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }

  div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
  }

  div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
  }

  div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
  }

  div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
  }

  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }

  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }
`;

export default Form;