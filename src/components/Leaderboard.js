import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Image } from 'semantic-ui-react';

export class Leaderboard extends Component {
  render() {
    const { usersData } = this.props;
    return (
      <Fragment>
        {usersData.map((user, idx) => (
          <div key={user.id} style={{textAlign: 'center'}}>
                  <Image src={user.avatarURL} size='medium' centered/>
                  <h4>{user.name}</h4>
                  <br />
                    <p>Questions Answered</p>
                    <p>{user.userAnswers}</p>
                    <p>Questions Added</p>
                    <p>{user.userQuestions}</p>
                    <h3>Final Score</h3>
                    <p>{user.userQuestions + user.userAnswers}</p>
            </div>
        ))}
      </Fragment>
    );
  }
}

function mapStateToProps({ users }) {
  const usersData = Object.values(users)
    .map(user => ({
      id: user.id,
      name: user.name,
      avatarURL: user.avatarURL,
      userAnswers: Object.values(user.answers).length,
      userQuestions: user.questions.length,
      total: Object.values(user.answers).length + user.questions.length
    }))
    .sort((a, b) => a.total - b.total)
    .reverse()
    .slice(0, 3);
  console.log('usersData', usersData);
  return {
    usersData
  };
}

export default connect(mapStateToProps)(Leaderboard);