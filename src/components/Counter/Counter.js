import React from 'react'
import classes from './Counter.scss'
import { defineMessages, FormattedMessage, FormattedNumber } from 'react-intl'

const messages = defineMessages({
  incrementButton: {
    id: 'counter.incrementButton',
    description: 'Increment counter value by one',
    defaultMessage: 'Increment'
  },
  doubleButton: {
    id: 'counter.doubleButton',
    description: 'Double the counter value',
    defaultMessage: 'Double'
  },
  counterlabel: {
    id: 'counter.counterlabel',
    description: 'Counter label',
    defaultMessage: 'Counter'
  }
})

export const Counter = (props) => (
  <div>
    <h2 className={classes.counterContainer}>
      <FormattedMessage {...messages.counterlabel} />:
      {' '}
      <span className={classes['counter--green']}>
        <FormattedNumber value={props.counter} />
      </span>
    </h2>
    <button className='btn btn-default' onClick={props.increment}>
      <FormattedMessage {...messages.incrementButton} />
    </button>
    {' '}
    <button className='btn btn-default' onClick={props.doubleAsync}>
      <FormattedMessage {...messages.doubleButton} />
    </button>
  </div>
)

Counter.propTypes = {
  counter: React.PropTypes.number.isRequired,
  doubleAsync: React.PropTypes.func.isRequired,
  increment: React.PropTypes.func.isRequired
}

export default Counter
