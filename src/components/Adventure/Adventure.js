import React, { Component } from 'react';
import axios from 'axios';

class Adventure  extends Component {
   

    // componentDidMount(){
    //     axios.get(`/api/data`).then( res => {
    //         console.log('data', res.data)
    //         // this.setState({
    //         //     adventure: res.data
    //         // })
    //     })
    // }

    render() {
        let adventure = this.props.location.state.adventure
        console.log(this.props.location.state.adventure)

        return (
            <div className="Adventure">
                <div className="display-adventure-container">
                    <div>{adventure.location}</div>
                    <div>{adventure.location}</div>
                    <div>{adventure.location}</div>
                    <div>{adventure.location}</div>
                    <div>{adventure.location}</div>
                    <div>{adventure.location}</div>
                    <div>{adventure.location}</div>
                    <div>{adventure.location}</div>
                    <div>{adventure.location}</div>
                    <div>{adventure.starVotes}</div>
                    <div>{adventure.stars}</div>
                    <div>{adventure.url}</div>
                    <div>{adventure.summary}</div>
                </div>
            </div>
        );
    }
}

export default Adventure;