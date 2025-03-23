import { z } from "zod";

export const registrationSchema = z.object({
    name: z.string().min(2, {
      message: "Name must be at least 4 characters.",
    }),
    email: z.string().min(4,{
      message: "Provide a valid email address",
    }), 
    password: z.string()
    .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
    .regex(new RegExp(".*[a-z].*"), "One lowercase character")
    .regex(new RegExp(".*\\d.*"), "One number")
    .regex(
      new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
      "One special character"
    )
    .min(6, "Must be at least 6 characters in length"), 
    confirmPassword: z.string()
    .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
    .regex(new RegExp(".*[a-z].*"), "One lowercase character")
    .regex(new RegExp(".*\\d.*"), "One number")
    .regex(
      new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
      "One special character"
    )
    .min(8, "Must be at least 8 characters in length").optional(),
    code: z.string({
        message: "Refer Code must be at least 4 characters.",
      }).optional(),
    acceptCondition: z.boolean({
        message: "Must be accepted our terms and conditions",
    }),
    currency: z.object({
      value: z.string().min(1, "Country is required"),
    }),
}).superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      })
    }
  })

export const loginSchema = z.object({
    email: z.string({
      message: "Provide a valid email address",
    }).email(),
    password: z.string()
    .min(6, "Must be at least 6 characters in length")
})

export const forgetPasswordSchema = z.object({
    email: z.string({
      message: "Provide a valid email address",
    }).email()
})


export const resetPinSchema = z.object({ 
    pin: z.string().min(5, {
      message: "Your one-time password must be 5 characters.",
    }) 
})


export const resetPasswordSchema = z.object({ 
  otp: z.string().min(5, {
    message: "Your one-time password must be 5 characters.",
  }),
  password: z.string()
  .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
  .regex(new RegExp(".*[a-z].*"), "One lowercase character")
  .regex(new RegExp(".*\\d.*"), "One number")
  .regex(
    new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
    "One special character"
  )
  .min(8, "Must be at least 8 characters in length"), 
  confirmPassword: z.string()
  .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
  .regex(new RegExp(".*[a-z].*"), "One lowercase character")
  .regex(new RegExp(".*\\d.*"), "One number")
  .regex(
    new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
    "One special character"
  )
  .min(8, "Must be at least 8 characters in length").optional(), 
}).superRefine((val, ctx) => {
  if (val.password !== val.confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Password is not the same as confirm password',
      path: ['confirmPassword'],
    })
  }
})