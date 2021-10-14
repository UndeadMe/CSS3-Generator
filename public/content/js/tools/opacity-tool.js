import { makeResizableElem } from "./../modules/resizer.js"
import { createPickr } from "./../modules/pickr.js"

makeResizableElem(".resizable")

const elemClassNameInp = document.querySelector(".element-class-name-input")
const opacityInp = document.querySelector(".opacity-inp")
const validationOpacityElem = document.querySelector(".opacity-validation-elem")
const resizableBox = document.querySelector(".resizable")
const cssCodeBtn = document.querySelector(".css-code-btn")
const generateWrapBox = document.querySelector(".generate-wrap-box")
const cssCodeCloseBtn = document.querySelector(".close-generate-pannel-btn")
const codePennel = document.querySelector(".code-pannel")
const styleInp = document.querySelector("#styleInp")
const copyToClipboard = document.querySelector(".clipboard-btn")

let Opacity = {
    elemClass: null,
    isInit: false,
    opacity : 1,
    opacityValidate : true
}

//? check Opacity init and do validation for elem class name input
const checkInit = (e) => {
    const regexCode = /^[a-zA-Z" "]{1,30}$/g
    const regexResult = regexCode.test(e.target.value)

    if (regexResult) {
        Opacity.isInit = true
        Opacity.elemClass = e.target.value.split(" ").join("-")
        uploadOpacityDataInInputs()
        activeAllinputs()
        checkValidateInputs(opacityInp.value)
        e.target.parentElement.previousElementSibling.innerHTML = ""
    } else {
        Opacity.isInit = false
        removeOpacityDataFromInputs()
        disableAllInputs()
        e.target.parentElement.previousElementSibling.innerHTML = "Please complete the field below. You are allowed to enter up to 30 letters"
    }
}

//? disable all inputs
const disableAllInputs = () => 
    opacityInp.disabled = true

disableAllInputs()

//? active all inputs
const activeAllinputs = () =>
    opacityInp.disabled = false

//? upload hue rotate data in inputs
const uploadOpacityDataInInputs = () =>
    opacityInp.value = Opacity.opacity

//? remove hue rotate data from inputs
const removeOpacityDataFromInputs = () => 
    opacityInp.value = ""

//? check validation
const checkValidateInputs = (value) => {
    const regexCode = /^(0|\+?[1-9]{1,2}|\+?[1-9]{1}0)$/g // FIXME
    const regexResult = regexCode.test(value)

    if (regexResult) {
        Opacity.opacityValidate = true
        Opacity.opacity = Number(value)
        validationOpacityElem.innerHTML = ""
        addStyleToResizable()
    } else {
        Opacity.opacityValidate = false
        validationOpacityElem.innerHTML = "Please select a positive from 0 to 1"
    }
    
}

//? check all inputs and other elements validation is true and then open generate pannel
let text = undefined
const openGeneratePannel = () => {
    if (Opacity.isInit) {
        generateWrapBox.classList.add("active")
        
        text = `.${Opacity.elemClass} {opacity: ${Opacity.opacity}}`

        codePennel.innerHTML = `.${Opacity.elemClass} { <br>
            &nbsp;&nbsp;&nbsp; opacity: ${Opacity.opacity} <br>
        }`
        
    } else
        alert("Please enter the fields above")
}

//? copy to clipboard
const copyToClipboardText = () => {
    styleInp.value = text
    navigator.clipboard.writeText(styleInp.value);
}

//? close generator pannel
const closeGeneratePannel = () => {
    generateWrapBox.classList.remove("active")
}

//? add style to image
const addStyleToResizable = () =>
    resizableBox.style.filter = `opacity(${Opacity.opacity})`

addStyleToResizable()

elemClassNameInp.addEventListener("keyup", checkInit)
opacityInp.addEventListener("keyup", (e) => checkValidateInputs(e.target.value))
cssCodeBtn.addEventListener("click", openGeneratePannel)
cssCodeCloseBtn.addEventListener("click", closeGeneratePannel)
copyToClipboard.addEventListener("click", copyToClipboardText)