import { makeResizableElem } from "./../modules/resizer.js";
import * as functions from "./../modules/functions.js";

makeResizableElem(".resizable")
functions.disableAllInputs(true , ["translateY-inp"] , ["translateX-inp"])
functions.disableAllInputs(false, ["translateY-inp"] , ["translateX-inp"])

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

//? Translate object
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
                functions.activeAllInputs(false , ["translateY-inp"] , ["translateX-inp"])
                functions.uploadDataInInputs(false, ["translateY-inp"] , ["translateX-inp"], Translate.box.translateX)
                checkValidateInput(translateX_inp.value , false)
                append_TX_TY_Box("translateX")
            } else {
                functions.activeAllInputs(true , ["translateY-inp"] , ["translateX-inp"])
                functions.uploadDataInInputs(true, ["translateY-inp"] , ["translateX-inp"], Translate.box.translateY)
                checkValidateInput(translateY_inp.value , true)
                append_TX_TY_Box("translateY")
            }
        } else {
            functions.activeAllInputs(false , ["translateY-inp"] , ["translateX-inp"])
            functions.uploadDataInInputs(false, ["translateY-inp"] , ["translateX-inp"], Translate.box.translateX)
            checkValidateInput(translateX_inp.value , false)
        }
    } else {
        Translate.isInit = false
        functions.disableAllInputs(false , ["translateY-inp"] , ["translateX-inp"])
        functions.removeDataFromInputs(false, ["translateY-inp"] , ["translateX-inp"])
        removeStyleFromResizable(false)
        functions.disableAllInputs(true , ["translateY-inp"] , ["translateX-inp"])
        functions.removeDataFromInputs(true, ["translateY-inp"] , ["translateX-inp"])
        removeStyleFromResizable(true)
        e.target.parentElement.previousElementSibling.innerHTML = "Please complete the field below. You are allowed to enter up to 30 letters"
        wrapTranslateBoxs.innerText = ""
        translateYPlusIcon.innerHTML = '<i class="bi bi-plus-square"></i>'
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
    initTranslateY ? resizableBox.style.transform = `translateY(0)` : resizableBox.style.transform = `translateX(0)`
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

            const TX_Box = functions.createDataBox(activeTranslateX , "translateX-box", "translateX", switchToTranslateBox)
            const TY_Box = functions.createDataBox(activeTranslateY , "translateY-box", "translateY", switchToTranslateBox)

            wrapTranslateBoxs.append(TX_Box,TY_Box)

        } else 
            alert("please enter the information correctly")
    } else 
        alert("please complete the fields")
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
                
                functions.uploadDataInInputs(false, ["translateY-inp"] , ["translateX-inp"], Translate.box.translateX)
                functions.activeAllInputs(false , ["translateY-inp"] , ["translateX-inp"])
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
        
                functions.uploadDataInInputs(Translate.initTranslateY, ["translateY-inp"] , ["translateX-inp"], Translate.box.translateY)
                functions.activeAllInputs(Translate.initTranslateY , ["translateY-inp"] , ["translateX-inp"])
            } else 
                alert("you need to enter the information correctly")
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
    
            functions.uploadDataInInputs(false, ["translateY-inp"] , ["translateX-inp"], Translate.box.translateX)
            functions.activeAllInputs(false , ["translateY-inp"] , ["translateX-inp"])
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