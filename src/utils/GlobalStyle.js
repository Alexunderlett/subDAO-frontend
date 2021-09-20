import { createGlobalStyle } from 'styled-components'
import '../scss/fonts.scss'

const GlobalStyle = createGlobalStyle`
body,html{
  color: #10164B !important;
  background: #F9FAFF !important;
  font-family: Roboto-Light, Roboto !important;
  height: 100% !important;

  .maincontainer{
    display: flex;
    flex-direction: column;
    height: 100vh;
    z-index: 99;
    position: relative;

    .bodycontainer {
        flex-grow: 1;
    }
  }

  .btn{
    cursor: pointer;
    margin-right: 20px;
    // border: 1px solid #EE42D1;
    padding: 13px 28px;
    font-size: 24px;
    font-family: PingFangSC-Regular, PingFang SC;
    background: #D52473;
    color: #FFFFFF;
    outline: none;
    display: flex;
    align-items: center;
    //&:link{color:#fff}
    &:hover,&:focus{
      // background: linear-gradient(90deg, #4B69F2 0%, #EE42D1 100%);
      border:0;
      margin: 1px;
      margin-right: 21px;
      color: #FFFFFF;
      outline: none;
      //background-image: linear-gradient(#4B69F2,#EE42D1),linear-gradient(90deg, #4B69F2 0%, #EE42D1 100%);
    }
    &:active{
      // background: linear-gradient(90deg, rgba(75, 105, 242, 0.6) 0%, rgba(238, 66, 209, 0.6) 100%), linear-gradient(0deg, #000000, #000000);
      border:0;
      margin: 1px;
      margin-right: 21px;
      color: #FFFFFF;
      outline: none;
    }
    img{
      width: 24px;
      height: 16px;
      margin-left: 15px;
    }
  }

  #geist-ui-modal{
    .layer{
      background: #F9FAFF;
      opacity: 0.95;
    }
    .content{
      .wrapper.wrapper-enter.wrapper-enter-active{
        box-shadow: 0px 0px 20px 0px rgba(16, 22, 75, 0.1);
        border-radius: 32px;
      }
    }
  }
}
`;

export default GlobalStyle
