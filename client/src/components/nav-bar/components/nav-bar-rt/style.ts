import styled from 'styled-components'

export const NavBarRtWrapper = styled.div`
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 250px;
      height: 100%;

      > div, span {
            max-height: 42px;
      }

      .other {
            flex: 20%;
            height: 100%;
            background-color: var(--navbar-alpha);
            margin-left: 5px;
            border-radius: 10px;

            .heart {
                  ${({theme}) => theme.mixins['flex-center']}
                  width: 100%;
                  height: 100%;
            }

            &:hover .heart {
                  animation: heartbeat .8s infinite ease-in;
            }
      }

      @keyframes heartbeat {
            from {
                  transform: scale(1);
            }

            50% {
                  transform: scale(.8);
            }

            to {
                  transform: scale(1);
            }
      }

      .tools {
            flex: 47.67%;
            height: 100%;
      }

      .login-info {
            display: flex;
            flex: 33.33%;
            align-items: center;
            padding: 5px;
            border-radius: 25px;
            overflow: hidden;
            background-color: var(--navbar-alpha);
            transition: all .2s;

            .avatar {
                  transition: transform 400ms;
            }
      }
`
