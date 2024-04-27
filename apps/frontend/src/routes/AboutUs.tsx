import {CardContent, CardDescription, CardTitle, PortraitCard} from "@/components/ui/card.tsx";
import React, {useState} from 'react';
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
    //click on team member to display quote
    const[quoteVisible, setQuoteVisible] = useState(false);
    const[selectedMemberQuote, setSelectedMemberQuote] = useState('');
    // Array of objects representing each team member
    const teamMembers = [
        {
            name: "Yan Acevedo",
            role: "Project Manager",
            major: "Robotics Engineering",
            class: "2025",
            quote: "La vida es un carnaval",
            image: yan,
            audio: funny,
        },
        {
            name: "Kai Davidson",
            role: "Lead Developer",
            major: "Computer Science and Bioinformatics",
            class: "2026",
            quote: "test",
            image: kai,
            audio: funny,
        },
        {
            name: "Aksel Jensen",
            role: "Assistant Lead Developer",
            major: "Computer Science / Bioinformatics and Computational Biology",
            class: "2026",
            quote: "test",
            image: aksel,
            audio: funny,
        },
        {
            name: "Tri Vien Le",
            role: "Scrum Master",
            major: "Computer Science",
            class: "2025",
            quote: "test",
            image: tri,
            audio: funny,
        },
        {
            name: "Lorenzo Manfredi Segato",
            role: "Assistant Lead Software Engineer",
            major: "Robotics Engineering and Computer Science",
            class: "2025",
            quote: "test",
            image: lorenzo,
            audio: funny,
        },
        {
            name: "Devin Mihaichuk",
            role: "Algorithms",
            major: "Computer Science",
            class: "2026",
            quote: "test",
            image: devin,
            audio: funny,
        },
        {
            name: "Brendan Reilly",
            role: "Backend Database Engineer",
            major: "Computer Science",
            class: "2026",
            quote: "test",
            image: brendan,
            audio: funny,
        },
        {
            name: "Christian Reynolds",
            role: "Algorithms",
            major: "Computer Science",
            class: "2026",
            quote: "test",
            image: christian,
            audio: fortnite,
        },
        {
            name: "Marc Wehbe",
            role: "Frontend",
            major: "Electrical Computer and Robotics Engineering",
            class: "2025",
            quote: "At the end of the day, it's the end of the day",
            image: marc,
            audio: funny,
        },
        {
            name: "Colin Williams",
            role: "Frontend",
            major: "Computer Science",
            class: "2026",
            quote: "test",
            image: colin,
            audio: funny,
        },
        {
            name: "Brandon Yeu",
            role: "Product Owner",
            major: "Computer Science / Data Science",
            class: "2026",
            quote: "test",
            image: brandon,
            audio: funny,
        },
        {
            name: "Tao Zou",
            role: "Documentation Analyst",
            major: "Robotic Engineering",
            class: "2024",
            quote: "test",
            image: tao,
            audio: funny,
        },
    ];

    const toggleQuote = (member: typeof teamMembers[number]) => {
        setSelectedMemberQuote(member.quote);
        setQuoteVisible(!quoteVisible);
    };

    return (
        <div>
            <div className="flex items-center justify-center pt-10 text-4xl font-bold">
                <h1>About Us</h1>
            </div>
            <div className="grid gap-x-3 gap-y-3 grid-cols-3 auto-rows-auto pt-10 p-10">
                {/* Iterate over the teamMembers array and render each team member */}
                {teamMembers.map((member, index) => (
                    <div key={index} onClick={() => toggleQuote(member)}>
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
                    </div>
                 ))}
            </div>
            {quoteVisible && (
                <div className="text-center mt-10 mb-20 text-lg text-white-600">
                    <p>Quote: {selectedMemberQuote}</p>
                </div>
            )}
            {/* Thank you message */}
            <div className="text-center mt-10 mb-20 text-lg text-white-600">
                <p>Special thanks to the Women's Hospital and Andrew Shinn-Senior Planner, for their time and input.</p>
            </div>
        </div>
    );
}
