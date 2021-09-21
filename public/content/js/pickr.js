export const createPickr = (element, color) => {
    const pickr = Pickr.create({
        el: element,
        theme: 'classic',
        useAsButton : true ,
        default : `${color}`,
        components: {
            preview: true,
            opacity: true,
            hue: true,
    
            interaction: {
                hex: true,
                rgba: true,
                input: true,
            }
        }
    })
    return pickr
}