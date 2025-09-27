const response = {
    badRequest: (errorData) => ({
        status: 400,
        code: errorData.code,
        message: errorData.message,
        data: null,
    }),

    success: (data) => ({
        status: 200,
        code: 1,
        message: 'OK!',
        data,
    }),

    unauthorized: (message) => ({
        status: 401,
        code: -1,
        message,
        data: null,
    }),

    serverError: (errorData) => ({
        status: 500,
        code: -1,
        message: errorData.message,
        data: errorData.stack || null,
    }),

    corsError: () => ({
        status: 500,
        code: -1,
        message: 'Cors error!',
        data: null,
    }),
}

module.exports = response
