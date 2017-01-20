import * as React from 'react'

export interface HelloProps {
  name: string
}

class Hello extends React.Component<HelloProps, undefined> {
  render() {
    const { name } = this.props
    return <h1>Hello {name} !</h1>
  }
}

export default Hello
