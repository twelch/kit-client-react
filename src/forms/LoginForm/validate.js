import { defineMessages } from 'react-intl'

const messages = defineMessages({
  loginrequired: {
    id: 'login.required',
    description: 'Error shown when required form field is not provided',
    defaultMessage: 'Required'
  }
})

export default function validate (values, props) {
  let errors = {}
  if (!values.username) {
    errors.username = props.intl.formatMessage(messages.loginrequired)
  }
  if (!values.password) {
    errors.password = props.intl.formatMessage(messages.loginrequired)
  }
  return errors
}
