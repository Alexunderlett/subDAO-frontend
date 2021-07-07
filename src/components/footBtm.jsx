import React from "react";
import {useTranslation} from "react-i18next";

const FootBtm = ()=>{
    let { t } = useTranslation();
    return  <section>
        <div className='footer'>
            <div className="row">
                <div className="col-lg-6">{t('right')}</div>
                <div className='col-lg-6 rht'>
                    <a href="https://www.subdao.network/" rel="noopener noreferrer" target="_blank">{t('Website')}</a>
                    <a href="https://drive.google.com/file/d/1L76e16DtK16Edjex7m_PRcTdaEzrLxBs/view" rel="noopener noreferrer"target="_blank">Light Paper</a>
                    <a href="https://github.com/SubDAO-Network" target="_blank" rel="noopener noreferrer">Github</a>
                    <a href="https://medium.com/@subdao" target="_blank" rel="noopener noreferrer">Medium</a>
                    <a href="https://twitter.com/subdao_network" target="_blank" rel="noopener noreferrer">Twitter</a>
                </div>
            </div>



        </div>
    </section>;
};
export default  FootBtm;
