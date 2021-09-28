const elemClassNameInp = document.querySelector(".element-class-name-input")
const saturateInp = document.querySelector(".saturate-inp")
const validationSaturateElem = document.querySelector(".saturate-validation-elem")
const previewImage = document.querySelector(".preview-image-box img")

let Saturate = {
    elemClass: null,
    isInit: false,
    saturate : 3,
    saturateValidate : true
}

//? check saturate init and do validation for elem class name input
const checkInit = (e) => {
    const regexCode = /^[a-zA-Z" "]{1,30}$/g
    const regexResult = regexCode.test(e.target.value)

    if (regexResult) {
        Saturate.isInit = true
        Saturate.elemClass = e.target.value.split(" ").join("-")
        uploadSaturateDataInInputs()
        activeAllinputs()
        checkValidateInputs(saturateInp.value)
        e.target.parentElement.previousElementSibling.innerHTML = ""
    } else {
        Saturate.isInit = false
        removeSaturateDataFromInputs()
        disableAllInputs()
        e.target.parentElement.previousElementSibling.innerHTML = "Please complete the field below. You are allowed to enter up to 30 letters"
    }
}

//? disable all inputs
const disableAllInputs = () => 
    saturateInp.disabled = true

disableAllInputs()

//? active all inputs
const activeAllinputs = () =>
    saturateInp.disabled = false

//? upload saturate data in inputs
const uploadSaturateDataInInputs = () =>
    saturateInp.value = Saturate.saturate

//? remove saturate data from inputs
const removeSaturateDataFromInputs = () => 
    saturateInp.value = ""

//? check validation
const checkValidateInputs = (value) => {
    const regexCode = /^(0|\+?[1-9]{1,2}|\+?[1-9]{1}0)$/g // FIXME
    const regexResult = regexCode.test(value)

    if (regexResult) {
        Saturate.saturateValidate = true
        Saturate.saturate = Number(value)
        validationSaturateElem.innerHTML = ""
        addStyleToImage()
    } else {
        Saturate.saturateValidate = false
        validationSaturateElem.innerHTML = "Please select a positive from 0 to 100"
    }
    
}

//? add style to image
const addStyleToImage = () =>
    previewImage.style.filter = `saturate(${Saturate.saturate})` // FIXME

addStyleToImage()

elemClassNameInp.addEventListener("keyup", checkInit)
saturateInp.addEventListener("keyup", (e) => checkValidateInputs(e.target.value))