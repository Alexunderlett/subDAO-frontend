const formatResult =  (result) =>{
    let str;
    if (result && result.output) {
        str = result.output.toHuman();
    }
    return str.substr(1)
}

export default{ formatResult }
