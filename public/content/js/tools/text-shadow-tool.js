import { createPickr } from "./../modules/pickr.js";

//? get element form dom
const colorPicker = document.querySelector(".color-picker")
const text = document.querySelector(".text")
const elemClassName = document.querySelector(".element-class-name-input")
const horizentalInp = document.querySelector(".horizental-inp")
const verticalInp = document.querySelector(".vertical-inp")
const blurInp = document.querySelector(".blur-inp")
const vhTools = document.querySelectorAll(".vh-tool")
const elemValidationInputs = document.querySelector(".valdiation-inputs-elem")
const cssCodeBtn = document.querySelector(".css-code-btn")
const generateWrapBox = document.querySelector(".generate-wrap-box")
const shadowOptionPlusBtn = document.querySelector(".shadow-option-plus-btn")
const shadowOptionDefault = document.querySelector(".shadow-option-default")
const codePennel = document.querySelector(".code-pannel")
const styleInp = document.querySelector("#styleInp")
const copyToClipboard = document.querySelector(".clipboard-btn")
const cssCodeCloseBtn = document.querySelector(".close-generate-pannel-btn")

//? shadow object
let Shadow = {
    isInit: false,
    elemClass: null,
    nowShadow : "shadow-1",
    style: [
        {
            shadowName : "shadow-1",
            shadowColor: "#53535C",
            horizental: 0,
            vertical: 0,
            blur: 0
        }
    ],
    Validation: [
        {
            shadowName : "shadow-1",
            horizentalValidate: true,
            verticalValidate: true,
            blurValidate: true
        }
    ]
}

//? create pickr
let pickr = createPickr(".color-picker", Shadow.style[0].shadowColor)

pickr.on('change', (color) => {
    let shadowOption = findShadowObj(Shadow.nowShadow, true)
    let shadowColor = color.toHEXA().toString()
    shadowOption.shadowColor = shadowColor
    colorPicker.style.background = shadowColor
    addStyleToGenerateTxt()
})

//? disable inputs function 
const disableAllInputs = () => {
    horizentalInp.disabled = true
    verticalInp.disabled = true
    blurInp.disabled = true
    colorPicker.disabled = true
}
disableAllInputs()

//? remove shadow data from dom 
const removeShadowDataFromDom = () => {
    horizentalInp.value = ""
    verticalInp.value = ""
    blurInp.value = ""
}

//? active inputs function
const activeAllInputs = () => {
    horizentalInp.disabled = false
    verticalInp.disabled = false
    blurInp.disabled = false
    colorPicker.disabled = false
}

//? disable all vh tools function
const disableAllVhTool = () => vhTools.forEach(tool => tool.classList.remove("active"))

//? upload shadow data in inputs
const uploadShadowDataInDom = (shadowName) => {
    let shadowStyleObj = findShadowObj(shadowName, true)

    horizentalInp.value = shadowStyleObj.horizental
    verticalInp.value = shadowStyleObj.vertical
    blurInp.value = shadowStyleObj.blur
}

//? find now shadow ohject
const findShadowObj = (shadowName, isStyle) => {
    if (isStyle) {
        let shadowObj = Shadow.style.find(shadowOption => {
            return shadowOption.shadowName === shadowName
        })
        return shadowObj
    } else {
        let shadowObj = Shadow.Validation.find(shadowOption => {
            return shadowOption.shadowName === shadowName
        })
        return shadowObj
    }
}

//? add style to resizable box
const addStyleToGenerateTxt = () => {
    let shadowStyle = []
    shadowStyle = []
    
    text.style.textShadow = ""
    
    Shadow.style.forEach(shadowOption => {
        shadowStyle.push({
            horizental : shadowOption.horizental + "px",
            vertical : shadowOption.vertical + "px",
            blur : shadowOption.blur + "px",
            shadowColor : shadowOption.shadowColor,
        })
    })

    StyleText = ""
    shadowStyle.forEach((shadowOption, shadowOptionIndex) => {
        for(let optionItem in shadowOption) {
            StyleText += shadowOption[optionItem] + " "
        }
        if (shadowOptionIndex !== shadowStyle.length - 1) {
            StyleText += ","
        }
    })
    text.style.textShadow = StyleText
}

