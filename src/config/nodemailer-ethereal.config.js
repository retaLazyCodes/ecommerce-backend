import nodemailer from 'nodemailer'
import { config } from './index.js'
import { logger } from '../config/logger.js'

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: config.NODEMAILER_EMAIL,
    pass: config.NODEMAILER_PASSWORD
  }
})

const TEST_EMAIL = 'gus63@ethereal.email'

export const sendMail = async (subject, html) => {
  const mailOptions = {
    from: 'Servidor Node.js',
    to: TEST_EMAIL,
    subject,
    html
  }

  return await transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      logger.warn(`Email info error: ${JSON.stringify(info)}`)
    } else {
      // console.log('info', info)
      logger.info(`Email info: ${JSON.stringify(info)}`)
    }
  })
}
