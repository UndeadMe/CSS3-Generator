import { makeResizableElem } from "./../modules/resizer.js"
import { createPickr } from "./../modules/pickr.js"

makeResizableElem(".resizable")

const elemClassNameInp = document.querySelector(".element-class-name-input")
const widthInp = document.querySelector(".width-inp")
const validationBorderElem = document.querySelector(".valdiation-inputs-elem")
const resizableBox = document.querySelector('.resizable')
const colorPickr = document.querySelector(".color-picker")
const styleBox = document.querySelector(".style-box")
const styleMenuItemBox = document.querySelectorAll(".style-menu-item-box")

let Border = {
    elemClass: null,
    isInit: false,
    border: {
        width: 3,
        style: "solid",
        color: "#53535C"
    },
    widthValidate: true
}

let pickr = createPickr(".color-picker")
pickr.on('change', (color) => {
    let COLOR = color.toHEXA().toString()
    Border.border.color = COLOR
    colorPickr.style.background = COLOR
    addStyleToResizable()
})

//? check Border init and do validation for elem class name input
const checkInit = (e) => {
    const regexCode = /^[a-zA-Z" "]{1,30}$/g
    const regexResult = regexCode.test(e.target.value)

    if (regexResult) {
        Border.isInit = true
        Border.elemClass = e.target.value.split(" ").join("-")
        uploadBorderDataInInputs()
        activeAllinputs()
        checkValidateInputs(widthInp.value)
        e.target.parentElement.previousElementSibling.innerHTML = ""
    } else {
        Border.isInit = false
        removeBorderDataFromInputs()
        disableAllInputs()
        e.target.parentElement.previousElementSibling.innerHTML = "Please complete the field below. You are allowed to enter up to 30 letters"
    }
}

//? disable all inputs
const disableAllInputs = () => {
    widthInp.disabled = true
}
disableAllInputs()

//? active all inputs
const activeAllinputs = () => {
    widthInp.disabled = false
}

//? upload contrast data in inputs
const uploadBorderDataInInputs = () => {
    widthInp.value = Border.border.width
}

//? remove contrast data from inputs
const removeBorderDataFromInputs = () => {
    widthInp.value = ""
}

//? style box
const openStyleBox = (e) => {
    if (e.target.classList.contains("active")) {
        e.target.classList.remove("active")
    }
    else
        e.target.classList.add("active")
}

//? style menu item
styleMenuItemBox.forEach(item => {
    if (Border.widthValidate) {
        item.addEventListener("click", () => {
            styleMenuItemBox.forEach(allItem => {
                if (allItem.innerText === item.innerText) {
                    if (checkValidation()) {
                        allItem.classList.add("active")
                        styleBox.children[0].innerHTML = allItem.innerText
                        changeBorderStyle(allItem.innerText)
                    } else {
                        alert("you need to enter information corrcetly")
                    }
                } else {
                    if (checkValidation() === false) {
                        if (!allItem.classList.contains("active"))
                            allItem.classList.remove("active")
                    } else 
                        allItem.classList.remove("active")
                }
            })
        })
    } 
})

//? change border style
const changeBorderStyle = (style) => {
    Border.border.style = String(style).toLowerCase()
    addStyleToResizable()
}

//? check validation
const checkValidation = () => {
    return Border.isInit && Border.widthValidate ? true : false
}

//? check validation
const checkValidateInputs = (value) => {
    const regexCode = /^(0|\+?[1-9]{1,2}|\+?[1-9]{1}0)$/g // FIXME
    const regexResult = regexCode.test(value)

    if (regexResult) {
        Border.widthValidate = true
        Border.border.width = Number(value)
        validationBorderElem.innerHTML = ""
        addStyleToResizable()
    } else {
        Border.widthValidate = false
        validationBorderElem.innerHTML = "Please select a positive number from 0 to 100"
    }
    
}

//? add style to image
const addStyleToResizable = () => {
    resizableBox.style.border = `${Border.border.width}px ${Border.border.style} ${Border.border.color}`
}

addStyleToResizable()

styleBox.addEventListener("click", openStyleBox)
elemClassNameInp.addEventListener("keyup", checkInit)
widthInp.addEventListener("keyup", (e) => checkValidateInputs(e.target.value))