const elemClassNameInp = document.querySelector(".element-class-name-input")
const grayscaleInp = document.querySelector(".grayscale-inp")
const validationGrayscaleElem = document.querySelector(".grayscale-validation-elem")
const previewImage = document.querySelector(".img-left")

let Grayscale = {
    elemClass: null,
    isInit: false,
    grayscale : 1,
    grayscaleValidate : true
}

//? check contrast init and do validation for elem class name input
const checkInit = (e) => {
    const regexCode = /^[a-zA-Z" "]{1,30}$/g
    const regexResult = regexCode.test(e.target.value)

    if (regexResult) {
        Grayscale.isInit = true
        Grayscale.elemClass = e.target.value.split(" ").join("-")
        uploadGrayscaleDataInInputs()
        activeAllinputs()
        checkValidateInputs(grayscaleInp.value)
        e.target.parentElement.previousElementSibling.innerHTML = ""
    } else {
        Grayscale.isInit = false
        removeGrayscaleDataFromInputs()
        disableAllInputs()
        e.target.parentElement.previousElementSibling.innerHTML = "Please complete the field below. You are allowed to enter up to 30 letters"
    }
}

//? disable all inputs
const disableAllInputs = () => 
    grayscaleInp.disabled = true

disableAllInputs()

//? active all inputs
const activeAllinputs = () =>
    grayscaleInp.disabled = false

//? upload contrast data in inputs
const uploadGrayscaleDataInInputs = () =>
    grayscaleInp.value = Grayscale.grayscale

//? remove contrast data from inputs
const removeGrayscaleDataFromInputs = () => 
    grayscaleInp.value = ""

//? check validation
const checkValidateInputs = (value) => {
    const regexCode = /^(0|\+?[1-9]{1,2}|\+?[1-9]{1}0)$/g // FIXME
    const regexResult = regexCode.test(value)

    if (regexResult) {
        Grayscale.grayscaleValidate = true
        Grayscale.grayscale = Number(value)
        validationGrayscaleElem.innerHTML = ""
        addStyleToImage()
    } else {
        Grayscale.grayscaleValidate = false
        validationGrayscaleElem.innerHTML = "Please select a positive number from 0 to 1"
    }
    
}

//? add style to image
const addStyleToImage = () =>
    previewImage.style.filter = `grayscale(${Grayscale.grayscale})`

addStyleToImage()

elemClassNameInp.addEventListener("keyup", checkInit)
grayscaleInp.addEventListener("keyup", (e) => checkValidateInputs(e.target.value))