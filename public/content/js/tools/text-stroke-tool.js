import { createPickr } from "./../modules/pickr.js"

//? get elements
const elemClassNameInp = document.querySelector(".element-class-name-input")
const cssCodeBtn = document.querySelector(".css-code-btn")
const generateWrapBox = document.querySelector(".generate-wrap-box")
const text = document.querySelector(".text")
const colorPicker = document.querySelector(".color-picker")
const strokeInp = document.querySelector(".stroke-inp")
const strokeValidation = document.querySelector(".stroke-validation-elem")


let pickr = createPickr(".color-picker", "#FFFFFF")
pickr.on('change', (color) => {
    let COLOR = color.toHEXA().toString()
    Stroke.text.color = COLOR
    colorPicker.style.background = COLOR
    addStyleToText()
})

//? Stroke object
let Stroke = {
    elemClass: null,
    isInit: false,
    text: {
        stroke: 3,
        color: "#FFFFFF"
    },
    strokeValidation: true
}

const checkElemClassNameInput = (e) => {
    let regexCode = /^[a-zA-Z" "]{1,30}$/g
    let regexResult = regexCode.test(e.target.value)

    if (regexResult) {
        Stroke.isInit = true
        Stroke.elemClass = e.target.value.split(" ").join("-")
        e.target.parentElement.previousElementSibling.innerHTML = ""

        activeAllInputs()
        uploadDataInInputs()
        addStyleToText()
        checkValidateInputs(strokeInp.value)
    } else {
        Stroke.isInit = false
        disableAllInputs()
        removeDataFromInputs()
        removeStyleFromText()
        e.target.parentElement.previousElementSibling.innerHTML = "Please complete the field below. You are allowed to enter up to 30 letters"
    }
}

//? active inputs 
const activeAllInputs = () => {
    colorPicker.disabled = false
    strokeInp.disabled = false
}

//? disable inputs
const disableAllInputs = () => {
    colorPicker.disabled = true
    strokeInp.disabled = true
}

disableAllInputs()

//? upload data in inputs
const uploadDataInInputs = () => {
    colorPicker.style.background = `${Stroke.text.color}`
    strokeInp.value = `${Stroke.text.stroke}`
}

//? remove data from inputs
const removeDataFromInputs = () => {
    colorPicker.style.background = "#FFFFFF"
    strokeInp.value = ""
}

//? add style to color box
const addStyleToText = () => 
    text.style.webkitTextStroke  = `${Stroke.text.stroke}px ${Stroke.text.color}`

//? remove style from color box
const removeStyleFromText = () => 
    text.style.webkitTextStroke = ""

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

//? check validation
const checkValidateInputs = (value) => {
    const regexCode = /^(0|\+?[1-9]{1,2}|\+?[1-9]{1}0)$/g // FIXME
    const regexResult = regexCode.test(value)

    if (regexResult) {
        Stroke.strokeValidation = true
        Stroke.text.stroke = Number(value)
        strokeValidation.innerHTML = ""
        addStyleToText()
    } else {
        Stroke.strokeValidation = false
        strokeValidation.innerHTML = "Please select a positive number from 0 to 100"
    }
}

elemClassNameInp.addEventListener("keyup", checkElemClassNameInput)
cssCodeBtn.addEventListener("click", openGeneratePannel)
strokeInp.addEventListener("keyup", (e) => checkValidateInputs(e.target.value))