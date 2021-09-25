import React, { useEffect, useState } from 'react';
import { useSubstrate } from "../api/contracts";

function Slick(props) {
    const { state } = useSubstrate();
    const [selectedID, setselectedID] = useState(null);
    const [list, setList] = useState([]);

    const { homepage } = state;

    const handleClicktoAbout = (id) => {
        props.history.push(`/about/${id}`)
        setselectedID(id)
    }
    useEffect(() => {
        if (homepage != null) {
            setList(homepage)
        }
        console.log("this.props.history.location.pathname", props.history.location.pathname)

        let str = props.history.location.pathname.split('/about/')[1]
        setselectedID(str)
    }, [homepage]);

    return (
        <div className='sliderBrdr'>
            <ul>
                {
                    list.map((item, index) =>
                        <li key={item.address} className={selectedID === item.address ? 'active' : ''}>
                            <img src={item.logo} alt="" onClick={() => handleClicktoAbout(item.address, index)} />
                        </li>
                    )
                }
            </ul>
        </div>
    );
}
export default Slick;
