import styled from 'styled-components';
import Form from './components/Form';
import Navbar from './components/Navbar';
import Account from './components/Account';

const App = () => {
  return(
    <Wrapper>
      {/* <Navbar/> */}
      <Container top>
        <Inspiration>
          Dbamy o to, aby wszystko, co robimy, miało jak najwyższą jakość. Jeżeli podobają Ci się nasze działania i chcesz mieć w nich realny udział, zachęcamy do wsparcia finansowego.
        </Inspiration>
        <BigLogo/>
      </Container>
      <Divider />
      <Container bottom>
        <Form />
      </Container>
      {/* <Account /> */}
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
  background-color: #E8E3E0;
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

const BigLogo = styled.img.attrs({
  src: "./logo_black.svg"
})`
  margin-top: .5em;
  margin-right: 1em;
  width: 6.5em;
  height: auto;
  align-self: flex-end;
`;

const Inspiration = styled.p`
  margin: .5em 0;
  font-size: 1.3em;

  @media (max-width: 768px) {
    margin: .5em 1em .5e 1.5em;
  }
`;

export default App;