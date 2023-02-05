import Joi from 'joi'

export const createListSchema = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  description: Joi.string().max(100).optional().default(''),
})

export const updateListSchema = Joi.object({
  title: Joi.string().min(3).max(30).optional(),
  description: Joi.string().max(100).optional(),
})
