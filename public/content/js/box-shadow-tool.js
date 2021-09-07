import { createPickr } from "./pickr.js";

//? create pickr
let pickr = createPickr(".color-picker")
pickr.on('change', (color) => {
    const colorPickerBtn = document.querySelector(".color-picker")
    const resizableBox = document.querySelector(".resizable")
    
    colorPickerBtn.style.background = color.toHEXA().toString()
    resizableBox.style.background = color.toHEXA().toString()
})

// ? --------------------- make resizable for resizable bo -------------------- ? //
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

// ? ------------------------- make component dropdown ------------------------ ? //
const componentSelectorBox = document.querySelector(".component-selector-box")
componentSelectorBox.addEventListener("click", () => {
    //? add active class to component selector box
    componentSelectorBox.classList.toggle("active")
    //? get all component selector dropdown item
    const componentDropItem = document.querySelectorAll(".component-selector-dropdown-item")

    //? create activator for dropdown item
    componentDropItem.forEach(item => {
        item.addEventListener("click" , (e) => {
            componentDropItem.forEach(allItem => {
                allItem.innerText.trim() === item.innerText.trim() ? 
                    allItem.classList.add("active") : allItem.classList.remove("active")
            })
        })
    })    
})