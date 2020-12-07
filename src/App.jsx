import styled from 'styled-components';

import Form from './components/Form';

const App = () => {      
  return(
    <Wrapper>
      <DescriptionContainer>
        <Header2>wspieram</Header2>
        <BigLogo/>
        <Inspiration>
          Chcemy, aby wszystko, co robimy miało największą jakość. 
          Jakość Nieba. 
          Jeżeli chcesz mieć autentyczny udział w naszych działaniach, 
          możesz nas wesprzeć.
        </Inspiration>
      </DescriptionContainer>
      <Form />
      <Link href="./polityka.html">Polityka prywatności</Link>
    </Wrapper>
  )
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
  width: 90%;
  @media (min-width: 600px) { width: 80% }
  @media (min-width: 768px) { width: 60% }
  @media (min-width: 1200px) { width: 40% }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Header2 = styled.h2`
  font-size: 2.4rem;
  text-align: center;
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

const Link = styled.a`
  margin-top: 1.2rem;
  color: #231F20;
`;  

export default App;