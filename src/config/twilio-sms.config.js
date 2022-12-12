import twilio from 'twilio'
import { config } from './index.js'
import { logger } from '../config/logger.js'

const accountSid = config.TWILIO_ACCOUNT_SID
const authToken = config.TWILIO_AUTH_TOKEN

const client = twilio(accountSid, authToken)

export const sendSMS = async (mensaje, numero) => {
  try {
    const rta = await client.messages.create({
      body: mensaje,
      from: config.TWILIO_TEL_NUMBER,
      to: numero
    })
    logger.info(`SMS info: ${JSON.stringify(rta)}`)
    return rta
  } catch (error) {
    logger.error(`SMS info: ${JSON.stringify(error)}`)
    return error
  }
}
