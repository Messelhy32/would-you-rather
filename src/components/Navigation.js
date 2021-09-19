import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {Menu, Image, Button } from 'semantic-ui-react';
import { setAuthedUser } from '../actions/authedUser';

class Navigation extends Component {
  logOut = e => {
    e.preventDefault();
    this.props.setAuthedUser(null);
  };

  render() {
    const { authedUser, users } = this.props;

    return (
      <Fragment>
        <Menu> 
          <Menu.Item name='Homepage' as={NavLink} to='/' exact />
          <Menu.Item name='Add Question' as={NavLink} to='/add' />
          <Menu.Item name='leaderboard' as={NavLink} to='/leaderboard' />
          <Menu.Menu position='right'>
            <Menu.Item>
                <Image
                  src={users[authedUser].avatarURL}
                  avatar
                />
                <p>{users[authedUser].name}</p> 
            </Menu.Item>
            <Menu.Item>
              <Button
                content='Logout'
                onClick={this.logOut}
              />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Fragment>
    );
  }
}

function mapStateToProps({ users, authedUser }) {
  return {
    authedUser,
    users
  };
}

export default connect(mapStateToProps,{ setAuthedUser })(Navigation);