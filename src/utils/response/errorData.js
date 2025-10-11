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
        message: 'Password không đúng',
    },
    USER_NOT_FOUND: {
        code: 3,
        message: 'user không tồn tại',
    },
    PHONE_EXISTED: {
        code: 4,
        message: 'Số điện thoại đã được đăng ký bởi người dùng khác',
    },
    EMAIL_EXISTED: {
        code: 5,
        message: 'Email đã được đăng ký bởi người dùng khác',
    },
    EMAIL_NOT_FOUND: {
        code: 6,
        message: 'Email không tồn tại',
    },
    PASSWORD_DO_NOT_MATCH: {
        code: 7,
        message: 'Mật khẩu nhập lại không khớp',
    },
    STATION_NOT_FOUND: {
        code: 8,
        message: 'Trạm sạc không tồn tại',
    },
    NAME_STATION_EXISTED: {
        code: 9,
        message: 'Tên của trạm đã được sử dụng',
    },
    ADDRESS_STATION_EXISTED: {
        code: 10,
        message: 'Địa chỉ của trạm đã được sử dụng',
    },
}
module.exports = errorCode
