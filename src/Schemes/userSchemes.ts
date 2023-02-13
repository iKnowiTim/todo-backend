import Joi from 'joi'

export const signUpScheme = Joi.object({
  login: Joi.string().min(5).max(15).required().trim().alphanum(),
  password: Joi.string().min(5).max(20).required().trim().alphanum(),
  username: Joi.string().min(3).max(20).required().trim().alphanum(),
})

export const loginScheme = Joi.object({
  login: Joi.string().min(5).max(15).required().trim().alphanum(),
  password: Joi.string().min(5).max(20).required().trim().alphanum(),
})
