const toolBoxButtons = document.querySelectorAll(".tool-box-button")
const searchBtn = document.querySelector(".search-btn")
const searchInp = document.querySelector(".search-input")
const scrollToTopCircle = document.querySelector(".scrollToTop-circle")

//? find tool box based by user search
const findToolBoxes = () => {
    //? get search value
    const searchValue = searchInp.value
    if (searchValue.length !== 0) {
        //? delete all class active for tool box buttons
        deleteActiveClass(toolBoxButtons)

        //? find search tool box
        let SearchToolBox = Array.from(toolBoxButtons).find(button => {
            return String(button.dataset.tool).toLowerCase().includes(searchValue.toLowerCase())
        })
        
        //? if search tool box !== null or ...
        if (SearchToolBox) {
            //? scroll to this tool
            window.scrollTo({
                top: SearchToolBox.getBoundingClientRect().top - 50,
                behavior: "smooth"
            })

            SearchToolBox.classList.add("active")
        }
    }
}

//? delete class active 
const deleteActiveClass = (elements) => {
    elements.forEach(item => {
        item.classList.remove("active")
    })
}

//? go to top scroll , scroll top = 0
const goToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}

searchBtn.addEventListener("click", findToolBoxes)
scrollToTopCircle.addEventListener("click", goToTop)
searchInp.addEventListener("keyup", (e) => {
    if (e.target.value.length === 0) 
        deleteActiveClass(toolBoxButtons)
    e.key === "Enter" ? findToolBoxes() : ""
})