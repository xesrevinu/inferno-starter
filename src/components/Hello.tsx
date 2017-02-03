import React, { Component } from 'react'
import C from '../assets/svg/evaluate-address.svg'

export interface HelloProps {
  name: string
}

const Hello = () => (
  <div>
    <span>Hello  !</span>
    <C />
  </div>
)

export default Hello
