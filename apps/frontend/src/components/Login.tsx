import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { FormInput } from "@/components/ui/formInput.tsx";
import { Button } from "@/components/ui/button";
import { useState, FormEvent } from "react";

/**
 * Login Component Functionality:
 * The user enters login information (email and password). If the key-value pair is found, login is successful.
 * If the email is not detected, the email-password key-value pair is saved (stored on cache only), user is added.
 * If an existing email is detected, but the password is incorrect, login is unsuccessful.
 */

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [usersDB, setUsersDB] = useState<{ [key: string]: string }>({
    "user@example.com": "password123",
  });
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (usersDB[email] && usersDB[email] === password) {
      setLoginStatus("Login Successful!");
      console.log("User successfully logged in.");
      console.log("Email: ", email, "Password: ", password);
    } else if (!usersDB[email]) {
      setUsersDB((prevUsersDB) => ({
        ...prevUsersDB,
        [email]: password,
      }));
      setLoginStatus("User added successfully.");
      console.log("New user added.");
      console.log("Email: ", email, "Password: ", password);
    } else {
      setLoginStatus("Invalid username or password.");
    }
    console.log("Form submitted");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center min-h-screen p-6 lg:p-12"
    >
      <div className="space-y-8 w-full max-w-md mx-auto">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-black">Welcome!</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Please enter your details below to login.
          </p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center">
            <Label className="text-black pr-9" htmlFor="email">
              Email:{" "}
            </Label>
            <FormInput
              variant="login"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="m@ex.com"
              required
              type="email"
            />
          </div>
          <div className="space-y-4">
            <div className="flex items-center">
              <Label className="text-black bg-primary pr-2" htmlFor="password">
                Password:{" "}
              </Label>
              <FormInput
                variant="login"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
              />
            </div>
          </div>
          <div className="space-y-2 pt-2">
            <Button
              className="w-full bg-indigo-600 hover:bg-gray-600 rounded"
              type="submit"
            >
              Login
            </Button>
          </div>
          <div className="text-black">
            {loginStatus && <p>{loginStatus}</p>}
          </div>
        </div>
        <div className="text-center text-sm space-x-2 text-black">
          <span>Don't have an account? </span>
          <Link to="#" className="underline text-indigo-600">
            Sign up
          </Link>
        </div>
        <div className="text-center text-sm space-x-2">
          <Link
            to="#"
            className="ml-auto inline-block text-sm underline text-indigo-600"
          >
            Forgot your password?
          </Link>
        </div>
      </div>
    </form>
  );
}
