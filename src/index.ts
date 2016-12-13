import * as React from 'react'
import * as ReactDOM from 'react-dom'

interface HelloProps {
 name: string
}

class Hello extends React.Component<HelloProps, undefined> {
  render () {
    const { name } = this.props
    return (
      <div>123</div>
    )
  }
}

ReactDOM.render(<Hello />, mountElement)

