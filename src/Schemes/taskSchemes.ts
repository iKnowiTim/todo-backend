import Joi from 'joi'

export const createTaskSchema = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  description: Joi.string().max(100).optional().default(''),
})

export const updateTaskSchema = Joi.object({
  title: Joi.string().min(3).max(30).optional(),
  description: Joi.string().max(100).optional(),
})
