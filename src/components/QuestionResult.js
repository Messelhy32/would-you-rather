import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

export class QuestionResult extends Component {

  handleClick = () => {
    this.props.history.push('/');
  };

  render() {
    const { question, user } = this.props;
    const votesOne = question.optionOne.votes.length;
    const votesTwo = question.optionTwo.votes.length;
    const totalVotes = votesOne + votesTwo;
    const userVote = user.answers[question.id];

    return (
      <Fragment>
        <h1 style={{ textAlign: 'center' }}>Results:</h1>
        <h2 style={{textAlign: 'center'}}>You Chose {userVote}</h2>
          <div style={{textAlign: 'center', align: 'center'}}>
          {userVote === 'optionOne'}
          <p style={{ fontWeight: 'bold' }}>{question.optionOne.text}</p>

            <p>{votesOne} out of {totalVotes} votes</p>

          {userVote === 'optionTwo'}
          <p style={{ fontWeight: 'bold' }}>{question.optionTwo.text}</p>

            <p>{votesTwo} out of {totalVotes} votes</p>
            </div>

        <Button floated="right" onClick={this.handleClick}>
          Back
        </Button>
      </Fragment>
    );
  }
}

function mapStateToProps({ users, authedUser }) {
  const user = users[authedUser];
  return {
    user
  };
}

export default withRouter(connect(mapStateToProps)(QuestionResult));