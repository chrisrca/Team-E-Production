import {CardContent, CardDescription, CardTitle, PortraitCard} from "@/components/ui/card.tsx";
import React from 'react';
import kai from "/src/images/kai.png";
import aksel from "/src/images/aksel.png";
import yan from "/src/images/yan.png";
import tri from "/src/images/tri.png";
import brandon from "/src/images/brandon.png";
import tao from "/src/images/tao.png";
import lorenzo from "/src/images/lorenzo.png";
import devin from "/src/images/devin.png";
import brendan from "/src/images/brendan.png";
import christian from "/src/images/christian.png";
import marc from "/src/images/marc.png";
import colin from "/src/images/colin.png";
import funny from "/src/sounds/metal-pipe-falling-sound-effect-made-with-Voicemod.mp3";


export default function AboutUs() {
    // Array of objects representing each team member
    const teamMembers = [
        {
            name: "Yan Acevedo",
            role: "Project Manager",
            major: "",
            class: "202X",
            image: yan,
        },
        {
            name: "Kai Davidson",
            role: "Lead Developer",
            major: "",
            class: "202X",
            image: kai,
        },
        {
            name: "Aksel Jensen",
            role: "Assistant Lead Developer",
            major: "",
            class: "202X",
            image: aksel,
        },
        {
            name: "Tri Vien Le",
            role: "Scrum Master",
            major: "",
            class: "202X",
            image: tri,
        },
        {
            name: "Lorenzo Manfredi Segato",
            role: "Assistant Lead Software Engineer",
            major: "",
            class: "202X",
            image: lorenzo,
        },
        {
            name: "Devin Mihaichuk",
            role: "Algorithms",
            major: "",
            class: "202X",
            image: devin,
        },
        {
            name: "Brendan Reilly",
            role: "Backend Database Engineer",
            major: "",
            class: "202X",
            image: brendan,
        },
        {
            name: "Christian Reynolds",
            role: "Algorithms",
            major: "",
            class: "202X",
            image: christian,
        },
        {
            name: "Marc Wehbe",
            role: "Frontend",
            major: "",
            class: "202X",
            image: marc,
        },
        {
            name: "Colin Williams",
            role: "Frontend",
            major: "",
            class: "202X",
            image: colin,
        },
        {
            name: "Brandan Yeu",
            role: "Product Owner",
            major: "",
            class: "202X",
            image: brandon,
        },
        {
            name: "Tao Zou",
            role: "Documentation Analyst",
            major: "",
            class: "202X",
            image: tao,
        },
    ];

    return (
        <div>
            <div className="flex items-center justify-center pt-10 text-4xl font-bold">
                <h1>About Us</h1>
            </div>
            <div className="grid gap-x-3 gap-y-3 grid-cols-3 auto-rows-auto pt-10 p-10">
                {/* Iterate over the teamMembers array and render each team member */}
                {teamMembers.map((member, index) => (
                    <PortraitCard key={index} className="bg-secondary shadow-md hover:cursor-pointer hover:outline">
                        <CardContent>
                            <img src={member.image} alt={member.name}/>
                        </CardContent>
                        <div className="">
                            <CardTitle>{member.name}</CardTitle>
                            <CardDescription>{member.role}</CardDescription>
                            <CardDescription>{member.major} Major</CardDescription>
                            <CardDescription>Class of {member.class}</CardDescription>
                            <br/>
                            <audio controls>
                                <source src={funny} type="audio/mp3"/>
                            </audio>
                        </div>
                    </PortraitCard>
                ))}
            </div>
        </div>
    );
}
