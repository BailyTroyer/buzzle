import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Auth from './Auth'

import Home from './Home'
import Login from './Login'
import Live from './Live'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route path = '/l/:liveId' component = {Live} />
        <Route exact path = '/live' component = {Live} />
        <Route exact path="/" component={Auth(Home)} />
      </Switch>
    </Router>
  );
}

export default App