//? check inputs 
const checkInit = e => {
    let regexCode = /^[a-zA-Z]{1,30}$/g
    let regexResult = regexCode.test(e.target.value)
    
    if (regexResult) {
        //? active shadow init
        Shadow.isInit = true

        //? empty msg box
        e.target.parentElement.previousElementSibling.innerHTML = ""

        //? put class name in shadow elem class
        Shadow.elemClass = `.${e.target.value.split(" ").join("-")}`

        //? call to another functions
        activeAllInputs()
        uploadShadowDataInDom(Shadow.nowShadow)
        addStyleToGenerateTxt()
        callCheckValidateInput(horizentalInp.value , "horizental", Shadow.nowShadow)
        callCheckValidateInput(verticalInp.value, "vertical", Shadow.nowShadow)
        callCheckValidateInput(blurInp.value, "blur", Shadow.nowShadow)
    } else {
        //? disable shadow init
        Shadow.isInit = false

        //? put this msg in msg box
        e.target.parentElement.previousElementSibling.innerHTML = "please complete the field below. You are allowed to enter up to 30 letters"

        text.style.textShadow = ""

        //? disable all inputs
        disableAllInputs()
        removeShadowDataFromDom()
        disableAllVhTool()
    }
}

//? call to checkValidation inputs function
const callCheckValidateInput = (value, inputName, shadowName) => {
    disableAllVhTool()
    
    let shadowValidateObj = findShadowObj(shadowName, false)
    let shadowStyleObj = findShadowObj(shadowName, true)
    let isValidateTrue = checkValidationInput(value, inputName, shadowValidateObj, shadowStyleObj)

    if (isValidateTrue) {
        if (shadowValidateObj.horizentalValidate && shadowValidateObj.verticalValidate && shadowValidateObj.blurValidate) {
            elemValidationInputs.innerHTML = ""
            addStyleToGenerateTxt()
        }
    } else {
        if (inputName === "horizental" || inputName === "vertical") {
            elemValidationInputs.innerHTML = "Please select a negative number from -100 to 0 or a positive number from 0 to 100"
        } else {
            elemValidationInputs.innerHTML = "Please select positive number from 0 to 100"
        }
    }
}

//? check validation of inputs
const checkValidationInput = (inputValue, inputName, shadowValidateObj, shadowStyleObj) => {
    if (inputName === "horizental" || inputName === "vertical") {
        let regexCode = /^(0|-[1-9]{1,2}|-[1-9]{1}0|\+?[1-9]{1,2}|\+?[1-9]{1}0)$/
        let regexResult = regexCode.test(inputValue)

        if (inputName === "horizental") {
            if (regexResult) {
                shadowValidateObj.horizentalValidate = true
                shadowStyleObj.horizental = Number(horizentalInp.value)
            } else {
                shadowValidateObj.horizentalValidate = false
            }
        } else {
            if (regexResult) {
                shadowValidateObj.verticalValidate = true
                shadowStyleObj.vertical = Number(verticalInp.value)
            } else {
                shadowValidateObj.verticalValidate = false
            }
        }

        return regexResult
    } else {
        let regexCode = /^(0|\+?[1-9]{1,2}|\+?[1-9]{1}0)$/g
        let regexResult = regexCode.test(inputValue)

        if (regexResult) {
            shadowValidateObj.blurValidate = true
            shadowStyleObj.blur = Number(blurInp.value)
        } else {
            shadowValidateObj.blurValidate = false
        }
        
        return regexResult
    }
}

//? active vh tool
const activeVhTool = (vhTool) => 
    vhTools.forEach(allVhtools => allVhtools.className.includes(vhTool.className) ? allVhtools.classList.add("active") : allVhtools.classList.remove("active"))

