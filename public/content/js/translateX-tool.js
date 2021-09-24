import { makeResizableElem } from "./resizer.js";

//? get elements
const elemClassNameInp = document.querySelector(".element-class-name-input")
const translateX_inp = document.querySelector(".translateX-inp")
const translateY_inp = document.querySelector(".translateY-inp")
const valdiationTranslateX_elem = document.querySelector(".translateX-validation-elem")
const valdiationTranslateY_elem = document.querySelector(".translateY-validation-elem")
const resizableBox = document.querySelector(".resizable")
const translateYPlusIcon = document.querySelector(".translateY-plus-icon")
const wrapTranslateBoxs = document.querySelector(".translate-x-y-box")
const propertiesTranslateX = document.querySelector(".properties-translateX-box")
const propertiesTranslateY = document.querySelector(".properties-translateY-box")
const cssCodeBtn = document.querySelector(".css-code-btn")
const generateWrapBox = document.querySelector(".generate-wrap-box")

//? shadow object
let Translate = {
    elemClass: null,
    isInit: false,
    initTranslateY: false,
    nowTranslate : "translateX",
    box: {
        translateX : 0 ,
        translateY : 0 ,
    },
    validation: {
        translateX_validate: true,
        translateY_validate: true,
    }
}

makeResizableElem(".resizable")

const checkElemClassNameInput = (e) => {
    let regexCode = /^[a-zA-Z" "]{1,30}$/g
    let regexResult = regexCode.test(e.target.value)

    if (regexResult) {
        Translate.isInit = true
        Translate.elemClass = e.target.value.split(" ").join("-")
        e.target.parentElement.previousElementSibling.innerHTML = ""

        if (Translate.initTranslateY) {
            translateYPlusIcon.innerHTML = '<i class="bi bi-dash-square"></i>'
            if (Translate.nowTranslate === "translateX") {
                activeAllInputs(false)
                uploadTranslateDomInInputs(false)
                checkValidateInput(translateX_inp.value , false)
                append_TX_TY_Box("translateX")
            } else {
                activeAllInputs(true)
                uploadTranslateDomInInputs(true)
                checkValidateInput(translateY_inp.value , true)
                append_TX_TY_Box("translateY")
            }
        } else {
            activeAllInputs(false)
            uploadTranslateDomInInputs(false)
            checkValidateInput(translateX_inp.value , false)
        }

    } else {
        Translate.isInit = false
        disableAllInputs(false)
        removeTranslateDataFromInputs(false)
        removeStyleFromResizable(false)
        disableAllInputs(true)
        removeTranslateDataFromInputs(true)
        removeStyleFromResizable(true)
        e.target.parentElement.previousElementSibling.innerHTML = "Please complete the field below. You are allowed to enter up to 30 letters"
        wrapTranslateBoxs.innerText = ""
        translateYPlusIcon.innerHTML = '<i class="bi bi-plus-square"></i>'
    }
}

//? disable all inputs 
const disableAllInputs = (initTranslateY) => {
    if (initTranslateY) {
        translateY_inp.disabled = true
    } else {
        translateX_inp.disabled = true
    }
}

disableAllInputs(true)
disableAllInputs(false)

//? active all inputs
const activeAllInputs = (initTranslateY) => {
    if (initTranslateY) {
        translateY_inp.disabled = false
    } else {
        translateX_inp.disabled = false
    }
}

//? upload translate data in inputs
const uploadTranslateDomInInputs = (initTranslateY) => {
    if (initTranslateY) {
        translateY_inp.value = Translate.box.translateY
    } else {
        translateX_inp.value = Translate.box.translateX
    }
}

//? remove translate data from inputs
const removeTranslateDataFromInputs = (initTranslateY) => {
    if (initTranslateY) {
        translateY_inp.value = ""
    } else {
        translateX_inp.value = ""
    }
}

//? check translateX and translateY validation
const checkValidateInput = (value, initTranslateY) => {
    let regexCode = /^(0|-[1-9]{1,2}|-[1-9]{1}0|\+?[1-9]{1,2}|\+?[1-9]{1}0)$/
    let regexResult = regexCode.test(value)
    
    if (initTranslateY) {
        if (regexResult) {
            Translate.validation.translateY_validate = true
            
            valdiationTranslateY_elem.innerHTML = ""
            
            Translate.box.translateY = Number(value)

            addStyleToResizable()
        } else {
            Translate.validation.translateY_validate = false
            valdiationTranslateY_elem.innerHTML = "Please select a negative number from -100 to 0 or a positive number from 0 to 100"
        }
    } else {
        if (regexResult) {
            Translate.validation.translateX_validate = true
            
            valdiationTranslateX_elem.innerHTML = ""
            
            Translate.box.translateX = Number(value)

            addStyleToResizable()
        } else {
            Translate.validation.translateX_validate = false
            valdiationTranslateX_elem.innerHTML = "Please select a negative number from -100 to 0 or a positive number from 0 to 100"
        }
    }
}

//? add style to resizable box
const addStyleToResizable = () => {
    resizableBox.style.transform = `translateX(${Translate.box.translateX}px) translateY(${Translate.box.translateY}px)`
}

