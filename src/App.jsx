import styled from 'styled-components';
import { useState } from 'react';

import InputElement from './Input';

const App = () => {
  const [status, setStatus] = useState('');
  const [showLoader, setShowLoader] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();

    setShowLoader(true);
  
    const name = e.target.querySelector('input[type="text"]').value;
    const amount = e.target.querySelector('input[type="number"]').value;
    const email = e.target.querySelector('input[type="email"]').value;
    const data ={
      name,
      amount,
      email
    }
    fetch('/api/payment', {
      method: 'POST',
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        setStatus('SUCCESS');
        setShowLoader(false);
      })
      .catch(error => {
        console.error(error);
        setStatus('ERROR');
        setShowLoader(false);
      });
  };

  if (status === 'SUCCESS') {
    return (
      <Wrapper>
        <Header2>Dziękujemy za wsparcie!</Header2>
        <div style={{marginBottom: '2rem'}}></div>
        <BigLogo/>
      </Wrapper>
    );
  }
  else{
    return(
      <Wrapper>
        <DescriptionContainer>
          <Header2>wspieram</Header2>
          <BigLogo/>
          <Inspiration>
            Chcemy, aby wszystko, co robimy miało największą jakość. 
            Jakość Nieba. 
            Jeżeli chcesz mieć autentyczny udział w naszych działaniach, 
            możesz wesprzeć nas w naszych działaniach.
          </Inspiration>
        </DescriptionContainer>
        <Form onSubmit={handleSubmit}>
          <InputElement type='money'/>
          <InputElement type='name'/>
          <InputElement type='mail'/>
          <Link href="./polityka.html">Polityka prywatności</Link>
          { showLoader ? <Loader><div></div><div></div><div></div><div></div></Loader> : <Button value="Wspieram" /> }
          {status === 'ERROR' && (<p>Something went wrong. Please try again.</p>)}
        </Form>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Poppins', sans-serif;
  color: #231F20;
`;

const DescriptionContainer = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Header2 = styled.h2`
  font-size: 2.4rem;
`;

const BigLogo = styled.img.attrs({
  src: "./logo_black.svg"
})`
  width: 20rem;
  height: auto;
`;

const Inspiration = styled.p`
  margin-top: 2rem;
  font-size: 1.2rem;
  text-align: center;
`;

const Form = styled.form`
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Link = styled.a`
margin-top: 1.2rem;
  color: #231F20;
`;

const Button = styled.input.attrs(
  {
    type: 'submit'
  }
)
`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 1.2rem;
  width: 180px;
  height: 2.8rem;
  border: 2px solid #231F20;
  background-color: #fff;
  font-weight: bold;
  cursor: pointer;
  border-radius: 2px;
`

const Loader = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

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

export default App;