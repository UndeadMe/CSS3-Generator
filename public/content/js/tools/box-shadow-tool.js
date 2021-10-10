import { makeResizableElem } from "./../modules/resizer.js"
import { createPickr } from "./../modules/pickr.js"

makeResizableElem(".resizable")

//? get elements
const elementClassNameInp = document.querySelector(".element-class-name-input")
const horizentalInp = document.querySelector(".horizental-inp")
const verticalInp = document.querySelector(".vertical-inp")
const blurInp = document.querySelector(".blur-inp")
const speardInp = document.querySelector(".speard-inp")
const horizentalHoverInp = document.querySelector(".horizental-hover-inp")
const verticalHoverInp = document.querySelector(".vertical-hover-inp")
const blurHoverInp = document.querySelector(".blur-hover-inp")
const speardHoverInp = document.querySelector(".speard-hover-inp")
const colorPickerNoHover = document.querySelector(".color-picker-no-hover")
const noHoverValidationInputs = document.querySelector(".valdiation-inputs-elem")
const shadowOptionPlusBtn = document.querySelector(".shadow-option-plus-btn")

//? shadow object
let Shadow = {
    elemClass: null,
    isInit: false,
    isHover: false,
    nowShadowNoHover: "shadow-1",
    nowShadowHover: "shadow-1",
    box: {
        noHoverStyle: [
            {
                shadowName: "shadow-1",
                shadowColor: "#53535C",
                horizental: 0,
                vertical: 0,
                blur: 0,
                speard: 0
            },
        ],
        hoverStyle: [
            {
                shadowName: "shadow-1",
                shadowColor: "#C8C8C8",
                horizental: 5,
                vertical: 5,
                blur: 0,
                speard: 0
            },
        ]
    },
    Validation: {
        noHoverValidation: [
            {
                shadowName: "shadow-1",
                horizentalValidate: true,
                verticalValidate: true,
                blurValidate: true,
                speardValidate: true,
            },
        ],
        hoverStyle: [
            {
                shadowName: "shadow-1",
                horizentalValidate: true,
                verticalValidate: true,
                blurValidate: true,
                speardValidate: true,
            },
        ]
    }
}

//? pickr
createPickr(".color-picker-no-hover", Shadow.box.noHoverStyle[0].shadowColor)
createPickr(".color-picker-hover", Shadow.box.hoverStyle[0].shadowColor)

//? check initiall
const checkInit = (e) => {
    let regexCode = /^[a-zA-Z]{1,30}$/g
    let regexResult = regexCode.test(e.target.value)
    
    if (regexResult) {
        Shadow.isInit = true
        activeInputs(false)
        uploadShadowDataInInputs(false, findShadowOptionIndex(Shadow.nowShadowNoHover,false)[0])
        e.target.parentElement.previousElementSibling.innerHTML = ""
    } else {
        Shadow.isInit = false
        disableAllInputs(false)
        removeShadowDataFromInputs(false)
        e.target.parentElement.previousElementSibling.innerHTML = "please complete the field below. You are allowed to enter up to 30 letters"
    }
}

//? active inputs
const activeInputs = (isHover) => {
    if (isHover) {
        horizentalHoverInp.disabled = false
        verticalHoverInp.disabled = false
        blurHoverInp.disabled = false
        speardHoverInp.disabled = false
    } else {
        horizentalInp.disabled = false
        verticalInp.disabled = false
        blurInp.disabled = false
        blurInp.disabled = false
        speardInp.disabled = false
        colorPickerNoHover.disabled = false
    }
}

//? disable all inputs
const disableAllInputs = (isHover) => {
    if (isHover) {
        horizentalHoverInp.disabled = true
        verticalHoverInp.disabled = true
        blurHoverInp.disabled = true
        speardHoverInp.disabled = true
    } else {
        horizentalInp.disabled = true
        verticalInp.disabled = true
        blurInp.disabled = true
        blurInp.disabled = true
        speardInp.disabled = true
        colorPickerNoHover.disabled = true
    }
}

disableAllInputs(false)

//? upload shadow data in inputs
const uploadShadowDataInInputs = (isHover, shadowOptionIndex) => {
    if (isHover) {
        horizentalHoverInp.value = shadowOptionIndex.horizental
        verticalHoverInp.value = shadowOptionIndex.vertical
        blurHoverInp.value = shadowOptionIndex.blur
        speardHoverInp.value = shadowOptionIndex.speard
    } else {
        horizentalInp.value = shadowOptionIndex.horizental
        verticalInp.value = shadowOptionIndex.vertical
        blurInp.value = shadowOptionIndex.blur
        speardInp.value = shadowOptionIndex.speard
    }
}

