import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tab } from 'semantic-ui-react';
import UserContent from './UserContent';

export class Homepage extends Component {
  render() {
    const { userQuestionData } = this.props;

    return <Tab menu={{ secondary: true }} panes={panes({ userQuestionData })}/>;
  }
}

const panes = props => {
  const { userQuestionData } = props;
  return [
    {
      menuItem: 'Unanswered Questions',
      render: () => (
        <Tab.Pane>
          {userQuestionData.unanswered.map(question => (
            <UserContent
              key={question.id}
              question_id={question.id}
              unanswered={true}
            />
          ))}
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Answered Questions',
      render: () => (
        <Tab.Pane>
          {userQuestionData.answered.map(question => (
            <UserContent
              key={question.id}
              question_id={question.id}
              unanswered={false}
            />
          ))}
        </Tab.Pane>
      )
    }
  ];
};

function mapStateToProps({ authedUser, users, questions }) {
  const answeredQuesId = Object.keys(users[authedUser].answers);
  const answered = Object.values(questions)
    .filter(question => answeredQuesId.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);
  const unanswered = Object.values(questions)
    .filter(question => !answeredQuesId.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);

  return {
    userQuestionData: {
      answered,
      unanswered
    }
  };
}

export default connect(mapStateToProps)(Homepage);