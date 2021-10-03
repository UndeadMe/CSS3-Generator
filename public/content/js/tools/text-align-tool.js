//? get elements
const elemClassNameInp = document.querySelector(".element-class-name-input")
const cssCodeBtn = document.querySelector(".css-code-btn")
const generateWrapBox = document.querySelector(".generate-wrap-box")
const text = document.querySelector(".text")
const alignBox = document.querySelector(".align-box")
const arrowRight = document.querySelector(".arrow-align-right")
const arrowLeft = document.querySelector(".arrow-align-left")
const alignMenuItems = document.querySelectorAll(".align-menu-item-box")

//? Align object
let Align = {
    elemClass: null,
    isInit: false,
    align: "center",
    direction: "ltr"
}

const checkElemClassNameInput = (e) => {
    let regexCode = /^[a-zA-Z" "]{1,30}$/g
    let regexResult = regexCode.test(e.target.value)

    if (regexResult) {
        Align.isInit = true
        Align.elemClass = e.target.value.split(" ").join("-")
        e.target.parentElement.previousElementSibling.innerHTML = ""

        addStyleToText()
    } else {
        Align.isInit = false
        e.target.parentElement.previousElementSibling.innerHTML = "Please complete the field below. You are allowed to enter up to 30 letters"
    }
}

//? add style to color box
const addStyleToText = () => 
    text.style.textAlign = `${Align.align}`

//? open generate pannel
const openGeneratePannel = () => {
    if (Stroke.isInit) {
        if (Stroke.strokeValidation) 
            generateWrapBox.classList.add('active')
        else 
            alert("please complete the fields correctly")
    } else
        alert("please complete the fields above")
}

//? init arrow
const initArrow = (right = true) => {
    if (right) {
        Align.direction = "rtl"
        arrowRight.innerHTML = '<i class="bi bi-arrow-right-square-fill"></i>'
        arrowLeft.innerHTML = '<i class="bi bi-arrow-left-square"></i>'
        text.style.direction = "rtl"
    } else {
        Align.direction = "ltr"
        arrowLeft.innerHTML = '<i class="bi bi-arrow-left-square-fill"></i>'
        arrowRight.innerHTML = '<i class="bi bi-arrow-right-square"></i>'
        text.style.direction = "ltr"
    }
}

//? check init
const checkInit = () => {
    return Align.isInit ? true : false
}

//? active align box
const activeAlignBox = () => 
    alignBox.classList.contains("active") ? alignBox.classList.remove("active") : alignBox.classList.add("active")


elemClassNameInp.addEventListener("keyup", checkElemClassNameInput)
elemClassNameInp.addEventListener("focus", () => alignBox.classList.remove("active"))
cssCodeBtn.addEventListener("click", openGeneratePannel)
alignBox.addEventListener("click", () => checkInit() ? activeAlignBox() : alert("please complete the fields correctly"))
arrowRight.addEventListener("click",() => checkInit() ? initArrow() : alert("please complete the fields correctly"))
arrowLeft.addEventListener("click", () => checkInit() ? initArrow(false) : alert("please complete the fields correctly"))

alignMenuItems.forEach(menuItem => {
    menuItem.addEventListener("click", () => {
        alignMenuItems.forEach(allMenuItems => {
            if (allMenuItems.innerText === menuItem.innerText) {
                allMenuItems.classList.add('active')
                Align.align = allMenuItems.innerText.toLowerCase()
                addStyleToText()
            } else
                allMenuItems.classList.remove("active")
        })
    })
})