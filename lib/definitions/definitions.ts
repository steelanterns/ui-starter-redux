import { z } from 'zod';

//Validate form fields on the server
//form schema with appropriate error messages
 
export const SignupFormSchema = z.object({
  username: z
    .string()
    .min(4, { message: 'Username must be at least 4 characters long.' })
    .trim(),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    })
    .trim(),
})

export const LoginFormSchema = z.object({
  username: z.coerce.string().trim().min( 4, 'Username requires at least 4 characters.' ),
  password: z.coerce.string().trim().min( 4, 'Password requires at least 4 characters.' ),
});

export type LoginFormValues = z.infer<typeof LoginFormSchema>;

export type SignInFormState = 
  | {
      errors?: {
        username?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined
 
export type SignUpFormState =
  | {
      errors?: {
        username?: string[]
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined