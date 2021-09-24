
// ? make resizable for resizable box
export const makeResizableElem = elem => {
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