class CustomError {
  constructor (status, description, details) {
    this.status = status
    this.description = description
    this.details = details
  }
}

export default CustomError
