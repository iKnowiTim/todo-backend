import Joi from 'joi'

export const createBoardSchema = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  description: Joi.string().max(100).optional().default(''),
}).min(1)

export const updateBoardSchema = Joi.object({
  title: Joi.string().min(3).max(30).optional(),
  description: Joi.string().max(100).optional(),
})

export const idSchema = Joi.number().min(1).required()
