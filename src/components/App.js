import { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import { routes } from '../router';

// import { AuthContext } from '../AuthContext';

import Navbar from './Navbar/Navbar';

function App() {
  return (
    <div>
      <Navbar />

      {/* <AuthContext.Consumer>
        {(auth) => <p>{JSON.stringify(auth)}</p>}
      </AuthContext.Consumer> */}

      <Suspense fallback={<h1>Loading...</h1>}>
        <Switch>
          {routes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
