import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './Home'
import Login from './Login'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App