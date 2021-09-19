import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Radio, Grid } from 'semantic-ui-react';
import { handleSaveQuestionAnswer } from '../actions/users';

export class QuestionPage extends Component {
  state = {
    value: ''
  };

  handleChange = (e, { value }) => this.setState({ value });

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.value !== '') {
      const { authedUser, question, handleSaveQuestionAnswer } = this.props;
      handleSaveQuestionAnswer(authedUser, question.id, this.state.value);
    }
  };

  render() {
    const { question } = this.props;
    const disabled = this.state.value === '' ? true : false;

    return (
      <Fragment>
        <h1 style={{textAlign: 'center'}}>Would you rather</h1>
        <Form style={{textAlign:'center', align:'center' }} onSubmit={this.handleSubmit}>
          <Form.Field>
            <Radio
              label={question.optionOne.text}
              name="radioGroup"
              value="optionOne"
              checked={this.state.value === 'optionOne'}
              onChange={this.handleChange}
            />
            <Radio
              label={question.optionTwo.text}
              name="radioGroup"
              value="optionTwo"
              checked={this.state.value === 'optionTwo'}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
          <Grid>
         <Grid.Column textAlign="center">
         <Button
              disabled={disabled}
              content="Submit"
            />
        </Grid.Column>
       </Grid>
          </Form.Field>
        </Form>
      </Fragment>
    );
  }
}

function mapStateToProps({ authedUser }, { match }) {
  return {
    authedUser
  };
}

export default connect(mapStateToProps,{ handleSaveQuestionAnswer })(QuestionPage);