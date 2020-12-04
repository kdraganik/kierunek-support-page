import styled from 'styled-components';
import { useState } from 'react';

import InputElement from './Input';

const App = () => {
  const [status, setStatus] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
  
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
      })
      .catch(error => {
        console.error(error);
        setStatus('ERROR');
      });
  };

  if (status === 'SUCCESS') {
    return (
      <p>
        Płatność udana!
      </p>
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
          <Button value="Wspieram" />
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
  font-family: Arial, sans-serif;
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
  width: 32%;
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
`

export default App;