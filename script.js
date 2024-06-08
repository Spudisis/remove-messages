
    window.addEventListener("load", ()=>{
        const nameForRemove = 'firstname secondname'

        MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
        const messages = document.querySelector('.im-page-chat-contain')

    
        var observer = new MutationObserver(function(mutations, observer) {
            // fired when a mutation occurs
            console.log(mutations);
            
            console.log()
            const hrefAuthorMessage = mutations[0].addedNodes[0].childNodes[3].childNodes[1].childNodes[1].childNodes[1].href
            const nameAuthorMessage = mutations[0].addedNodes[0].childNodes[3].childNodes[1].childNodes[1].childNodes[1].innerText.trim()
            // console.log(mutations[0].addedNodes[0].childList)
            console.log(nameAuthorMessage, hrefAuthorMessage)
      
            if (nameAuthorMessage === nameForRemove){
                mutations[0].addedNodes[0].remove()
            }

            // ...
        });
    
        // define what element should be observed by the observer
        // and what types of mutations trigger the callback
        
        observer.observe(messages, {
            subtree: true,
            childList: true
            //...
        });
    });
