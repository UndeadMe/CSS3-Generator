import { makeResizableElem } from "./../modules/resizer.js";
import * as functions from "./../modules/functions.js";

makeResizableElem(".resizable")
functions.disableAllInputs(true , ["skewY-inp"] , ["skewX-inp"])
functions.disableAllInputs(false, ["skewY-inp"] , ["skewX-inp"])

//? get elements
const elemClassNameInp = document.querySelector(".element-class-name-input")
const skewX_inp = document.querySelector(".skewX-inp")
const skewY_inp = document.querySelector(".skewY-inp")
const valdiationSkewX_elem = document.querySelector(".skewX-validation-elem")
const valdiationSkewY_elem = document.querySelector(".skewY-validation-elem")
const resizableBox = document.querySelector(".resizable")
const skewYPlusIcon = document.querySelector(".skewY-plus-icon")
const wrapSkewBoxs = document.querySelector(".skew-x-y-box")
const propertiesSkewX = document.querySelector(".properties-skewX-box")
const propertiesSkewY = document.querySelector(".properties-skewY-box")
const cssCodeBtn = document.querySelector(".css-code-btn")
const generateWrapBox = document.querySelector(".generate-wrap-box")
const codePennel = document.querySelector(".code-pannel")
const styleInp = document.querySelector("#styleInp")
const copyToClipboard = document.querySelector(".clipboard-btn")
const cssCodeCloseBtn = document.querySelector(".close-generate-pannel-btn")

//? Skew object
let Skew = {
    elemClass: null,
    isInit: false,
    initSkewY: false,
    nowSkew : "skewX",
    box: {
        skewX : 0 ,
        skewY : 0 ,
    },
    validation: {
        skewX_validate: true,
        skewY_validate: true,
    }
}

const checkElemClassNameInput = (e) => {
    let regexCode = /^[a-zA-Z" "]{1,30}$/g
    let regexResult = regexCode.test(e.target.value)

    if (regexResult) {
        Skew.isInit = true
        Skew.elemClass = e.target.value.split(" ").join("-")
        e.target.parentElement.previousElementSibling.innerHTML = ""

        if (Skew.initSkewY) {
            skewYPlusIcon.innerHTML = '<i class="bi bi-dash-square"></i>'
            if (Skew.nowSkew === "skewX") {
                functions.activeAllInputs(false , ["skewY-inp"] , ["skewX-inp"])
                functions.uploadDataInInputs(false, ["skewY-inp"] , ["skewX-inp"], Skew.box.skewX)
                checkValidateInput(skewX_inp.value , false)
                append_SX_SY_Box("skewX")
            } else {
                functions.activeAllInputs(true , ["skewY-inp"] , ["skewX-inp"])
                functions.uploadDataInInputs(true, ["skewY-inp"] , ["skewX-inp"], Skew.box.skewY)
                checkValidateInput(skewY_inp.value , true)
                append_SX_SY_Box("skewY")
            }
        } else {
            functions.activeAllInputs(false , ["skewY-inp"] , ["skewX-inp"])
            functions.uploadDataInInputs(false, ["skewY-inp"] , ["skewX-inp"], Skew.box.skewX)
            checkValidateInput(skewX_inp.value , false)
        }
    } else {
        Skew.isInit = false
        functions.disableAllInputs(false , ["skewY-inp"] , ["skewX-inp"])
        functions.removeDataFromInputs(false, ["skewY-inp"] , ["skewX-inp"])
        removeStyleFromResizable(false)
        functions.disableAllInputs(true , ["skewY-inp"] , ["skewX-inp"])
        functions.removeDataFromInputs(true, ["skewY-inp"] , ["skewX-inp"])
        removeStyleFromResizable(true)
        e.target.parentElement.previousElementSibling.innerHTML = "Please complete the field below. You are allowed to enter up to 30 letters"
        wrapSkewBoxs.innerText = ""
        skewYPlusIcon.innerHTML = '<i class="bi bi-plus-square"></i>'
    }
}

//? check skewX and skewY validation
const checkValidateInput = (value, initSkewY) => {
    let regexCode = /^(0|-[1-9]{1,2}|-[1-9]{1}0|\+?[1-9]{1,2}|\+?[1-9]{1}0)$/
    let regexResult = regexCode.test(value)
    
    if (initSkewY) {
        if (regexResult) {
            Skew.validation.skewY_validate = true
            
            valdiationSkewY_elem.innerHTML = ""
            
            Skew.box.skewY = Number(value)

            addStyleToResizable()
        } else {
            Skew.validation.skewY_validate = false
            valdiationSkewY_elem.innerHTML = "Please select a negative number from -100 to 0 or a positive number from 0 to 100"
        }
    } else {
        if (regexResult) {
            Skew.validation.skewX_validate = true
            
            valdiationSkewX_elem.innerHTML = ""
            
            Skew.box.skewX = Number(value)

            addStyleToResizable()
        } else {
            Skew.validation.skewX_validate = false
            valdiationSkewX_elem.innerHTML = "Please select a negative number from -100 to 0 or a positive number from 0 to 100"
        }
    }
}

//? add style to resizable box
const addStyleToResizable = () => {
    resizableBox.style.transform = `skewX(${Skew.box.skewX}deg) skewY(${Skew.box.skewY}deg)`
}

//? remove style from resizable box
const removeStyleFromResizable = (initSkewY) => {
    initSkewY ? resizableBox.style.transform = `skewY(0)` : resizableBox.style.transform = `skewX(0)`
}

