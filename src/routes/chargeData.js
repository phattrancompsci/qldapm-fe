const express = require('express')
const router = express.Router()

const chargeDataController = require('../controllers/chargeDataController')

router.post('/create', chargeDataController.create)
router.get('/getByYear/:year', chargeDataController.getByYear)
router.get('/getAll', chargeDataController.getAll)

module.exports = router

/**
 * @swagger
 * tags:
 *   name: ChargeData
 *   description: Dữ liệu sạc
 */

/**
 * @swagger
 * /chargeData/create:
 *   post:
 *     summary: Tạo dữ liệu sạc
 *     security:
 *       - bearerAuth: []
 *     tags: [ChargeData]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customerId
 *               - stationId
 *               - postId
 *               - carType
 *               - startTime
 *               - chargeTime
 *               - electricalConsumption
 *             properties:
 *               customerId:
 *                 type: string
 *                 example: id của khách hàng
 *               stationId:
 *                 type: string
 *                 example: id của trạm sạc
 *               postId:
 *                 type: string
 *                 example: id của trụ sạc
 *               carType:
 *                 type: string
 *                 enum:
 *                   - VinFast
 *                   - BYD
 *                   - MG
 *                   - Wuling
 *                   - Huyndai
 *                 example: VinFast
 *               startTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-11-17T14:30:00Z"
 *               chargeTime:
 *                 type: number
 *                 example: 120
 *               electricalConsumption:
 *                 type: number
 *                 example: 240
 *     responses:
 *       200:
 *         description: Tạo trụ thành công
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
 * /chargeData/getByYear/{year}:
 *   get:
 *     summary: Lấy toàn bộ dữ liệu trong năm
 *     security:
 *       - bearerAuth: []
 *     tags: [ChargeData]
 *     parameters:
 *       - in: path
 *         name: year
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Trả về thống kê theo tháng trong năm
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
 *                     1:
 *                       type: object
 *                       example: {}
 *                     2:
 *                       type: object
 *                       example: {}
 *                     3:
 *                       type: object
 *                       example: {}
 *                     4:
 *                       type: object
 *                       example: {}
 *                     5:
 *                       type: object
 *                       example: {}
 *                     6:
 *                       type: object
 *                       example: {}
 *                     7:
 *                       type: object
 *                       example: {}
 *                     8:
 *                       type: object
 *                       example: {}
 *                     9:
 *                       type: object
 *                       properties:
 *                         revenue:
 *                           type: number
 *                           example: 1824000
 *                         quantity:
 *                           type: number
 *                           example: 1
 *                         electric:
 *                           type: number
 *                           example: 240
 *                     10:
 *                       type: object
 *                       properties:
 *                         revenue:
 *                           type: number
 *                           example: 3040000
 *                         quantity:
 *                           type: number
 *                           example: 2
 *                         electric:
 *                           type: number
 *                           example: 400
 *                     11:
 *                       type: object
 *                       properties:
 *                         revenue:
 *                           type: number
 *                           example: 1824000
 *                         quantity:
 *                           type: number
 *                           example: 1
 *                         electric:
 *                           type: number
 *                           example: 240
 *                     12:
 *                       type: object
 *                       example: {}
 *                     year:
 *                       type: string
 *                       example: "2025"
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
 * /chargeData/getAll:
 *   get:
 *     summary: Lấy toàn bộ dữ liệu trạm sạc
 *     security:
 *       - bearerAuth: []
 *     tags: [ChargeData]
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
 *         description: Trả về danh sách các dữ liệu hiện tại trong database
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
 *                     result:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: 691ad5b73bb63afb03fff9c4
 *                           vehicleType:
 *                             type: string
 *                             example: VinFast
 *                           timeStart:
 *                             type: string
 *                             example: 2025-11-17T14:30:00.000Z
 *                           duration:
 *                             type: number
 *                             example: 120
 *                           electric:
 *                             type: number
 *                             example: 240
 *                           station:
 *                             type: string
 *                             example: Trạm sạc AHT
 *                           charger:
 *                             type: string
 *                             example: test_1
 *                     page:
 *                       type: number
 *                       example: 1
 *                     totalItems:
 *                       type: number
 *                       example: 4
 *                     totalPages:
 *                       type: number
 *                       example: 2
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

