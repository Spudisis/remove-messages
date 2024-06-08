
const getInitIgnoreItemsLC = async ()=>{
    let value = []
    value = await chrome.storage.sync.get("ignore-values");
    if (value.hasOwnProperty('ignore-values')){
        return JSON.parse(value['ignore-values'])
    }
    return []
    
}

const setInitIgnoreItemsLC = async (newValue)=>{ // string[] || string
    const newIgnoreList = await getInitIgnoreItemsLC()
    console.log(newIgnoreList)
    const test = newIgnoreList.concat(newValue)
    chrome.storage.sync.set({ "ignore-values": JSON.stringify(test) });
    return test
}



    const formAddIgnore = document.getElementById('add-ignore')

    formAddIgnore.addEventListener("click", (e)=>{
        console.log(e)
        const ignoreValue = document.getElementById('add-ignore-value')
        const value = ignoreValue.value
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { ignoreValue: value }, async function (response) {
                console.log(response);
                const newIgnoreList = await getInitIgnoreItemsLC()
                setInitIgnoreItemsLC(value)
              
                console.log(newIgnoreList)
            });
        });
    }) 

