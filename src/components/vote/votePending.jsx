import React, {Component, useEffect, useState} from 'react';
import PageComponent from '../pageComponent.jsx';
import {Table} from "react-bootstrap";
import VoteModalTips from "./votemodalTips";

export default function VotePending(props) {
    const [indexList, setIndexList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    // const [totalNum, setTotalNum] = useState(0);
    // const [totalData, setTotalData] = useState({});
    // const [current, setCurrent] = useState(1);
    // const [pageSize, setPageSize] = useState(5);
    // const [totalPage, setTotalPage] = useState(0);


    useEffect(() => {
        // let totalNum = 52;
        // setTotalData({})
        // setTotalNum(totalNum)
        //
        // let totalPage = Math.ceil(totalNum / pageSize);
        // setTotalPage(totalPage)
        // pageClick(1);


    }, []);




    // const handleClicktoVoteview = (voteid) => {
    //     let { id } = this.props;
    //     this.props.history.push(`/voteOverview/${id}/${voteid}`)
    // }
    // const pageClick = (pageNum) => {
    //     if (pageNum !== this.state.current) {
    //         // this.state.current = pageNum
    //         this.setState({current: pageNum}, () => {
    //             console.log("====", this.state.current)
    //         })
    //     }

        // _this.state.indexList = [];//清空之前的数据
        // for (var i = (pageNum - 1) * _this.state.pageSize; i < _this.state.pageSize * pageNum; i++) {
        //     if (_this.state.totalData.array[i]) {
        //         _this.state.indexList.push(_this.state.totalData.array[i])
        //     }
        // }
        // _this.setState({indexList: _this.state.indexList})
        // console.log(_this.state.indexList)
    // }
    const triggerConfirm = (id)=>{
        console.log(id)
        setShowModal(true)
    }
    const handleClose = () => {
        setShowModal(false)
    }
    // const goNext = () => {
    //     let cur = this.state.current;
    //     if (cur < this.state.totalPage) {
    //         this.pageClick(cur + 1);
    //     }
    // }
    // const goPrevClick = () => {
    //     let cur = this.state.current;
    //     if (cur > 1) {
    //         this.pageClick(cur - 1);
    //     }
    // }



    return (<div>
            <VoteModalTips handleClose={handleClose} showTips={showModal}/>
            <Table striped bordered hover>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Pending</td>
                    <td><span onClick={()=>triggerConfirm(34)}><i className="fa fa-toggle-on"/> trigger</span></td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Pending</td>
                    <td><span><i className="fa fa-toggle-on" /> trigger</span></td>
                </tr>
                </tbody>
            </Table>
            {/*<PageComponent total={this.state.totalNum}*/}
            {/*               current={this.state.current}*/}
            {/*               totalPage={this.state.totalPage}*/}
            {/*               pageClick={this.pageClick.bind(this)}*/}
            {/*               goPrev={this.goPrevClick.bind(this)}*/}
            {/*               goNext={this.goNext.bind(this)}*/}
            {/*/>*/}
        </div>)


}

