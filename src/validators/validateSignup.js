
const validateSignup = async (req, res, next) => {
  const { name, email, phone, password } =
    req.body

  switch (true) {
    case !validateName(name):
      return res.status(400).json({ message: 'Campo de nombre invalido.' })
    case !validatePhone(phone):
      return res.status(400).send({ message: 'Campo de telefono invalido.' })
    case !validateEmail(email):
      return res.status(400).send({ message: 'Email invalido.' })
    case password.length < 6:
      return res.status(400).send({
        message: 'La contraseña debe tener por lo menos 6 caracteres'
      })
    default:
      next()
  }
}

const validatePhone = (phoneNumber) => {
  const phoneRGX = /^\+[1-9]{1}[0-9]{3,14}$/
  const phoneResult = phoneRGX.test(phoneNumber)
  return phoneResult
}

const validateEmail = (email) => {
  const emailRGX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const emailResult = emailRGX.test(email)
  return emailResult
}

// Acepta acentos, apóstrofes, pero no números ni caracteres especiales
const validateName = (name) => {
  const nameRGX = /^[a-záàâãéèêíïóôõöúçñ' ]+$/i
  const nameResult = nameRGX.test(name)
  return nameResult
}

export { validateSignup }
