import { createGlobalStyle } from "styled-components";
import "../scss/fonts.scss";

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

  /* modal */
  .ant-modal-root{
    .ant-modal-mask{
      background: #F9FAFF;
      opacity: 0.95;
    }
    .ant-modal-wrap{
      .ant-modal-content{
        box-shadow: 0px 0px 20px 0px rgba(16, 22, 75, 0.1);
        border-radius: 32px;
        .ant-modal-close{
          top: 6px;
          right: 6px;
        }
        .ant-modal-body{
          padding-top: 50px;
        }
      }
    }
  }

  /* daoModal */
  .daoModal{
    width: 100vw !important;
    margin: 0;
    top: 106px;

    .ant-modal-content{
      background: #10164B;
      width: 100vw;
      height: calc(100vh - 182px);
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 0 !important;
      
      .ant-modal-close{
        color: #CCCCD8;
      }
      .ant-modal-body{
        box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
        border-radius: 55px 55px 0px 0px;
        height: 100%;
        background: white;
        margin-top: 76px;
      }
    }
  }

  .content{
    padding: 40px 0;
  }


  .daoItem{
    width: 200px;
    height: 268px;
    padding: 28px;
    background: rgba(16, 22, 75, 0.04);
    border-radius: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;

    &:hover{
        background: #FFEFF7;
        transform: scale(1.05);
        .title{
            color: #D52473;
        }
    }

    img{
        width: 90px;
        height: 90px;
    }
    .title{
        height: 24px;
        font-size: 20px;
        font-family: Roboto-Regular, Roboto;
        font-weight: 400;
        color: #10164B;
        line-height: 24px;
        margin: 16px 0 13px 0;
    }
    .detail{
        font-size: 14px;
        font-family: Roboto-Light, Roboto;
        font-weight: 300;
        color: #10164B;
        line-height: 17px;
        text-align: center;
    }
  }
}
`;

export default GlobalStyle;
