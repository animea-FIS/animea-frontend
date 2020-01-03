import React, { Component } from 'react';
import FriendsApi from './FriendsApi';
import Friend from './Friend';
import M from "materialize-css";
import './Animes.css';
import { Row } from 'react-materialize';
import ReactPaginate from 'react-paginate';

class Friends extends Component {
  state = {
    friends: [],
    windowsSize: document.documentElement.clientHeight,
    userList: false,
    searchAnimesFunction: this.searchAllAnimes
  };

  constructor(props) {
    super(props);
    this.getAllFriends = this.getAllFriends.bind(this);
    this.removeFriend = this.removeFriend.bind(this);
    this.removeAllFriends = this.removeAllFriends.bind(this);
  }

  componentDidMount() {
    M.AutoInit();
    window.addEventListener('scroll', this.handleScroll);
    this.getAllFriends();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  getAllFriends() {
    FriendsApi.getAllFriends('5df9cfb41c9d44000047b035')
      .then(
        (result) => {
          var foundFriends = result
          this.setState({
            friends: foundFriends,
          });
        },
        (error) => {
          console.log(error)
          this.setState({
            errorInfo: "Problem with connection to server"
          });
        }
      );
  }

  removeFriend(friendId) {
    FriendsApi.removeFriend("5df9cfb41c9d44000047b035", friendId).then(
      () => {
        FriendsApi.getAllFriends('5df9cfb41c9d44000047b035')
        .then(
          (result) => {
            var foundFriends = result
            this.setState({
              friends: foundFriends,
            });
          },
          (error) => {
            console.log(error)
            this.setState({
              errorInfo: "Problem with connection to server"
            });
          }
        );
      },
      (error) => {
        console.log(error);
        this.setState({
          errorInfo: "Connection problem"
        })
      }
    )
  }

  removeAllFriends() {
    FriendsApi.removeAllFriends("5df9cfb41c9d44000047b035").then(
      () => {
        FriendsApi.getAllFriends('5df9cfb41c9d44000047b035')
        .then(
          (result) => {
            var foundFriends = result
            this.setState({
              friends: foundFriends,
            });
          },
          (error) => {
            console.log(error)
            this.setState({
              errorInfo: "Problem with connection to server"
            });
          }
        );
      },
      (error) => {
        console.log(error);
        this.setState({
          errorInfo: "Connection problem"
        })
      }
    )
  }

  render() {
    const listItems = this.state.friends.map((friend) =>
      <div>
        <Friend value={friend} />
        <a key="1" href="#" onClick={() => this.removeFriend(friend.id)}>
          <i className="material-icons">remove_circle</i>
            Remove friend
        </a>
      </div>
    );
    return (
      <div className="container">
        {this.state.friends.length !== 0 &&
          <span>
            <Row>
              {listItems}
              <hr />
            </Row>
            <a key="1" href="#" onClick={() => this.removeAllFriends()}>
              <i className="material-icons">remove_circle</i>
                Remove all friends
            </a>
          </span>
        }
        {this.state.friends.length === 0 &&
          <span>You have no friends</span>
        }
      </div>
    );
  }
}

export default Friends;