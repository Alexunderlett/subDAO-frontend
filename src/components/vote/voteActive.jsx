import React, {useEffect, useState} from 'react';
import PageComponent from '../pageComponent.jsx';
import {Table} from "react-bootstrap";
export default function VoteActive(props){

    const [indexList, setIndexList] = useState([]);
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
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto </td>
                        <td><span onClick={()=>handleClicktoview(34)}><i className="fa fa-sign-in"/> view</span></td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td><span><i className="fa fa-sign-in" /> view</span></td>
                    </tr>
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

