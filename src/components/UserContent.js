import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
import QuestionPage from './QuestionPage';
import QuestionResult from './QuestionResult';
import QuestionView from './QuestionView';

const toShow = {
  QUES_VIEW: 'QUES_VIEW',
  QUES_PAGE: 'QUES_PAGE',
  QUES_RESULT: 'QUES_RESULT'
};

const PageContent = props => {
  const { show, question, unanswered } = props;

  switch (show) {
    case toShow.QUES_VIEW:
      return <QuestionView question={question} unanswered={unanswered} />;
    case toShow.QUES_PAGE:
      return <QuestionPage question={question} />;
    case toShow.QUES_RESULT:
      return <QuestionResult question={question} />;
    default:
      return;
  }
};

export class UserContent extends Component {
  render() {
    const {
      author,
      question,
      show,
      badPath,
      unanswered = null
    } = this.props;

    if (badPath === true) { return <Redirect to="/questions/bad_id" /> }

    return (
      <Fragment>
              <Image src={author.avatarURL} size='medium' centered/>
              <PageContent
                show={show}
                question={question}
                unanswered={unanswered}
              />
      </Fragment>
    );
  }
}

function mapStateToProps(
  { users, questions, authedUser },
  { match, question_id }
) {
  let question,
    author,
    show,
    badPath = false;
  if (question_id !== undefined) {
    question = questions[question_id];
    author = users[question.author];
    show = toShow.QUES_VIEW;
  } else {
    const { question_id } = match.params;
    question = questions[question_id];
    const user = users[authedUser];

    if (question === undefined) {
      badPath = true;
    } else {
      author = users[question.author];
      show = toShow.QUES_PAGE;
      if (Object.keys(user.answers).includes(question.id)) {
        show = toShow.QUES_RESULT;
      }
    }
  }

  return { badPath, question, author, show };
}

export default connect(mapStateToProps)(UserContent);