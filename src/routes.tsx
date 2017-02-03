import React from 'react'
import { Provider } from 'inferno-mobx'
import { Router, Route, IndexRoute } from 'inferno-router'
import { createBrowserHistory } from 'history'

const browserHistory = createBrowserHistory()

// Page
import Index from './views/index'
import NotFount from './views/404'

export const routes = (
  <Router history={browserHistory}>
    <Route path='/' component={Index} />
    <Route path='*' component={NotFount} />
  </Router>
)
