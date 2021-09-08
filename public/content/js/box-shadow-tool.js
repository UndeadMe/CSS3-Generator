import { createPickr } from "./pickr.js";

//? get element form dom
const colorPickerBtn = document.querySelector(".color-picker")
const resizableBox = document.querySelector(".resizable")
const elemClassName = document.querySelector(".element-class-name-input")
const horizentalInp = document.querySelector(".horizental-inp")
const verticalInp = document.querySelector(".vertical-inp")
const blurInp = document.querySelector(".blur-inp")
const speardInp = document.querySelector(".speard-inp")
const vhTools = document.querySelectorAll(".vh-tool")
const vhTool = document.querySelectorAll(".vh-tool")
const elemValidationInputs = document.querySelector(".valdiation-inputs-elem")

//? create pickr
let pickr = createPickr(".color-picker")
pickr.on('change', (color) => {
    let shadowColor = color.toHEXA().toString()
    Shadow.box.noHover.shadowColor = shadowColor
    colorPickerBtn.style.background = shadowColor
    addStyleToResizable()
})

//? disable inputs
const disableInputs = () => {
    //? disable pointerEvents of horizental input and empty value of this input
    horizentalInp.style.pointerEvents = "none"
    horizentalInp.value = ""

    //? disable pointerEvents of vertical input and empty value of this input
    verticalInp.style.pointerEvents = "none"
    verticalInp.value = ""

    //? disable pointerEvents of blur input and empty value of this input
    blurInp.style.pointerEvents = "none"
    blurInp.value = ""

    //? disable pointerEvents of speardI input and empty value of this input
    speardInp.style.pointerEvents = "none"
    speardInp.value = ""
    
    //? disable pointerEvents of color picker button
    colorPickerBtn.style.pointerEvents = "none"
    
    //? remove all active class of vh tools and disable pointerEvents of vh tools
    vhTools.forEach(tool => {tool.style.pointerEvents = "none"; tool.classList.remove("active")})
    
    //? clear the box shadow of resizable box
    resizableBox.style.boxShadow = ""
}

//? active inputs
const activeInputs = () => {
    //? empty the pointer events of inputs
    horizentalInp.style.pointerEvents = ""
    verticalInp.style.pointerEvents = ""
    blurInp.style.pointerEvents = ""
    speardInp.style.pointerEvents = ""
    colorPickerBtn.style.pointerEvents = ""
    vhTools.forEach(tool => tool.style.pointerEvents = "")
}

//? shadow object
let Shadow = {
    elemClass: null,
    box: {
        noHover: {
            shadowColor: "#53535C",
            horizental: 0,
            vertical: 0,
            blur: 0,
            speard: 0
        },
        hover: {

        }
    },
    isInit: false,
    isHover: false,
    Validation : {
        horizentalValidate: true,
        verticalValidate: true,
        blurValidate: true,
        speardValidate: true
    }
}

//? upload shadow data in inputs
const uploadShadowDataInDom = () => {
    let {box: {noHover: { shadowColor,horizental,vertical,blur,speard }}} = Shadow
    horizentalInp.value = horizental
    verticalInp.value = vertical
    blurInp.value = blur
    speardInp.value = speard
}

//? check inputs 
const checkInputs = e => {
    if (e.target.value.trim().length !== 0) {
        //? active shadow init
        Shadow.isInit = true

        //? empty msg box
        e.target.parentElement.previousElementSibling.innerHTML = ""

        //? put class name in shadow elem class
        Shadow.elemClass = `.${e.target.value}`
        
        //? call to another functions
        activeInputs()
        uploadShadowDataInDom()
        addStyleToResizable()
    }else {
        //? disable shadow init
        Shadow.isInit = false

        //? put this msg in msg box
        e.target.parentElement.previousElementSibling.innerHTML = "please fill out the field below"
        
        //? call to disable inputs
        disableInputs()
    }
}

