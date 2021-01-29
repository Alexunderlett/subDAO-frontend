import React, {Component} from 'react';
import * as history from 'history'


class Headertop extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isShow: true
        }
    }
    backNav=()=>{
        const createHashHistory =history.createHashHistory();
        createHashHistory.goBack()
    }

    render() {
        return (<div className='container header'>
            <div className="row ">
                <div className='col-6 leftText'>
                    {
                        this.state.isShow &&  <span onClick={this.backNav}><i className='fa fa-chevron-left'></i>back</span>
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
