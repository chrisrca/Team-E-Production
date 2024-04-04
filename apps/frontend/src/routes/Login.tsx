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
            {/* Background Image Container for the whole page }
      <div
        className="absolute top-0 left-0 w-full h-full bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(${hospitalHero})`, opacity: 0.25 }}
      ></div> */}
            {/* Vertical Container for Stacking Sections */}
            <div className="space-y-8 z-10 w-full content-center">
                {/* Hero Section */}
                <section
                    className="p-6 bg-white bg-opacity-90 rounded shadow-md content-center text-center relative"
                    style={{
                        backgroundImage: `url(${hospitalHero})`,
                        backgroundSize: "cover",
                        minHeight: "400px",
                    }}
                >
                    <div className="absolute inset-0 bg-black opacity-50"></div>{" "}
                    {/* Dark overlay for better text visibility */}
                    <div className="z-10 relative">
                        <h1 className="text-3xl font-bold text-white">
                            Need Directions?
                        </h1>
                        <p className="text-xl text-gray-200">
                            Find your way with our easy-to-use pathfinder
                            located in the nearest kiosk!
                        </p>
                        <Link
                            to="/map"
                            className="mt-4 inline-block bg-accent text-white font-bold py-2 px-4 rounded hover:bg-indigo-700"
                        >
                            Get Started
                        </Link>
                    </div>
                </section>

                {/* Login Form Section */}
                <div className="z-10 w-full flex flex-col items-center justify-center">
                    <section className="p-6 bg-background rounded shadow-md content-center max-w-md">
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-8 content-center"
                        >
                            <div className="space-y-8 content-center">
                                <div className="space-y-2">
                                    <h1 className="text-3xl font-bold text-center text-foreground">
                                        Sign in to your account
                                    </h1>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center content-center">
                                        <Label
                                            htmlFor="email"
                                            className="text-foreground pr-9"
                                        >
                                            Email:
                                        </Label>
                                        <FormInput
                                            variant="login"
                                            id="email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            placeholder="m@ex.com"
                                            required
                                            type="email"
                                            className="dark:bg-secondary  dark:focus:bg-background"
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center">
                                            <Label
                                                htmlFor="password"
                                                className="text-foreground pr-2"
                                            >
                                                Password:
                                            </Label>
                                            <FormInput
                                                variant="login"
                                                id="password"
                                                value={password}
                                                onChange={(e) =>
                                                    setPassword(e.target.value)
                                                }
                                                required
                                                type="password"
                                                className="dark:bg-secondary  dark:focus:bg-background"
                                            />
                                        </div>
                                    </div>
                                    <div className="pt-2 space-y-2">
                                        <Button
                                            type="submit"
                                            className="w-full bg-accent hover:bg-gray-600 rounded"
                                        >
                                            Login
                                        </Button>
                                    </div>
                                    <div className="text-foreground pt-2">
                                        {loginStatus && (
                                            <p className="text-center">
                                                {loginStatus}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="text-sm text-foreground text-center space-x-2">
                                    <span>Don't have an account? </span>
                                    <Link
                                        to="#"
                                        className="underline text-accent"
                                    >
                                        Sign up
                                    </Link>
                                </div>
                                <div className="text-sm text-center space-x-2">
                                    <Link
                                        to="#"
                                        className="inline-block text-sm underline text-accent"
                                    >
                                        Forgot your password?
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </div>
    );
}
