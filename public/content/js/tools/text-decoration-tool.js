import { createPickr } from "../modules/pickr.js"

//? get elements
const elemClassNameInp = document.querySelector(".element-class-name-input")
const cssCodeBtn = document.querySelector(".css-code-btn")
const generateWrapBox = document.querySelector(".generate-wrap-box")
const text = document.querySelector(".text")
const decorationInp = document.querySelector('.decoration-inp')
const decorationValidation = document.querySelector(".decoration-validation-elem")
const picker = document.querySelector(".color-picker")
const decorationBoxes = document.querySelectorAll(".decoration-box")
const decorationMenuItems = document.querySelectorAll(".decoration-menu-item-box")
const codePennel = document.querySelector(".code-pannel")
const styleInp = document.querySelector("#styleInp")
const copyToClipboard = document.querySelector(".clipboard-btn")
const cssCodeCloseBtn = document.querySelector(".close-generate-pannel-btn")

//? Decoration object
let Decoration = {
    elemClass: null,
    isInit: false,
    text: {
        thickness: 0,
        decorationStyle: "none",
        decorationLine: "none",
        color: "#FFFFFF",
    },
    thicknessValidation: true,
}

let colorPicker = createPickr(".color-picker", "#FFFFFF")
colorPicker.on('change', (color) => {
    let COLOR = color.toHEXA().toString()
    Decoration.text.color = COLOR
    picker.style.background = COLOR
    addStyleToText()
})

const checkElemClassNameInput = (e) => {
    let regexCode = /^[a-zA-Z" "]{1,30}$/g
    let regexResult = regexCode.test(e.target.value)

    if (regexResult) {
        Decoration.isInit = true
        Decoration.elemClass = e.target.value.split(" ").join("-")
        e.target.parentElement.previousElementSibling.innerHTML = ""

        activeAllInputs()
        uploadDataInInputs()
    } else {
        Decoration.isInit = false
        disableAllInputs()
        e.target.parentElement.previousElementSibling.innerHTML = "Please complete the field below. You are allowed to enter up to 30 letters"
    }
}

//? active inputs 
const activeAllInputs = () => {
    decorationInp.disabled = false
    picker.disabled = false
}

//? disable inputs
const disableAllInputs = () => {
    decorationInp.disabled = true
    picker.disabled = true
}

disableAllInputs()

//? add style to Font Size box
const addStyleToText = () => {
    let decorationObj = Decoration.text
    text.style.textDecoration = `${decorationObj.thickness}px 
                                ${decorationObj.decorationStyle} 
                                ${decorationObj.decorationLine} 
                                ${decorationObj.color}`
}

//? upload data in inputs
const uploadDataInInputs = () => 
    decorationInp.value = Decoration.text.thickness

let StyleText = undefined
//? open generate pannel
const openGeneratePannel = () => {
    if (Decoration.isInit) {
        if (Decoration.thicknessValidation) {
            generateWrapBox.classList.add('active')
            StyleText = `.${Decoration.elemClass} { text-decoration: ${Decoration.text.decorationLine} ${Decoration.text.decorationStyle} ${Decoration.text.thickness}px ${Decoration.text.color}; }`
            codePennel.innerHTML = `.${Decoration.elemClass} { <br>
                &nbsp;&nbsp;&nbsp;text-decoration: <br> 
                &nbsp;&nbsp;&nbsp;${Decoration.text.decorationLine}
                ${Decoration.text.decorationStyle}
                ${Decoration.text.thickness}px
                ${Decoration.text.color}; <br>
            }`
        } else 
            alert("please complete the filds correctly")
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


//? check validation
const checkValidateInputs = (value) => {
    if (!isNaN(value) && Number(decorationInp.value) <= 15 && Number(decorationInp.value) >= 0) {
        Decoration.thicknessValidation = true
        Decoration.text.thickness = Number(value)
        decorationValidation.innerHTML = ""
        addStyleToText()
    } else {
        Decoration.thicknessValidation = false
        decorationValidation.innerHTML = "Please select a positive number from 0 to 15"
    }
}

//? decoration
const decoration = (parent) => {
    if (Decoration.isInit) {
        if (Decoration.thicknessValidation) {
            activeDecorationBox(parent)
            let decParentElement = parent.parentElement.parentElement.previousElementSibling
            let text = parent.innerText.toLowerCase()
            decParentElement.children[0].innerText = text
            if (decParentElement.dataset.decoration === "style") {
                Decoration.text.decorationStyle = text
                addStyleToText()
            } else {
                Decoration.text.decorationLine = text
                addStyleToText()
            }
        } else 
            alert("please complete the fileds correctly")
    } else 
        alert("please complete the filed")
}

//? active decoration box
const activeDecorationBox = (element) => {
    decorationMenuItems.forEach(docorationMenuItem => {
        if (docorationMenuItem.innerText === element.innerText)
            docorationMenuItem.classList.add("active")
        else 
            docorationMenuItem.classList.remove("active")
    })
}

elemClassNameInp.addEventListener("keyup", checkElemClassNameInput)
cssCodeBtn.addEventListener("click", openGeneratePannel)
decorationInp.addEventListener("keyup", (e) => checkValidateInputs(e.target.value))
decorationMenuItems.forEach(decorationMenuItem => decorationMenuItem.addEventListener("click", () => decoration(decorationMenuItem)))
cssCodeCloseBtn.addEventListener("click", closeGeneratePannel)
copyToClipboard.addEventListener("click", copyToClipboardText)

decorationBoxes.forEach(decorationBox => {
    decorationBox.addEventListener("click", () => {
        if (Decoration.isInit) {
            if (Decoration.thicknessValidation) {
                if (!decorationBox.classList.contains("active"))
                    decorationBox.classList.add("active")
                else
                    decorationBox.classList.remove("active")
            } else 
                alert("please complete the fileds correctly")
        } else 
            alert("please complete the filed")
    })
})