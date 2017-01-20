import * as React from 'react'
import Hello from './components/Hello'
import { Button } from 'antd-mobile'

export interface AppProps {

}

class App extends React.Component<AppProps, undefined> {
  render() {
    return (
      <div>
        <Hello name='xiaokekeT' />
        <Button onClick={(e) => console.log(e)}>1</Button>
      </div>
    )
  }
}

export default App
