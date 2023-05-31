import styled from 'styled-components'

export const NavBarWrapper = styled.nav`
  user-select: none;
  -webkit-user-select: none;
  position: sticky;
  top: 0;
  z-index: 9999;
  transition: all 400ms ease 0s;
  transform: translateY(0px);
  width: 100%;
  height: 60px;
  background-color: var(--bg-alpha);
  backdrop-filter: saturate(180%) blur(2px);

  &.showblur {
    box-shadow: 0 12px 20px 6px rgb(104 112 118 / 0.08);
  }

  &.hide {
    transform: translateY(-100%);
  }

  .nav-bar-container {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    padding-left: 15px;
    padding-right: 15px;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    color: var(--text-color);
  }
`
