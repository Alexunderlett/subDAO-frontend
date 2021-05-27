import React, {useEffect, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {useSubstrate} from '../../api/contracts';
import api from "../../api";
import Loading from "../loading/Loading";
import {useTranslation} from "react-i18next";


export default function SecondStep(props) {
    const {state} = useSubstrate();
    const {maincontract} = state;

    const [loading, setLoading] = useState(false);
    const [tips, setTips] = useState('');

    let [selected, setselected] = useState([{id:null}]);
    let [list, setlist] = useState([]);

    let { t } = useTranslation();

    const toThirdStep = () => {
        props.handlerSet(3);
        sessionStorage.setItem('secondStep', JSON.stringify(selected))
    }
    const toFirstStep = () => {
        props.handlerSet(1)
    }
    const handleSelect = (e) => {


        let id = e.currentTarget.id;
        let template = list.filter(item => item.id === id);
        setselected(template)

    }
    useEffect(() => {
        let selected = JSON.parse(sessionStorage.getItem('secondStep'));
        if (selected) {
            setselected(selected)
        }
    }, []);
    useEffect(() => {

        console.log(selected[0].id == null  ,list.length)
        if ( selected[0].id == null && list.length) {
            console.log("=======selected=======",list[0])
            setselected([list[0]])
        }
    }, [selected,list]);
    useEffect(() => {
        const setlisttemplate = async () => {
            setLoading(true);
            setTips(t('InitializeTemplate'));
            await api.main.listTemplates(maincontract).then(data => {
                if (!data){
                    setTips(t('initializationFailed'));
                    setTimeout( () => {
                        props.history.push(`/`)
                    },2000)
                }else{
                    setlist(data);
                    setLoading(false);
                }
            })
        };
        setlisttemplate();
    }, [maincontract]);
    return (
        <div>
            <Loading showLoading={loading} tips={tips}/>
                <div className='topTitle'>{t('chooseTemplate')}</div>
                <div className='marginAuto'>
                    <div className='bgRht'>
                        <div className="listBrdr">
                            {
                                list.map(i => (

                                    <dl key={i.id} onClick={handleSelect} id={i.id} className={selected[0].id === i.id?'active':''}>
                                        <dt >{i.name}</dt>
                                        {i.components.map(item=>(<dd key={item[1]}>·  {item[0]}</dd>))}
                                    </dl>
                                ))
                            }

                        </div>
                    </div>
                </div>
                <div className='step2brdr'>
                    <Button variant="outline-primary" className='leftBtn' onClick={toFirstStep}>{t('think')}</Button>
                    <Button variant="primary" onClick={toThirdStep}>{t('Next')}</Button>
                </div>
        </div>)
        ;

}
