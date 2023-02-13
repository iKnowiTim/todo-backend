import { PayloadDto } from './dto/userDto'

declare global {
  namespace Express {
    export interface Request {
      user: PayloadDto
    }
  }
}
