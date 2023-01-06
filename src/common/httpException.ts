export class HttpException extends Error {
  constructor(status: number, message: string, details?: any) {
    super(message)
    this.status = status
    this.message = message
    this.details = details
  }

  public status: number
  public message: string
  public details?: any
}
