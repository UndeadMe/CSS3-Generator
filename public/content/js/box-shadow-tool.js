import { createPickr } from "./pickr.js";

const colorPickerBtn = document.querySelector(".color-picker")
const resizableBox = document.querySelector(".resizable")
const elemClassName = document.querySelector(".element-class-name-input")
const horizentalInp = document.querySelector(".horizental-inp")
const verticalInp = document.querySelector(".vertical-inp")
const blurInp = document.querySelector(".blur-inp")
const speardInp = document.querySelector(".speard-inp")
const vhTools = document.querySelectorAll(".vh-tool")
const vhTool = document.querySelectorAll(".vh-tool")

//? disable inputs
const disableInputs = () => {
    horizentalInp.style.pointerEvents = "none"
    horizentalInp.value = ""

    verticalInp.style.pointerEvents = "none"
    verticalInp.value = ""

    blurInp.style.pointerEvents = "none"
    blurInp.value = ""

    speardInp.style.pointerEvents = "none"
    speardInp.value = ""
    
    colorPickerBtn.style.pointerEvents = "none"
    vhTools.forEach(tool => {tool.style.pointerEvents = "none"; tool.classList.remove("active")})
    resizableBox.style.boxShadow = ""
}

//? active inputs
const activeInputs = () => {
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
    isHover: false
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
        e.target.parentElement.previousElementSibling.innerHTML = ""

        Shadow.isInit = true
        Shadow.elemClass = `.${e.target.value}`
        
        activeInputs()
        uploadShadowDataInDom()
        addStyleToResizable()
    }else {
        Shadow.isInit = false
        e.target.parentElement.previousElementSibling.innerHTML = "please fill out the field below"
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
    if (Shadow.isInit) {
        Shadow.box.noHover.horizental = number
        addStyleToResizable()
    } else 
        horizentalInp.value = horizentalInp.value.slice(0, horizentalInp.value.length - 1)
}

//? add vertical number in shadow data
const addVerticalInShadowData = (number) => {
    if (Shadow.isInit) {
        Shadow.box.noHover.vertical = number
        addStyleToResizable()
    } else 
        horizentalInp.value = horizentalInp.value.slice(0, horizentalInp.value.length - 1)
}

//? add blur number in shadow data 
const addBlurInShadowData = (number) => {
    if (Shadow.isInit) {
        Shadow.box.noHover.blur = number
        addStyleToResizable()
    } else 
        horizentalInp.value = horizentalInp.value.slice(0, horizentalInp.value.length - 1)
}

//? add speard number in shadow data
const addSpeardInShadowData = (number) => {
    if (Shadow.isInit) {
        Shadow.box.noHover.speard = number
        addStyleToResizable()
    } else 
        horizentalInp.value = horizentalInp.value.slice(0, horizentalInp.value.length - 1)
}

//? create pickr
let pickr = createPickr(".color-picker")
pickr.on('change', (color) => {
    let shadowColor = color.toHEXA().toString()
    Shadow.box.noHover.shadowColor = shadowColor
    colorPickerBtn.style.background = shadowColor
    addStyleToResizable()
})

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

//? create activator for vh tool
vhTool.forEach(tool => {
    tool.addEventListener("click" , () => {
        vhTool.forEach(allTool => {
            allTool.classList.value === tool.className ? 
                allTool.classList.add("active") 
            : allTool.classList.remove("active")
        })
    })
})

window.addEventListener("load", disableInputs)
elemClassName.addEventListener("keyup", checkInputs)
horizentalInp.addEventListener("keyup", (e) => addHorizentalInShadowData(e.target.value))
verticalInp.addEventListener("keyup", (e) => addVerticalInShadowData(e.target.value))
blurInp.addEventListener("keyup", (e) => addBlurInShadowData(e.target.value))
speardInp.addEventListener("keyup", (e) => addSpeardInShadowData(e.target.value))