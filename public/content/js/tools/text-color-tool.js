import { createPickr } from "./../modules/pickr.js"

//? get elements
const elemClassNameInp = document.querySelector(".element-class-name-input")
const cssCodeBtn = document.querySelector(".css-code-btn")
const generateWrapBox = document.querySelector(".generate-wrap-box")
const text = document.querySelector(".text")
const colorPicker = document.querySelector(".color-picker")
const codePennel = document.querySelector(".code-pannel")
const styleInp = document.querySelector("#styleInp")
const copyToClipboard = document.querySelector(".clipboard-btn")
const cssCodeCloseBtn = document.querySelector(".close-generate-pannel-btn")

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

let StyleText = undefined
//? open generate pannel
const openGeneratePannel = () => {
    if (Color.isInit) {
        generateWrapBox.classList.add('active')
        StyleText = `.${Color.elemClass} { color: ${Color.color}; }`
        codePennel.innerHTML = `.${Color.elemClass} { <br>
            &nbsp;&nbsp;&nbsp; color: ${Color.color}; <br>
        }`
    } else
        alert("please complete the fields above")
}

//? copy to clipboard
const copyToClipboardText = () => {
    styleInp.value = StyleText
    navigator.clipboard.writeText(styleInp.value);
}

//? close generator pannel
const closeGeneratePannel = () => {
    generateWrapBox.classList.remove("active")
}

elemClassNameInp.addEventListener("keyup", checkElemClassNameInput)
cssCodeBtn.addEventListener("click", openGeneratePannel)
cssCodeCloseBtn.addEventListener("click", closeGeneratePannel)
copyToClipboard.addEventListener("click", copyToClipboardText)