export interface SignUpDto {
  login: string
  password: string
  username: string
}

export interface LoginDto {
  login: string
  password: string
}

export interface PayloadDto {
  id: number
  username: string
}

export interface UserDto {
  id: number
  username: string
  login: string
  createdAt: Date
  updatedAt: Date
}

export interface TokenDto {
  token: string
}
