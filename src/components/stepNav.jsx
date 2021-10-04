import React from 'react';
import styled from 'styled-components';


const Bgline =styled.div`
    width: 7rem;
    height: 0.3rem;
    background: #E6E9F2;
    border-radius: 0.1rem;
    margin-top: 2.1rem;
`;
const Breadcrumbstep = styled.div`
    ul{
      display: flex;
      justify-content: space-between;
    }
  li{
      display: flex;
      padding-left: 1rem;
      &:first-child{
      padding-left: 0;
      }
     span{
        width: 4.5rem;
        height: 4.5rem;
        background: #E6E9F2;
        display: inline-block;
        border-radius: 100%;
        font-size: 2.4rem;
        font-family: Roboto-Regular;
        font-weight: 400;
        color: rgba(16, 22, 75, 0.4);
         text-align: center;
         line-height: 4.5rem;
     }
       .name{
        padding-left: 1rem;
        display: flex;
        justify-content: space-between;
        align-content: center;
        color: #878AA2;
         line-height: 4.5rem;
         .span{
            flex-grow: 2;
            padding-right: 1rem;
         }
     }
       &.active{
           span{
              background: rgba(213, 17, 114, 0.1);
              color: #D51172;
           }
          .name{
              color: #D51172;
          }
        }
   
  }
`

export default function StepNav(props){

        return <div >
            <Breadcrumbstep >

                    <ul>
                        <li className={props.type === 1?'active step1':'step1'}>
                            <span>1</span>
                            <div className='name'>
                                <div className="span">Basicin formation</div>
                                <Bgline />
                            </div>

                        </li>
                        <li className={props.type === 2?'active step2':'step2'}>
                            <span>2</span>
                            <div className='name'>
                                <div className="span">Template Selection</div>
                                <Bgline />
                            </div>

                        </li>
                        <li className={props.type === 3?'active step3':'step3'}>
                            <span>3</span>
                            <div className='name'>
                                <div className="span">Token Configuration</div>
                            </div>

                        </li>
                    </ul>
            </Breadcrumbstep>

        </div>;

}

