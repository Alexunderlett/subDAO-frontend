import React, {useEffect, useState} from 'react';
import PageComponent from '../pageComponent.jsx';
import {Table} from "react-bootstrap";
import {useSubstrate} from "../../api/contracts";
export default function VoteActive(props){

    // const {state,dispatch} = useSubstrate();
    //
    //
    // const {votecontract} = state;

    const [indexList, setIndexList] = useState([]);
    // const [totalNum, setTotalNum] = useState(0);
    // const [totalData, setTotalData] = useState({});
    // const [current, setCurrent] = useState(1);
    // const [pageSize, setPageSize] = useState(5);
    // const [totalPage, setTotalPage] = useState(0);



    useEffect(() => {
        if(props.list.length){
            setIndexList(props.list)
        }

        // if(votecontract)
        // console.log("votecontractvotecontractvotecontractvotecontract",state)
        // let totalNum = 52;
        // setTotalData({})
        // setTotalNum(totalNum)
        //
        // let totalPage = Math.ceil(totalNum / pageSize);
        // setTotalPage(totalPage)
        // pageClick(1);

    }, [props]);

    const handleClicktoVoteview = (voteid) => {
        let { id } = props;
        props.history.push(`/voteOverview/${id}/${voteid}`)
    }

    const handleClicktoview = (voteid) => {
        let { id } = props;
        props.history.push(`/voteView/${id}/${voteid}`)
    }

    // const pageClick = (pageNum) => {
    //     if (pageNum !== current) {
    //         setCurrent(pageNum)
    //     }
    //
    // }
    // const goNext = () => {
    //
    //     if (current < totalPage) {
    //         pageClick(current + 1);
    //     }
    // }
    //
    // const goPrevClick = () => {
    //     if (current > 1) {
    //        pageClick(current - 1);
    //     }
    // }

        return (
            <div>
                <Table striped bordered hover>
                    <tbody>
                    {
                        indexList.map((item,index)=><tr key={`active_${index}`}>
                            <td>{index}</td>
                            <td>{item.title}</td>
                            {/*<td>{item.title} </td>*/}
                            <td><span onClick={()=>handleClicktoview(index)}><i className="fa fa-sign-in"/> view</span></td>
                        </tr>)
                    }
                    </tbody>
                </Table>
                {/*<PageComponent total={totalNum}*/}
                {/*               current={current}*/}
                {/*               totalPage={totalPage}*/}
                {/*               pageClick={pageClick.bind(this)}*/}
                {/*               goPrev={goPrevClick.bind(this)}*/}
                {/*               goNext={goNext.bind(this)}*/}
                {/*/>*/}
            </div>
        )


}

