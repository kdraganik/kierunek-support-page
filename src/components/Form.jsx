import { useState } from 'react';
import styled from 'styled-components';

const Form = () => {
  const [status, setStatus] = useState('');
  const [showLoader, setShowLoader] = useState(false);

  const [amount, setAmount] = useState(1);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    setShowLoader(true);
    setStatus('');
  
    const data ={
      name: fullName,
      amount,
      email
    }

    try{
      const { redirectUrl } = await requestPayment(data);
      window.location.href = redirectUrl;
    }
    catch(err){
      console.log(err);
      setShowLoader(false);
      setStatus('ERR')
    }    
  }

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
    <Wrapper onSubmit={ handleSubmit }>
      <FormContainer>
        <InputsContainer>
          <InputBox>
            <LabelAmount>Kwota</LabelAmount>
            <InputAmount 
              value={ amount } 
              onChange={ handleAmountChange }
            />
            <CurrencyText valLen={ amount.toString().length }>zł</CurrencyText>
            <AmountButtonsBox>
              <DecreaseButton onClick={ () => Number(amount) > 1 ? setAmount( Number(amount) - 1) : setAmount(1) }/>
              <IncreaseButton onClick={ () => setAmount( Number(amount) + 1) }/>
            </AmountButtonsBox>
          </InputBox>
          <InputBox>
            <LabelName>Imię i nazwisko</LabelName>
            <InputName value={ fullName } onChange={ e => setFullName(e.currentTarget.value) } />
          </InputBox>
          <InputBox>
            <LabelEmail>E-mail</LabelEmail>
            <InputEmail value={ email } onChange={ e => setEmail(e.currentTarget.value) } />
          </InputBox>
        </InputsContainer>
        <Link href="./regulamin.html">Regulamin darowizn</Link>
        { 
          showLoader 
          ? <Loader><div></div><div></div><div></div><div></div></Loader>
          : <Button value="wspieram" /> 
        }
        {status === 'ERR' && (<p style={{textAlign: "center", marginTop: "1em", color: "red"}}>Coś poszło nie tak. Proszę spróbować ponownie.</p>)}
      </FormContainer>
    </Wrapper>
  );
}

const requestPayment = async (payload) => {
  const axios = require('axios');

  const { data } = await axios.post('/api/payment', payload);

  return data;
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  @media (max-width: 768px) { 
    align-items: center;
  }
`;

const FormContainer = styled.form`
  width: 75%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1em;

  @media (max-width: 1200px) { 
    width: 80%;
  }
  @media (max-width: 992px) { 
    width: 85%;
  }
`

const InputsContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 2em;
`;

const InputBox = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: .8em;
`;

const Label = styled.label`
  display: block;
  margin: .2em 0;
  font-weight: 600;
  font-size: .9em;
  text-transform: uppercase;
`;

const Input = styled.input.attrs({
  required: true
})`
  width: 100%;
  border: none;
  background: none;
  font-size: 1.8em;
  outline: none;
  z-index: 2;
  border-bottom: 1px solid #E8E3E0;
  
  :focus{
    border-bottom: 1px solid black;
  }

  :-webkit-autofill,
  :-webkit-autofill:hover, 
  :-webkit-autofill:focus, 
  :-webkit-autofill:active  {
    -webkit-box-shadow: 0 0 0 30px #E8E3E0 inset !important;
  }
`;

const LabelAmount = styled(Label).attrs({
  htmlFor: 'amount'
})``;

const InputAmount = styled(Input).attrs({
  id: 'amount',
  type: 'number',
})`
${props => props.value === '' ? 'border-bottom: 1px solid black;transform: translateY(-1px);' : ''}
  -moz-appearance: textfield;

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button{
    -webkit-appearance: none;
    margin: 0;
  }
`;

const LabelName = styled(Label).attrs({
  htmlFor: 'name'
})``;

const InputName = styled(Input).attrs({
  id: 'name',
  type: 'text'
})`
${props => props.value === '' ? 'border-bottom: 1px solid black;' : ''}  
`;

const LabelEmail = styled(Label).attrs({
  htmlFor: 'email'
})``;

const InputEmail = styled(Input).attrs({
  id: 'email',
  type: 'email'
})`
${props => props.value === '' ? 'border-bottom: 1px solid black;' : ''}
`;

const CurrencyText = styled.span`
  font-size: 1.8em;
  position: absolute;
  left: ${props => props.valLen * .92 + .3}ch;
  bottom: calc(-.18em + 1px);
  z-index: 1;
`;

const AmountButtonsBox = styled.div`
  position: absolute;
  height: 1.8em;
  right: 0;
  bottom: 0;
  display: flex;
  z-index: 3;
`;

const IncreaseButton = styled.div`
  position: relative;
  width: 1.5em;
  height: 1.5em;
  cursor: pointer;

  :before, :after{
    position: absolute;
    left: .75em;
    content: '';
    height: 1.5em;
    width: 2px;
    background-color: #231F20;
  }
  :before {
    transform: rotate(90deg);
  }
`;

const DecreaseButton = styled.div`
  position: relative;
  width: 1.5em;
  height: 1.5em;
  margin-right: .5em;
  cursor: pointer;

  :before {
    position: absolute;
    left: 0.75em;
    content: '';
    height: 1.5em;
    width: 2px;
    background-color: #231F20;
  }
  :before {
    transform: rotate(90deg);
  }
`;

const Link = styled.a`
  margin-top: .7em;
  color: #231F20;
`;

const Button = styled.button.attrs(
  {
    type: 'submit'
  }
)
`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 1.2em;
  width: 180px;
  height: 2.8em;
  font-weight: bold;
  cursor: pointer;
  border-radius: 2px;
  border: 2px solid #231F20;
  background-color: #E8E3E0;
  transition: all .3s ease-out;

  &:hover{
    background-color: #231F20;
    color: #E8E3E0;
  }
`

const Loader = styled.div`
  display: inline-block;
  position: relative;
  width: 4em;
  height: 4em;

  & div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
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