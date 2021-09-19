import { saveQuestionAnswer } from '../utils/api';
import { answerQuestion } from '../actions/questions';

export const GET_USERS = 'GET_USERS';
export const ANSWER_USER = 'ANSWER_USER';
export const QUESTION_USER = 'QUESTION_USER';

export function getUsers(users) {
  return {
    type: GET_USERS,
    users
  };
}

function answerUser(authedUser, qid, answer) {
  return {
    type: ANSWER_USER,
    authedUser,
    qid,
    answer
  };
}

export function questionUser({ id, author }) {
  return {
    type: QUESTION_USER,
    id,
    author
  };
}

export function handleSaveQuestionAnswer(authedUser, qid, answer) {
  return dispatch => {
    dispatch(answerUser(authedUser, qid, answer));
    dispatch(answerQuestion(authedUser, qid, answer));

    return saveQuestionAnswer(authedUser, qid, answer)
    .catch(e => {
      console.log('Error', e);
    });
  };
}