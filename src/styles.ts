import styled from 'styled-components';
import floor from './assets/floor.png'

export const HeaderContainer = styled.header`
display: flex;
width: 100%;
background-color: yellow;
height: 5vh;
`;

export const NavContainer = styled.nav`
display: flex;
width: 100%;
justify-content: space-evenly;
`;

export const Floor = styled.div`
position: fixed;
background-color: black;
background-image: url(${floor});
background-size: 50%;
height: 20vh;
width: 100%;
bottom: 0px;

`;