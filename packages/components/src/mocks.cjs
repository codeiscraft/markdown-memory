const React = require('react')

module.exports = {
  Icon: jest.fn(),
  PasswordInput: jest.fn((props) =>
    React.createElement('input', { 'aria-label': 'passphrase', type: 'password', ...props }),
  ),
}
