let mytabs = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabsFromLocalStorage = JSON.parse( localStorage.getItem("mytabs") )
const saveTabBtn = document.getElementById("save-tab-btn")

if (tabsFromLocalStorage) {
    mytabs = tabsFromLocalStorage
    render(mytabs)
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        mytabs.push(tabs[0].url)
        localStorage.setItem("mytabs", JSON.stringify(mytabs) )
        render(mytabs)
    })
})

function render(tabs) {
    let listItems = ""
    for (let i = 0; i < tabs.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${tabs[i]}'>
                    ${tabs[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    mytabs = []
    render(mytabs)
})

inputBtn.addEventListener("click", function() {
    mytabs.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("mytabs", JSON.stringify(mytabs) )
    render(mytabs)
})

saveTabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const activeTab = tabs[0]
        const activeTabURL = activeTab.url
        inputEl.value = activeTabURL
        if (activeTabURL) {
            push(referenceInDB, activeTabURL)
                .then(() => {
                    inputEl.value = ""
                })
                .catch((error) => {
                    console.error("Error saving tab URL:", error)
                })
        }
    })
})