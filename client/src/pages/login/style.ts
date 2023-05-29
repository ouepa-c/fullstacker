import styled from 'styled-components'

export const LoginContainer = styled.div`
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 800px;
      height: 400px;
      overflow: hidden;

      .login-wrapper {
            position: absolute;
            width: 200%;
            height: 100%;
            transition: all .3s;

            &.trans {
                  transform: translateX(-50%);
            }
      }

      .register-bar,
      .login-bar {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            z-index: 999;
            transform-origin: center center;
            width: 50%;
            height: 100%;
            display: flex;
            justify-content: center;
            flex-flow: column nowrap;
            padding-top: 10px;
            transition: all .1s;
            flex-direction: column;

            &.fade {
                  opacity: 0;
            }

            .title {
                  flex: 10%;
                  padding: 15px 0;
                  width: 100%;
                  font-size: 25px;
                  text-align: center;
            }

            .content {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  width: 100%;
                  flex: 65%;
                  flex-shrink: .5;
                  overflow: auto;
                  -ms-overflow-style: none;
                  scrollbar-width: none;

                  &::-webkit-scrollbar {
                        width: 0;
                        height: 0;
                  }
            }
  }

  .tip {
    text-align: center;
    font-size: 12.5px;
    margin-top: 5px;

    a {
      color: var(--anchor-color);
      text-decoration: underline;
    }

    a:hover {
      text-decoration: underline;
    }
  }

      .form-item {
            padding: 23px 0;
            max-width: 285px;
            min-width: 265px;
            display: flex;
            justify-content: space-between;
            flex-shrink: 0;
      }

      .register-bar {
            transform: translateX(100%);

            .form-item {
                  padding: 17px 0;
            }

            .arrow-down {
                  position: relative;
                  text-align: center;
                  min-height: 20px;
                  color: #ccc;
      font-size: 12px;
      box-sizing: content-box;

      svg {
        display: block;
        position: absolute;
        left: 50%;
        top: -10px;
        margin-left: -10px;
        width: 20px;
        height: 20px;
        animation: shake ease-in-out infinite 1s;
      }
    }

    .foot-ctr {
      ${({theme}) => theme.mixins['flex-center']}
      align-items: center;
      flex-flow: column;
      margin-top: 5px;
    }
  }
`

export const LoginWrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`
