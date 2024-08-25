'use client'

import { useFormState, useFormStatus } from 'react-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { Input } from "../ui/input";
import { signinAction } from '@/app/actions/auth';
import { LoginFormSchema, LoginFormValues } from '@/lib/definitions/definitions';

const SignInForm = () => {
  const [state, dispatch] = useFormState(signinAction, undefined);
  const { pending } = useFormStatus();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginFormSchema),
    mode: 'onSubmit',
    defaultValues: {
      username: '',
      password: '',
      // ...(state?.fields ?? {}),
    }
  });
  const formRef = useRef<HTMLFormElement>(null);
    return (
    <Form {...form}>
      <form         
        // ref={formRef}
        action={dispatch}
        // onSubmit={(evt) => {
        //   evt.preventDefault();
        //   form.handleSubmit(() => {
        //     dispatch(new FormData(formRef.current!));
        //   })(evt);
        // }}
         className="flex items-center justify-center min-h-screen">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>

          <CardContent>
            <div>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="john" {...field} type="text"/>
                  </FormControl>
                  {/* <FormDescription>This is your public display name.</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="...." {...field} type="text"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
          </CardContent>

          <CardFooter>
            <Button>
              Login
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}

export default SignInForm;