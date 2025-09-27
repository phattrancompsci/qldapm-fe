class BadReq extends Error {
    constructor(error, stack = '') {
        super(error.message)
        this.code = error.code
        this.status = 400
        stack
            ? (this.stack = stack)
            : Error.captureStackTrace(this, this.constructor)
    }
}
module.exports = BadReq
