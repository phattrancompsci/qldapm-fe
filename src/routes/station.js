const express = require('express')
const router = express.Router()

const stationController = require('../controllers/stationController')
const validate = require('../middlewares/validation')
const stationValidate = require('../validations/stationValidation')
const upload = require('../middlewares/upload')

router.get('/getAll', stationController.getAll)
router.get('/getById/:stationId', stationController.getById)
router.post(
    '/create',
    validate(stationValidate.create),
    upload.single('image'),
    stationController.create,
)
router.post(
    '/update/:stationId',
    validate(stationValidate.update),
    upload.single('image'),
    stationController.update,
)
router.delete('/delete/:stationId', stationController.delete)

module.exports = router

/**
 * @swagger
 * tags:
 *   name: Station
 *   description: Station
 */

/**
 * @swagger
 * /station/getAll:
 *   get:
 *     summary: Lấy toàn bộ trạm
 *     security:
 *       - bearerAuth: []
 *     tags: [Station]
 *     parameters:
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *         description: Page muốn lấy
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *         description: Giới hạn số phần tử trong 1 page
 *     responses:
 *       200:
 *         description: Trả về danh sách các trạm hiện tại trong database
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 code:
 *                   type: integer
 *                   example: 1
 *                 message:
 *                   type: string
 *                   example: OK!
 *                 data:
 *                   type: object
 *                   properties:
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: 68e9e1c367e840b41d0f3396
 *                           name:
 *                             type: string
 *                             example: Trạm sạc AHT
 *                           image:
 *                             type: string
 *                             example: /uploads/1760158953197-415001741.jfif
 *                           address:
 *                             type: object
 *                             properties:
 *                               detail:
 *                                 type: string
 *                                 example: 123
 *                               district:
 *                                 type: string
 *                                 example: AHT
 *                               city:
 *                                 type: string
 *                                 example: HCM
 *                           state:
 *                             type: string
 *                             example: available
 *                           createdAt:
 *                             type: string
 *                             example: 2025-10-11T04:49:07.075Z
 *                           updatedAt:
 *                             type: string
 *                             example: 2025-10-11T05:02:33.228Z
 *                           __v:
 *                             type: integer
 *                             example: 0
 *                     page:
 *                       type: number
 *                       example: 1
 *                     totalItems:
 *                       type: number
 *                       example: 1
 *                     totalPages:
 *                       type: number
 *                       example: 1
 *       401:
 *         description: Chưa đăng nhập
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 401
 *                 code:
 *                   type: integer
 *                   example: -1
 *                 message:
 *                   type: string
 *                   example: Không có token
 *                 data:
 *                   type: string
 *                   example: null
 *       403:
 *         description: Không có quyền truy cập
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 403
 *                 code:
 *                   type: integer
 *                   example: -1
 *                 message:
 *                   type: string
 *                   example: Không có quyền
 *                 data:
 *                   type: string
 *                   example: null
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 code:
 *                   type: integer
 *                   example: -1
 *                 message:
 *                   type: string
 *                   example: Lỗi server!
 *                 data:
 *                   type: string
 *                   example: null
 */

/**
 * @swagger
 * /station/create:
 *   post:
 *     summary: Tạo trạm mới
 *     security:
 *       - bearerAuth: []
 *     tags: [Station]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - city
 *               - district
 *               - detail
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Ảnh trạm sạc (file .jpg hoặc .png)
 *               city:
 *                 type: string
 *                 example: HCM
 *               district:
 *                 type: string
 *                 example: AHT
 *               detail:
 *                 type: string
 *                 example: 123, PHI
 *     responses:
 *       200:
 *         description: Tạo trạm thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 code:
 *                   type: integer
 *                   example: 1
 *                 message:
 *                   type: string
 *                   example: OK!
 *                 data:
 *                   type: object
 *                   example: null
 *       400:
 *         description: Lỗi input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 code:
 *                   type: integer
 *                   example: -1
 *                 message:
 *                   type: string
 *                   example: Tên trạm là bắt buộc!
 *                 data:
 *                   type: string
 *                   example: null
 *       401:
 *         description: Chưa đăng nhập
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 401
 *                 code:
 *                   type: integer
 *                   example: -1
 *                 message:
 *                   type: string
 *                   example: Không có token
 *                 data:
 *                   type: string
 *                   example: null
 *       403:
 *         description: Không có quyền truy cập
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 403
 *                 code:
 *                   type: integer
 *                   example: -1
 *                 message:
 *                   type: string
 *                   example: Không có quyền
 *                 data:
 *                   type: string
 *                   example: null
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 code:
 *                   type: integer
 *                   example: -1
 *                 message:
 *                   type: string
 *                   example: Lỗi server!
 *                 data:
 *                   type: string
 *                   example: null
 */

