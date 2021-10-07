const pannelIcon = document.querySelector(".sidebar-icon-item:nth-child(3)")
const wrapRightBox = document.querySelector(".wrap-right-box")
const wrap = document.querySelector(".wrap")
const headerPannelIcon = document.querySelector(".header-pannel-heading-icon")
const pannelFlashBox = document.querySelector(".pannel-flash-box")

//? if pannel opened return true else return false
const checkIsPannelOpen = () => {
    return wrapRightBox.classList.contains("active") ? true : false
}

//? open pannel
const openPannel = () => {
    wrapRightBox.classList.add('active')
    wrap.classList.add("active")
    pannelIcon.innerHTML = `<span class="sidebar-icon-link"><i class="bi bi-box-arrow-in-right"></i></span>`
    screen.availWidth > 1070 ? wrapRightBox.style.width = "500px" : wrapRightBox.style.width = "350px"
}

//? close pannel
const closePannel = () => {
    wrapRightBox.classList.remove('active')
    wrap.classList.remove("active")
    pannelIcon.innerHTML = `<span class="sidebar-icon-link"><i class="bi bi-box-arrow-right"></i></span>`
    wrapRightBox.style.width = 0
}

pannelIcon.addEventListener("click", () => {
    let pannelIsOpen = checkIsPannelOpen()
    pannelIsOpen ? closePannel() : openPannel()
})
headerPannelIcon.addEventListener("click", closePannel)
pannelFlashBox.addEventListener("click", openPannel)