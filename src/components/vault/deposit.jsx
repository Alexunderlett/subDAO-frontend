import React, {Component} from 'react';
import PageBackground from "../pagebackground";
import t3 from "../../images/t-4.png";
import {Button, Form, Alert} from "react-bootstrap";
import {CopyToClipboard} from 'react-copy-to-clipboard';

class Deposit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:null,
            copied: false,
            selected:null,
            list: [
                {
                    name: 'Non-Profit Organization Template',
                    value: 'value1',
                    img:require('../../images/t-4.png'),
                    address:'11ann4 d6tz vjzn rru6 fqee 3d57 rb62 xnph'
                },
                {
                    name: 'name2',
                    value: 'value2',
                    img:require('../../images/t-2.png'),
                    address:'ann3234 d6tz vjzn rru6 fqee 3d57 rb62 xnph'
                },
                {
                    name: 'name3',
                    value: 'value3',
                    img:'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1266732253,2995515206&fm=111&gp=0.jpg',
                    address:'ann654564 d6tz vjzn rru6 fqee 3d57 rb62 xnph'
                }
            ]
        }
    }
    componentDidMount() {
        this.setState({
            id: this.props.match.params.id
        });
    }

    handleClicktoVault=()=>{
        let { id } = this.state;
        this.props.history.push(`/vault/${id}`)
    }

    handleSelect = (e) => {
        let template = this.state.list.filter(item => item.value === e.target.value);
        this.setState({selected:template[0]})
    }

    render() {
        const {list,selected} = this.state;
        return (
            <div>
                <section>
                    <PageBackground/>
                    <div className="container">
                        <div className="createSingle row">
                            <div className='col-lg-4'>
                                <div>
                                    <img src={t3} alt=""/>
                                </div>
                            </div>
                            <div className='col-lg-8'>
                                <ul className="vault">
                                    <li>
                                        <Form.Control as="select"  onChange={this.handleSelect} >
                                            <option value=''>Please select option</option>
                                            {
                                                list.map(i => (
                                                    <option value={i.value} key={i.value}>{i.name}</option>
                                                ))
                                            }
                                        </Form.Control>
                                    </li>
                                    <li>
                                        <div className='row'>
                                            <div className="col-4">

                                                {   selected &&
                                                    <div className='qrcode'>
                                                        <img src={selected.img} width="100%" alt=""/>
                                                    </div>
                                                }
                                            </div>
                                            <div className="col-8">
                                                {
                                                    selected && <div>
                                                <div className='addressTop'>Deposit address</div>
                                                <div className='address'>

                                                            {selected.address}
                                                            <CopyToClipboard text='ann4 d6tz vjzn rru6 fqee 3d57 rb62 xnph'
                                                                             onCopy={() => this.setState({copied: true},()=>{setTimeout(()=>{this.setState({copied: false})},2000)})}>
                                                                <i className='fa fa-copy'/>
                                                            </CopyToClipboard>


                                                </div>
                                                    </div>
                                                }
                                                <div className='mt-4'>
                                                    {
                                                        this.state.copied &&
                                                        <Alert variant='primary' transition={true}>
                                                            Deposit address copied to clipboard!
                                                        </Alert>
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                    </li>

                                    <li className='brdr'>
                                        <Button variant="outline-primary" onClick={this.handleClicktoVault}>Back</Button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )
    }
}

export default Deposit;
