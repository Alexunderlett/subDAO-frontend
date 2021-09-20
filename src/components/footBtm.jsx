import React from "react";
import { useTranslation } from "react-i18next";
import styled from 'styled-components';
import Twitter from '../images/Twitter.png';
import LightPaper from '../images/LightPaper.png';
import Medium from '../images/Medium.png';

const Footer = styled.div`
    width: 100%;
    height: 100px;
    background: #FFFFFF;
    display: flex;
    align-items: center;

    .row{
        width: 75%;
        margin: 0 auto !important;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .left{
            height: 40px;
            line-height: 40px;
            font-size: 18px;
            font-family: PingFangSC-Light, PingFang SC !important;
            opacity: 0.5;
        }
        .rht{
            text-align: right;
            display: flex;
            
            a{
                margin-left: 40px;
                color: #10164B;
                display: flex;
                text-decoration: none;
                img{
                    width: 40px;
                    height: 40px;
                }
            }
        }
    }
`

const FootBtm = () => {
    let { t } = useTranslation();
    return <section>
        <Footer>
            <div className="row">
                <div className="left">{t('right')}</div>
                <div className='rht'>
                    <a href="https://www.subdao.network/" rel="noopener noreferrer" target="_blank">
                        {t('Website')}
                    </a>
                    <a href="https://medium.com/@subdao" target="_blank" rel="noopener noreferrer">
                        <img src={Medium} alt="" />
                        Medium
                    </a>
                    <a href="https://github.com/SubDAO-Network" target="_blank" rel="noopener noreferrer">
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
                </div>
            </div>
        </Footer>
    </section>;
};
export default FootBtm;