//? add style to resizable box
const addStyleToResizable = () => {
    let {box: {noHover: { shadowColor,horizental,vertical,blur,speard }}} = Shadow
    resizableBox.style.boxShadow = `${horizental}px ${vertical}px ${blur}px ${speard}px ${shadowColor}`
}

//? add horizental number in shadow data
const addHorizentalInShadowData = number => {
    let ShadowNoHover = Shadow.box.noHover
    
    //? if shadow elem class isn't null or undefined
    if (Shadow.isInit === true) {
        //? call to this function to remove all active class form vh tools
        disableAllVhTool()
        
        //? if e.target.value === "" --> put zero in shadow horizental and add style to resizable box
        if (number === "") {
            ShadowNoHover.horizental = 0
            addStyleToResizable()
        } else {
            //? put e.target.value in shadow horizental
            ShadowNoHover.horizental = number
            if (
                (ShadowNoHover.horizental.length >= 1 && ShadowNoHover.horizental[0] !== "0") || 
                (ShadowNoHover.horizental.length < 2 && ShadowNoHover.horizental === "0")
            ) {
                //? active horizental validation
                Shadow.Validation.horizentalValidate = true 
                
                //? if all validation of inputs is true so add style to resizable box
                if (Shadow.Validation.horizentalValidate && Shadow.Validation.verticalValidate && Shadow.Validation.blurValidate && Shadow.Validation.speardValidate) {
                    elemValidationInputs.innerHTML = ""
                    addStyleToResizable()
                } else 
                    elemValidationInputs.innerHTML = "Please complete the fields correctly"
            } else {
                Shadow.Validation.horizentalValidate = false
                elemValidationInputs.innerHTML = "Please enter the number correctly"
            }
        }
    } else 
        horizentalInp.value = horizentalInp.value.slice(0, horizentalInp.value.length - 1)
}

//? add vertical number in shadow data
const addVerticalInShadowData = (number) => {
    let ShadowNoHover = Shadow.box.noHover

    //? if shadow elem class isn't null or undefined
    if (Shadow.isInit === true) {
        //? call to this function to remove all active class form vh tools
        disableAllVhTool()
        
        //? if e.target.value === "" --> put zero in shadow vertical and add style to resizable box
        if (number === "") {
            ShadowNoHover.vertical = 0
            addStyleToResizable()
        } else {
            //? put e.target.value in shadow vertical
            ShadowNoHover.vertical = number
            if (
                (ShadowNoHover.vertical.length >= 1 && ShadowNoHover.vertical[0] !== "0") || 
                (ShadowNoHover.vertical.length < 2 && ShadowNoHover.vertical === "0")
            ) {
                //? active vertical validation
                Shadow.Validation.verticalValidate = true 
                
                //? if all validation of inputs is true so add style to resizable box
                if (Shadow.Validation.horizentalValidate && Shadow.Validation.verticalValidate && Shadow.Validation.blurValidate && Shadow.Validation.speardValidate) {
                    elemValidationInputs.innerHTML = ""
                    addStyleToResizable()
                } else 
                    elemValidationInputs.innerHTML = "Please complete the fields correctly"
            } else {
                elemValidationInputs.innerHTML = "Please enter the number correctly"   
                Shadow.Validation.verticalValidate = false
            }
        }
    } else 
        verticalInp.value = verticalInp.value.slice(0, verticalInp.value.length - 1)
}