//? find shadow option index
const findShadowOptionIndex = (shadowObjName , isHover) => {
    if (isHover) {

    } else {
        let shadowStyleObj = Shadow.box.noHoverStyle.find(shadowOption => {
            return shadowOption.shadowName === shadowObjName
        })
        let shadowValidateObj = Shadow.Validation.noHoverValidation.find(shadowOption => {
            return shadowOption.shadowName === shadowObjName
        })
        return [ shadowStyleObj, shadowValidateObj ]
    }
}

//? remove shadow data from inputs
const removeShadowDataFromInputs = (isHover) => {
    if (isHover) {
        horizentalHoverInp.value = ""
        verticalHoverInp.value = ""
        blurHoverInp.value = ""
        speardHoverInp.value = ""
    } else {
        horizentalInp.value = ""
        verticalInp.value = ""
        blurInp.value = ""
        speardInp.value = ""
    }
}

//? check inputs
const checkInputs = (value, isHover, inputName) => {
    if (isHover) {
        
    } else {
        const shadowValidateObj = findShadowOptionIndex(Shadow.nowShadowNoHover,false)[1]
        
        if (inputName === "horizental" || inputName === "vertical") {
            const regexCode = /^(0|-[1-9]{1,2}|-[1-9]{1}0|\+?[1-9]{1,2}|\+?[1-9]{1}0)$/
            const regexResult = regexCode.test(value)
            
            //? if user type correct number
            if (regexResult) {
                inputName === "horizental" ? shadowValidateObj.horizentalValidate = true : shadowValidateObj.verticalValidate = true

                if (!shadowValidateObj.verticalValidate)
                    noHoverValidationInputs.innerHTML = "please complete the vertical field correctlly"
                else if (!shadowValidateObj.horizentalValidate)
                    noHoverValidationInputs.innerHTML = "please complete the horizental field correctlly"
                else if (!shadowValidateObj.blurValidate)
                    noHoverValidationInputs.innerHTML = "please complete the blur field correctlly"
                else if (!shadowValidateObj.speardValidate)
                    noHoverValidationInputs.innerHTML = "please complete the speard field correctlly"
                else
                    noHoverValidationInputs.innerHTML = ""
                
            } else {
                //? false input validation
                inputName === "horizental" ? shadowValidateObj.horizentalValidate = false : shadowValidateObj.verticalValidate = false
                //? put warning in validation element
                noHoverValidationInputs.innerHTML = "Please select a negative number from -100 to 0 or a positive number from 0 to 100"   
            }
        } else {
            const regexCode = /^(0|\+?[1-9]{1,2}|\+?[1-9]{1}0)$/g
            const regexResult = regexCode.test(value)
            
            //? if user type correct number
            if (regexResult) {
                inputName === "blur" ? shadowValidateObj.blurValidate = true : shadowValidateObj.speardValidate = true

                if (!shadowValidateObj.blurValidate)
                    noHoverValidationInputs.innerHTML = "please complete the blur field correctlly"
                else if (!shadowValidateObj.speardValidate)
                    noHoverValidationInputs.innerHTML = "please complete the speard field correctlly"
                else if (!shadowValidateObj.horizentalValidate) 
                    noHoverValidationInputs.innerHTML = "please complete the horizental field correctlly"
                else if (!shadowValidateObj.verticalValidate)
                    noHoverValidationInputs.innerHTML = "please complete the vertical field correctlly"
                else
                    noHoverValidationInputs.innerHTML = ""
                
            } else {
                //? false input validation
                inputName === "blur" ? shadowValidateObj.blurValidate = false : shadowValidateObj.speardValidate = false
                //? put warning in validation element
                noHoverValidationInputs.innerHTML = "Please select positive number from 0 to 100"
            }
        }
    }
}

elementClassNameInp.addEventListener("keyup", checkInit)
horizentalInp.addEventListener("keyup", (e) => checkInputs(e.target.value, false, "horizental"))
verticalInp.addEventListener("keyup", (e) => checkInputs(e.target.value, false, "vertical"))
blurInp.addEventListener("keyup", (e) => checkInputs(e.target.value, false, "blur"))
speardInp.addEventListener("keyup", (e) => checkInputs(e.target.value, false, "speard"))