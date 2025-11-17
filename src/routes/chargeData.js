const express = require('express')
const router = express.Router()

const chargeDataController = require('../controllers/chargeDataController')

router.post('/create', chargeDataController.create)

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
