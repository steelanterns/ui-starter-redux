'use client'
 
import { useActionState } from 'react';
import { signupAction } from '@/app/actions/auth';
import { useFormState, useFormStatus } from 'react-dom';
 
export function SignupForm() {
  const [state, dispatch] = useFormState(signupAction, undefined);
  const { pending } = useFormStatus();

 
  return (
    <form action={dispatch}>
      <div>
        <label htmlFor="username">Username</label>
        <input id="username" name="username" placeholder="username" />
      </div>
      {state?.errors?.username && <p>{state.errors.username}</p>}
 
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" placeholder="Email" />
      </div>
      {state?.errors?.email && <p>{state.errors.email}</p>}
 
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
      </div>
      {state?.errors?.password && (
        <div>
          <p>Password must:</p>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}
      <button aria-disabled={pending} type="submit">
        {pending ? 'Submitting...' : 'Sign up'}
      </button>
    </form>
  )
}