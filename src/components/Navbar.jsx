import styled from 'styled-components';
import { useState, useEffect } from 'react';

const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false)
  const [width, setWidth] = useState(0)

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return(
    <Wrapper>
      <LeftBox>
        <a href="https://kosciolkierunek.pl">
          <Logo />
        </a>
      </LeftBox>
      <RightBox className={`${width >= 1024 ? "" : menuOpen ? "" : "hidden"}`} onClick={()=>setMenuOpen(false)}>
        <InnerLogo />
        <Close />
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
      <Burger onClick={()=>setMenuOpen(true)}/>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  max-width: 100vw;
  padding: 30px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;

  @media (min-width: 480px){
      padding: 30px 50px;
  }

  @media (min-width: 1024px){
    flex-direction: row;
    justify-content: space-between;
  }

  @media (min-width: 1200px){
    padding: 30px 150px;
  }
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
  width: 10em;
  height: auto;
  align-self: flex-end;
`;

const InnerLogo = styled.img.attrs({
  src: "./logo_black.svg",
  alt: "logo"
})`
  width: 8em;
  margin-bottom: 1.2em;

  @media (min-width: 1024px){
    display: none;
  }
`;

const Burger = styled.div`
  display: block; 
  position: relative;
  &, 
  &:before, 
  &:after 
  { 
    width: 30px; 
    height: 5px; 
    border-radius: 2px; 
    background-color: #231f20; 
  }
  &:before, 
  &:after { 
    content: ""; 
    display: block; 
    position: absolute; 
  }
  &:before { 
    bottom: 150%; 
  } 
  &:after{ 
    top: 150%; 
  }

  @media (min-width: 1024px){
    display: none;
  }
`

const RightBox = styled.ul`
  &.hidden{
    display: none;
  }
  left: 0;
  top: 0;
  z-index: 1;
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: #E8E3E0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  list-style: none;
  font-size: 1.6em;

  @media (min-width: 1024px){
    font-size: .9em;
    background-color: initial;
    position: relative;
    padding: initial;
    height: initial;
    flex-direction: row;
    justify-content: flex-end;
  }
`

const Close = styled.div`
  position: absolute;
  right: 32px;
  top: 32px;
  width: 32px;
  height: 32px;
  opacity: 0.3;
  &:hover {
    opacity: 1;
  }
  &:before, &:after {
    position: absolute;
    left: 15px;
    content: ' ';
    height: 33px;
    width: 2px;
    background-color: #231f20;
  }
  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }

  @media (min-width: 1024px){
    display: none;
  }
`

const LinkItem = styled.li`
  text-align: center;
  text-transform: uppercase;
  padding: 10px;

  @media (min-width: 1024px){
    padding: 3px 12px;
    &:last-child{
      padding-right: 0;
    }
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