import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from '../redux'

import Main from '../components/main'
import Home from '../components/home'

const Root = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={() => <Main />} />
          <Route exact path="/home" component={() => <Home />} />
        </Switch>
      </Router>
    </Provider>
  )
}

export default Root