//? add blur number in shadow data 
const addBlurInShadowData = (number) => {
    let ShadowNoHover = Shadow.box.noHover
    
    //? if shadow elem class isn't null or undefined
    if (Shadow.isInit) {
        //? call to this function to remove all active class form vh tools
        disableAllVhTool()
        
        //? if e.target.value === "" --> put zero in shadow blur and add style to resizable box
        if (number === "") {
            ShadowNoHover.blur = 0
            addStyleToResizable()
        } else {
            //? put e.target.value in shadow vertical
            ShadowNoHover.blur = number

            if (
                (ShadowNoHover.blur.length >= 1 && ShadowNoHover.blur[0] !== "0") || 
                (ShadowNoHover.blur.length < 2 && ShadowNoHover.blur === "0")
            ) {
                //? active blur validation
                Shadow.Validation.blurValidate = true 
                
                //? if all validation of inputs is true so add style to resizable box
                if (Shadow.Validation.horizentalValidate && Shadow.Validation.verticalValidate && Shadow.Validation.blurValidate && Shadow.Validation.speardValidate) {
                    elemValidationInputs.innerHTML = ""
                    addStyleToResizable()
                } else 
                    elemValidationInputs.innerHTML = "Please complete the fields correctly"
            } else {
                elemValidationInputs.innerHTML = "Please enter the number correctly"   
                Shadow.Validation.blurValidate = false
            }
        }
    } else 
        blurInp.value = blurInp.value.slice(0, blurInp.value.length - 1)
}

//? add speard number in shadow data
const addSpeardInShadowData = (number) => {
    let ShadowNoHover = Shadow.box.noHover

    //? if shadow elem class isn't null or undefined
    if (Shadow.isInit) {
        //? call to this function to remove all active class form vh tools
        disableAllVhTool()
        
        //? if e.target.value === "" --> put zero in shadow speard and add style to resizable box
        if (number === "") {
            ShadowNoHover.speard = 0
            addStyleToResizable()
        } else {
            //? put e.target.value in shadow speard
            ShadowNoHover.speard = number

            if (
                (ShadowNoHover.speard.length >= 1 && ShadowNoHover.speard[0] !== "0") || 
                (ShadowNoHover.speard.length < 2 && ShadowNoHover.speard === "0")
            ) {
                //? active speard validation
                Shadow.Validation.speardValidate = true 

                //? if all validation of inputs is true so add style to resizable box
                if (Shadow.Validation.horizentalValidate && Shadow.Validation.verticalValidate && Shadow.Validation.blurValidate && Shadow.Validation.speardValidate) {
                    elemValidationInputs.innerHTML = ""
                    addStyleToResizable()
                } else 
                    elemValidationInputs.innerHTML = "Please complete the fields correctly"
            } else {
                elemValidationInputs.innerHTML = "Please enter the number correctly"   
                Shadow.Validation.speardValidate = false
            }
        }
    } else 
        speardInp.value = horizentalInp.value.slice(0, horizentalInp.value.length - 1)
}

// ? make resizable for resizable box
const makeResizableElem = elem => {
    const element  = document.querySelector(elem)
    const resizers = document.querySelector(`${elem} .resizers`)
    const resizer  = document.querySelectorAll(`${elem} .resizer`)
    
    //? dot clicked
    let currentDot = null

    resizer.forEach(dot => {
        dot.addEventListener("mousedown", (e) => {
            window.addEventListener("mousemove" , resize)
            //? put dot in currentDot
            currentDot = dot
            window.addEventListener("mouseup", stopResize)
        })
    })

    //? resize function for mousemove on window
    const resize = (e) => {        
        //? resizers dont has a active class ==> add class to resizers
        if (!resizers.classList.contains("active")) {
            resizers.classList.add("active")
        }

        if (currentDot.classList.contains("bottom-right")) {
            //? set width and height
            element.style.width = `${e.clientX - element.getBoundingClientRect().left}px`
            element.style.height = `${e.clientY - element.getBoundingClientRect().top}px`
        }else if (currentDot.classList.contains('bottom-left')) {
            //? set width and height
            element.style.width = `${element.getBoundingClientRect().right - e.clientX}px`
            element.style.height = `${e.clientY - element.getBoundingClientRect().top}px`
        }else if (currentDot.classList.contains("top-right")) {
            //? set width and height
            element.style.width = `${e.clientX - element.getBoundingClientRect().left}px`
            element.style.height = `${element.getBoundingClientRect().bottom - e.clientY}px`
        }else {
            //? set width and height
            element.style.width = `${element.getBoundingClientRect().right - e.clientX}px`
            element.style.height = `${element.getBoundingClientRect().bottom - e.clientY}px`
        }
    }
    
    const stopResize = () => {
        resizers.classList.remove("active")
        //? remove resizers active class
        window.removeEventListener("mousemove", resize)
    }
}

