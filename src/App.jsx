import styled from 'styled-components';
import Form from './components/Form';

const App = () => {
  return(
    <Wrapper>
      <Container top>
        <Header2>wspieram</Header2>
        <BigLogo/>
        <Inspiration>
          Chcemy, aby wszystko, co robimy miało jak najwyższą jakość. 
          Jeżeli chcesz mieć realny udział w tym, co robimy, 
          zachęcamy do wspierania naszych działań.
        </Inspiration>
      </Container>
      <Divider />
      <Container bottom>
        <Form />
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Poppins', sans-serif;
  color: #231F20;

  @media (max-width: 1200px) { 
    font-size: 0.9em;
  }
  @media (max-width: 992px) { 
    font-size: 0.85em;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    font-size: 0.7em;
  }
`;

const Container = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 1200px) { 
    width: 40%;
  }
  @media (max-width: 992px) { 
    width: 50%;
  }
  @media (max-width: 768px) {
    justify-content: ${ props => props.top ? 'flex-end' : 'flex-start'};
    margin: 1em 0;
    width: 75%;
  }
`;

const Divider = styled.div`
  width: 0;
  height: 28em;
  margin: 0 5em;
  border: 1px solid #231F20;

  @media (max-width: 1200px) { 
    margin: 0 3em;
  }
  @media (max-width: 992px) { 
    margin: 0 1.5em;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const Header2 = styled.h2`
  font-size: 2.4em;
  text-align: center;
`;

const BigLogo = styled.img.attrs({
  src: "./logo_black.svg"
})`
  width: 10.5em;
  height: auto;
`;

const Inspiration = styled.p`
  margin-top: 1.5em;
  font-size: 1.3em;
  text-align: center;

  @media (max-width: 768px) {
    margin: 1.5em 1em 0 1.5em;
  }
`;

export default App;