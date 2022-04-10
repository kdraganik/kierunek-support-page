import styled from 'styled-components';

const Account = () => {
  return(
    <Wrapper>
      <Title>Numer konta</Title>
      <Owner>
        <p>KOŚCIÓŁ ZIELONOŚWIĄTKOWY ZBÓR "KIERUNEK" WE WROCŁAWIU</p>
        <p>UŁAŃSKA 5, 52-213 WROCŁAW</p>
      </Owner>
      <Number>31 1090 2590 0000 0001 3939 1058</Number>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 12px;
  margin-top: 30px;
  font-size: 12px;
  color: #231f20;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  z-index: 1;

  @media (min-width: 768px){
    position: absolute;
    left: 0;
    bottom: 50px;
  }
`;

const Title = styled.h2`
  font-size: 24px;
  text-transform: uppercase;
  font-weight: 900;
`
const Owner = styled.div`
  font-size 16px;
  text-transform: uppercase;
  & p{
    text-align: center;
  }
`
const Number = styled.p`
  font-size: 16px;
`

export default Account;