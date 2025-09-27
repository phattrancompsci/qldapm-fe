const pick = (inputObject, keys) => {
    return keys.reduce((outputObject, key) => {
        if (
            inputObject &&
            Object.prototype.hasOwnProperty.call(inputObject, key)
        ) {
            outputObject[key] = inputObject[key]
        }
        return outputObject
    }, {})
}

module.exports = pick
