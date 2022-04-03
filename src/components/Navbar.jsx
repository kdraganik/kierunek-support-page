import styled from 'styled-components';

const Navbar = () => {
  return(
    <Wrapper>
      <LeftBox>
        <a href="https://kosciolkierunek.pl">
          <Logo />
        </a>
      </LeftBox>
      <RightBox>
        <LinkItem>
          <Link href='https://kosciolkierunek.pl/poznaj-nas'> Poznaj nas </Link>
        </LinkItem>
        <LinkItem>
          <Link href='https://kosciolkierunek.pl/kosciol-w-tyg'> Kosciol w tygodniu </Link>
        </LinkItem>
        <LinkItem>
          <Link href='https://kosciolkierunek.pl/kosciol-dzieciecy'> Kosciol dzieciecy </Link>
        </LinkItem>
        <LinkItem>
          <Link href='https://karty-modlitwy.kosciolkierunek.pl/'> Karty modlitwy </Link>
        </LinkItem>
        <LinkItem>
          <Link href='https://wspieram.kosciolkierunek.pl/'> Wsparcie </Link>
        </LinkItem>
        <LinkItem>
          <Link href='https://kosciolkierunek.pl/#kontakt'> Kontakt </Link>
        </LinkItem>
      </RightBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  font-size: 12px;
  color: #231f20;
  position: absolute;
  padding: 30px 150px;
  left: 0;
  top: 0;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
`;

const LeftBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

const Logo = styled.img.attrs({
  src: "./logo_black.svg",
  alt: "logo"
})`
  margin-top: .5em;
  margin-right: 1em;
  width: 120px;
  height: auto;
  align-self: flex-end;
`;

const RightBox = styled.ul`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  list-style: none;
`

const LinkItem = styled.li`
  text-transform: uppercase;
  padding: 3px 12px;

  &:last-child{
    padding-right: 0;
  }
`

const Link = styled.a`
  font-family: $main-font;
  text-decoration: none;
  color: #231f20;
  &:hover{
    text-decoration: underline;
  }
`

export default Navbar;