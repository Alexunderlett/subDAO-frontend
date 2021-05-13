import React, {Component} from 'react';

class Slick extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedID : null
        }
    }
    handleClicktoAbout(id) {
        this.props.history.push(`/home/about/${id}`)
        this.setState({
            selectedID: id
        })
    }
    componentDidMount() {
        let list = JSON.parse(sessionStorage.getItem('homelist'))
        if(list!=null){
            this.setState({list})
            // if(this.state.selectedID == null ){
            //     // this.setState({selectedID:list[0].address})
            // }

        }
        console.log("this.props.history.location.pathname",this.props.history.location.pathname)

        let str = this.props.history.location.pathname.split('/home/about/')[1]
        this.setState({selectedID:str})

    }
    render() {
        const {list} = this.props;
        return (
            <div>
            <div className='sliderBrdr'>
                <ul>
                    {
                        list.map((item,index)=>
                            <li key={item.address} className={this.state.selectedID === item.address ?'active':''}>
                                <img src={item.logo} alt="" onClick={this.handleClicktoAbout.bind(this,item.address,index)}/>
                            </li>
                        )
                    }
                </ul>

            </div>

            </div>
        );
    }

}
export default Slick;
