import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { setAuthedUser } from '../actions/authedUser';

export class Login extends Component {
  render() {
    return (
      <Fragment>
        <h1 style={{textAlign: 'center'}}>Welcome!</h1>
        <h2 style={{textAlign: 'center'}}>Choose a user</h2>
          <LoginContent
            form={<ConnectedLoginForm />}
          />
      </Fragment>
    );
  }
}

const LoginContent = ({ image, form }) => (
  <div>
          {image}
          {form}
  </div>
);

class LoginForm extends Component {
  state = {
    value: ''
  };
  onChange = (e, { value }) => {
    this.setState({ value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { setAuthedUser } = this.props;
    const authedUser = this.state.value;

    new Promise((res, rej) => {
      setTimeout(() => res(), 500);
    }).then(() => setAuthedUser(authedUser));
  };
  dropDownUsersData = () => {
    const { users } = this.props;

    return users.map(user => ({
      key: user.id,
      text: user.name,
      value: user.id,
      image: { avatar: true, src: user.avatarURL }
    }));
  };
  render() {
    const { value } = this.state;
    const disabled = value === '' ? true : false;

    return (
      <Form style={{textAlign:'center', align:'center' }} onSubmit={this.handleSubmit}>
        <Form.Dropdown
          placeholder="Choose User"
          options={this.dropDownUsersData()}
          value={value}
          onChange={this.onChange}
          required
        />
        <Form.Button content="Login" disabled={disabled}/>
      </Form>
    );
  }
}

const ConnectedLoginForm = connect(mapStateToProps,{ setAuthedUser })(LoginForm);

function mapStateToProps({ users }) {
  return {
    users: Object.values(users)
  };
}

export default Login;