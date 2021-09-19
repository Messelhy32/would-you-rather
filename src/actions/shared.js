import { getInitialData } from '../utils/api';
import { getQuestions } from '../actions/questions';
import { getUsers } from '../actions/users';
import { showLoading, hideLoading } from 'react-redux-loading'

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData()
    .then(({ users, questions }) => {
      dispatch(getQuestions(questions));
      dispatch(getUsers(users));
      dispatch(hideLoading());
    });
  };
}