const errorCode = {
    USERNAME_EXISTED: {
        code: 0,
        message: 'username đã tồn tại',
    },
    USERNAME_NOT_FOUNDED: {
        code: 1,
        message: 'username không đúng',
    },
    WRONG_PASSWORD: {
        code: 2,
        message: 'password không đúng',
    },
    USER_NOT_FOUND: {
        code: 3,
        message: 'user không tồn tại',
    },
    PHONE_EXISTED: {
        code: 4,
        message: 'số điện thoại đã được đăng ký bởi người dùng khác',
    },
    EMAIL_EXISTED: {
        code: 5,
        message: 'email đã được đăng ký bởi người dùng khác',
    },
}
module.exports = errorCode
