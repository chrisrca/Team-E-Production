import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogIn, LogOut, Settings, User } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button.tsx";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function UserArea() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const { isAuthenticated, loginWithPopup, logout } = useAuth0();

    const handleLogin = () => {
        loginWithPopup();
    };
    const handleLogout = () => {
        logout();
    };

    //dropdown logic
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [isAuthenticated]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={() => setIsOpen(!isOpen)}>
                <Button className="fixed top-0 right-0 mt-4 mr-4 z-50 bg-transparent">
                    <Avatar className="">
                        <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt="@shadcn"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            {isOpen && (
                <DropdownMenuContent
                    side="right"
                    className={`w-56 ${isOpen ? "z-50" : "z-0"}`}
                >
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <LogIn
                                onClick={handleLogin}
                                className="mr-2 h-4 w-4"
                            />
                            <span
                                className="hover:underline hover:cursor-pointer"
                                onClick={handleLogin}
                            >
                                Log-in
                            </span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            )}
            {isAuthenticated && (
                <DropdownMenuContent
                    side="right"
                    className="`w-56 ${isOpen ? 'z-50' : 'z-0'}`"
                >
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            <Link to="/profile">Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            <Link to="/settings">Settings</Link>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="bg-destructive">
                        <LogOut
                            onClick={handleLogout}
                            className="mr-2 h-4 w-4"
                        />
                        <span
                            className="hover:underline hover:cursor-pointer"
                            onClick={handleLogout}
                        >
                            Log out
                        </span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            )}
        </DropdownMenu>
    );
}
