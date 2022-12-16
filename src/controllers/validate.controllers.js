
const validateSignup = async (req, res, next) => {
  const { name, email, phone, password } =
    req.body
  console.log(req.body)

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
      console.log('Validacion OK')
      next()
  }
}

const validatePhone = (phoneNumber) => {
  if (typeof phoneNumber !== 'string') return false
  return !isNaN(phoneNumber) &&
    !isNaN(parseFloat(phoneNumber))
}

const validateEmail = (email) => {
  const emailRGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const emailResult = emailRGEX.test(email)
  return emailResult
}

// Acepta acentos, apóstrofes, pero no números ni caracteres especiales
const validateName = (name) => {
  // let name = "Robert's Dajoú's Yaça ñata Shön";
  const nameRGX = /^[a-záàâãéèêíïóôõöúçñ' ]+$/i
  const nameResult = nameRGX.test(name)
  return nameResult
}

export { validateSignup }
