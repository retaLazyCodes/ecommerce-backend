import nodemailer from 'nodemailer'
import { config } from './index.js'
import { logger } from './logger.js'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: config.NODEMAILER_EMAIL,
    pass: config.NODEMAILER_PASSWORD
  }
})

export const sendMail = async (userEmail, subject, html, customText) => {
  const mailOptions = {
    from: 'Servidor Node.js',
    to: userEmail,
    subject,
    html: html === 'orden'
      ? `<h2 style="color:teal">Tu orden fue aceptada!</h2><p> <h3>Orden:</h3><br/> ${customText}</p>`
      : `<h2 style="color:teal">Registro existoso!</h2><br><h3>Bienvenido ${customText}</h3>`
  }

  return await transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      logger.error(`Email info error: ${JSON.stringify(info)}`)
    } else {
      logger.info(`Email info: ${JSON.stringify(info)}`)
    }
  })
}
