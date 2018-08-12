import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

export default class ExampleComponent extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    onUpdate: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    if (typeof this.props.onUpdate === 'function') {
      this.props.onUpdate({text: event.target.value})
    }
  }

  render() {
    return (
      <div className={styles.test}>
        <p>I'm In React</p>
        <input type='text' value={this.props.text} onChange={this.handleChange} />
      </div>
    )
  }
}
