//To prevent unnecessary calls to the authentication provider's API
import { SignupFormSchema, SignUpFormState, SignInFormState, LoginFormSchema } from "@/lib/definitions/definitions";
import { redirect } from "next/navigation";
import { loginAction } from "@/lib/store/authActions";
 
export async function signupAction(state: SignUpFormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
  })
 
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }


  // 2. Prepare data for insertion into database
  const { username, email, password } = validatedFields.data
 
  // Call the provider or db to create a user...
  const user = null;

  if (!user) {
    return {
      message: 'An error occurred while creating your account.',
    }
  }
 
  // TODO:
  // 4. Create user session
  // 5. Redirect user
  redirect('/sign-in');
};


export async function signinAction(state: SignInFormState, formData: FormData) {
  // Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  });
 
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // ... reste de la logique d'authentification
  await loginAction(validatedFields.data.username, validatedFields.data.password);


  // En cas de succès
  redirect('/admin');
};