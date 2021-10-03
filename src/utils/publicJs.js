const formatResult =  (result) =>{
    let str;
    if (result && result.output) {
        str = result.output.toHuman();
    }
    return str;
}
const formatvoteDateTime = (dateTime,endTime) =>{
    dateTime = parseInt(dateTime.replace(/,/g, ""));
    endTime = parseInt(endTime.replace(/,/g, ""));


    const t = new Date(dateTime + endTime);
    const format = 'Y-m-d h:i:s';
    const year = t.getFullYear();
    const month = t.getMonth() + 1;
    const day = t.getDate();
    const hours = t.getHours();
    const minutes = t.getMinutes();
    const seconds = t.getSeconds();
    const hash = {
        'Y': year,
        'm': month,
        'd': day,
        'h': hours,
        'i': minutes,
        's': seconds
    };
    return format.replace(/\w/g, o => {
        return hash[o]
    })
}


export default{ formatResult, formatvoteDateTime }