//? vh tools 
vhTools.forEach(vhTool => {
    vhTool.addEventListener('click', (e) => {
        if (Shadow.isInit) {
            let shadowOptionValidateObj = findShadowObj(Shadow.nowShadow, false)
            let shadowOptionStyleObj = findShadowObj(Shadow.nowShadow, true)
            if (shadowOptionValidateObj.horizentalValidate && shadowOptionValidateObj.verticalValidate && shadowOptionValidateObj.blurValidate) {
                if (e.target.className.includes("top-right")) {
                    
                    shadowOptionStyleObj.horizental = Math.abs(shadowOptionStyleObj.horizental)
                    if (shadowOptionStyleObj.vertical > 0) { shadowOptionStyleObj.vertical = -Math.abs(shadowOptionStyleObj.vertical) }
                    uploadShadowDataInDom(Shadow.nowShadow)
                    addStyleToGenerateTxt()

                } else if (e.target.className.includes("top-left")) {
                    
                    if (shadowOptionStyleObj.horizental > 0) { shadowOptionStyleObj.horizental = -Math.abs(shadowOptionStyleObj.horizental) }
                    if (shadowOptionStyleObj.vertical > 0) { shadowOptionStyleObj.vertical = -Math.abs(shadowOptionStyleObj.vertical) }
                    uploadShadowDataInDom(Shadow.nowShadow)
                    addStyleToGenerateTxt()

                } else if (e.target.className.includes("bottom-right")) {

                    shadowOptionStyleObj.horizental = Math.abs(shadowOptionStyleObj.horizental)
                    shadowOptionStyleObj.vertical = Math.abs(shadowOptionStyleObj.vertical)
                    uploadShadowDataInDom(Shadow.nowShadow)
                    addStyleToGenerateTxt()
                    
                } else {

                    if (shadowOptionStyleObj.horizental > 0) { shadowOptionStyleObj.horizental = -Math.abs(shadowOptionStyleObj.horizental) }
                    shadowOptionStyleObj.vertical = Math.abs(shadowOptionStyleObj.vertical)
                    uploadShadowDataInDom(Shadow.nowShadow)
                    addStyleToGenerateTxt()

                }
                activeVhTool(e.target)
            } else 
                alert("Please enter the information correctly")
        } else 
            alert("please fill out the fields")
    })
})

let StyleText = ""
//? check all inputs and other elements validation is true 
const openGeneratePannel = () => {
    if (Shadow.isInit) {
        let checked = Shadow.Validation.every(item => {
            return item.horizentalValidate && item.verticalValidate && item.blurValidate
        })

        if (checked) {
            generateWrapBox.classList.add("active")
            addStyleToGenerateTxt()
            
            let shadowOptionStyleText = ""
            
            StyleText.split(",").forEach((item , index) => {
                shadowOptionStyleText += "&nbsp;&nbsp;&nbsp;" + item
                if (index !== StyleText.split(",").length - 1)
                    shadowOptionStyleText += ", "
            })

            codePennel.innerHTML = `${Shadow.elemClass} { <br>
               ${shadowOptionStyleText} <br>
            }`
        } else
            alert("Enter the information correctly")
    } else
        alert("Please enter the fields above")
}

//? copy to clipboard
const copyToClipboardText = () => {
    styleInp.value = `${Shadow.elemClass} { ${StyleText} }`
    navigator.clipboard.writeText(styleInp.value);
}

//? close generator pannel
const closeGeneratePannel = () => {
    generateWrapBox.classList.remove("active")
}

//? create new shadow option and switch to this option 
const appendNewShadowOption = () => {
    if (Shadow.isInit) {
        let shadowValidateObj = findShadowObj(Shadow.nowShadow, false)
        if (shadowValidateObj.horizentalValidate && shadowValidateObj.verticalValidate && shadowValidateObj.blurValidate) {
            //? set now shadow option
            Shadow.nowShadow = `shadow-${Shadow.style.length + 1}`
            
            //? get shadow option wrap
            const wrap = document.querySelector(".shadow-option-wrap")

            //? create new style and validate obj and put them in shadow obj
            createNewStyleAndValidateObj(Shadow.nowShadow)

            //? create new shadow option/box
            const newShadowOption = createNewShadowOption(Shadow.style.length , Shadow.nowShadow)

            //? append shadow option/box in wrap
            wrap.appendChild(newShadowOption)

            //? upload new shadow option data in inputs
            uploadShadowDataInDom(Shadow.nowShadow)

            //? active new shadow option
            activeShadowOption(newShadowOption.dataset.id)

            //? change backgorund of color picker button
            let shadowStyleOptionObj = findShadowObj(Shadow.nowShadow, true)
            colorPicker.style.background = shadowStyleOptionObj.shadowColor

            //? create new color picker
            createNewPickr(".color-picker", shadowStyleOptionObj.shadowColor)

            //? disable all vh tool
            disableAllVhTool()
        } else 
            alert("You need to enter the information correctly")
    } else 
        alert("please complete the fields")
}

