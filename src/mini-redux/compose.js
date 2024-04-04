const composeReducer = (composed, func) => (...args) => composed(func(...args))
const compose = (...funcs) => funcs.length === 1 ? funcs[0] : funcs.reduce(composeReducer)

const curry = (fn, ...args) => args.length >= fn.length ? fn(...args) : (...args2) => curry(fn, ...args, ...args2)

export default compose