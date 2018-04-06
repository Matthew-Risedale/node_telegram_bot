import React from 'react';
import io from 'socket.io-client';

const socketUrl = 'http://127.0.0.1:3001';

class App extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            socket: false
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
        })
    }

    render() {
        return(
            <h1> telegram bot statistics </h1>
        )
    }
}

export default App;
