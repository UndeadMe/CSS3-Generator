const previewBorder = document.querySelector(".preview-border")
const previewImgBox = document.querySelector(".preview-image-box")
const wrap = document.querySelector(".image-preview")

previewBorder.addEventListener("mousedown", () => {
    window.addEventListener("mousemove", changeWidth)
    window.addEventListener("mouseup", deleteMouseDownEvent)
})

const changeWidth = (e) => {
    // previewImgBox.style.width = `${((e.clientX - wrap.getBoundingClientRect().left) / 10).toFixed(0)}%`
    previewImgBox.style.width = `${((e.clientX - wrap.getBoundingClientRect().left)).toFixed(0)}px`
    let Width = Number(previewImgBox.style.width.substr(0 , previewImgBox.style.width.length - 2))

    if (Width >= 810)
        previewImgBox.style.width = "810px"
    else if (Width <= 3)
        previewImgBox.style.width = "3px"
}

const deleteMouseDownEvent = () => {
    window.removeEventListener("mousemove", changeWidth)
}