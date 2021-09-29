import React, { useEffect, useState, useRef } from 'react';
import cpoy from '../images/copy.png';
import styled from 'styled-components';
import { Tooltip } from 'antd';

const Span = styled.span`
    cursor: pointer;
    padding-right: 0 !important;
    display: inline-block;
    img{
        width: 2.2rem !important;
        height: 2.2rem !important;
        vertical-align: middle;
    }
`

export default function CopyStr(props) {
    const { address } = props;
    const [show, setShow] = useState(false);
    const target = useRef(null);

    const copyAddress = () => {
        setShow(!show)
        const cInput = document.createElement('input');
        cInput.setAttribute('id', 'copyLayer');
        cInput.value = address;
        document.body.appendChild(cInput);
        cInput.select();
        document.execCommand('Copy');

        const thisNode = document.getElementById('copyLayer');
        thisNode.parentNode.removeChild(thisNode);
        setTimeout(() => {
            setShow(false)
        }, 1000)
    }

    return <span>
        <Tooltip title={address} visible={show} placement="top" zIndex="999">
            <Span ref={target} className="iconlft" onClick={() => copyAddress()}>
                <img src={cpoy} alt="" />
                {/* <svg t="1626933473235" className="icon" viewBox="0 0 1024 1024" version="1.1"
             xmlns="http://www.w3.org/2000/svg" p-id="1189" width="200" height="200">
            <path
                d="M931.882 131.882l-103.764-103.764A96 96 0 0 0 760.236 0H416c-53.02 0-96 42.98-96 96v96H160c-53.02 0-96 42.98-96 96v640c0 53.02 42.98 96 96 96h448c53.02 0 96-42.98 96-96v-96h160c53.02 0 96-42.98 96-96V199.764a96 96 0 0 0-28.118-67.882zM596 928H172a12 12 0 0 1-12-12V300a12 12 0 0 1 12-12h148v448c0 53.02 42.98 96 96 96h192v84a12 12 0 0 1-12 12z m256-192H428a12 12 0 0 1-12-12V108a12 12 0 0 1 12-12h212v176c0 26.51 21.49 48 48 48h176v404a12 12 0 0 1-12 12z m12-512h-128V96h19.264c3.182 0 6.234 1.264 8.486 3.514l96.736 96.736a12 12 0 0 1 3.514 8.486V224z"
                p-id="1190"></path>
        </svg> */}
            </Span>
        </Tooltip>
    </span>;
}


