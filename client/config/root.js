import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { Provider, useSelector } from 'react-redux'

import store, { history } from '../redux'

import Startup from './startup'

import Channels from '../components/channels'
import LoginScreen from '../components/login-screen'
import Main from '../components/main'
import Profile from '../components/profile'
import ChannelSettings from '../components/channel'

const OnlyAnonymousRoute = ({ component: Component, ...rest }) => {
  const { user, token } = useSelector((s) => s.auth)
  const func = (props) => {
    return !!user && !!token ? (
      <Redirect to="/channels" />
    ) : (
      <Component {...props} />
    )
  }
  return <Route {...rest} render={func} />
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user, token } = useSelector((s) => s.auth)
  const func = (props) => {
    return !!user && !!token ? (
      <Component {...props} />
    ) : (
      <Redirect to="/login" />
    )
  }
  return <Route {...rest} render={func} />
}

const Root = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Startup>
          <Switch>
            <Route exact path="/" component={() => <Main />} />
            <OnlyAnonymousRoute exact path="/register" component={() => <LoginScreen reg />} />
            <OnlyAnonymousRoute exact path="/login" component={() => <LoginScreen reg={false} />} />
            <PrivateRoute exact path="/channels" component={() => <Channels />} />
            <PrivateRoute exact path="/profile" component={() => <Profile />} />
            <PrivateRoute exact path="/channel-settings" component={() => <ChannelSettings />} />
          </Switch>
        </Startup>
      </ConnectedRouter>
    </Provider>
  )
}

export default Root
