const elemClassNameInp = document.querySelector(".element-class-name-input")
const invertInp = document.querySelector(".invert-inp")
const validationInvertElem = document.querySelector(".invert-validation-elem")
const previewImage = document.querySelector(".img-left")
const cssCodeBtn = document.querySelector(".css-code-btn")
const generateWrapBox = document.querySelector(".generate-wrap-box")
const codePennel = document.querySelector(".code-pannel")
const styleInp = document.querySelector("#styleInp")
const copyToClipboard = document.querySelector(".clipboard-btn")
const cssCodeCloseBtn = document.querySelector(".close-generate-pannel-btn")

let Invert = {
    elemClass: null,
    isInit: false,
    invert : 1,
    invertValidate : true
}

//? check invert init and do validation for elem class name input
const checkInit = (e) => {
    const regexCode = /^[a-zA-Z" "]{1,30}$/g
    const regexResult = regexCode.test(e.target.value)

    if (regexResult) {
        Invert.isInit = true
        Invert.elemClass = e.target.value.split(" ").join("-")
        uploadInvertDataInInputs()
        activeAllinputs()
        checkValidateInputs(invertInp.value)
        e.target.parentElement.previousElementSibling.innerHTML = ""
    } else {
        Invert.isInit = false
        removeInvertDataFromInputs()
        disableAllInputs()
        e.target.parentElement.previousElementSibling.innerHTML = "Please complete the field below. You are allowed to enter up to 30 letters"
    }
}

//? disable all inputs
const disableAllInputs = () => 
    invertInp.disabled = true

disableAllInputs()

//? active all inputs
const activeAllinputs = () =>
    invertInp.disabled = false

//? upload hue rotate data in inputs
const uploadInvertDataInInputs = () =>
    invertInp.value = Invert.invert

//? remove hue rotate data from inputs
const removeInvertDataFromInputs = () => 
    invertInp.value = ""

//? check validation
const checkValidateInputs = (value) => {
    const regexCode = /^(0|\+?[1-9]{1,2}|\+?[1-9]{1}0)$/g // FIXME
    const regexResult = regexCode.test(value)

    if (regexResult) {
        Invert.invertValidate = true
        Invert.invert = Number(value)
        validationInvertElem.innerHTML = ""
        addStyleToImage()
    } else {
        Invert.invertValidate = false
        validationInvertElem.innerHTML = "Please select a positive from 0 to 1"
    }
    
}

let StyleText = undefined
//? open generate pannel
const openGeneratePannel = () => {
    if (Invert.isInit) {
        if (Invert.invertValidate) {
            generateWrapBox.classList.add("active")
            StyleText = `.${Invert.elemClass} { filter: invert(${Invert.invert}); }`
            codePennel.innerHTML = `.${Invert.elemClass} { <br>
                &nbsp;&nbsp;&nbsp; filter: invert(${Invert.invert}); <br>
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
    previewImage.style.filter = `invert(${Invert.invert})`

addStyleToImage()

elemClassNameInp.addEventListener("keyup", checkInit)
cssCodeBtn.addEventListener("click", openGeneratePannel)
invertInp.addEventListener("keyup", (e) => checkValidateInputs(e.target.value))
cssCodeCloseBtn.addEventListener("click", closeGeneratePannel)
copyToClipboard.addEventListener("click", copyToClipboardText)