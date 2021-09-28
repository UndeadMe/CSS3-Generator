const elemClassNameInp = document.querySelector(".element-class-name-input")
const contrastInp = document.querySelector(".contrast-inp")
const validationContrastElem = document.querySelector(".contrast-validation-elem")
const previewImage = document.querySelector(".preview-image-box img")

let Contrast = {
    elemClass: null,
    isInit: false,
    contrast : 2,
    contrastValidate : true
}

//? check contrast init and do validation for elem class name input
const checkInit = (e) => {
    const regexCode = /^[a-zA-Z" "]{1,30}$/g
    const regexResult = regexCode.test(e.target.value)

    if (regexResult) {
        Contrast.isInit = true
        Contrast.elemClass = e.target.value.split(" ").join("-")
        uploadContrastDataInInputs()
        activeAllinputs()
        checkValidateInputs(contrastInp.value)
        e.target.parentElement.previousElementSibling.innerHTML = ""
    } else {
        Contrast.isInit = false
        removeContrastDataFromInputs()
        disableAllInputs()
        e.target.parentElement.previousElementSibling.innerHTML = "Please complete the field below. You are allowed to enter up to 30 letters"
    }
}

//? disable all inputs
const disableAllInputs = () => 
    contrastInp.disabled = true

disableAllInputs()

//? active all inputs
const activeAllinputs = () =>
    contrastInp.disabled = false

//? upload contrast data in inputs
const uploadContrastDataInInputs = () =>
    contrastInp.value = Contrast.contrast

//? remove contrast data from inputs
const removeContrastDataFromInputs = () => 
    contrastInp.value = ""

//? check validation
const checkValidateInputs = (value) => {
    const regexCode = /^(0|\+?[1-9]{1,2}|\+?[1-9]{1}0)$/g // FIXME
    const regexResult = regexCode.test(value)

    if (regexResult) {
        Contrast.contrastValidate = true
        Contrast.contrast = Number(value)
        validationContrastElem.innerHTML = ""
        addStyleToImage()
    } else {
        Contrast.contrastValidate = false
        validationContrastElem.innerHTML = "Please select a positive number from 0 to 100"
    }
    
}

//? add style to image
const addStyleToImage = () =>
    previewImage.style.filter = `contrast(${Contrast.contrast})`

addStyleToImage()

elemClassNameInp.addEventListener("keyup", checkInit)
contrastInp.addEventListener("keyup", (e) => checkValidateInputs(e.target.value))