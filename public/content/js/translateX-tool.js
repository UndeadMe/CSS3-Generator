//? get elements
const elemClassNameInp = document.querySelector(".element-class-name-input")
const translateX_inp = document.querySelector(".translateX-inp")
const translateY_inp = document.querySelector(".translateY-inp")
const valdiationTranslateX_elem = document.querySelector(".translateX-validation-elem")
const valdiationTranslateY_elem = document.querySelector(".translateY-validation-elem")
const resizableBox = document.querySelector(".resizable")

translateX_inp.disabled = true
translateY_inp.disabled = true

//? shadow object
let Translate = {
    elemClass: null,
    isInit: false,
    initTranslateY: false,
    box: {
        translateX : 0 ,
        translateY : 0 ,
    },
    validation: {
        translateX_validate: true,
        translateY_validate: true,
    }
}

const checkElemClassNameInput = (e) => {
    let regexCode = /^[a-zA-Z" "]{1,30}$/g
    let regexResult = regexCode.test(e.target.value)

    if (regexResult) {
        Translate.isInit = true
        Translate.elemClass = e.target.value.split(" ").join("-")
        e.target.parentElement.previousElementSibling.innerHTML = ""
        activeAllInputs(Translate.initTranslateY)
        uploadTranslateDomInInputs(Translate.initTranslateY)
        checkValidateInput(translateX_inp.value , Translate.initTranslateY)
    } else {
        Translate.isInit = false
        disableAllInputs(Translate.initTranslateY)
        removeTranslateDataFromInputs(Translate.initTranslateY)
        removeStyleFromResizable(Translate.initTranslateY)
        e.target.parentElement.previousElementSibling.innerHTML = "Please complete the field below. You are allowed to enter up to 30 letters"
    }
}

//? disable all inputs 
const disableAllInputs = (initTranslateY) => {
    if (initTranslateY) {
        
    } else {
        translateX_inp.disabled = true
    }
}

//? active all inputs
const activeAllInputs = (initTranslateY) => {
    if (initTranslateY) {
        
    } else {
        translateX_inp.disabled = false
    }
}

//? upload translate data in inputs
const uploadTranslateDomInInputs = (initTranslateY) => {
    if (initTranslateY) {

    } else {
        translateX_inp.value = Translate.box.translateX
    }
}

//? remove translate data from inputs
const removeTranslateDataFromInputs = (initTranslateY) => {
    if (initTranslateY) {

    } else {
        translateX_inp.value = ""
    }
}

//? check translateX and translateY validation
const checkValidateInput = (value, initTranslateY) => {
    let regexCode = /^(0|-[1-9]{1,2}|-[1-9]{1}0|\+?[1-9]{1,2}|\+?[1-9]{1}0)$/
    let regexResult = regexCode.test(value)
    
    if (initTranslateY) {
        
    } else {
        if (regexResult) {
            Translate.validation.translateX_validate = true
            
            valdiationTranslateX_elem.innerHTML = ""
            
            Translate.box.translateX = Number(value)

            addStyleToResizable(Translate.initTranslateY)
        } else {
            Translate.validation.translateX_validate = false
            valdiationTranslateX_elem.innerHTML = "Please select a negative number from -100 to 0 or a positive number from 0 to 100"
        }
    }
}

//? add style to resizable box
const addStyleToResizable = (initTranslateY) => {
    if (initTranslateY) {

    } else {
        resizableBox.style.transform = `translateX(${Translate.box.translateX}px)`
    }
}

//? remove style from resizable box
const removeStyleFromResizable = (initTranslateY) => {
    if (initTranslateY) {

    } else {
        resizableBox.style.transform = `translateX(0)`
    }
}

elemClassNameInp.addEventListener("keyup", checkElemClassNameInput)

translateX_inp.addEventListener("keyup", (e) => checkValidateInput(e.target.value, Translate.initTranslateY))