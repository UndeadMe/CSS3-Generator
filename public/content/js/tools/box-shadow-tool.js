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
const colorPickerHover = document.querySelector(".color-picker-hover")
const noHoverValidationInputs = document.querySelector(".valdiation-inputs-elem")
const hoverValidationInputs = document.querySelector(".valdiation-inputs-hover-elem")
const shadowOptionNoHoverPlusBtn = document.querySelector(".shadow-option-plus-noHover-btn")
const shadowOptionHoverPlusBtn = document.querySelector(".shadow-option-plus-hover-btn")
const shadowOptionDefault = document.querySelector(".shadow-option-default.no-hover")
const shadowOptionDefaultHover = document.querySelector(".shadow-option-default.hover")
const typeEffectIcon = document.querySelector(".type-effect-icon")
const propertiesBoxNoHover = document.querySelector(".properies-box-no-hover")
const typeEffectBox = document.querySelector(".type-effect-box")
const shadowOptionBoxNoHover = document.querySelector(".shadow-option-no-hover")
const vhTools = document.querySelectorAll(".vh-tool")
const resizable = document.querySelector(".resizable")

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
        hoverValidation: [
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

//? check initiall
const checkInit = (e) => {
    let regexCode = /^[a-zA-Z]{1,30}$/g
    let regexResult = regexCode.test(e.target.value)
    
    if (regexResult) {
        Shadow.isInit = true
        //? put class name in shadow elem class
        Shadow.elemClass = `.${e.target.value.split(" ").join("-")}`
        e.target.parentElement.previousElementSibling.innerHTML = ""
        
        if (Shadow.isHover) {
            createDH_box(typeBox)
            typeEffectIcon.innerHTML = '<i class="bi bi-dash-square"></i>'
            if (typeBox === "hoverBox") {
                activeInputs(true)
                uploadShadowDataInInputs(true, findShadowOptionIndex(Shadow.nowShadowHover,true)[0])
                checkInputs(horizentalHoverInp.value, true, "horizental")
                checkInputs(verticalHoverInp.value, true, "vertical")
                checkInputs(blurHoverInp.value, true, "blur")
                checkInputs(speardHoverInp.value, true, "speard")
            } else {
                activeInputs(false)
                uploadShadowDataInInputs(false, findShadowOptionIndex(Shadow.nowShadowNoHover,false)[0])
                checkInputs(horizentalInp.value, false, "horizental")
                checkInputs(verticalInp.value, false, "vertical")
                checkInputs(blurInp.value, false, "blur")
                checkInputs(speardInp.value, false, "speard")
            }
        } else {
            activeInputs(false)
            uploadShadowDataInInputs(false, findShadowOptionIndex(Shadow.nowShadowNoHover,false)[0])
            checkInputs(horizentalInp.value, false, "horizental")
            checkInputs(verticalInp.value, false, "vertical")
            checkInputs(blurInp.value, false, "blur")
            checkInputs(speardInp.value, false, "speard")
            addStyleToResizable(false)
        }
        
    } else {
        Shadow.isInit = false
        e.target.parentElement.previousElementSibling.innerHTML = "please complete the field below. You are allowed to enter up to 30 letters"
        disableAllVhTool()
        if (Shadow.isHover) {
            typeEffectBox.innerText = ""
            typeEffectIcon.innerHTML = '<i class="bi bi-plus-square"></i>'
            if (typeBox === "hoverBox") {
                removeShadowDataFromInputs(true)
                disableAllInputs(true)
                hoverValidationInputs.innerHTML = ""
            } else {
                removeShadowDataFromInputs(false)
                disableAllInputs(false)
                noHoverValidationInputs.innerHTML = ""
            }
        } else {
            disableAllInputs(false)
            removeShadowDataFromInputs(false)
            noHoverValidationInputs.innerHTML = ""
        }
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
        colorPickerHover.disabled = true
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
        let shadowStyleObj = Shadow.box.hoverStyle.find(shadowOption => {
            return shadowOption.shadowName === shadowObjName
        })
        let shadowValidateObj = Shadow.Validation.hoverValidation.find(shadowOption => {
            return shadowOption.shadowName === shadowObjName
        })
        return [ shadowStyleObj, shadowValidateObj ]
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
        const shadowValidateObj = findShadowOptionIndex(Shadow.nowShadowHover,true)[1]
        let shadowStyleObj = findShadowOptionIndex(Shadow.nowShadowHover, true)[0]
        if (inputName === "horizental" || inputName === "vertical") {
            disableAllVhTool()
            const regexCode = /^(0|-[1-9]{1,2}|-[1-9]{1}0|\+?[1-9]{1,2}|\+?[1-9]{1}0)$/
            const regexResult = regexCode.test(value)
            
            //? if user type correct number
            if (regexResult) {
                if (inputName === "horizental") {
                    shadowValidateObj.horizentalValidate = true
                    shadowStyleObj.horizental = value
                } else {
                    shadowValidateObj.verticalValidate = true
                    shadowStyleObj.vertical = value
                }

                if (!shadowValidateObj.verticalValidate)
                    hoverValidationInputs.innerHTML = "please complete the vertical field correctlly"
                else if (!shadowValidateObj.horizentalValidate)
                    hoverValidationInputs.innerHTML = "please complete the horizental field correctlly"
                else if (!shadowValidateObj.blurValidate)
                    hoverValidationInputs.innerHTML = "please complete the blur field correctlly"
                else if (!shadowValidateObj.speardValidate)
                    hoverValidationInputs.innerHTML = "please complete the speard field correctlly"
                else {
                    hoverValidationInputs.innerHTML = ""
                    addStyleToResizable(true)
                }
                
            } else {
                //? false input validation
                inputName === "horizental" ? shadowValidateObj.horizentalValidate = false : shadowValidateObj.verticalValidate = false
                //? put warning in validation element
                hoverValidationInputs.innerHTML = "Please select a negative number from -100 to 0 or a positive number from 0 to 100"   
            }
        } else {
            disableAllVhTool()
            const regexCode = /^(0|\+?[1-9]{1,2}|\+?[1-9]{1}0)$/g
            const regexResult = regexCode.test(value)
            
            //? if user type correct number
            if (regexResult) {
                if (inputName === "blur") {
                    shadowValidateObj.blurValidate = true
                    shadowStyleObj.blur = value
                } else {
                    shadowValidateObj.speardValidate = true
                    shadowStyleObj.speard = value
                }

                if (!shadowValidateObj.blurValidate)
                    hoverValidationInputs.innerHTML = "please complete the blur field correctlly"
                else if (!shadowValidateObj.speardValidate)
                    hoverValidationInputs.innerHTML = "please complete the speard field correctlly"
                else if (!shadowValidateObj.horizentalValidate) 
                    hoverValidationInputs.innerHTML = "please complete the horizental field correctlly"
                else if (!shadowValidateObj.verticalValidate)
                    hoverValidationInputs.innerHTML = "please complete the vertical field correctlly"
                else {
                    hoverValidationInputs.innerHTML = ""
                    addStyleToResizable(true)
                }
                
            } else {
                //? false input validation
                inputName === "blur" ? shadowValidateObj.blurValidate = false : shadowValidateObj.speardValidate = false
                //? put warning in validation element
                hoverValidationInputs.innerHTML = "Please select positive number from 0 to 100"
            }
        }
    } else {
        const shadowValidateObj = findShadowOptionIndex(Shadow.nowShadowNoHover,false)[1]
        let shadowStyleObj = findShadowOptionIndex(Shadow.nowShadowNoHover, false)[0]
        if (inputName === "horizental" || inputName === "vertical") {
            disableAllVhTool()
            const regexCode = /^(0|-[1-9]{1,2}|-[1-9]{1}0|\+?[1-9]{1,2}|\+?[1-9]{1}0)$/
            const regexResult = regexCode.test(value)
            
            //? if user type correct number
            if (regexResult) {
                if (inputName === "horizental") {
                    shadowValidateObj.horizentalValidate = true
                    shadowStyleObj.horizental = value
                } else {
                    shadowValidateObj.verticalValidate = true
                    shadowStyleObj.vertical = value
                }

                if (!shadowValidateObj.verticalValidate)
                    noHoverValidationInputs.innerHTML = "please complete the vertical field correctlly"
                else if (!shadowValidateObj.horizentalValidate)
                    noHoverValidationInputs.innerHTML = "please complete the horizental field correctlly"
                else if (!shadowValidateObj.blurValidate)
                    noHoverValidationInputs.innerHTML = "please complete the blur field correctlly"
                else if (!shadowValidateObj.speardValidate)
                    noHoverValidationInputs.innerHTML = "please complete the speard field correctlly"
                else {
                    noHoverValidationInputs.innerHTML = ""
                    addStyleToResizable(false)
                }
                
            } else {
                //? false input validation
                inputName === "horizental" ? shadowValidateObj.horizentalValidate = false : shadowValidateObj.verticalValidate = false
                //? put warning in validation element
                noHoverValidationInputs.innerHTML = "Please select a negative number from -100 to 0 or a positive number from 0 to 100"   
            }
        } else {
            disableAllVhTool()
            const regexCode = /^(0|\+?[1-9]{1,2}|\+?[1-9]{1}0)$/g
            const regexResult = regexCode.test(value)
            
            //? if user type correct number
            if (regexResult) {
                if (inputName === "blur") {
                    shadowValidateObj.blurValidate = true
                    shadowStyleObj.blur = value
                } else {
                    shadowValidateObj.speardValidate = true
                    shadowStyleObj.speard = value
                }

                if (!shadowValidateObj.blurValidate)
                    noHoverValidationInputs.innerHTML = "please complete the blur field correctlly"
                else if (!shadowValidateObj.speardValidate)
                    noHoverValidationInputs.innerHTML = "please complete the speard field correctlly"
                else if (!shadowValidateObj.horizentalValidate) 
                    noHoverValidationInputs.innerHTML = "please complete the horizental field correctlly"
                else if (!shadowValidateObj.verticalValidate)
                    noHoverValidationInputs.innerHTML = "please complete the vertical field correctlly"
                else {
                    noHoverValidationInputs.innerHTML = ""
                    addStyleToResizable(false)
                }
                
            } else {
                //? false input validation
                inputName === "blur" ? shadowValidateObj.blurValidate = false : shadowValidateObj.speardValidate = false
                //? put warning in validation element
                noHoverValidationInputs.innerHTML = "Please select positive number from 0 to 100"
            }
        }
    }
}

//? this function create new shadow option and shadow option object and append new shadow option
const shadowOpNoHover = () => {
    if (Shadow.isInit) {
        const shadowValidateObj = findShadowOptionIndex(Shadow.nowShadowNoHover, false)[1]
        if (shadowValidateObj.horizentalValidate && shadowValidateObj.verticalValidate && shadowValidateObj.blurValidate && shadowValidateObj.speardValidate) {
            disableAllVhTool()
            
            //? increase the shaodw no hover name
            Shadow.nowShadowNoHover = inCreaseTheNowShadow(Shadow.nowShadowNoHover)

            //? create new style object
            const newStyleObj = createNewStyleObj(Shadow.nowShadowNoHover)
            const newValidateObj = createNewValidateObj(Shadow.nowShadowNoHover)

            //? and put them in Shadow object
            Shadow.box.noHoverStyle.push(newStyleObj)
            Shadow.Validation.noHoverValidation.push(newValidateObj)

            //? get shadow option no hover wrap
            createNewShadowOption(".shadow-option-noHover-wrap", Shadow.box.noHoverStyle.length, false)

            //? upload new shadow option data in inputs
            uploadShadowDataInInputs(false, newStyleObj)

            //? active new shadow option (no hover)
            activeShadowOption(Shadow.nowShadowNoHover, false)

            colorPickerNoHover.style.background = newStyleObj.shadowColor

        } else 
            alert("please complete the fields correctly")
    } else 
        alert("please complete the fields")
}

//? this function create new shadow option and shadow option object and append new shadow option for hover type effect
const shadowOpHover = () => {
    if (Shadow.isInit) {
        const shadowValidateObj = findShadowOptionIndex(Shadow.nowShadowHover, true)[1]
        if (shadowValidateObj.horizentalValidate && shadowValidateObj.verticalValidate && shadowValidateObj.blurValidate && shadowValidateObj.speardValidate) {
            disableAllVhTool()
            //? increase the shaodw hover name
            Shadow.nowShadowHover = inCreaseTheNowShadow(Shadow.nowShadowHover)

            //? create new style object
            const newStyleObj = createNewStyleObj(Shadow.nowShadowHover)
            const newValidateObj = createNewValidateObj(Shadow.nowShadowHover)

            //? and put them in Shadow object
            Shadow.box.hoverStyle.push(newStyleObj)
            Shadow.Validation.hoverValidation.push(newValidateObj)

            //? get shadow option hover wrap
            createNewShadowOption(".shadow-option-hover-wrap", Shadow.box.hoverStyle.length, true)

            //? upload new shadow option data in inputs
            uploadShadowDataInInputs(true, newStyleObj)

            //? active new shadow option (hover)
            activeShadowOption(Shadow.nowShadowHover, true)

            colorPickerHover.style.background = newStyleObj.shadowColor
            
            //? create new color picker
            createNewPickr(".color-picker-hover", newStyleObj.shadowColor, true)

        } else 
            alert("please complete the fields correctly")
    } else 
        alert("please complete the fields")
}

//? increase the now shadow
const inCreaseTheNowShadow = (shadowNumber) => {
    const shadowName = String(shadowNumber).split("-")
    shadowName[1] = Number(shadowName[1]) + 1
    return shadowName.join("-")
}

//? create new shadow style and validate object
const createNewStyleObj = (shadowName) => {
    return ({
        shadowName,
        shadowColor: generateRandomColor(),
        horizental: 0,
        vertical: 0,
        blur: 0,
        speard: 0,
    })
}

//? create new shadow validation object 
const createNewValidateObj = (shadowName) => {
    return ({
        shadowName,
        horizentalValidate: true,
        verticalValidate: true,
        blurValidate: true,
        speardValidate: true,
    })
}

//? generate random color
const generateRandomColor = () => {
    return "#" + Math.floor(Math.random()*16777215).toString(16);
}

//? create new shadow option and put them in wrap
const createNewShadowOption = (wrapNewShadowOption, shadowNumber, isHover) => {
    const wrap = document.querySelector(wrapNewShadowOption)

    //? create new shadow option
    const newShadowOption = document.createElement("li")
    newShadowOption.className = "shadow-option new-shadow-option"
    newShadowOption.setAttribute("data-id", `shadow-${shadowNumber}`)
    isHover ? newShadowOption.classList.add("hover") : newShadowOption.classList.add("no-hover")
    newShadowOption.innerHTML = `shadow ${shadowNumber}`
    
    //? create shadow minus btn
    const newShadowOptionMinusBtn = document.createElement("span")
    newShadowOptionMinusBtn.className = "shadow-option-minus-btn"
    newShadowOptionMinusBtn.innerHTML = '<i class="bi bi-dash-square"></i>'

    //? append shadow minus btn in shadow option/box
    newShadowOption.appendChild(newShadowOptionMinusBtn)

    //? switch to other shadow options/boxes
    newShadowOption.addEventListener("click", () => switchToShadowOption(newShadowOption.dataset.id, isHover))

    newShadowOptionMinusBtn.addEventListener("click", (e) => {
        e.stopPropagation()
        minusShadowOption(newShadowOption.dataset.id, isHover)
    })

    wrap.appendChild(newShadowOption)
}

//? activator shadow options boxes
const activeShadowOption = (shadowName ,isHover) => {
    let allShadowOptions = undefined

    if (isHover)
        allShadowOptions = document.querySelectorAll(".shadow-option.hover")
    else
        allShadowOptions = document.querySelectorAll(".shadow-option.no-hover")

    allShadowOptions.forEach(option => {
        option.dataset.id === shadowName ? option.classList.add("active") : option.classList.remove("active")
    })
}

//? switch to this shadow option
const switchToShadowOption = (switchShadowId, isHover) => {
    let nowShadowValidate = undefined
    isHover ? nowShadowValidate = Shadow.nowShadowHover : nowShadowValidate = Shadow.nowShadowNoHover

    if (Shadow.isInit) {
        if (nowShadowValidate !== switchShadowId) {
            addStyleToResizable(isHover)
            const shadowValidateObj = findShadowOptionIndex(nowShadowValidate, isHover)[1]
            if (shadowValidateObj.horizentalValidate && shadowValidateObj.verticalValidate && shadowValidateObj.blurValidate && shadowValidateObj.speardValidate) {
                isHover ? Shadow.nowShadowHover = switchShadowId : Shadow.nowShadowNoHover = switchShadowId
    
                uploadShadowDataInInputs(isHover, findShadowOptionIndex(switchShadowId, isHover)[0])
                activeShadowOption(switchShadowId, isHover)
                
                if (isHover) {
                    createNewPickr(".color-picker-hover", findShadowOptionIndex(switchShadowId, true)[0].shadowColor, isHover)
                    colorPickerHover.style.background = findShadowOptionIndex(switchShadowId, true)[0].shadowColor
                } else {
                    createNewPickr(".color-picker-no-hover", findShadowOptionIndex(switchShadowId, false)[0].shadowColor, isHover)
                    colorPickerNoHover.style.background = findShadowOptionIndex(switchShadowId, false)[0].shadowColor
                }

                disableAllVhTool()
            } else 
                alert("You need to enter the information correctly")
        }
    }
}

//? create new pickr 
const createNewPickr = (buttonClass, color, isHover) => {
    let newPickr = createPickr(buttonClass, color)
    newPickr.on('change', (color) => {
        let shadowOption = undefined
        let shadowColor = color.toHEXA().toString()

        if (isHover) {
            shadowOption = findShadowOptionIndex(Shadow.nowShadowHover, true)[0]
            colorPickerHover.style.background = shadowColor
        } else {
            shadowOption = findShadowOptionIndex(Shadow.nowShadowNoHover, false)[0]
            colorPickerNoHover.style.background = shadowColor
        }
        
        shadowOption.shadowColor = shadowColor
        addStyleToResizable(isHover)
    })
}

createNewPickr(".color-picker-no-hover", Shadow.box.noHoverStyle[0].shadowColor, false)
createNewPickr(".color-picker-hover", Shadow.box.hoverStyle[0].shadowColor, true)

//? minus shadow option
const minusShadowOption = (shadowId , isHover) => {
    if (Shadow.isInit) {
        let shadowValidateObj = undefined
        isHover ? shadowValidateObj = findShadowOptionIndex(Shadow.nowShadowHover, isHover)[1] : shadowValidateObj = findShadowOptionIndex(Shadow.nowShadowNoHover, isHover)[1]
        if (shadowValidateObj.horizentalValidate && shadowValidateObj.verticalValidate && shadowValidateObj.blurValidate && shadowValidateObj.speardValidate) {
            //? delete style and validate object in Shadow style and validate
            deleteStyleAndValidateObj(shadowId, isHover)
            
            //? get wrap and empty that
            let wrap = undefined
            let shadowStyle = undefined
            let nowShadowName = undefined

            if (isHover) {
                wrap = document.querySelector(".shadow-option-hover-wrap")
                shadowStyle = Shadow.box.hoverStyle
                nowShadowName = Shadow.nowShadowHover
            } else {
                wrap = document.querySelector(".shadow-option-noHover-wrap")
                shadowStyle = Shadow.box.noHoverStyle
                nowShadowName = Shadow.nowShadowNoHover
            }
            
            wrap.innerText = ""

            Shadow.box.noHoverStyle.forEach((shadowOption, shadowIndex) => {
                if (shadowIndex !== 0) {
                    let shadowNumber = shadowOption.shadowName.split("-")[1]
                    createNewShadowOption("." + wrap.className, shadowNumber, isHover)
                }
            })
            
            let isNowShadowFind = shadowStyle.findIndex(shadowOption => {
                return shadowOption.shadowName === nowShadowName
            })

            if (isNowShadowFind !== -1) {
                uploadShadowDataInInputs(isHover, findShadowOptionIndex(nowShadowName, isHover)[0])
                activeShadowOption(nowShadowName, isHover)
                addStyleToResizable(isHover)
            } else {
                let shadowText = nowShadowName.split("-")[0]
                let shadowNumber = Number(nowShadowName.split("-")[1])
                
                if (isHover) {
                    Shadow.nowShadowHover = `${shadowText}-${shadowNumber-1}`
                    activeShadowOption(Shadow.nowShadowHover)
                    createNewPickr(".color-picker-hover", findShadowOptionIndex(Shadow.nowShadowHover, true)[0].shadowColor)
                    colorPickerNoHover.style.background = findShadowOptionIndex(Shadow.nowShadowHover, true)[0].shadowColor
                } else {
                    Shadow.nowShadowNoHover = `${shadowText}-${shadowNumber-1}`
                    activeShadowOption(Shadow.nowShadowNoHover)
                    createNewPickr(".color-picker-no-hover", findShadowOptionIndex(Shadow.nowShadowNoHover, false)[0].shadowColor)
                    colorPickerNoHover.style.background = findShadowOptionIndex(Shadow.nowShadowNoHover, false)[0].shadowColor
                }

                uploadShadowDataInInputs(isHover, findShadowOptionIndex(`${shadowText}-${shadowNumber-1}`, isHover)[0])
                addStyleToResizable(isHover)
            }

            disableAllVhTool()
        } else 
            alert("You need to enter the information correctly after then you can delete you shadow option")
    } else
        alert("please complete the fields")
}

//? delete style and validate obj in Shadow obj
const deleteStyleAndValidateObj = (shadowId, isHover) => {
    let shadowStyleIndex = undefined
    let shadowValidateIndex = undefined
    
    if (isHover) {
        shadowStyleIndex = Shadow.box.hoverStyle.findIndex(shadowOption => {
            return shadowOption.shadowName === shadowId
        })
        shadowValidateIndex = Shadow.Validation.hoverValidation.findIndex(shadowOption => {
            return shadowOption.shadowName === shadowId
        })
        //? delete them
        Shadow.box.hoverStyle.splice(shadowStyleIndex, 1)
        Shadow.Validation.hoverValidation.splice(shadowValidateIndex, 1)
        reduceShadowId(shadowStyleIndex, shadowValidateIndex, isHover)
    } else {
        shadowStyleIndex = Shadow.box.noHoverStyle.findIndex(shadowOption => {
            return shadowOption.shadowName === shadowId
        })
        shadowValidateIndex = Shadow.Validation.noHoverValidation.findIndex(shadowOption => {
            return shadowOption.shadowName === shadowId
        })
        //? delete them
        Shadow.box.noHoverStyle.splice(shadowStyleIndex, 1)
        Shadow.Validation.noHoverValidation.splice(shadowValidateIndex, 1)
        reduceShadowId(shadowStyleIndex, shadowValidateIndex, isHover)
    }
}

//? reduce shaodw id
const reduceShadowId = (shadowStyleBeginIndex, shadowValidateBeginIndex, isHover) => {
    //? reduce shadow style shadow name
    let shadowStyle = undefined
    let shadowValidate = undefined

    if (isHover) {
        shadowStyle = Shadow.box.hoverStyle
        shadowValidate = Shadow.Validation.hoverValidation
    } else {
        shadowStyle = Shadow.box.noHoverStyle
        shadowValidate = Shadow.Validation.noHoverValidation
    }
    
    for(let shadowIndex = shadowStyleBeginIndex ; shadowIndex < shadowStyle.length ; shadowIndex++) {        
        if (shadowStyle[shadowIndex]) {
            let shadowText = shadowStyle[shadowIndex].shadowName.split("-")[0]
            let shadowNumber = Number(shadowStyle[shadowIndex].shadowName.split("-")[1])
            shadowStyle[shadowIndex].shadowName = `${shadowText}-${shadowNumber - 1}`
        }
    }
    //? reduce shadow validation shadow name
    for(let shadowIndex = shadowValidateBeginIndex ; shadowIndex < shadowValidate.length ; shadowIndex++) {
        if (shadowValidate[shadowIndex]) {
            let shadowText = shadowValidate[shadowIndex].shadowName.split("-")[0]
            let shadowNumber = Number(shadowValidate[shadowIndex].shadowName.split("-")[1])
            shadowValidate[shadowIndex].shadowName = `${shadowText}-${shadowNumber - 1}`
        }
    }
}

let typeBox = "defaultBox"

//? create default and hover box
const createDH_box = (nameBox) => {
    typeEffectBox.innerText = ""

    const defaultBox = document.createElement("div")
    defaultBox.className = "d-flex align-items-center default-box-type"
    defaultBox.innerHTML = "default"

    const hoverBox = document.createElement("div")
    hoverBox.className = "d-flex align-items-center hover-box-type"
    hoverBox.innerHTML = "hover"

    if (nameBox === "defaultBox") {
        defaultBox.classList.add("active")
    } else if (nameBox === "hoverBox") {
        hoverBox.classList.add("active")
    } else {
        defaultBox.classList.add("active")
    }

    defaultBox.addEventListener("click", () => {
        const validateObject = findShadowOptionIndex(Shadow.nowShadowHover, true)[1]
        if (validateObject.horizentalValidate && validateObject.verticalValidate && validateObject.blurValidate && validateObject.speardValidate) {
            if (typeBox !== "defaultBox") {
                disableAllVhTool()
                typeBox = "defaultBox"
                hoverBox.classList.remove("active")
                defaultBox.classList.add("active")
                propertiesBoxNoHover.style.marginLeft = "0"
                shadowOptionBoxNoHover.style.marginLeft = "0"
                removeShadowDataFromInputs(true)
                uploadShadowDataInInputs(false, findShadowOptionIndex(Shadow.nowShadowNoHover, false)[0])
                disableAllInputs(true)
                activeInputs(false)
                addStyleToResizable(false)
            }
        } else 
            alert("Enter the information correctly")
    })

    hoverBox.addEventListener("click", () => {
        const validateObject = findShadowOptionIndex(Shadow.nowShadowNoHover, false)[1]
        if (validateObject.horizentalValidate && validateObject.verticalValidate && validateObject.blurValidate && validateObject.speardValidate) {
            if (typeBox !== "hoverBox") {
                disableAllVhTool()
                typeBox = "hoverBox"
                hoverBox.classList.add("active")
                defaultBox.classList.remove("active")
                propertiesBoxNoHover.style.marginLeft = "-318px"
                shadowOptionBoxNoHover.style.marginLeft = "-318px"
                uploadShadowDataInInputs(true, findShadowOptionIndex(Shadow.nowShadowHover, true)[0])
                removeShadowDataFromInputs(false)
                disableAllInputs(false)
                activeInputs(true)
                addStyleToResizable(true)
            }
        } else 
            alert("Enter the information correctly")
    })

    typeEffectBox.append(defaultBox, hoverBox)
}

//?delete hover type effect
const deleteHoverTypeEffect = () => {
    Shadow.isHover = false
    typeBox = "defaultBox"
    typeEffectBox.innerText = ""
    typeEffectIcon.innerHTML = '<i class="bi bi-plus-square"></i>'
    propertiesBoxNoHover.style.marginLeft = "0"
    shadowOptionBoxNoHover.style.marginLeft = "0"
    document.querySelector(".shadow-option-hover-wrap").innerText = ""
    Shadow.box.hoverStyle.splice(1, Shadow.box.hoverStyle.length)
    Shadow.Validation.hoverValidation.splice(1, Shadow.Validation.hoverValidation.length)
}

//? disable all vh tools function
const disableAllVhTool = () => { vhTools.forEach(tool => tool.classList.remove("active")) }

//? active vh tool
const activeVhTool = (vhTool) => 
    vhTools.forEach(allVhtools => allVhtools.className.includes(vhTool.className) ? allVhtools.classList.add("active") : allVhtools.classList.remove("active"))

//? vh tools 
vhTools.forEach(vhTool => {
    vhTool.addEventListener('click', (e) => {
        if (Shadow.isInit) {
            let shadowHoverObj = findShadowOptionIndex(Shadow.nowShadowHover, true)[0]
            let validateHoverObj = findShadowOptionIndex(Shadow.nowShadowHover, true)[1]
            
            let validateNoHoverObj = findShadowOptionIndex(Shadow.nowShadowNoHover, false)[1]
            let shadowNoHoverObj = findShadowOptionIndex(Shadow.nowShadowNoHover, false)[0]
            
            if (Shadow.isHover) {
                if (typeBox === "defaultBox") {
                    if (validateNoHoverObj.horizentalValidate && validateNoHoverObj.verticalValidate && validateNoHoverObj.blurValidate && validateNoHoverObj.speardValidate) {
                        if (e.target.className.includes("top-right")) {
                            
                            shadowNoHoverObj.horizental = Math.abs(shadowNoHoverObj.horizental)
                            if (shadowNoHoverObj.vertical > 0) { shadowNoHoverObj.vertical = -shadowNoHoverObj.vertical }
                            uploadShadowDataInInputs(false, shadowNoHoverObj)
                            addStyleToResizable(false)

                        } else if (e.target.className.includes("top-left")) {

                            if (shadowNoHoverObj.horizental > 0) { shadowNoHoverObj.horizental = -shadowNoHoverObj.horizental }
                            if (shadowNoHoverObj.vertical > 0) { shadowNoHoverObj.vertical = -shadowNoHoverObj.vertical }
                            uploadShadowDataInInputs(false, shadowNoHoverObj)
                            addStyleToResizable(false)
                            
                        } else if (e.target.className.includes("bottom-right")) {

                            shadowNoHoverObj.horizental = Math.abs(shadowNoHoverObj.horizental)
                            shadowNoHoverObj.vertical = Math.abs(shadowNoHoverObj.vertical)
                            uploadShadowDataInInputs(false)
                            addStyleToResizable(false)
                            
                        } else {
    
                            if (shadowNoHoverObj.horizental > 0) { shadowNoHoverObj.horizental = -shadowNoHoverObj.horizental }
                            shadowNoHoverObj.vertical = Math.abs(shadowNoHoverObj.vertical)
                            uploadShadowDataInInputs(false)
                            addStyleToResizable(false)
    
                        }
                        activeVhTool(e.target)
                    } else 
                        alert("Please enter the information correctly")
                } else {
                    if (validateHoverObj.horizentalValidate && validateHoverObj.verticalValidate && validateHoverObj.blurValidate && validateHoverObj.speardValidate) {
                        if (e.target.className.includes("top-right")) {
                            shadowHoverObj.horizental = Math.abs(shadowHoverObj.horizental)
                            if (shadowHoverObj.vertical > 0) { shadowHoverObj.vertical = -shadowHoverObj.vertical }
                            uploadShadowDataInInputs(true, shadowHoverObj)
                            addStyleToResizable(true) 
    
                        } else if (e.target.className.includes("top-left")) {
    
                            if (shadowHoverObj.horizental > 0) { shadowHoverObj.horizental = -shadowHoverObj.horizental }
                            if (shadowHoverObj.vertical > 0) { shadowHoverObj.vertical = -shadowHoverObj.vertical }
                            uploadShadowDataInInputs(true, shadowHoverObj)
                            addStyleToResizable(true)
                            
                        } else if (e.target.className.includes("bottom-right")) {
    
                            shadowHoverObj.horizental = Math.abs(shadowHoverObj.horizental)
                            shadowHoverObj.vertical = Math.abs(shadowHoverObj.vertical)
                            uploadShadowDataInInputs(true, shadowHoverObj)
                            addStyleToResizable(true)
                            
                        } else {
    
                            if (shadowHoverObj.horizental > 0) { shadowHoverObj.horizental = -shadowHoverObj.horizental }
                            shadowHoverObj.vertical = Math.abs(shadowHoverObj.vertical)
                            uploadShadowDataInInputs(true, shadowHoverObj)
                            addStyleToResizable(true)
    
                        }
                        activeVhTool(e.target)
                    } else 
                        alert("Please enter the information correctly")
                }
            } else {
                if (validateNoHoverObj.horizentalValidate && validateNoHoverObj.verticalValidate && validateNoHoverObj.blurValidate && validateNoHoverObj.speardValidate) {
                    if (e.target.className.includes("top-right")) {
                        
                        shadowNoHoverObj.horizental = Math.abs(shadowNoHoverObj.horizental)
                        if (shadowNoHoverObj.vertical > 0) { shadowNoHoverObj.vertical = -shadowNoHoverObj.vertical }
                        uploadShadowDataInInputs(false, shadowNoHoverObj)
                        addStyleToResizable(false)

                    } else if (e.target.className.includes("top-left")) {
                        
                        if (shadowNoHoverObj.horizental > 0) { shadowNoHoverObj.horizental = -shadowNoHoverObj.horizental }
                        if (shadowNoHoverObj.vertical > 0) { shadowNoHoverObj.vertical = -shadowNoHoverObj.vertical }
                        uploadShadowDataInInputs(false, shadowNoHoverObj)
                        addStyleToResizable(false)

                    } else if (e.target.className.includes("bottom-right")) {

                        shadowNoHoverObj.horizental = Math.abs(shadowNoHoverObj.horizental)
                        shadowNoHoverObj.vertical = Math.abs(shadowNoHoverObj.vertical)
                        uploadShadowDataInInputs(false, shadowNoHoverObj)
                        addStyleToResizable(false)
                        
                    } else {

                        if (shadowNoHoverObj.horizental > 0) { shadowNoHoverObj.horizental = -shadowNoHoverObj.horizental }
                        shadowNoHoverObj.vertical = Math.abs(shadowNoHoverObj.vertical)
                        uploadShadowDataInInputs(false, shadowNoHoverObj)
                        addStyleToResizable(false)

                    }
                    activeVhTool(e.target)
                } else 
                    alert("Please enter the information correctly")
            }
        } else 
            alert("please fill out the fields")
    })
})

//? add style to resizable box
const addStyleToResizable = (isHover) => {
    let shadowStyleArray = undefined

    let shadowStyle = []
    shadowStyle = []

    isHover ? shadowStyleArray =  Shadow.box.hoverStyle : shadowStyleArray =  Shadow.box.noHoverStyle

    shadowStyleArray.forEach(shadowOption => {
        shadowStyle.push({
            horizental : shadowOption.horizental + "px",
            vertical : shadowOption.vertical + "px",
            blur : shadowOption.blur + "px",
            speard : shadowOption.speard + "px",
            shadowColor : shadowOption.shadowColor,
        })
    })

    let shadow = ""

    shadowStyle.forEach((shadowOption, shadowOptionIndex) => {
        for (let i in shadowOption) {
            shadow += shadowOption[i] + " "
        }
        if (shadowOptionIndex !== shadowStyle.length - 1)
            shadow += ", "
    })

    resizable.style.boxShadow = shadow
}

elementClassNameInp.addEventListener("keyup", checkInit)

horizentalInp.addEventListener("keyup", (e) => checkInputs(e.target.value, false, "horizental"))
verticalInp.addEventListener("keyup", (e) => checkInputs(e.target.value, false, "vertical"))
blurInp.addEventListener("keyup", (e) => checkInputs(e.target.value, false, "blur"))
speardInp.addEventListener("keyup", (e) => checkInputs(e.target.value, false, "speard"))

horizentalHoverInp.addEventListener("keyup", (e) => checkInputs(e.target.value, true, "horizental"))
verticalHoverInp.addEventListener("keyup", (e) => checkInputs(e.target.value, true, "vertical"))
blurHoverInp.addEventListener("keyup", (e) => checkInputs(e.target.value, true, "blur"))
speardHoverInp.addEventListener("keyup", (e) => checkInputs(e.target.value, true, "speard"))

shadowOptionNoHoverPlusBtn.addEventListener("click", shadowOpNoHover)
shadowOptionHoverPlusBtn.addEventListener("click", shadowOpHover)

shadowOptionDefault.addEventListener("click", () => switchToShadowOption(shadowOptionDefault.dataset.id, false))
shadowOptionDefaultHover.addEventListener("click", () => switchToShadowOption(shadowOptionDefaultHover.dataset.id, true))

typeEffectIcon.addEventListener("click", () => {
    if (Shadow.isInit) {
        let shadowValidateObj = undefined
        let shadowStyleObj = undefined

        if (typeBox === "defaultBox") {
            shadowValidateObj = findShadowOptionIndex(Shadow.nowShadowNoHover, false)[1]
            shadowStyleObj = findShadowOptionIndex(Shadow.nowShadowNoHover, false)[0]
        } else {
            shadowValidateObj = findShadowOptionIndex(Shadow.nowShadowHover, true)[1]
            shadowStyleObj = findShadowOptionIndex(Shadow.nowShadowHover, true)[0]
        }
        
        disableAllVhTool()

        if (Shadow.isHover) {
            uploadShadowDataInInputs(false, findShadowOptionIndex(Shadow.nowShadowNoHover, false)[0])
            activeInputs(false)
            deleteHoverTypeEffect()
            addStyleToResizable(false)
        } else {
            if (shadowValidateObj.horizentalValidate && shadowValidateObj.verticalValidate && shadowValidateObj.blurValidate && shadowValidateObj.speardValidate) {
                Shadow.isHover = true
                createDH_box("defaultBox")
                typeEffectIcon.innerHTML = '<i class="bi bi-dash-square"></i>'
            } else {
                alert("Please enter the information correctly")
            }
        }
    } else 
        alert("Please fill in the field above")
})