//? create new pickr 
const createNewPickr = (buttonClass, color) => {
    let newPickr = createPickr(buttonClass, color)
    newPickr.on('change', (color) => {
        let shadowOption = findShadowObj(Shadow.nowShadow, true)
        let shadowColor = color.toHEXA().toString()
        shadowOption.shadowColor = shadowColor
        colorPicker.style.background = shadowColor
        addStyleToGenerateTxt()
    })
}

//? create new shadow option box
const createNewShadowOption = (shadowNumber, shadowId) => {
    let shadowOption = undefined
    let shadowOptionMinusBtn = undefined
    
    //? create shadow option/box
    if (shadowNumber === "1") {
        shadowOption = document.createElement("li")
        shadowOption.className = "shadow-option shadow-option-default"
        shadowOption.innerHTML = "shadow 1"
        shadowOption.setAttribute("data-id", "shadow-1")
    } else {
        shadowOption = document.createElement("li")
        shadowOption.className = "shadow-option new-shadow-option"
        shadowOption.innerHTML = `shadow ${shadowNumber}`
        shadowOption.setAttribute("data-id", shadowId)
    
        //? create shadow minus btn
        shadowOptionMinusBtn = document.createElement("span")
        shadowOptionMinusBtn.className = "shadow-option-minus-btn"
        shadowOptionMinusBtn.innerHTML = '<i class="bi bi-dash-square"></i>'

        //? append shadow minus btn in shadow option/box
        shadowOption.appendChild(shadowOptionMinusBtn)

        //? minus shadow options
        shadowOptionMinusBtn.addEventListener("click", (e) => {
            e.stopPropagation()
            minusShadowOption(shadowOption.dataset.id)
        })
    }

    //? switch to other shadow options/boxes
    shadowOption.addEventListener("click", () => switchToShadowOption(shadowOption.dataset.id))
    
    return shadowOption
}

//? activator shadow option
const activeShadowOption = (shadowId) => {
    const shadowOptions = document.querySelectorAll(".shadow-option")
    shadowOptions.forEach(option => {
        option.dataset.id === shadowId ? option.classList.add("active") : option.classList.remove("active")
    })
}

//? create new style and validate obj and push them in Shadow obj
const createNewStyleAndValidateObj = (shadowName) => {
    //? push new shadow style obj
    Shadow.style.push({
        shadowName : shadowName,
        shadowColor : generateRandomColor(),
        horizental : 0,
        vertical : 0,
        blur: 0
    })

    //? push new shadow validate obj
    Shadow.Validation.push({
        shadowName : shadowName,
        horizentalValidate: true,
        verticalValidate: true,
        blurValidate: true
    })
}

//? generate random color
const generateRandomColor = () => {
    return "#" + Math.floor(Math.random()*16777215).toString(16);
}

//? switch to this shadow option
const switchToShadowOption = (switchShadowId) => {
    if (Shadow.nowShadow !== switchShadowId) {
        addStyleToGenerateTxt()
        let shadowValidateObj = findShadowObj(Shadow.nowShadow, false)
        if (shadowValidateObj.horizentalValidate && shadowValidateObj.verticalValidate && shadowValidateObj.blurValidate) {
            Shadow.nowShadow = switchShadowId
            
            uploadShadowDataInDom(switchShadowId)
            activeShadowOption(switchShadowId)

            createNewPickr(".color-picker", findShadowObj(Shadow.nowShadow, true).shadowColor)
            colorPicker.style.background = findShadowObj(Shadow.nowShadow, true).shadowColor

            disableAllVhTool()
        } else 
            alert("You need to enter the information correctly")
    }
}