//? create skewX box and skewY box and append them in wrap box
const append_SX_SY_Box = (typeOfSkew = "skewX") => {
    let skewValidate = null
    typeOfSkew === "skewY" ? skewValidate = Skew.validation.skewY_validate : skewValidate = Skew.validation.skewX_validate

    let activeSkewX = null
    let activeSkewY = null

    if (typeOfSkew === "skewX") {
        activeSkewX = true
        activeSkewY = false
    } else {
        activeSkewY = true
        activeSkewX = false
    }

    if (Skew.isInit) {
        if (skewValidate) {
            Skew.initSkewY = true

            wrapSkewBoxs.innerText = ""

            const SX_Box = functions.createDataBox(activeSkewX , "skewX-box", "skewX", switchToSkewBox)
            const SY_Box = functions.createDataBox(activeSkewY , "skewY-box", "skewY", switchToSkewBox)

            wrapSkewBoxs.append(SX_Box,SY_Box)

        } else 
            alert("please enter the information correctly")
    } else 
        alert("please complete the fields")
}

//? switch to skew boxes
const switchToSkewBox = (nameBox) => {
    const SX_Box = document.querySelector(".skewX-box")
    const SY_Box = document.querySelector(".skewY-box")

    if (Skew.nowSkew !== nameBox) {
        if (nameBox === "skewX") {
            let skewValidate = Skew.validation.skewY_validate
            if (skewValidate) {
                propertiesSkewX.style.transform = "translateX(0)"
                propertiesSkewY.style.transform = "translateX(318px)"
                    
                SX_Box.classList.add("active")
                SY_Box.classList.remove("active")
        
                Skew.nowSkew = "skewX"
                
                functions.uploadDataInInputs(false, ["skewY-inp"] , ["skewX-inp"], Skew.box.skewX)
                functions.activeAllInputs(false , ["skewY-inp"] , ["skewX-inp"])
            } else 
                alert("you need to enter the information correctly")
        } else {
            let skewValidate = Skew.validation.skewX_validate
            if (skewValidate) {
                propertiesSkewX.style.transform = "translateX(-318px)"
                propertiesSkewY.style.transform = "translateX(-318px)"
        
                SX_Box.classList.remove("active")
                SY_Box.classList.add("active")
        
                Skew.nowSkew = "skewY"
        
                functions.uploadDataInInputs(Skew.initSkewY, ["skewY-inp"] , ["skewX-inp"], Skew.box.skewY)
                functions.activeAllInputs(Skew.initSkewY , ["skewY-inp"] , ["skewX-inp"])
            } else 
                alert("you need to enter the information correctly")
        }
    }
}

let StyleText = undefined
//? open generate pannel
const openGeneratePannel = () => {
    if (Skew.isInit) {
        if (Skew.initSkewY) {
            if (Skew.validation.skewX_validate && Skew.validation.skewY_validate) {
                generateWrapBox.classList.add("active")
                StyleText = `.${Skew.elemClass} { transform: skewX(${Skew.box.skewX}px) skewY(${Skew.box.skewY}px); }`
                codePennel.innerHTML = `.${Skew.elemClass} { <br>
                    &nbsp;&nbsp;&nbsp; transform: <br>
                    &nbsp;&nbsp;&nbsp; skewX(${Skew.box.skewX}px)<br>
                    &nbsp;&nbsp;&nbsp; skewY(${Skew.box.skewY}px);<br>
                }`
            } else 
                alert("please enter the information correctly")
        } else {
            if (Skew.validation.skewX_validate) {
                generateWrapBox.classList.add("active")
                StyleText = `.${Skew.elemClass} { transform: skewX(${Skew.box.skewX}px); }`
                codePennel.innerHTML = `.${Skew.elemClass} { <br>
                    &nbsp;&nbsp;&nbsp; transform: <br>
                    &nbsp;&nbsp;&nbsp; skewX(${Skew.box.skewX}px); <br>
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

skewYPlusIcon.addEventListener("click", () => {
    if (Skew.isInit) {
        if (Skew.initSkewY) {
            Skew.initSkewY = false
            wrapSkewBoxs.innerText = ""
            
            Skew.box.skewY = 0
            Skew.validation.skewY_validate = true
            valdiationSkewY_elem.innerHTML = ""

            if (Skew.nowSkew !== "skewX") {
                propertiesSkewX.style.transform = "translate(0)"
                propertiesSkewY.style.transform = "translate(318px)"
            }
    
            functions.uploadDataInInputs(false, ["skewY-inp"] , ["skewX-inp"], Skew.box.skewX)
            functions.activeAllInputs(false , ["skewY-inp"] , ["skewX-inp"])
            checkValidateInput(skewX_inp.value , false)

            Skew.nowSkew = "skewX"
            skewYPlusIcon.innerHTML = '<i class="bi bi-plus-square"></i>'
        } else {
            if (Skew.validation.skewX_validate) {
                append_SX_SY_Box(Skew.nowSkew)
                skewYPlusIcon.innerHTML = '<i class="bi bi-dash-square"></i>'
            } else 
                alert("please enter the information corrcetly")
        }
    } else 
        alert("please complete the fields")
})

skewX_inp.addEventListener("keyup", (e) => checkValidateInput(e.target.value, false))
skewY_inp.addEventListener("keyup", (e) => checkValidateInput(e.target.value, true))
cssCodeBtn.addEventListener("click", openGeneratePannel)
cssCodeCloseBtn.addEventListener("click", closeGeneratePannel)
copyToClipboard.addEventListener("click", copyToClipboardText)