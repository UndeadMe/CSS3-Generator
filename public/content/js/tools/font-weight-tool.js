//? get elements
const elemClassNameInp = document.querySelector(".element-class-name-input")
const cssCodeBtn = document.querySelector(".css-code-btn")
const generateWrapBox = document.querySelector(".generate-wrap-box")
const text = document.querySelector(".text")
const weightBox = document.querySelector(".weight-box")
const weightMenuItems = document.querySelectorAll(".weight-menu-item-box")
const codePennel = document.querySelector(".code-pannel")
const styleInp = document.querySelector("#styleInp")
const copyToClipboard = document.querySelector(".clipboard-btn")
const cssCodeCloseBtn = document.querySelector(".close-generate-pannel-btn")

//? Align object
let Weight = {
    elemClass: null,
    isInit: false,
    weight: "normal",
}

const checkElemClassNameInput = (e) => {
    let regexCode = /^[a-zA-Z" "]{1,30}$/g
    let regexResult = regexCode.test(e.target.value)

    if (regexResult) {
        Weight.isInit = true
        Weight.elemClass = e.target.value.split(" ").join("-")
        e.target.parentElement.previousElementSibling.innerHTML = ""

        addStyleToText()
    } else {
        Weight.isInit = false
        e.target.parentElement.previousElementSibling.innerHTML = "Please complete the field below. You are allowed to enter up to 30 letters"
    }
}

//? add style to color box
const addStyleToText = () => 
    text.style.fontWeight = `${Weight.weight}`

let StyleText = undefined
//? open generate pannel
const openGeneratePannel = () => {
    if (Weight.isInit) {
        generateWrapBox.classList.add('active')
        StyleText = `.${Weight.elemClass} { font-weight: ${Weight.weight}; }`
        codePennel.innerHTML = `.${Weight.elemClass} { <br>
            &nbsp;&nbsp;&nbsp; font-weight: ${Weight.weight}; <br>
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

//? check init
const checkInit = () => {
    return Weight.isInit ? true : false
}

//? active align box
const activeAlignBox = () => 
    weightBox.classList.contains("active") ? weightBox.classList.remove("active") : weightBox.classList.add("active")


elemClassNameInp.addEventListener("keyup", checkElemClassNameInput)
elemClassNameInp.addEventListener("focus", () => weightBox.classList.remove("active"))
cssCodeBtn.addEventListener("click", openGeneratePannel)
weightBox.addEventListener("click", () => checkInit() ? activeAlignBox() : alert("please complete the fields correctly"))
cssCodeCloseBtn.addEventListener("click", closeGeneratePannel)
copyToClipboard.addEventListener("click", copyToClipboardText)

weightMenuItems.forEach(menuItem => {
    menuItem.addEventListener("click", () => {
        weightMenuItems.forEach(allMenuItems => {
            if (allMenuItems.innerText === menuItem.innerText) {
                allMenuItems.classList.add('active')
                weightBox.children[0].innerText = allMenuItems.innerText
                Weight.weight = allMenuItems.innerText.toLowerCase()
                addStyleToText()
            } else
                allMenuItems.classList.remove("active")
        })
    })
})