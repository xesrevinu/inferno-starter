if (!__DEV__) {
  require('core-js/es6')
}
import './styles/main.scss'
import { render } from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { routes } from './routes'

const target = document.getElementById('app')

injectTapEventPlugin()

/**
 * Enable devtools
 */
if (__DEV__) {
  if (module.hot) {
    require('inferno-devtools')
  }
}


/**
 * Render our component according to our routes
 */
render(routes, target)


if (__DEV__) {
  /**
   * Cache assets if browser supports serviceworker
   */
  // if ('serviceWorker' in navigator) {
  //     const sw = navigator.serviceWorker

  //     sw.register('/service.js').then(function() {
  //         console.debug('CDN Worker: registered')
  //     }).catch(function(err) {
  //         console.error('ServiceWorker:', err)
  //     })
  //     sw.ready.then(function(registration) {
  //         console.debug('Worker: ready')
  //     })
  // }

  /**
   * Enable hot reloading if available
   */
  if (module.hot) {
      module.hot.accept()
      require('inferno-devtools')
  }
}

