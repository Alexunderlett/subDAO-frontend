import React,{Component} from 'react';

export default  class NewVoteTop extends Component{
    render() {
        return <div className='col-lg-12'>
            <div className="newvoteTop">
                <div className='bgline' />
                    <ul>
                        <li className={this.props.type === 1?'active step1':'step1'}>
                            <span>1</span>
                        </li>
                        <li className={this.props.type === 2?'active step2':'step2'}>
                            <span>2</span>
                        </li>
                        <li className={this.props.type === 3?'active step3':'step3'}>
                            <span>3</span>
                        </li>
                        <li className={this.props.type === 4?'active step4':'step4'}>
                            <span>4</span>
                        </li>
                        <li className={this.props.type === 5?'active step5':'step5'}>
                            <span>5</span>
                        </li>
                    </ul>


            </div>

        </div>;
    }
}

