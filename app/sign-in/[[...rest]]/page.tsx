//[[...rest]] is a catch-all route
// we have here used the [[...rest]] syntax to create a dynamic route that can handle any additional path segments.
// example :It means: “Match /sign-in, /sign-in/anything, /sign-in/anything/else, etc.”
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return <SignIn />;
}

