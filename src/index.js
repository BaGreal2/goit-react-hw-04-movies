import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { AuthContext } from './AuthContext';

import App from './components/App';

ReactDOM.render(
  <AuthContext.Provider value={true}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthContext.Provider>,
  document.getElementById('root')
);
