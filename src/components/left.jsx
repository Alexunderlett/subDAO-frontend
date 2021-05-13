import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";


export default function Left(){

    const [owner, setOwner] = useState('');
    const [description, setDescription] = useState('');
    const [logo, setLogo] = useState('');
    const [name, setName] = useState('');

    let { t } = useTranslation();

    useEffect(() => {

        let logo = sessionStorage.getItem('logo');
        setLogo(logo);

        let description = sessionStorage.getItem('description');
        setDescription(description);

        let owner = sessionStorage.getItem('owner');
        setOwner(owner);

        let name = sessionStorage.getItem('DaoName');
        setName(name);
    }, []);

    return (
        <div>
            <ul className='leftSide'>
                <li>
                    <h2>SubDAO</h2>
                    <div className='titleTips'>{t('DAOdescription')}</div>
                </li>
                <li><img src={logo} alt=""/></li>
                <li className='lftname'>{name}</li>
                <li>{owner}</li>
                <li>{description}</li>
            </ul>
        </div>
    )

}

