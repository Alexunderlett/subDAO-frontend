import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from 'styled-components';
import Twitter from '../img/Twitter.png';
import github from '../img/github.png';
import subdaoicon from '../img/subdaoicon.png';
import LightPaper from '../img/LightPaper.png';
import Medium from '../img/Medium.png';
import { useLocation } from 'react-router-dom';


const Footer = styled.div`
    width: 100%;
    height: 60px;
    background: #FFFFFF;
    display: flex;
    align-items: center;

    .row{
        width: 144rem;
        margin: 0 auto !important;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .left{
            height: 4rem;
            line-height: 4rem;
            font-size: 1.8rem;
            font-family: PingFangSC-Light, PingFang SC !important;
            opacity: 0.5;
        }
        .rht{
            text-align: right;
            display: flex;
            
            a{
                margin-left: 4rem;
                color: #10164B;
                display: flex;
                align-items: center;
                text-decoration: none;
                img{
                    width: 4rem;
                    height: 4rem;
                    margin-right: 1rem;
                }
            }
        }
    }
`

const FootBtm = (props) => {
    const { pathname } = useLocation()
    const [show, setshow] = useState(false)

    useEffect(() => {
        if (pathname !== '/home') {
            setshow(false)
        } else {
            setshow(true)
        }
    }, [pathname])

    let { t } = useTranslation();
    return <section>
        <Footer>
            <div className="row" style={{ justifyContent: show ? 'space-between' : 'center' }}>
                <div className="left">{t('right')}</div>
                {show && <div className='rht'>
                    <a href="https://www.subdao.network/" rel="noopener noreferrer" target="_blank">
                        <img src={subdaoicon} alt="" />
                        {t('Website')}
                    </a>
                    <a href="https://medium.com/@subdao" target="_blank" rel="noopener noreferrer">
                        <img src={Medium} alt="" />
                        Medium
                    </a>
                    <a href="https://github.com/SubDAO-Network" target="_blank" rel="noopener noreferrer">
                        <img src={github} alt="" />
                        Github
                    </a>
                    <a href="https://drive.google.com/file/d/1L76e16DtK16Edjex7m_PRcTdaEzrLxBs/view" rel="noopener noreferrer" target="_blank">
                        <img src={LightPaper} alt="" />
                        Light Paper
                    </a>
                    <a href="https://twitter.com/subdao_network" target="_blank" rel="noopener noreferrer">
                        <img src={Twitter} alt="" />
                        Twitter
                    </a>
                    {/* <a href="https://t.me/subdao" target="_blank" rel="noopener noreferrer">
                        <img src={{}} alt="" />
                        Telegram
                    </a> */}
                </div>}
            </div>
        </Footer>
    </section>;
};

export default FootBtm;
