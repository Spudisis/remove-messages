const listIgnored = document.getElementById('list-ignored')

const getInitIgnoreItemsLC = async ()=>{
    let value = []
    value = await chrome.storage.sync.get("ignore-values");
    if (value.hasOwnProperty('ignore-values')){
        return JSON.parse(value['ignore-values'])
    }
    return []
    
}



const removeInitIgnoreItemLc = async (removed)=>{
    const value = await getInitIgnoreItemsLC()
    const newList = value.filter((elem)=> elem !== removed)
    chrome.storage.sync.set({ "ignore-values": JSON.stringify(newList) });
    setList(newList)
}


const setList = async ()=> {
    const res = await getInitIgnoreItemsLC()
    listIgnored.innerHTML=  res.reduce((acc, elem, id)=> { 
       
        return acc + `<div><span>${elem}</span><button id='${elem + id}'>-</button></div>`;
    },
    '')
    res.forEach((elem, id) => {
        document.getElementById(elem+id).addEventListener('click', ()=>{
            removeInitIgnoreItemLc(elem)
        }) 
    });
}

setList()