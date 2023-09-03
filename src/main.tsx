import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import GlobalStyle from './globalstyle.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <GlobalStyle />
    <App />
  </>
)
