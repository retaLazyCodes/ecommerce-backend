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

export const sendMail = async (userEmail, subject, html, orden) => {
  const mailOptions = {
    from: 'Servidor Node.js',
    to: userEmail,
    subject,
    html: html === 'orden'
      ? `<h2 style="color:teal">Tu orden fue aceptada!</h2><p> <h3>Orden:</h3><br/> ${orden}</p>`
      : '<h2 style="color:teal">Registro existoso!</h2>'
  }

  return await transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      logger.error(`Email info error: ${JSON.stringify(info)}`)
    } else {
      logger.info(`Email info: ${JSON.stringify(info)}`)
    }
  })
}
