import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  html {
    --text-color: #333;
    --bg: #fafafa;
    --anchor-color: #11181c;
  }

  html[theme="dark"] {
    --text-color: #fff;
    --bg: #212121;
    --anchor-color: #fdfdfd;
  }

  body {
    background-color: var(--bg);
    width: 100vw;
    height: 100vh;
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

  @keyframes shake {
    from {
      transform: translateY(-25%);
    }
    50% {

      transform: translateY(0);
    }
    to {

      transform: translateY(-25%);
    }
  }
`
