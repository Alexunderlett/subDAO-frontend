import React, { Component } from 'react';
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

class ForthStep extends Component {
    toThirdStep =() => {
        this.props.handlerSet(3)
    }
    render() {
        return <ul>
            <li className='successful'>
                <div className="successFont">
                    <h1>
                        <span>S</span>
                        <span>U</span>
                        <span>C</span>
                        <span>C</span>
                        <span>e</span>
                        <span>s</span>
                        <span>s</span>
                        <span>f</span>
                        <span>u</span>
                        <span>l</span>
                    </h1>
                </div>
                <div className="successInfo">Create PAKA Labs successful !!</div>
            </li>
            <li className="addresslist">
                <div>
                    <span>DAO Address</span>
                    <a href="#">DocumentsBlogsMediumTwitterDiscordGithub</a>
                </div>
                <div>
                    <span>Token Address</span>
                    <a href="#">DocumentsBlogsMediumTwitterDiscordGithub</a>
                </div>
                <div>
                    <span>Vault Address</span>
                    <a href="#">DocumentsBlogsMediumTwitterDiscordGithub</a>
                </div>
                <div>
                    <span>Org Address</span>
                    <a href="#">DocumentsBlogsMediumTwitterDiscordGithub</a>
                </div>
            </li>

            <li className='brdr'>
                <Button variant="outline-primary" className='leftBtn' onClick={this.toThirdStep}>Previous</Button>
                <Link to="/about"><Button variant="primary">Manage</Button></Link>
            </li>
        </ul>;
    }
}

export default ForthStep;
