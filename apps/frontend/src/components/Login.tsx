import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { FormInput } from "@/components/ui/formInput.tsx";
import { Button } from "@/components/ui/button";
import { useState, FormEvent } from "react";
import hospitalHero from "/src/images/hospital-hero.jpg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [usersDB, setUsersDB] = useState<{ [key: string]: string }>({
    "wong@admin.com": "wongman",
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
    <div className="relative flex items-center justify-center h-screen">
      {/* Background Image Container */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(${hospitalHero})`, opacity: 0.25 }}
      ></div>

      {/* Vertical Container for Stacking Sections */}
      <div className="space-y-8 z-10">
        {/* Kiosk Admin Section */}
        <section className="p-6 bg-white rounded shadow-md text-center">
          <h1 className="text-xl font-bold">Need directions?</h1>
          <h2>Checkout our pathfinder in the nearest available kiosk!</h2>
        </section>

        {/* Login Form Section */}
        <section className="p-6 bg-white rounded shadow-md max-w-md">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-8">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-center text-black">
                  Sign in to your account
                </h1>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="email" className="text-black pr-9">
                    Email:
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
                    <Label htmlFor="password" className="text-black pr-2">
                      Password:
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
                <div className="pt-2 space-y-2">
                  <Button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-gray-600 rounded"
                  >
                    Login
                  </Button>
                </div>
                <div className="text-black pt-2">
                  {loginStatus && <p className="text-center">{loginStatus}</p>}
                </div>
              </div>
              <div className="text-sm text-black text-center space-x-2">
                <span>Don't have an account? </span>
                <Link to="#" className="underline text-indigo-600">
                  Sign up
                </Link>
              </div>
              <div className="text-sm text-center space-x-2">
                <Link
                  to="#"
                  className="inline-block text-sm underline text-indigo-600"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
