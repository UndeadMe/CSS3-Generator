//? get elements
const elemClassNameInp = document.querySelector(".element-class-name-input")
const cssCodeBtn = document.querySelector(".css-code-btn")
const generateWrapBox = document.querySelector(".generate-wrap-box")
const text = document.querySelector(".text")
const weightBox = document.querySelector(".weight-box")
const weightMenuItems = document.querySelectorAll(".weight-menu-item-box")

//? Align object
let Weight = {
    elemClass: null,
    isInit: false,
    weight: "normal",
}

const checkElemClassNameInput = (e) => {
    let regexCode = /^[a-zA-Z" "]{1,30}$/g
    let regexResult = regexCode.test(e.target.value)

    if (regexResult) {
        Weight.isInit = true
        Weight.elemClass = e.target.value.split(" ").join("-")
        e.target.parentElement.previousElementSibling.innerHTML = ""

        addStyleToText()
    } else {
        Weight.isInit = false
        e.target.parentElement.previousElementSibling.innerHTML = "Please complete the field below. You are allowed to enter up to 30 letters"
    }
}

//? add style to color box
const addStyleToText = () => 
    text.style.fontWeight = `${Weight.weight}`

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
        arrowRight.innerHTML = '<i class="bi bi-arrow-right-square-fill"></i>'
        arrowLeft.innerHTML = '<i class="bi bi-arrow-left-square"></i>'
    } else {
        arrowLeft.innerHTML = '<i class="bi bi-arrow-left-square-fill"></i>'
        arrowRight.innerHTML = '<i class="bi bi-arrow-right-square"></i>'
    }
}

//? check init
const checkInit = () => {
    return Weight.isInit ? true : false
}

//? active align box
const activeAlignBox = () => 
    weightBox.classList.contains("active") ? weightBox.classList.remove("active") : weightBox.classList.add("active")


elemClassNameInp.addEventListener("keyup", checkElemClassNameInput)
elemClassNameInp.addEventListener("focus", () => weightBox.classList.remove("active"))
cssCodeBtn.addEventListener("click", openGeneratePannel)
weightBox.addEventListener("click", () => checkInit() ? activeAlignBox() : alert("please complete the fields correctly"))

weightMenuItems.forEach(menuItem => {
    menuItem.addEventListener("click", () => {
        weightMenuItems.forEach(allMenuItems => {
            if (allMenuItems.innerText === menuItem.innerText) {
                allMenuItems.classList.add('active')
                Weight.weight = allMenuItems.innerText.toLowerCase()
                addStyleToText()
            } else
                allMenuItems.classList.remove("active")
        })
    })
})