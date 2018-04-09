import React from 'react';
import io from 'socket.io-client';

const socketUrl = 'http://127.0.0.1:3001';

class App extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            socket: false,
            users: []
        }
    }

    componentDidMount() {
        
        this.initSocket()
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
                <div>
            <img src={user.photoUrl}/>
            <p>{user.userName}</p>
            </div>
        )
        })
        return (
            <div>
                <h1> telegram bot statistics </h1>
                {userList}
            </div>
        )
    }
}

export default App;
