import styled from 'styled-components';

const InputElement = ({ type }) => {
  return(
    <Wrapper>
      { 
        type === 'name' ? <IconPerson /> :
        type === 'money' ? <IconMoney /> :
        type === 'mail' ? <IconMail /> : ""
      }
      { 
        type === 'name' ? <InputPerson /> :
        type === 'money' ? <InputMoney /> :
        type === 'mail' ? <InputMail /> : ""
      }
    </Wrapper>
  )
}

const Wrapper =styled.div`
width: 100%;
margin-top: 1.8rem;
display: flex;
justify-content: center;
position: relative;
overflow: hidden;
`;

const Icon = styled.img`
  height: 2.85rem;
  width: 2.85rem;
  background-color: #231F20;
`

const IconPerson = styled(Icon).attrs({
  src: 'person.svg'
})``;

const IconMoney = styled(Icon).attrs({
  src: 'cash.svg'
})``;

const IconMail = styled(Icon).attrs({
  src: 'mail.svg'
})``;


const Input = styled.input`
  width: 100%;
  padding: .3rem;
  border: 1px solid #231F20;
  font-size: 1.2rem;
  z-index: ;

  :focus {
    outline: none;
    box-shadow: 0px 0px 2px #231F20;
  }
`;

const InputPerson = styled(Input).attrs({
  type: 'text',
  placeholder: 'Imię i nazwisko'
})``;

const InputMoney = styled(Input).attrs({
  type: "number",
  placeholder: 'Kwota'
})``;

const InputMail = styled(Input).attrs({
  type: "email",
  placeholder: 'E-mail'
})``;

export default InputElement;