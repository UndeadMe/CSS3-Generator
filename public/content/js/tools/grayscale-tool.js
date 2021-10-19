const elemClassNameInp = document.querySelector(".element-class-name-input")
const grayscaleInp = document.querySelector(".grayscale-inp")
const validationGrayscaleElem = document.querySelector(".grayscale-validation-elem")
const previewImage = document.querySelector(".img-left")
const cssCodeBtn = document.querySelector(".css-code-btn")
const generateWrapBox = document.querySelector(".generate-wrap-box")
const codePennel = document.querySelector(".code-pannel")
const styleInp = document.querySelector("#styleInp")
const copyToClipboard = document.querySelector(".clipboard-btn")
const cssCodeCloseBtn = document.querySelector(".close-generate-pannel-btn")

let Grayscale = {
    elemClass: null,
    isInit: false,
    grayscale : 1,
    grayscaleValidate : true
}

//? check grayscale init and do validation for elem class name input
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

//? upload grayscale data in inputs
const uploadGrayscaleDataInInputs = () =>
    grayscaleInp.value = Grayscale.grayscale

//? remove grayscale data from inputs
const removeGrayscaleDataFromInputs = () => 
    grayscaleInp.value = ""

//? check validation
const checkValidateInputs = (value) => {
    if (!isNaN(value) && Number(grayscaleInp.value) <= 1 && Number(grayscaleInp.value) >= 0 && grayscaleInp.value.length <= 4) {
        Grayscale.grayscaleValidate = true
        Grayscale.grayscale = Number(value)
        validationGrayscaleElem.innerHTML = ""
        addStyleToImage()
    } else {
        Grayscale.grayscaleValidate = false
        validationGrayscaleElem.innerHTML = "Please select a positive number from 0 to 1"
    }
    
}

let StyleText = undefined
//? open generate pannel
const openGeneratePannel = () => {
    if (Grayscale.isInit) {
        if (Grayscale.grayscaleValidate) {
            generateWrapBox.classList.add("active")
            StyleText = `.${Grayscale.elemClass} { filter: grayscale(${Grayscale.grayscale}); }`
            codePennel.innerHTML = `.${Grayscale.elemClass} { <br>
                &nbsp;&nbsp;&nbsp; filter: grayscale(${Grayscale.grayscale}); <br>
            }`
        } else 
            alert("please enter the information correctly")
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

//? add style to image
const addStyleToImage = () =>
    previewImage.style.filter = `grayscale(${Grayscale.grayscale})`

addStyleToImage()

elemClassNameInp.addEventListener("keyup", checkInit)
grayscaleInp.addEventListener("keyup", (e) => checkValidateInputs(e.target.value))
cssCodeBtn.addEventListener("click", openGeneratePannel)
cssCodeCloseBtn.addEventListener("click", closeGeneratePannel)
copyToClipboard.addEventListener("click", copyToClipboardText)