import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { handleSaveQuestion } from '../actions/questions';

export class NewQuestion extends Component {

  state = {
    sumbit: false,
    option1: '',
    option2: ''
  };
  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { authedUser, handleSaveQuestion } = this.props;
    const { option1, option2 } = this.state;

    new Promise((res, rej) => {
      handleSaveQuestion(option1, option2, authedUser);
      setTimeout(() => res('success'), 1000);
    }).then(() => {
      this.setState({
        option1: '',
        option2: ''
      });
      this.setState({ sumbit: true });
    });
  };
  render() {
    const disabled = this.state.option1 === '' || this.state.option2 === '';

    if (this.state.sumbit === true) {
      return <Redirect to="/" />;
    }
    return (
      <Fragment>
              <h2>Would you rather?</h2>
            <Form onSubmit={this.handleSubmit}>
              <Form.Input
                id="option1"
                placeholder="Enter Option One..."
                value={this.state.option1}
                onChange={this.handleChange}
                required
              />
              <p>Or</p>
              <Form.Input
                id="option2"
                placeholder=" Enter Option Two..."
                value={this.state.option2}
                onChange={this.handleChange}
                required
              />
              <Form.Button disabled={disabled}>
                Submit
              </Form.Button>
            </Form>
      </Fragment>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  };
}

export default connect(mapStateToProps,{ handleSaveQuestion })(NewQuestion);