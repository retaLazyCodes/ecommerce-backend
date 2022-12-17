import { Order } from '../models/order.model.js'
import { logger } from '../config/logger.js'
import { sendMail } from '../config/nodemailer.config.js'

class OrderController {
  getOrder = async (req, res) => {
    const userId = req.user._id
    try {
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`)
      const orders = await Order.find({ userId }).lean()
      if (orders.length > 0) {
        res.status(200).json({ Ordenes: orders, success: true })
      } else {
        res.json({ message: 'Sin ordenes', success: true })
      }
    } catch (error) {
      logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`)
      res.json({ message: 'No se pudo buscar orden', success: false })
    }
  }

  getOrderById = async (req, res) => {
    const { orderId } = req.params
    try {
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`)
      const order = await Order.find({ _id: orderId }).lean()
      if (order.length > 0) {
        res.status(200).json({ Orden: order, success: true })
      } else {
        res.status(404).json({ message: 'No se encontró la orden', success: true })
      }
    } catch (error) {
      logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`)
      res.json({ message: 'No se pudo buscar la orden', success: false })
    }
  }

  completeOrder = async (req, res) => {
    const userEMail = req.user.email
    const { orderId } = req.params
    try {
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`)
      const order = await Order.find({ _id: orderId }).lean()
      console.log(order)
      if (order?.length > 0 && order[0].status === 'Generated') {
        await Order.updateOne(
          { _id: orderId },
          { $set: { status: 'Completed' } }
        ).lean()
        const currentOrder = await Order.find({ _id: orderId }).lean()
        await sendMail(userEMail, 'Orden Completada', 'orden_completada', JSON.stringify(currentOrder))
        res.status(200).json({ message: 'Orden completada', success: true })
      } else if (order?.length === 0) {
        res.status(404).json({ message: 'No se encontró la orden', success: false })
      } else {
        res.status(400).json({ message: 'Sin ordenes generadas', success: false })
      }
    } catch (error) {
      logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`)
      res.status(400).json({ message: 'No se pudo completar la orden', success: false })
    }
  }
}

export default new OrderController()
