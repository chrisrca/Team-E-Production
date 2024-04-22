// import bgImage from "/src/images/brighamandwomensbuildingimage.jpeg";
//
// export default function WelcomePage(){
//
//     return(
//         <div className='absolute bg-gradient-to-r from-50% to-012D5A'>
//             <div
//                 style={{
//                     backgroundImage: 'linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1))',
//                     width: '100%',
//                     height: '100%',
//                 }}
//             >
//
//             </div>
//
//             <div className='absolute'
//                  style={{
//                      backgroundImage: `url(${bgImage})`,
//                      backgroundSize: "cover",
//                  }}
//             >
//
//             </div>
//         </div>
//     );
// }

import bgImage from "/src/images/brighamandwomensbuildingimage.jpeg";
import {MapPinned, CircleUserRound, HandPlatter} from "lucide-react";
import "../index.css";
import { Link } from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";
import { Button } from "@/components/ui/button.tsx";

export default function WelcomePage() {

    const { loginWithRedirect, isAuthenticated } =
        useAuth0();
    const handleLogin = () => {
        loginWithRedirect();
    };

    if (isAuthenticated){
        return (
            <div
                className="absolute bg-gradient-to-l from-30% from-kiosk"
                style={{
                    width: "100vw",
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                }}
            >
                <div
                    className="absolute"
                    style={{
                        backgroundImage: `url(${bgImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        width: "100vw",
                        height: "100vh",
                        zIndex: -1,
                    }}
                ></div>

                <div className="absolute right-0 flex flex-col justify-center items-center pr-14 size-1/4 h-full pt-28 pb-28 space-y-6">
                    <Link
                        to="/map"
                        className="bg-white text-kiosk p-4 rounded-md size-full flex flex-col items-center justify-center sm:text-20 lg:text-6xl"
                    >
                        <MapPinned className="lg:size-40 sm:size-20" />
                        <div>Map</div>
                    </Link>
                    <Link
                        to="/services"
                        className="bg-white text-kiosk p-4 rounded-md size-full flex flex-col items-center justify-center sm:text-20 lg:text-6xl"
                    >
                        <HandPlatter className="lg:size-36 sm:size-16" />
                        <div>Services</div>
                    </Link>
                </div>
            </div>
        );
    }
    else{
        return (
            <div
                className="absolute bg-gradient-to-l from-30% from-kiosk"
                style={{
                    width: "100vw",
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                }}
            >
                <div
                    className="absolute"
                    style={{
                        backgroundImage: `url(${bgImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        width: "100vw",
                        height: "100vh",
                        zIndex: -1,
                    }}
                ></div>

                <div className="absolute right-0 flex flex-col justify-center items-center pr-14 size-1/4 h-full pt-28 pb-28 space-y-6">
                    <Link
                        to="/map"
                        className="bg-white text-kiosk p-4 rounded-md size-full flex flex-col items-center justify-center sm:text-20 lg:text-6xl"
                    >
                        <MapPinned className="lg:size-40 sm:size-20" />
                        <div>Map</div>
                    </Link>
                    <Button
                        onClick={handleLogin}
                        className="bg-white text-kiosk p-4 rounded-md size-full flex flex-col items-center justify-center sm:text-20 lg:text-6xl"
                    >
                        <CircleUserRound className="lg:size-36 sm:size-16" />
                        <div>Login</div>
                    </Button>
                </div>
            </div>
        );
    }

}
