import { createPickr } from "./../modules/pickr.js"

//? get elements
const elemClassNameInp = document.querySelector(".element-class-name-input")
const cssCodeBtn = document.querySelector(".css-code-btn")
const generateWrapBox = document.querySelector(".generate-wrap-box")
const text = document.querySelector(".text")
const colorPicker = document.querySelector(".color-picker")


let pickr = createPickr(".color-picker", "#FFFFFF")
pickr.on('change', (color) => {
    let COLOR = color.toHEXA().toString()
    Color.color = COLOR
    colorPicker.style.background = COLOR
    addStyleToText()
})

//? Color object
let Color = {
    elemClass: null,
    isInit: false,
    color: "#FFFFFF",
}

const checkElemClassNameInput = (e) => {
    let regexCode = /^[a-zA-Z" "]{1,30}$/g
    let regexResult = regexCode.test(e.target.value)

    if (regexResult) {
        Color.isInit = true
        Color.elemClass = e.target.value.split(" ").join("-")
        e.target.parentElement.previousElementSibling.innerHTML = ""

        activeAllInputs()
        uploadDataInInputs()
        addStyleToText()
    } else {
        Color.isInit = false
        disableAllInputs()
        removeDataFromInputs()
        removeStyleFromText()
        e.target.parentElement.previousElementSibling.innerHTML = "Please complete the field below. You are allowed to enter up to 30 letters"
    }
}

//? active inputs 
const activeAllInputs = () => 
    colorPicker.disabled = false

//? disable inputs
const disableAllInputs = () => 
    colorPicker.disabled = true

disableAllInputs()

//? upload data in inputs
const uploadDataInInputs = () => 
    colorPicker.style.background = `${Color.color}`

//? remove data from inputs
const removeDataFromInputs = () => 
    colorPicker.style.background = "#FFFFFF"

//? add style to color box
const addStyleToText = () => 
    text.style.color = `${Color.color}`

//? remove style from color box
const removeStyleFromText = () =>
    text.style.color = ""

//? open generate pannel
const openGeneratePannel = () => {
    if (Color.isInit) {
        generateWrapBox.classList.add('active')
    } else
        alert("please complete the fields above")
}

elemClassNameInp.addEventListener("keyup", checkElemClassNameInput)
cssCodeBtn.addEventListener("click", openGeneratePannel)