import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Grid } from 'semantic-ui-react';


export class QuestionView extends Component {
  state = {
    viewVotes: false
  };
  handleClick = e => {
    this.setState(prevState => ({
      viewVotes: !prevState.viewVotes
    }));
  };
  render() {
    const { question, unanswered } = this.props;
    const buttonContent = unanswered === true ? 'Answer Question' : 'Votes'

    if (this.state.viewVotes === true) {
      return <Redirect push to={`/questions/${question.id}`} />;
    }
    return (
      <Fragment>
        <h4 style={{textAlign: 'center'}}>Would you rather</h4>
        <p style={{ textAlign: 'center' }}>{question.optionOne.text}</p>
        <p style={{ textAlign: 'center', fontWeight: 'bold' }}>OR</p>
        <p style={{ textAlign: 'center' }}>{question.optionTwo.text}</p>
        <Grid>
         <Grid.Column textAlign="center">
        <Button size='medium'
          onClick={this.handleClick}
          content={buttonContent}
        />
        </Grid.Column>
       </Grid>
      </Fragment>
    );
  }
}

export default QuestionView;