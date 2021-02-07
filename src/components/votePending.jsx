import React, {Component} from 'react';
import PageComponent from './pageComponent.jsx';
import {Table} from "react-bootstrap";
import VoteModalTips from "./vote/votemodalTips";

class VotePending extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            indexList: [],
            totalNum: 0,
            totalData: {},
            current: 1,
            pageSize: 5,
            totalPage: 0,
        }
    }

    componentWillMount() {
        // ajax

        let totalNum = 52;
        this.setState({totalData: {}});
        this.setState({totalNum: totalNum});

        let totalPage = Math.ceil(totalNum / this.state.pageSize);
        this.setState({totalPage: totalPage});
        this.pageClick(1);

    }
    handleClicktoVoteview = (voteid) => {
        let { id } = this.props;
        this.props.history.push(`/voteOverview/${id}/${voteid}`)
    }
    pageClick = (pageNum) => {
        if (pageNum !== this.state.current) {
            // this.state.current = pageNum
            this.setState({current: pageNum}, () => {
                console.log("====", this.state.current)
            })
        }

        // _this.state.indexList = [];//清空之前的数据
        // for (var i = (pageNum - 1) * _this.state.pageSize; i < _this.state.pageSize * pageNum; i++) {
        //     if (_this.state.totalData.array[i]) {
        //         _this.state.indexList.push(_this.state.totalData.array[i])
        //     }
        // }
        // _this.setState({indexList: _this.state.indexList})
        // console.log(_this.state.indexList)
    }
    goNext = () => {
        let cur = this.state.current;
        if (cur < this.state.totalPage) {
            this.pageClick(cur + 1);
        }
    }
    goPrevClick = () => {
        let cur = this.state.current;
        if (cur > 1) {
            this.pageClick(cur - 1);
        }
    }
    triggerConfirm(id){
        console.log(id)
        this.setState({showModal: true})
    }
    handleClose = () => {
        this.setState({showModal: false})
    }
    render() {
        return (
            <div>
                <VoteModalTips handleClose={this.handleClose} showTips={this.state.showModal}/>
                <Table striped bordered hover>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Pending</td>
                        <td><span onClick={this.triggerConfirm.bind(this,34)}><i className="fa fa-toggle-on"/> trigger</span></td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Pending</td>
                        <td><span><i className="fa fa-toggle-on" /> trigger</span></td>
                    </tr>
                    </tbody>
                </Table>
                <PageComponent total={this.state.totalNum}
                               current={this.state.current}
                               totalPage={this.state.totalPage}
                               pageClick={this.pageClick.bind(this)}
                               goPrev={this.goPrevClick.bind(this)}
                               goNext={this.goNext.bind(this)}
                />
            </div>
        )
    }

}

export default VotePending;
