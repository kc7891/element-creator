function elementCreator(parent, { type, params = {}, children = [] }) {
    const element = document.createElement(type)

    // apply params
    for ([key, value] of Object.entries(params)) {
        if (value !== undefined) element[key] = value
    }

    parent.appendChild(element)

    // create children
    children.forEach((child) => {
        child && elementCreator(element, child)
    })
}

class TodoApp {
    static FILTER = {
        ALL: 'ALL',
        NOT_YET: 'NOT_YET',
        DONE: 'DONE'
    }

    rootElement
    state = {
        filterType: TodoApp.FILTER.ALL,
        todos: [{
            title: 'aaa',
            isDone: true
        }, {
            title: 'bbb',
            isDone: false
        }],

    }
    constructor(rootSelector) {
        this.rootElement = document.querySelector(rootSelector)
        this.render()
    }
    setState = (newState) => {
        this.state = {
            ...this.state,
            ...newState
        }
        this.render()
    }
    render = () => {
        this.rootElement.innerText = ''

        const filter = this.createSelector()
        const addButton = this.createAddButton()
        const todoList = this.createTodoList()
        elementCreator(this.rootElement, {
            type: 'div',
            children: [
                filter,
                addButton,
                todoList
            ]
        })
    }
    createAddButton = () => {
        const { todos } = this.state

        const onAddClick = () => {
            todos.push({ title: '', isDone: false })
            this.setState({
                todos
            })
        }

        return {
            type: 'button',
            params: {
                innerText: '+',
                onclick: onAddClick
            }
        }
    }
    createTodoList = () => {
        const { todos, filterType } = this.state

        const onCheckBoxChanged = (e) => {
            const target = e.currentTarget
            const newTodos = this.state.todos
            newTodos[target.parentElement.id].isDone = target.checked
            this.setState({
                todos: newTodos
            })
        }

        const onTitleChanged = (e) => {
            const target = e.currentTarget
            const newTodos = this.state.todos
            newTodos[target.parentElement.id].title = target.value
            this.setState({
                todos: newTodos
            })
        }

        return {
            type: 'ul',
            children: todos.map(({ title, isDone }, index) => {
                if (filterType === TodoApp.FILTER.ALL
                    || (filterType === TodoApp.FILTER.DONE && isDone)
                    || (filterType === TodoApp.FILTER.NOT_YET && !isDone)) {
                    return {
                        type: 'li',
                        params: {
                            id: index
                        },
                        children: [
                            {
                                type: 'input',
                                params: {
                                    type: 'checkbox',
                                    checked: isDone ? 'checked' : undefined,
                                    onchange: onCheckBoxChanged
                                }
                            },
                            {
                                type: 'input',
                                params: {
                                    type: 'text',
                                    value: title,
                                    onblur: onTitleChanged
                                }
                            }
                        ]
                    }
                } else {
                    return undefined
                }
            })
        }
    }
    createSelector = () => {
        return {
            type: 'select',
            params: {
                onchange: (e) => {
                    this.setState({ filterType: e.currentTarget.value })
                }
            },
            children: Object.keys(TodoApp.FILTER).map((key) => {
                return {
                    type: 'option',
                    params: {
                        innerText: key,
                        value: key,
                        selected: key === this.state.filterType ? 'selected' : undefined
                    }
                }
            })
        }
    }
}

window.onload = () => {
    new TodoApp('#root')
}