//? minus shadow option
const minusShadowOption = (shadowId) => {
    let shadowValidateObj = findShadowObj(Shadow.nowShadow, false)
    if (shadowValidateObj.horizentalValidate && shadowValidateObj.verticalValidate && shadowValidateObj.blurValidate) {
        //? delete style and validate object in Shadow style and validate
        deleteStyleAndValidateObj(shadowId)
        
        //? get wrap and empty that
        const wrap = document.querySelector(".shadow-option-ul")
        wrap.innerText = ""

        //? create shadow option wrap and put this element in wrap
        const shadowOptionWrap = document.createElement("div")
        shadowOptionWrap.className = "shadow-option-wrap"
        wrap.appendChild(shadowOptionWrap)

        //? append shadow options
        Shadow.style.forEach(shadowOption => {
            let shadowNumber = shadowOption.shadowName.split("-")[1]
            let shadowBox = createNewShadowOption(shadowNumber, shadowOption.shadowName)
            shadowNumber === 1 ? wrap.appendChild(shadowBox) : shadowOptionWrap.appendChild(shadowBox)
        })

        let isNowShadowFind = Shadow.style.findIndex(shadowOption => {
            return shadowOption.shadowName === Shadow.nowShadow
        })
        
        if (isNowShadowFind !== -1) {
            uploadShadowDataInDom(Shadow.nowShadow)
            activeShadowOption(Shadow.nowShadow)
            addStyleToGenerateTxt()
        } else {
            let shadowText = Shadow.nowShadow.split("-")[0]
            let shadowNumber = Number(Shadow.nowShadow.split("-")[1])
            Shadow.nowShadow = `${shadowText}-${shadowNumber-1}`
            
            uploadShadowDataInDom(Shadow.nowShadow)
            activeShadowOption(Shadow.nowShadow)
            addStyleToGenerateTxt()

            createNewPickr(".color-picker", findShadowObj(Shadow.nowShadow, true).shadowColor)
            colorPicker.style.background = findShadowObj(Shadow.nowShadow, true).shadowColor
        }

    disableAllVhTool()
    } else 
        alert("You need to enter the information correctly after then you can delete you shadow option")
}

//? delete style and validate obj in Shadow obj
const deleteStyleAndValidateObj = (shadowId) => {
    let shadowStyleIndex = Shadow.style.findIndex(shadowOption => {
        return shadowOption.shadowName === shadowId
    })
    let shadowValidateIndex = Shadow.Validation.findIndex(shadowOption => {
        return shadowOption.shadowName === shadowId
    })
    
    //? delete them
    Shadow.style.splice(shadowStyleIndex, 1)
    Shadow.Validation.splice(shadowValidateIndex, 1)
    
    reduceShadowId(shadowStyleIndex, shadowValidateIndex)
}

//? reduce shaodw id
const reduceShadowId = (shadowStyleBeginIndex, shadowValidateBeginIndex) => {
    //? reduce shadow style shadow name
    for(let shadowIndex = shadowStyleBeginIndex ; shadowIndex < Shadow.style.length ; shadowIndex++) {
        if (Shadow.style[shadowIndex]) {
            let shadowText = Shadow.style[shadowIndex].shadowName.split("-")[0]
            let shadowNumber = Number(Shadow.style[shadowIndex].shadowName.split("-")[1])
            Shadow.style[shadowIndex].shadowName = `${shadowText}-${shadowNumber - 1}`
        }
    }
    //? reduce shadow validation shadow name
    for(let shadowIndex = shadowValidateBeginIndex ; shadowIndex < Shadow.Validation.length ; shadowIndex++) {
        if (Shadow.Validation[shadowIndex]) {
            let shadowText = Shadow.Validation[shadowIndex].shadowName.split("-")[0]
            let shadowNumber = Number(Shadow.Validation[shadowIndex].shadowName.split("-")[1])
            Shadow.Validation[shadowIndex].shadowName = `${shadowText}-${shadowNumber - 1}`
        }
    }
}

elemClassName.addEventListener("keyup", checkInit)

horizentalInp.addEventListener("keyup", (e) => callCheckValidateInput(e.target.value, "horizental", Shadow.nowShadow))
verticalInp.addEventListener("keyup", (e) => callCheckValidateInput(e.target.value, "vertical", Shadow.nowShadow))
blurInp.addEventListener("keyup", (e) => callCheckValidateInput(e.target.value, "blur", Shadow.nowShadow))

shadowOptionPlusBtn.addEventListener("click", appendNewShadowOption)
shadowOptionDefault.addEventListener("click", () => switchToShadowOption(shadowOptionDefault.dataset.id))

cssCodeBtn.addEventListener("click", openGeneratePannel)

cssCodeCloseBtn.addEventListener("click", closeGeneratePannel)
copyToClipboard.addEventListener("click", copyToClipboardText)