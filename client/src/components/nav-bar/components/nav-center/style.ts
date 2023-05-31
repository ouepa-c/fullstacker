import styled from 'styled-components'

export const NavCenterWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  height: 100%;

  ul.section {
    display: flex;
    height: 100%;
    margin-left: 20px;

    li.nav-item {
      cursor: pointer;
      height: 100%;

      ${({theme}) => theme.mixins['flex-center']}
      a {
        position: relative;
        ${({theme}) => theme.mixins['flex-center']}
        width: 100%;
        height: 100%;
        padding: 0 25px;
        color: var(--text-color);
        transition: all 0.2s;

        &::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: .5px;
          width: 100%;
          height: 2.5px;
          border-radius: 5px;
          background-color: var(--nav-bar-underline);
          transition: all .2s ease;
          transform: scaleX(0);
        }

        &.active {
          color: var(--primary-color);
        }

        &:hover::after {
          transform: scaleX(1);
        }

        &.active::after {
          transform: scaleX(1);
          background-color: #7828c8;
        }
      }
    }
  }

`
