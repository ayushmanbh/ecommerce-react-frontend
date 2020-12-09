import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useUserContext } from './contexts/userContext'
import NotFound from './components/pages/NotFound';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Header from './components/layout/Header';

import './App.css'
import Cart from './components/pages/Cart';

function App() {
  const { checkLoggedIn } = useUserContext()
  useEffect(() => {
    checkLoggedIn()
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Router>
        <Header />
        <main className="container">
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/cart' component={Cart} />
            <Route exact path='*' component={NotFound} />
          </Switch>
        </main>
      </Router>
    </>
  );
}

export default App;
