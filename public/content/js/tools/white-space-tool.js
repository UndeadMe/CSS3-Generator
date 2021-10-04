//? get elements
const elemClassNameInp = document.querySelector(".element-class-name-input")
const cssCodeBtn = document.querySelector(".css-code-btn")
const generateWrapBox = document.querySelector(".generate-wrap-box")
const text = document.querySelector(".text")
const whiteSpaceBox = document.querySelector(".white-space-box")
const whiteSpaceMenuItems = document.querySelectorAll(".white-space-menu-item-box")

//? white space obj
let White_Space = {
    elemClass: null,
    isInit: false,
    white_space: "normal"
}

const checkElemClassNameInput = (e) => {
    let regexCode = /^[a-zA-Z" "]{1,30}$/g
    let regexResult = regexCode.test(e.target.value)

    if (regexResult) {
        White_Space.isInit = true
        White_Space.elemClass = e.target.value.split(" ").join("-")
        e.target.parentElement.previousElementSibling.innerHTML = ""

        addStyleToText()
    } else {
        White_Space.isInit = false
        e.target.parentElement.previousElementSibling.innerHTML = "Please complete the field below. You are allowed to enter up to 30 letters"
    }
}

//? add style to color box
const addStyleToText = () => 
    text.style.whiteSpace = `${White_Space.white_space}`

//? open generate pannel
const openGeneratePannel = () => {
    if (White_Space.isInit) {
        generateWrapBox.classList.add('active')
    } else
        alert("please complete the fields above")
}

//? check init
const checkInit = () => {
    return White_Space.isInit ? true : false
}

//? active align box
const activeAlignBox = () => 
    whiteSpaceBox.classList.contains("active") ? whiteSpaceBox.classList.remove("active") : whiteSpaceBox.classList.add("active")


elemClassNameInp.addEventListener("keyup", checkElemClassNameInput)
elemClassNameInp.addEventListener("focus", () => whiteSpaceBox.classList.remove("active"))
cssCodeBtn.addEventListener("click", openGeneratePannel)
whiteSpaceBox.addEventListener("click", () => checkInit() ? activeAlignBox() : alert("please complete the fields correctly"))

whiteSpaceMenuItems.forEach(menuItem => {
    menuItem.addEventListener("click", () => {
        whiteSpaceMenuItems.forEach(allMenuItems => {
            if (allMenuItems.innerText === menuItem.innerText) {
                allMenuItems.classList.add('active')
                White_Space.white_space = allMenuItems.innerText.toLowerCase()
                addStyleToText()
            } else
                allMenuItems.classList.remove("active")
        })
    })
})