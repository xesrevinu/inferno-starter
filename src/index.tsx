import './styles/main.scss'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import App from './app'

const target = document.getElementById('app')

injectTapEventPlugin()

if (__DEV__) {
  const { AppContainer } = require('react-hot-loader')

  const app = (
    <AppContainer>
      <App />
    </AppContainer>
  )

  ReactDOM.render(app, target)

  if (module.hot) {
    module.hot.accept('./app', () => {
      const NextApp = require('./app').default
      ReactDOM.render(
        <AppContainer>
          <NextApp />
        </AppContainer>, target)
    })
  }
} else {
  ReactDOM.render(<App />, target)
}
