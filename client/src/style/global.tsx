import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  html {
    // 文字颜色
    --text-color: #333;
    // 背景色
    --bg: #fefefe;
    // navbar下划线
    --nav-bar-underline: #eee;
    --anchor-color: #11181c;
    --bg-alpha: rgba(255, 255, 255, .75);
    --primary-color: #7828c8;
    --navbar-alpha: #f1f3f5;
  }

  main#entry {
    position: relative;
    z-index: 99999999;
  }

  img {
    max-width: 100%;
  }

  html[theme="dark"] {
    --text-color: #fff;
    --bg: #494949;
    // navbar下划线
    --nav-bar-underline: #333;
    --anchor-color: #fdfdfd;
    --bg-alpha: rgba(1, 0, 1, 0.75);
    --primary-color: #9430fc;
    --navbar-alpha: #202125;
  }

  .wrapper {
    width: 1200px !important;
    margin: 0 auto;
  }

  body {
    background-color: var(--bg);
    color: var(--text-color);
    width: 100%;
    height: 100vh;
    overflow: auto;
  }

  div {
    box-sizing: border-box;
  }

  img {
    user-select: none;
    -webkit-user-drag: none;
  }

  /* 设置网页滚动条样式 */
  ::-webkit-scrollbar {
    width: 5px; /* 设置滚动条宽度 */
  }

  ::-webkit-scrollbar-track {
    background-color: #f1f1f1; /* 滚动条轨道背景色 */
  }

  ::-webkit-scrollbar-thumb {
    background-color: #888; /* 滚动条拖拽块背景色 */
    border-radius: 5px; /* 设置圆角 */
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #555; /* 鼠标悬停时的背景色 */
  }

  .clearfix:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }

  .clearfix {
    display: inline-block;
  }

  * html .clearfix {
    height: 1%;
  }

  /* IE6 hack */
  .clearfix {
    display: block;
  }

  .bg-gradient {
    position: fixed;
    z-index: 1;

    &.g01 {
      top: -50%;
      right: -50%;
      left: -10%;
    }

    &.g02 {
      top: -50%;
      right: -50%;
    }
  }
`
