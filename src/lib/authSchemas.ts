import { z } from 'zod'

// Base password schema with minimum length requirement
const passwordSchema = z
  .string()
  .min(6, 'Password must be at least 6 characters')

// Email schema
const emailSchema = z
  .string()
  .email('Please enter a valid email address')

// Login schema 
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
  accessPassword: z.string().min(1, 'Access password is required'),
})

// Signup schema
export const signupSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    accessPassword: z.string().min(1, 'Access password is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'], // This will attach the error to confirmPassword field
  })

export type LoginFormData = z.infer<typeof loginSchema>
export type SignupFormData = z.infer<typeof signupSchema>