makeResizableElem(".resizable")

//? create activator for vh tool and vh tools shadow
vhTool.forEach(tool => {
    tool.addEventListener("click" , () => {
        vhTool.forEach(allTool => {
            
            //? if all tool class list value === tool.name 
            if (allTool.classList.value === tool.className) {
                
                //? if elem class input isn't empty
                if (Shadow.isInit) {
                    
                    //? if horizental and vertical validation is true
                    if (Shadow.Validation.horizentalValidate && Shadow.Validation.verticalValidate) {

                        //? if e.target === "vh-top-right" so create position based top-right
                        if (allTool.classList.contains("vh-top-right")) {
                            Shadow.box.noHover.horizental = Math.abs(Shadow.box.noHover.horizental)
                            if (Number(Shadow.box.noHover.vertical) > 0) Shadow.box.noHover.vertical = -(Shadow.box.noHover.vertical)
                        } 
                        //? if e.target === "vh-top-left" so create position based top-left
                        else if (allTool.classList.contains("vh-top-left")) {
                            if (Number(Shadow.box.noHover.horizental) > 0) Shadow.box.noHover.horizental = -(Shadow.box.noHover.horizental)
                            if (Number(Shadow.box.noHover.vertical) > 0) Shadow.box.noHover.vertical = -(Shadow.box.noHover.vertical)
                        } 
                        //? if e.target === "vh-bottom-left" so create position based bottom-left
                        else if (allTool.classList.contains("vh-bottom-left")) {
                            if (Number(Shadow.box.noHover.horizental) > 0) Shadow.box.noHover.horizental = -(Shadow.box.noHover.horizental)
                            Shadow.box.noHover.vertical = Math.abs(Shadow.box.noHover.vertical)
                        } 
                        //? if e.target === "vh-bottom-right" so create position based bottom-right
                        else {
                            Shadow.box.noHover.horizental = Math.abs(Shadow.box.noHover.horizental)
                            Shadow.box.noHover.vertical = Math.abs(Shadow.box.noHover.vertical)
                        }
                        
                        //? active e.target 
                        allTool.classList.add("active")
                        
                        //? upload shadow data in inputs 
                        uploadShadowDataInDom()

                        //? add style to resizbale box
                        addStyleToResizable()

                    } else 
                        alert("Please complete the fields correctly")
                        
                } else 
                    alert("please complete fields")
                    
            } else 
                allTool.classList.remove("active")
        })
    })
})

//? disable all vh tools function
const disableAllVhTool = () => { vhTool.forEach(tool => tool.classList.remove("active")) }

window.addEventListener("load", disableInputs)
elemClassName.addEventListener("keyup", checkInputs)

horizentalInp.addEventListener("keyup", (e) => addHorizentalInShadowData(e.target.value))
horizentalInp.addEventListener("change", (e) => addHorizentalInShadowData(e.target.value))

verticalInp.addEventListener("keyup", (e) => addVerticalInShadowData(e.target.value))
verticalInp.addEventListener("change", (e) => addVerticalInShadowData(e.target.value))

blurInp.addEventListener("keyup", (e) =>  addBlurInShadowData(e.target.value))
blurInp.addEventListener("change", (e) => addBlurInShadowData(e.target.value))

speardInp.addEventListener("keyup", (e)  => addSpeardInShadowData(e.target.value))
speardInp.addEventListener("change", (e) => addSpeardInShadowData(e.target.value))