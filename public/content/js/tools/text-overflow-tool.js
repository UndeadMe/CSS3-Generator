//? get elements
const elemClassNameInp = document.querySelector(".element-class-name-input")
const cssCodeBtn = document.querySelector(".css-code-btn")
const generateWrapBox = document.querySelector(".generate-wrap-box")
const text = document.querySelector(".text")
const overflowBox = document.querySelector(".overflow-box")
const arrowRight = document.querySelector(".arrow-align-right")
const arrowLeft = document.querySelector(".arrow-align-left")
const overflowMenuItems = document.querySelectorAll(".overflow-menu-item-box")
const codePennel = document.querySelector(".code-pannel")
const styleInp = document.querySelector("#styleInp")
const copyToClipboard = document.querySelector(".clipboard-btn")
const cssCodeCloseBtn = document.querySelector(".close-generate-pannel-btn")

//? Overflow obj
let Overflow = {
    elemClass: null,
    isInit: false,
    overflow: "center",
    direction: "ltr"
}

const checkElemClassNameInput = (e) => {
    let regexCode = /^[a-zA-Z" "]{1,30}$/g
    let regexResult = regexCode.test(e.target.value)

    if (regexResult) {
        Overflow.isInit = true
        Overflow.elemClass = e.target.value.split(" ").join("-")
        e.target.parentElement.previousElementSibling.innerHTML = ""
    } else {
        Overflow.isInit = false
        e.target.parentElement.previousElementSibling.innerHTML = "Please complete the field below. You are allowed to enter up to 30 letters"
    }
}

//? add style to color box
const addStyleToText = () => {
    if (Overflow.overflow !== "without style") {
        text.style.overflow = "hidden"
        text.style.whiteSpace = "nowrap"
        text.style.textOverflow = `${Overflow.overflow}`
    } else {
        text.style.overflow = ""
        text.style.whiteSpace = ""
        text.style.textOverflow = ""
    }
}

//? open generate pannel
const openGeneratePannel = () => {
    if (Overflow.isInit) {
        generateWrapBox.classList.add('active')
        StyleText = `.${Overflow.elemClass} { direction: ${Overflow.direction}; text-overflow: ${Overflow.overflow}; }`
        codePennel.innerHTML = `.${Overflow.elemClass} { <br>
            &nbsp;&nbsp;&nbsp; direction: ${Overflow.direction}; <br>
            &nbsp;&nbsp;&nbsp; text-overflow: ${Overflow.overflow}; <br>
        }`
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


//? init arrow
const initArrow = (right = true) => {
    if (right) {
        Overflow.direction = "rtl"
        arrowRight.innerHTML = '<i class="bi bi-arrow-right-square-fill"></i>'
        arrowLeft.innerHTML = '<i class="bi bi-arrow-left-square"></i>'
        text.style.direction = "rtl"
    } else {
        Overflow.direction = "ltr"
        arrowLeft.innerHTML = '<i class="bi bi-arrow-left-square-fill"></i>'
        arrowRight.innerHTML = '<i class="bi bi-arrow-right-square"></i>'
        text.style.direction = "ltr"
    }
}

//? check init
const checkInit = () => {
    return Overflow.isInit ? true : false
}

//? active align box
const activeOverflowBox = () => 
   overflowBox.classList.contains("active") ?overflowBox.classList.remove("active") :overflowBox.classList.add("active")


elemClassNameInp.addEventListener("keyup", checkElemClassNameInput)
elemClassNameInp.addEventListener("focus", () => overflowBox.classList.remove("active"))
cssCodeBtn.addEventListener("click", openGeneratePannel)
overflowBox.addEventListener("click", () => checkInit() ? activeOverflowBox() : alert("please complete the fields correctly"))
arrowRight.addEventListener("click",() => checkInit() ? initArrow() : alert("please complete the fields correctly"))
arrowLeft.addEventListener("click", () => checkInit() ? initArrow(false) : alert("please complete the fields correctly"))
cssCodeCloseBtn.addEventListener("click", closeGeneratePannel)
copyToClipboard.addEventListener("click", copyToClipboardText)

overflowMenuItems.forEach(menuItem => {
    menuItem.addEventListener("click", () => {
        overflowMenuItems.forEach(allMenuItems => {
            if (allMenuItems.innerText === menuItem.innerText) {
                allMenuItems.classList.add('active')
                overflowBox.children[0].innerText = allMenuItems.innerText
                Overflow.overflow = allMenuItems.innerText.toLowerCase()
                addStyleToText()
            } else
                allMenuItems.classList.remove("active")
        })
    })
})