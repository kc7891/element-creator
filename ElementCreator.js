class ElementCreator {
    createElement = (parent, { type, options = {}, children = [] }) => {
        const element = document.createElement(type)
        for (const [key, value] of Object.entries(options)) {
            element[key] = value
        }
        parent.appendChild(element)

        children.forEach((child) => {
            this.createElement(element, child)
        })
    }
}