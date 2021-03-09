import React, {useEffect, useState} from 'react';
import {Button} from "react-bootstrap";
import {useSubstrate} from "../../api/contracts";
import api from "../../api";

export default function ForthStep(props) {
    const {state, dispatch} = useSubstrate();
    const {maincontract, daoManagercontract} = state;

    const [instanceByTemplate, setinstanceByTemplate] = useState(false);
    const [name, setname] = useState('');
    const [logo, setlogo] = useState('');
    const [desc, setdesc] = useState('');
    const [ercUrl, setercUrl] = useState('');
    const [symbol, setsymbol] = useState('');
    const [ercSupply, setsercSupply] = useState('');
    const [baseC, setbaseC] = useState(null);
    const [tokenlist,settokenlist]= useState([]);
    const [adminlist,setadminlist]= useState([]);
    const [contractlist,setcontractlist]= useState(null);
    const [transfer,settransfer]= useState(false);
    const [admin,setadmin]= useState(false);
    const [queryAddrs,setqueryAddrs]= useState(false);
    const [daoinit,setDaoinit]= useState(false);

    const handleClicktoAbout = () => {
        props.history.push(`/about/${baseC.dao_manager_addr}`);
        sessionStorage.removeItem("step");
        sessionStorage.removeItem("secondStep");
        sessionStorage.removeItem("thirdStep");
        sessionStorage.removeItem("firstStep");
        sessionStorage.removeItem("ImageUrl");
    }
    useEffect(async () => {
        const firstStep = JSON.parse(sessionStorage.getItem('firstStep'));
        setname(firstStep.name);
        setdesc(firstStep.description);

        const secondStep = JSON.parse(sessionStorage.getItem('secondStep'));
        setercUrl(secondStep[0].dao_manager_code_hash);

        const thirdStep = JSON.parse(sessionStorage.getItem('thirdStep'));
        const {symbol,supply,admin,token,adminlist,tokenlist} = thirdStep;
        setsymbol(symbol);
        setsercSupply(supply);
        if(admin){
            setadminlist(adminlist);
        }
        if(token){
            settokenlist(tokenlist);
        }
        const img = sessionStorage.getItem('ImageUrl');
        setlogo(img);

    }, []);
        useEffect(async () => {

        // 1.调用main合约实例化DAO，instanceByTemplate (index: u64, controller: AccountId): bool
        // 2.等待上链，in block，根据当前账户地址查询实例化的DAO列表，listDaoInstancesByOwner (owner: AccountId): Vec<DAOInstance>
        // 取当前id最大即最新的DAO实例
        // 3.获取DAO地址后，调用初始化传入DAO名称和token初始化，init(&mut self, base_name: String, base_logo: String, base_desc: String,
        //     erc20_name: String, erc20_symbol: String, erc20_initial_supply: u64, erc20_decimals: u8) -> bool
        // 4.获取DAO地址后，调用分配token，transfer(&mut self, to: AccountId, value: u64) -> bool
        // 5.获取DAO地址后，调用增加管理员，add_dao_moderator(&mut self, name: String, moderator: AccountId) -> bool
        // 6.初始化完成，查询DAO管理的组件地址，query_component_addrs(&self) -> DAOComponentAddrs
        await api.main.instanceByTemplate(maincontract, (result) => {
            setinstanceByTemplate(result)
            console.log("第一步=======instanceByTemplate")
        });

//         if(maincontract) {
//
//             const AccountId = JSON.parse(sessionStorage.getItem('account'));
//
//             console.log(AccountId, AccountId[0].address, AccountId[0].meta.name)
//
//
//             function sleep(delay) {
//                 for(var t = Date.now(); Date.now() - t <= delay;);
//             }
// // // NOTE the apps UI specified these in mega units


        //
        // const value = 0;
        // const gasLimit = 138003n * 1000000n;
        // const keyring = new Keyring({type: 'sr25519'});
        // let alicePair = keyring.createFromUri('//Alice');


// // Perform the actual read (no params at the end, for the `get` message)
// // (We perform the send from an account, here using Alice's address)
//             console.info(maincontract.query)
//             console.info(maincontract.tx)
//
//
//
//
//
//             // 查询所有的dao 用于欢迎页的dao查询
//             let list_all_dao_result = await maincontract.query.listDaoInstances(AccountId[0].address, {
//                 value: 0,
//                 gasLimit: -1
//             })
//             console.log("main.listDaoInstances", list_all_dao_result, list_all_dao_result.output.toJSON())
        // 实例化DAO并配置
        // 1.调用main合约实例化DAO，instanceByTemplate (index: u64, controller: AccountId): bool
        // await maincontract.tx.instanceByTemplate({value, gasLimit}, 0, alicePair.address)
        // .signAndSend(alicePair, (result) => {
        //     if (result.status.isInBlock) {
        //         console.log('main.instanceByTemplate in a block', result);
        //     } else if (result.status.isFinalized) {
        //         console.log('main.instanceByTemplate finalized', result);
        //     }
        // });

//
//             sleep(10000);
//             // 2.等待上链，in block，根据当前账户地址查询实例化的DAO列表，listDaoInstancesByOwner (owner: AccountId): Vec<DAOInstance>
//             // 取当前id最大即最新的DAO实例
//             let list_dao_result = await maincontract.query.listDaoInstancesByOwner(AccountId[0].address, {
//                 value: 0,
//                 gasLimit: -1
//             }, alicePair.address)
//             console.log("main.listDaoInstancesByOwner", list_dao_result)
//             let instances = list_dao_result.output.toJSON()
//             let dao_manager_addr = instances[instances.length-1].dao_manager_addr
//             console.log("dao_manager_addr", dao_manager_addr)
//             let dao_contract = await ConnectContract(api, 'daoManager', dao_manager_addr);
//
//             // 3.获取DAO地址后，调用初始化传入DAO名称和token初始化，init(&mut self, base_name: String, base_logo: String, base_desc: String,
//             //     erc20_name: String, erc20_symbol: String, erc20_initial_supply: u64, erc20_decimals: u8) -> bool
//             await dao_contract.tx.init({value, gasLimit}, "subDao",
//                 "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01bbd9578344f20000012e7e77d544.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617551152&t=2de02677c5637bbc68b077781c220be5",
//                 "subDAO",
//                 "subDAO",
//                 "SDT",
//                 10000,
//                 0).signAndSend(alicePair, (result) => {
//                     if (result.status.isInBlock) {
//                         console.log('dao_manager.init in a block', result);
//                     } else if (result.status.isFinalized) {
//                         console.log('dao_manager.init finalized', result);
//                     }
//                 });
//
//             sleep(10000);
//             // 4.获取DAO地址后，调用分配token，transfer(&mut self, to: AccountId, value: u64) -> bool
//             await dao_contract.tx.transfer({value, gasLimit}, "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty", 10)
//                 .signAndSend(alicePair, (result) => {
//                 if (result.status.isInBlock) {
//                     console.log('dao_manager.transfer in a block', result);
//                 } else if (result.status.isFinalized) {
//                     console.log('dao_manager.transfer finalized', result);
//                 }
//             });
//
//             sleep(10000);
//             // 5.获取DAO地址后，调用增加管理员，add_dao_moderator(&mut self, name: String, moderator: AccountId) -> bool
//             await dao_contract.tx.addDaoModerator({value, gasLimit}, "admin", "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty")
//                 .signAndSend(alicePair, (result) => {
//                     if (result.status.isInBlock) {
//                         console.log('dao_manager.addDaoModerator in a block', result);
//                     } else if (result.status.isFinalized) {
//                         console.log('dao_manager.addDaoModerator finalized', result);
//                     }
//                 });
//             // 6.初始化完成，查询DAO管理的组件地址，query_component_addrs(&self) -> DAOComponentAddrs
//             let component_addr_result = await dao_contract.query.queryComponentAddrs(AccountId[0].address, {
//                 value: 0,
//                 gasLimit: -1
//             })
//             console.log("dao_manager.queryComponentAddrs", component_addr_result)
//             console.log("component addrs", component_addr_result.output.toString())
//
//         }

    }, [maincontract]);
    useEffect(async () => {
        if (instanceByTemplate){
            console.log("第二步=======listDaoInstancesByOwner")
            await api.main.listDaoInstancesByOwner(maincontract).then(data => {
                if (!data) return;
                if (data.length) {
                    console.log("======listDaoInstancesByOwner",baseC,data)
                    setbaseC(data[data.length - 1])
                }
            });
        }
    }, [instanceByTemplate]);
    useEffect(async () => {
        if(baseC!=null){
            console.log("第三步=======InitDAO")
            await api.dao.InitDAO(state, dispatch, baseC.dao_manager_addr,(data)=>{
                setDaoinit(true)
            });
        }
    }, [baseC]);
    useEffect(async () => {
        if(daoinit){
            console.log("第四步=======传内容")
            let obj = {
                base_name: name,
                base_logo: logo,
                base_desc: desc,
                erc20_name: ercUrl,
                erc20_symbol: symbol,
                erc20_initial_supply: ercSupply,
                erc20_decimals: 0
            };
            if (daoManagercontract == null) return;
            await api.dao.setDAO(daoManagercontract, obj, (data) => {
                settransfer(data)
            });
        }
    }, [daoManagercontract,daoinit]);
    useEffect(async () => {
        if(transfer && daoinit){
            console.log("第五步======= transfer",transfer,daoinit)
            for(let item of tokenlist){
                await api.dao.transferToken(daoManagercontract, item,(data)=>{
                    setadmin(data)
                }).then(data=>{
                    console.log(data)
                });
            }
        }
    }, [transfer,daoinit]);

    useEffect(async () => {
        if(admin && daoinit){
            console.log("第六步======= 添加管理员",admin , daoinit)
            for(let item of adminlist){
                await api.dao.addDaoModeratorTx(daoManagercontract, item,(data)=>{
                    setqueryAddrs(data)
                }).then(data=>{
                    console.log(data)
                });
            }
        }
    }, [admin,daoinit]);
     useEffect(async () => {

         if( queryAddrs && daoinit){
             console.log("第七步======= queryComponentAddrs",queryAddrs,daoinit)
             await api.dao.queryComponentAddrs(daoManagercontract).then(data=>{
                 console.log(data,daoManagercontract)
                 setcontractlist(data)
             });
         }

        }, [queryAddrs,daoinit]);

    return <ul>
        {
            contractlist!=null && <li className='successful'>
            <div className="successFont">
                <h1>
                    <span>S</span>
                    <span>U</span>
                    <span>C</span>
                    <span>C</span>
                    <span>e</span>
                    <span>s</span>
                    <span>s</span>
                    <span>f</span>
                    <span>u</span>
                    <span>l</span>
                </h1>
            </div>
            <div className="successInfo">Create {name} successful !!</div>
        </li>}
        {
            contractlist!=null &&  <li className="addresslist">{
                Object.keys(contractlist).map((key)=>(
                    <div key={key}>
                        <span>{key}</span>
                        <a href="#">{contractlist[key]}</a>
                </div>))
            }
            </li>
        }


        <li className='brdr'>
            {/*<Button variant="outline-primary" className='leftBtn' onClick={toThirdStep}>Previous</Button>*/}
            {
                contractlist!=null &&  <Button variant="primary" onClick={handleClicktoAbout}>Manage</Button>
            }

        </li>
    </ul>;


}
