import * as React from 'react'
import Hello from './components/Hello'

interface AppProps {

}

class App extends React.Component<AppProps, undefined> {
  render () {
    return (
      <div>
        <Hello name='xiaokekeT' />
      </div>
    )
  }
}

export default App