//? remove style from resizable box
const removeStyleFromResizable = (initTranslateY) => {
    if (initTranslateY) {
        resizableBox.style.transform = `translateY(0)`
    } else {
        resizableBox.style.transform = `translateX(0)`
    }
}

//? create translateX box and translateY box and append them in wrap box
const append_TX_TY_Box = (typeOfTranslate = "translateX") => {
    let translateValidate = null
    typeOfTranslate === "translateY" ? translateValidate = Translate.validation.translateY_validate : translateValidate = Translate.validation.translateX_validate

    let activeTranslateX = null
    let activeTranslateY = null

    if (typeOfTranslate === "translateX") {
        activeTranslateX = true
        activeTranslateY = false
    } else {
        activeTranslateY = true
        activeTranslateX = false
    }

    if (Translate.isInit) {
        if (translateValidate) {
            Translate.initTranslateY = true

            wrapTranslateBoxs.innerText = ""

            const TX_Box = createTX_Box(activeTranslateX)
            const TY_Box = createTY_Box(activeTranslateY)

            wrapTranslateBoxs.append(TX_Box,TY_Box)

        } else 
            alert("please enter the information correctly")
    } else 
        alert("please complete the fields")
}

//? create translateX box
const createTX_Box = (isActive = false) => {
    const TX_Box = document.createElement("div")
    TX_Box.className = "translateX-box"
    isActive ? TX_Box.classList.add("active") : TX_Box.classList.remove("active")
    TX_Box.innerHTML = "translateX"
    TX_Box.addEventListener("click" , () => switchToTranslateBox(TX_Box.innerHTML))
    return TX_Box
}

//? create translateY box
const createTY_Box = (isActive = false) => {
    const TY_Box = document.createElement("div")
    TY_Box.className = "translateY-box"
    isActive ? TY_Box.classList.add("active") : TY_Box.classList.remove("active")
    TY_Box.innerHTML = "translateY"
    TY_Box.addEventListener("click" , () => switchToTranslateBox(TY_Box.innerHTML))
    return TY_Box
}

//? switch to translate boxes
const switchToTranslateBox = (nameBox) => {
    const TX_Box = document.querySelector(".translateX-box")
    const TY_Box = document.querySelector(".translateY-box")

    if (Translate.nowTranslate !== nameBox) {
        if (nameBox === "translateX") {
            let translateValidate = Translate.validation.translateY_validate
            if (translateValidate) {
                propertiesTranslateX.style.transform = "translateX(0)"
                propertiesTranslateY.style.transform = "translateX(318px)"
                    
                TX_Box.classList.add("active")
                TY_Box.classList.remove("active")
        
                Translate.nowTranslate = "translateX"
                
                uploadTranslateDomInInputs(false)
                activeAllInputs(false)
            } else 
                alert("you need to enter the information correctly")
        } else {
            let translateValidate = Translate.validation.translateX_validate
            if (translateValidate) {
                propertiesTranslateX.style.transform = "translateX(-318px)"
                propertiesTranslateY.style.transform = "translateX(-318px)"
        
                TX_Box.classList.remove("active")
                TY_Box.classList.add("active")
        
                Translate.nowTranslate = "translateY"
        
                uploadTranslateDomInInputs(Translate.initTranslateY)
                activeAllInputs(Translate.initTranslateY)
            } else {
                alert("you need to enter the information correctly")
            }
        }
    }
}

//? open generate pannel
const openGeneratePannel = () => {
    if (Translate.isInit) {
        if (Translate.initTranslateY) {
            
        } else {
            if (Translate.validation.translateX_validate) {
                generateWrapBox.classList.add("active")
            } else 
                alert("please enter the information correctly")
        }
    } else
        alert("please complete the fields above")
}

elemClassNameInp.addEventListener("keyup", checkElemClassNameInput)

translateYPlusIcon.addEventListener("click", () => {
    if (Translate.isInit) {
        if (Translate.initTranslateY) {
            Translate.initTranslateY = false
            wrapTranslateBoxs.innerText = ""
            
            Translate.box.translateY = 0
            Translate.validation.translateY_validate = true
            valdiationTranslateY_elem.innerHTML = ""

            if (Translate.nowTranslate !== "translateX") {
                propertiesTranslateX.style.transform = "translateX(0)"
                propertiesTranslateY.style.transform = "translateX(318px)"
            }
    
            uploadTranslateDomInInputs(false)
            activeAllInputs(false)
            checkValidateInput(translateX_inp.value , false)

            Translate.nowTranslate = "translateX"
            translateYPlusIcon.innerHTML = '<i class="bi bi-plus-square"></i>'
        } else {
            if (Translate.validation.translateX_validate) {
                append_TX_TY_Box(Translate.nowTranslate)
                translateYPlusIcon.innerHTML = '<i class="bi bi-dash-square"></i>'
            } else 
                alert("please enter the information corrcetly")
        }
    } else 
        alert("please complete the fields")
})

translateX_inp.addEventListener("keyup", (e) => checkValidateInput(e.target.value, false))
translateY_inp.addEventListener("keyup", (e) => checkValidateInput(e.target.value, true))
cssCodeBtn.addEventListener("click", openGeneratePannel)