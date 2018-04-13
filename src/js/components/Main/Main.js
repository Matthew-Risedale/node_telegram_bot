import React from 'react';
import io from 'socket.io-client';
import moment from 'moment';
import styles from './Main.scss';
import { Link } from "react-router-dom";

const socketUrl = 'http://127.0.0.1:3001';

class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      socket: false,
      users: [],
      stats: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:3001/api/users', {
      method: 'GET'
    })
      .then(resp => {
        return resp.json()
      })
      .then(data => {
        this.setState({
          users: data
        })
      })
      .then(this.initSocket)
      .catch(err => console.log(err));

    fetch('http://localhost:3001/api/stats', {
      method: 'GET'
    })
      .then(resp => {
        return resp.json()
      })
      .then(data => {
        for (let item of data) {
          item.time = moment(item.time * 1000).format('MMMM Do YYYY, h:mm:ss');
        }
        this.setState({
          stats: data
        })
      })
      .catch(err => console.log(err));
  }

  initSocket = () => {
    const socket = io(socketUrl)
    socket.on('connect', () => {
      console.log('connected')
      this.setState({
        socket: true
      })
      socket.on('newUser', (user) => {
        let users = this.state.users;
        users.push(user[user.length - 1]);
        this.setState({
          users
        })
      })
    })
  }

  render() {
    let userList = this.state.users.map((user) => {
      return (
        <div className={styles.user}>
          <img src={user.photoUrl} />
          <p>{user.userName}</p>
        </div>
      )
    })

    let statList = this.state.stats.map((stat) => {
      return (
        <tr>

          <td>{stat.commandName}</td>
          <td>{stat.time}</td>
        </tr>
      )
    })
    return (
      <div>
        <header className={styles.header}>
          <h1> Telegram bot statistics </h1>
        </header>


        <section className={styles.sectionUsers}>
          <header className={styles.sectionHeader}>
            <p className={styles.sectionTitle}>New users</p>
            <a href='#' className={styles.sectionMore}>
              <Link to={{
                pathname: '/users'
              }}> Show All </Link>
            </a>
          </header>
          <div className={styles.usersContainer}>
            {userList}
          </div>
        </section>

        <section className={styles.sectionUsers}>
          <header className={styles.sectionHeader}>
            <p className={styles.sectionTitle}>Last actions</p>
            <a href='#' className={styles.sectionMore}>Show all</a>
          </header>
          <div className={styles.statsContainer}>
            <table>
              <tbody>
                {statList}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    )
  }
}

export default Main;
