import { makeResizableElem } from "./../modules/resizer.js"
import * as functions from "./../modules/functions.js";

makeResizableElem(".resizable")
functions.disableAllInputs(true , ["translateX-inp"] , ["translateY-inp"])
functions.disableAllInputs(false, ["translateX-inp"] , ["translateY-inp"])

//? get elements
const elemClassNameInp = document.querySelector(".element-class-name-input")
const translateY_inp = document.querySelector(".translateY-inp")
const translateX_inp = document.querySelector(".translateX-inp")
const valdiationTranslateY_elem = document.querySelector(".translateY-validation-elem")
const valdiationTranslateX_elem = document.querySelector(".translateX-validation-elem")
const resizableBox = document.querySelector(".resizable")
const translateXPlusIcon = document.querySelector(".translateX-plus-icon")
const wrapTranslateBoxs = document.querySelector(".translate-x-y-box")
const propertiesTranslateY = document.querySelector(".properties-translateY-box")
const propertiesTranslateX = document.querySelector(".properties-translateX-box")
const cssCodeBtn = document.querySelector(".css-code-btn")
const generateWrapBox = document.querySelector(".generate-wrap-box")
const codePennel = document.querySelector(".code-pannel")
const styleInp = document.querySelector("#styleInp")
const copyToClipboard = document.querySelector(".clipboard-btn")
const cssCodeCloseBtn = document.querySelector(".close-generate-pannel-btn")

//? Translate object
let Translate = {
    elemClass: null,
    isInit: false,
    initTranslateX: false,
    nowTranslate: "translateY",
    box: {
        translateY : 0 ,
        translateX : 0 ,
    },
    validation: {
        translateY_validate: true,
        translateX_validate: true,
    }
}

const checkElemClassNameInput = (e) => {
    let regexCode = /^[a-zA-Z" "]{1,30}$/g
    let regexResult = regexCode.test(e.target.value)

    if (regexResult) {
        Translate.isInit = true
        Translate.elemClass = e.target.value.split(" ").join("-")
        e.target.parentElement.previousElementSibling.innerHTML = ""

        if (Translate.initTranslateX) {
            translateXPlusIcon.innerHTML = '<i class="bi bi-dash-square"></i>'
            if (Translate.nowTranslate === "translateY") {
                functions.activeAllInputs(false, ["translateX-inp"] , ["translateY-inp"])
                functions.uploadDataInInputs(false, ["translateX-inp"], ["translateY-inp"], Translate.box.translateY)
                checkValidateInput(translateY_inp.value , false)
                append_TX_TY_Box("translateY")
            } else {
                functions.activeAllInputs(true, ["translateX-inp"] , ["translateY-inp"])
                functions.uploadDataInInputs(true, ["translateX-inp"], ["translateY-inp"], Translate.box.translateX)
                checkValidateInput(translateX_inp.value , true)
                append_TX_TY_Box("translateX")
            }
        } else {
            functions.activeAllInputs(false, ["translateX-inp"] , ["translateY-inp"])
            functions.uploadDataInInputs(false, ["translateX-inp"], ["translateY-inp"], Translate.box.translateY)
            checkValidateInput(translateY_inp.value , false)
        }

    } else {
        Translate.isInit = false
        functions.disableAllInputs(false, ["translateX-inp"] , ["translateY-inp"])
        functions.removeDataFromInputs(false , ["translateX-inp"] , ["translateY-inp"])
        removeStyleFromResizable(false)
        functions.disableAllInputs(true, ["translateX-inp"] , ["translateY-inp"])
        functions.removeDataFromInputs(true , ["translateX-inp"] , ["translateY-inp"])
        removeStyleFromResizable(true)
        e.target.parentElement.previousElementSibling.innerHTML = "Please complete the field below. You are allowed to enter up to 30 letters"
        wrapTranslateBoxs.innerText = ""
        translateXPlusIcon.innerHTML = '<i class="bi bi-plus-square"></i>'
    }
}

//? check translateX and translateY validation
const checkValidateInput = (value, initTranslateX) => {
    let regexCode = /^(0|-[1-9]{1,2}|-[1-9]{1}0|\+?[1-9]{1,2}|\+?[1-9]{1}0)$/
    let regexResult = regexCode.test(value)
    
    if (initTranslateX) {
        if (regexResult) {
            Translate.validation.translateX_validate = true
            
            valdiationTranslateX_elem.innerHTML = ""
            
            Translate.box.translateX = Number(value)

            addStyleToResizable()
        } else {
            Translate.validation.translateX_validate = false
            valdiationTranslateX_elem.innerHTML = "Please select a negative number from -100 to 0 or a positive number from 0 to 100"
        }
    } else {
        if (regexResult) {
            Translate.validation.translateY_validate = true
            
            valdiationTranslateY_elem.innerHTML = ""
            
            Translate.box.translateY = Number(value)

            addStyleToResizable()
        } else {
            Translate.validation.translateY_validate = false
            valdiationTranslateY_elem.innerHTML = "Please select a negative number from -100 to 0 or a positive number from 0 to 100"
        }
    }
}

//? add style to resizable box
const addStyleToResizable = () => {
    resizableBox.style.transform = `translateX(${Translate.box.translateX}px) translateY(${Translate.box.translateY}px)`
}

//? remove style from resizable box
const removeStyleFromResizable = (initTranslateX) => {
    initTranslateX ? resizableBox.style.transform = `translateX(0)` : resizableBox.style.transform = `translateY(0)`
}

