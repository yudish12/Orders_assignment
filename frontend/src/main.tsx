import ReactDOM from 'react-dom/client'
import './index.css'
import RouterWrapper from './router/index.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterWrapper/>
  </Provider>,
)
