export const createPickr = (element) => {
    const pickr = Pickr.create({
        el: element,
        theme: 'classic',
        useAsButton : true ,
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