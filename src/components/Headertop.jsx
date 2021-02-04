import React, {Component} from 'react';
import * as history from 'history'

const createHashHistory =history.createHashHistory();


class Headertop extends Component{
    constructor(props) {
        super(props);
        this.state={
            showHeader:null
        }
    }
    backNav=()=>{
        createHashHistory.goBack()

    }
    backHome=()=>{
        // console.log( createHashHistory.location.pathname)
        // createHashHistory.goBack(`/`)
        createHashHistory.push(`/`)
    }
    componentDidMount() {
        this.setState({
            showHeader: createHashHistory.location.pathname !== '/'
        });
        createHashHistory.listen((obj)=>{

            this.setState({
                showHeader: obj.pathname !== '/'
            });
        })
    }

    render() {
        return (<div className='container header'>
            <div className="row">
                <div className='col-6 leftText'>
                {
                    this.state.showHeader &&
                        <div>
                            <span onClick={this.backNav}><i className='fa fa-chevron-left' />Prev</span>
                            <span onClick={this.backHome}>Home</span>
                        </div>
                }
                </div>
                <div className='col-6 rightText'>
                    <div className="header-button">
                        <button className='btn'>Connect Wallet</button>
                    </div>
                </div>

            </div>
        </div>);
    }
}

export default Headertop
