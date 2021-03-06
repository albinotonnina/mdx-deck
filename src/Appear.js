import React from 'react'
import PropTypes from 'prop-types'
import { withDeck } from './context'
import { setSteps } from './updaters'
import { modes } from './constants'

export default withDeck(
  class Appear extends React.Component {
    static propTypes = {
      children: PropTypes.array.isRequired,
      deck: PropTypes.object.isRequired,
    }

    constructor(props) {
      super(props)
      const {
        alternate,
        deck: { update, index },
      } = props
      const steps = React.Children.toArray(props.children).length
      update(setSteps(index, steps))
    }

    render() {
      const children = React.Children.toArray(this.props.children).map(
        child => (typeof child === 'string' ? <div>{child}</div> : child)
      )
      const {
        alternate,
        deck: { step, mode },
      } = this.props

      if (mode === modes.grid) {
        return children
      }

      return (
        <React.Fragment>
          {children.map((child, i) =>
            React.cloneElement(child, {
              key: i,
              style: {
                visibility: alternate
                  ? step === i
                  : step >= i + 1
                    ? 'visible'
                    : 'hidden',
              },
            })
          )}
        </React.Fragment>
      )
    }
  }
)
