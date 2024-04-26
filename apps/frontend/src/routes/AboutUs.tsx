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
import fortnite from "/src/sounds/fortnite-dance-moves-emote-music-tv9iv8cxmo0-1.mp3";


export default function AboutUs() {
    // Array of objects representing each team member
    const teamMembers = [
        {
            name: "Yan Acevedo",
            role: "Project Manager",
            major: "Robotics Engineering",
            class: "2025",
            image: yan,
            audio: funny,
        },
        {
            name: "Kai Davidson",
            role: "Lead Developer",
            major: "Computer Science / Bioinformatics and Computational Biology",
            class: "2026",
            image: kai,
            audio: funny,
        },
        {
            name: "Aksel Jensen",
            role: "Assistant Lead Developer",
            major: "Computer Science / Bioinformatics and Computational Biology",
            class: "2026",
            image: aksel,
            audio: funny,
        },
        {
            name: "Tri Vien Le",
            role: "Scrum Master",
            major: "Computer Science",
            class: "2026",
            image: tri,
            audio: funny,
        },
        {
            name: "Lorenzo Manfredi Segato",
            role: "Assistant Lead Software Engineer",
            major: "Computer Science / Robotics Engineering",
            class: "2025",
            image: lorenzo,
            audio: funny,
        },
        {
            name: "Devin Mihaichuk",
            role: "Algorithms",
            major: "Computer Science",
            class: "2026",
            image: devin,
            audio: funny,
        },
        {
            name: "Brendan Reilly",
            role: "Backend Database Engineer",
            major: "Computer Science",
            class: "2026",
            image: brendan,
            audio: funny,
        },
        {
            name: "Christian Reynolds",
            role: "Algorithms",
            major: "Computer Science",
            class: "2026",
            image: christian,
            audio: fortnite,
        },
        {
            name: "Marc Wehbe",
            role: "Frontend",
            major: "Electrical and Computer Engineering / Robotics Engineering",
            class: "2025",
            image: marc,
            audio: funny,
        },
        {
            name: "Colin Williams",
            role: "Frontend",
            major: "Computer Science",
            class: "2026",
            image: colin,
            audio: funny,
        },
        {
            name: "Brandon Yeu",
            role: "Product Owner",
            major: "Computer Science / Data Science",
            class: "2026",
            image: brandon,
            audio: funny,
        },
        {
            name: "Tao Zou",
            role: "Documentation Analyst",
            major: "Robotics Engineering",
            class: "2024",
            image: tao,
            audio: funny,
        },
    ];

    return (
        <div>
            <div className="flex items-center justify-center pt-10 text-4xl font-bold">
                About Us
            </div>
            <div className="flex items-center text-center justify-center pt-5">
                We are the Emerald Ewoks, a team of students taking Software Engineering at Worcester Polytechnic Institute. <br/>
                WPI Computer Science Department | CS3733-D24 Software Engineering | Professor Wilson Wong <br/> Many thanks to our Team Coach, Keira Schoolcraft
            </div>
            <div className="grid gap-x-3 gap-y-3 grid-cols-3 auto-rows-auto pt-10 p-10">
                {/* Iterate over the teamMembers array and render each team member */}
                {teamMembers.map((member, index) => (
                    <PortraitCard key={index} className="bg-secondary shadow-md hover:cursor-pointer hover:outline">
                        <CardContent>
                            <img className="rounded-md" src={member.image} alt={member.name}/>
                        </CardContent>
                        <div className="">
                            <CardTitle>{member.name}</CardTitle>
                            <CardDescription>{member.role}</CardDescription>
                            <CardDescription>{member.major} Major</CardDescription>
                            <CardDescription>Class of {member.class}</CardDescription>
                            <br/>
                            {/* <audio controls>
                                <source src={member.audio} type="audio/mp3"/>
                            </audio> */}
                        </div>
                    </PortraitCard>
                ))}
            </div>
            <div className="p-10 flex text-center items-center justify-center font-bold">
                Thank you to the Brigham and Women's Hostpital and Andrew Shinn for providing us with the opportunity to work on this project.
                <br/> The Brigham and Women's Hospital maps used in this application are copyrighted and provided for the sole use of educational purposes.
            </div>
        </div>
    );
}