/**
 * @swagger
 * /station/getById/{stationId}:
 *   get:
 *     summary: Lấy thông tin 1 trạm
 *     security:
 *       - bearerAuth: []
 *     tags: [Station]
 *     parameters:
 *       - in: path
 *         name: stationId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của trạm cần lấy thông tin
 *     responses:
 *       200:
 *         description: Lấy thông tin trạm thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 code:
 *                   type: integer
 *                   example: 1
 *                 message:
 *                   type: string
 *                   example: OK!
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 68e9e1c367e840b41d0f3396
 *                     name:
 *                       type: string
 *                       example: Trạm sạc AHT
 *                     image:
 *                       type: string
 *                       example: /uploads/1760158953197-415001741.jfif
 *                     address:
 *                       type: object
 *                       properties:
 *                         detail:
 *                           type: string
 *                           example: 123
 *                         district:
 *                           type: string
 *                           example: AHT
 *                         city:
 *                           type: string
 *                           example: HCM
 *                     state:
 *                       type: string
 *                       example: available
 *                     createdAt:
 *                       type: string
 *                       example: 2025-10-11T04:49:07.075Z
 *                     updatedAt:
 *                       type: string
 *                       example: 2025-10-11T05:02:33.228Z
 *                     __v:
 *                       type: integer
 *                       example: 0
 *       401:
 *         description: Chưa đăng nhập
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 401
 *                 code:
 *                   type: integer
 *                   example: -1
 *                 message:
 *                   type: string
 *                   example: Không có token
 *                 data:
 *                   type: string
 *                   example: null
 *       403:
 *         description: Không có quyền truy cập
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 403
 *                 code:
 *                   type: integer
 *                   example: -1
 *                 message:
 *                   type: string
 *                   example: Không có quyền
 *                 data:
 *                   type: string
 *                   example: null
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Lỗi server!
 *                 data:
 *                   type: string
 *                   example: null
 */

/**
 * @swagger
 * /station/update/{stationId}:
 *   post:
 *     summary: Cập nhật thông tin trạm hàng
 *     security:
 *       - bearerAuth: []
 *     tags: [Station]
 *     parameters:
 *     - name: stationId
 *       in: path
 *       required: true
 *       schema:
 *         type: string
 *       description: Id của trạm
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - city
 *               - district
 *               - detail
 *               - state
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Ảnh mới của trạm (tùy chọn)
 *               city:
 *                 type:
 *                 example: HCM
 *               district:
 *                 type: string
 *                 example: AHT
 *               detail:
 *                 type: string
 *                 example: 123/PHI
 *               state:
 *                 type: string
 *                 example: available
 *                 enum: ['available', 'occupied', 'maintain']
 *     responses:
 *       200:
 *         description: Cập nhật kho hàng thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 code:
 *                   type: integer
 *                   example: 1
 *                 message:
 *                   type: string
 *                   example: OK!
 *                 data:
 *                   type: object
 *                   example: null
 *       400:
 *         description: Lỗi input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 code:
 *                   type: integer
 *                   example: -1
 *                 message:
 *                   type: string
 *                   example: Tên kho là bắt buộc!
 *                 data:
 *                   type: string
 *                   example: null
 *       401:
 *         description: Chưa đăng nhập
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 401
 *                 code:
 *                   type: integer
 *                   example: -1
 *                 message:
 *                   type: string
 *                   example: Không có token
 *                 data:
 *                   type: string
 *                   example: null
 *       403:
 *         description: Không có quyền truy cập
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 403
 *                 code:
 *                   type: integer
 *                   example: -1
 *                 message:
 *                   type: string
 *                   example: Không có quyền
 *                 data:
 *                   type: string
 *                   example: null
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 code:
 *                   type: integer
 *                   example: -1
 *                 message:
 *                   type: string
 *                   example: Lỗi server!
 *                 data:
 *                   type: string
 *                   example: null
 */

/**
 * @swagger
 * /station/delete/{stationId}:
 *   delete:
 *     summary: Xóa trạm
 *     tags: [Station]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: stationId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của trạm sạc cần xóa
 *     responses:
 *       200:
 *         description: Xoá trạm sạc thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 code:
 *                   type: integer
 *                   example: 1
 *                 message:
 *                   type: string
 *                   example: OK!
 *                 data:
 *                   type: object
 *                   example: null
 *       400:
 *         description: Lỗi input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 code:
 *                   type: integer
 *                   example: -1
 *                 message:
 *                   type: string
 *                   example: Kho không tồn tại!
 *                 data:
 *                   type: string
 *                   example: null
 *       401:
 *         description: Chưa đăng nhập
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 401
 *                 code:
 *                   type: integer
 *                   example: -1
 *                 message:
 *                   type: string
 *                   example: Không có token
 *                 data:
 *                   type: string
 *                   example: null
 *       403:
 *         description: Không có quyền truy cập
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 403
 *                 code:
 *                   type: integer
 *                   example: -1
 *                 message:
 *                   type: string
 *                   example: Không có quyền
 *                 data:
 *                   type: string
 *                   example: null
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 code:
 *                   type: integer
 *                   example: -1
 *                 message:
 *                   type: string
 *                   example: Lỗi server!
 *                 data:
 *                   type: string
 *                   example: null
 */
