const { Types } = require('mongoose')
const UserModel = require('../models/user')

const userSeeder = async () => {
    await UserModel.deleteMany({})
    await UserModel.insertMany([
        {
            _id: new Types.ObjectId(),
            password:
                '$2a$10$jNIrHiuO1Rv8GIsbMhacke0kzpc2ZRnlNm7lejO95CQlOokgWMveq',
            phone: '0912345678',
            email: 'testuser1@gmail.com',
            fullName: 'Trần Văn A',
            isActive: true,
        },
        {
            _id: new Types.ObjectId(),
            password:
                '$2a$10$jNIrHiuO1Rv8GIsbMhacke0kzpc2ZRnlNm7lejO95CQlOokgWMveq',
            phone: '0912345678',
            email: 'testuser2@gmail.com',
            fullName: 'Trần Văn B',
            isActive: true,
        },
    ])
    console.log('Users seeded')
}

module.exports = userSeeder
