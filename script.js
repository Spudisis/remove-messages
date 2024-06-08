
const getInitIgnoreItemsLC = async ()=>{
    let value = []
    value = await chrome.storage.sync.get("ignore-values");
    if (value.hasOwnProperty('ignore-values')){
        return JSON.parse(value['ignore-values'])
    }
    return []
    
}
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('run', request)

    const cb = ()=>{
        MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
        const messages = document.querySelector('.im-page-chat-contain')

    
        var observer = new MutationObserver(async function(mutations, observer) {
            // fired when a mutation occurs
            console.log(mutations);
            
            console.log()
            const hrefAuthorMessage = mutations[0].addedNodes[0].childNodes[3].childNodes[1].childNodes[1].childNodes[1].href
            const nameAuthorMessage = mutations[0].addedNodes[0].childNodes[3].childNodes[1].childNodes[1].childNodes[1].innerText.trim()
            // console.log(mutations[0].addedNodes[0].childList)
            console.log(nameAuthorMessage, hrefAuthorMessage)
            const ignoreList = await getInitIgnoreItemsLC()
            if (ignoreList.includes(nameAuthorMessage)){
                mutations[0].addedNodes[0].remove()
            }

            // ...
        });
    
        
        observer.observe(messages, {
            subtree: true,
            childList: true
            //...
        });
    }
    if (document.readyState !== "complete") {
        window.addEventListener("load", cb);
    } else {
        cb();
    }

})
