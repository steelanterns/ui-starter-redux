'use server'
 
export async function authenticate(_currentState: unknown, formData: FormData) {
  try {
    //mutation database, make fetch
    console.log(formData);
  } catch (error) {
    console.error(error);
    throw error
  }
}