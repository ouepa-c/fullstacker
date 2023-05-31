import styled from 'styled-components'

export const LogoWrapper = styled.div`
    text-align: center;
    user-select: none;
    cursor: pointer;
    filter: contrast(25);
    background-color: var(--bg-alpha);
    width: 154px;
    height: 100%;
    animation: noContrast .2s .4s forwards;

    a {
        width: 100%;
        height: 100%;
        ${({theme}) => theme.mixins['flex-center']}
    }

    .logo {
        font-weight: bold;
        font-size: 47px;
        color: var(--primary-color);
        animation: logo .6s forwards ease-in;
        filter: blur(25px);
        font-family: 'Indie Flower', cursive;
    }

    @keyframes logo {
        from {
            letter-spacing: -20px;
            filter: blur(5px);
        }

        to {
            letter-spacing: 0;
            filter: blur(0);
        }
    }

    @keyframes noContrast {
        to {
            filter: none;
            background: none;
        }
    }
`
