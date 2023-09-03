import { HeaderContainer, NavContainer } from "../styles"


export default function Header() {
    return (
        <HeaderContainer>
            <NavContainer>
                <button style={{backgroundColor: 'yellow'}}>Quem sou</button>
                <button style={{backgroundColor: 'yellow'}}>Habilidades</button>
                <button style={{backgroundColor: 'yellow'}}>Projetos</button>
                <button style={{backgroundColor: 'yellow'}}>Contato</button>
            </NavContainer>
        </HeaderContainer>
    )
}