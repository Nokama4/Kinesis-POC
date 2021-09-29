import { Global, css } from '@emotion/react';

const GlobalStyles = () => {
  return (
    <Global
      styles={css`
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
            'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
            'Helvetica Neue', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          min-width: 320px;
          text-rendering: optimizeLegibility;
          font-smoothing: antialiased;
          width: 100%;
        }

        html,
        body,
        #root {
          font-size: 1em;
          height: 100%;
          overflow: hidden;
        }

        li,
        ol,
        ul {
          list-style: none;
        }


        code {
          font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
            monospace;
        }
      `}
    />
  );
};

export default GlobalStyles;
