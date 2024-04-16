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
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function UserArea() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const { isAuthenticated, loginWithPopup, logout } = useAuth0();

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

    const handleLogin = () => {
        loginWithPopup();
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={() => setIsOpen(!isOpen)}>
                <Button
                    className={`fixed top-0 right-0 mt-4 mr-4 z-50 ${isAuthenticated ? "bg-transparent" : "hover:bg-accent"}`}
                >
                    {isAuthenticated ? (
                        <Avatar>
                            <AvatarImage
                                src="https://github.com/shadcn.png"
                                alt="user"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    ) : (
                        "Log-in"
                    )}
                </Button>
            </DropdownMenuTrigger>
            {isOpen &&
                (isAuthenticated ? (
                    <DropdownMenuContent side="right" className="w-56 z-50">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <User className="mr-2 h-4 w-4" />
                                <Link to="/profile">Profile</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                <Link to="/settings">Settings</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={handleLogout}
                                className="hover:bg-destructive"
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                <span className="hover:underline">Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                ) : (
                    <DropdownMenuContent side="right" className="w-56 z-50">
                        <DropdownMenuLabel>Log In</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem onClick={handleLogin}>
                                <LogIn className="mr-2 h-4 w-4" />
                                <span className="hover:underline">Log-in</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                ))}
        </DropdownMenu>
    );
}