//? create translateX box and translateY box and append them in wrap box
const append_TX_TY_Box = (typeOfTranslate = "translateY") => {
    let translateValidate = null
    typeOfTranslate === "translateX" ? translateValidate = Translate.validation.translateX_validate : translateValidate = Translate.validation.translateY_validate

    let activeTranslateY = null
    let activeTranslateX = null

    if (typeOfTranslate === "translateY") {
        activeTranslateY = true
        activeTranslateX = false
    } else {
        activeTranslateX = true
        activeTranslateY = false
    }

    if (Translate.isInit) {
        if (translateValidate) {
            Translate.initTranslateX = true

            wrapTranslateBoxs.innerText = ""

            const TY_Box = functions.createDataBox(activeTranslateY, "translateY-box", "translateY", switchToTranslateBox)
            const TX_Box = functions.createDataBox(activeTranslateX, "translateX-box", "translateX", switchToTranslateBox)

            wrapTranslateBoxs.append(TY_Box,TX_Box)

        } else 
            alert("please enter the information correctly")
    } else 
        alert("please complete the fields")
}

//? switch to translate boxes
const switchToTranslateBox = (nameBox) => {
    const TY_Box = document.querySelector(".translateY-box")
    const TX_Box = document.querySelector(".translateX-box")

    if (Translate.nowTranslate !== nameBox) {
        if (nameBox === "translateY") {
            let translateValidate = Translate.validation.translateX_validate
            if (translateValidate) {
                propertiesTranslateY.style.transform = "translateX(0)"
                propertiesTranslateX.style.transform = "translateX(318px)"

                TY_Box.classList.add("active")
                TX_Box.classList.remove("active")
        
                Translate.nowTranslate = "translateY"
                
                functions.uploadDataInInputs(false, ["translateX-inp"], ["translateY-inp"], Translate.box.translateY)
                functions.activeAllInputs(false, ["translateX-inp"] , ["translateY-inp"])
            } else 
                alert("you need to enter the information correctly")
        } else {
            let translateValidate = Translate.validation.translateY_validate
            if (translateValidate) {
                propertiesTranslateY.style.transform = "translateX(-318px)"
                propertiesTranslateX.style.transform = "translateX(-318px)"
        
                TY_Box.classList.remove("active")
                TX_Box.classList.add("active")
        
                Translate.nowTranslate = "translateX"
        
                functions.uploadDataInInputs(Translate.initTranslateX, ["translateX-inp"], ["translateY-inp"], Translate.box.translateX)
                functions.activeAllInputs(Translate.initTranslateX, ["translateX-inp"] , ["translateY-inp"])
            } else 
                alert("you need to enter the information correctly")
        }
    }
}

let StyleText = undefined
//? open generate pannel
const openGeneratePannel = () => {
    if (Translate.isInit) {
        if (Translate.initTranslateX) {
            if (Translate.validation.translateX_validate && Translate.validation.translateY_validate) {
                generateWrapBox.classList.add("active")
                StyleText = `.${Translate.elemClass} { transform: translateY(${Translate.box.translateY}px) translateX(${Translate.box.translateX}px); }`
                codePennel.innerHTML = `.${Translate.elemClass} { <br>
                    &nbsp;&nbsp;&nbsp; transform: <br>
                    &nbsp;&nbsp;&nbsp; translateY(${Translate.box.translateY}px)<br>
                    &nbsp;&nbsp;&nbsp; translateX(${Translate.box.translateX}px);<br>
                }`
            } else 
                alert("please enter the information correctly")
        } else {
            if (Translate.validation.translateY_validate) {
                generateWrapBox.classList.add("active")
                StyleText = `.${Translate.elemClass} { transform: translateY(${Translate.box.translateY}px); }`
                codePennel.innerHTML = `.${Translate.elemClass} { <br>
                    &nbsp;&nbsp;&nbsp; transform: <br>
                    &nbsp;&nbsp;&nbsp; translateY(${Translate.box.translateY}px); <br>
                }`
            } else 
                alert("please enter the information correctly")
        }
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
translateY_inp.addEventListener("keyup", (e) => checkValidateInput(e.target.value, false))
translateX_inp.addEventListener("keyup", (e) => checkValidateInput(e.target.value, true))
cssCodeBtn.addEventListener("click", openGeneratePannel)
cssCodeCloseBtn.addEventListener("click", closeGeneratePannel)
copyToClipboard.addEventListener("click", copyToClipboardText)
translateXPlusIcon.addEventListener("click", () => {
    if (Translate.isInit) {
        if (Translate.initTranslateX) {
            Translate.initTranslateX = false
            wrapTranslateBoxs.innerText = ""
            
            Translate.box.translateX = 0
            Translate.validation.translateX_validate = true
            valdiationTranslateX_elem.innerHTML = ""

            if (Translate.nowTranslate !== "translateY") {
                propertiesTranslateY.style.transform = "translateX(0)"
                propertiesTranslateX.style.transform = "translateX(318px)"
            }
    
            functions.uploadDataInInputs(false, ["translateX-inp"], ["translateY-inp"], Translate.box.translateY)
            functions.activeAllInputs(false, ["translateX-inp"] , ["translateY-inp"])
            checkValidateInput(translateY_inp.value , false)

            Translate.nowTranslate = "translateY"
            translateXPlusIcon.innerHTML = '<i class="bi bi-plus-square"></i>'
        } else {
            if (Translate.validation.translateY_validate) {
                append_TX_TY_Box(Translate.nowTranslate)
                translateXPlusIcon.innerHTML = '<i class="bi bi-dash-square"></i>'
            } else 
                alert("please enter the information corrcetly")
        }
    } else 
        alert("please complete the fields")
})