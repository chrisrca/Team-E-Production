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
    const[selectedMember, setSelectedMember] = useState<string | null>(null);
    // Array of objects representing each team member
    const teamMembers = [
        {
            name: "Yan Acevedo",
            role: "Project Manager",
            major: "Robotics Engineering",
            class: "2025",
            quote: "La vida es un carnaval. - Celia Cruz",
            image: yan,
            audio: funny,
        },
        {
            name: "Kai Davidson",
            role: "Lead Developer",
            major: "Computer Science and Bioinformatics",
            class: "2026",
            quote: "Bang!",
            image: kai,
            audio: funny,
        },
        {
            name: "Aksel Jensen",
            role: "Assistant Lead Developer",
            major: "Computer Science / Bioinformatics and Computational Biology",
            class: "2026",
            quote: "How fleeting are all human passions when compared with the massive continuity of ducks. - Dorothy L. Sayers",
            image: aksel,
            audio: funny,
        },
        {
            name: "Tri Vien Le",
            role: "Scrum Master",
            major: "Computer Science",
            class: "2025",
            quote: "On my momma, I did not rebase the repo.",
            image: tri,
            audio: funny,
        },
        {
            name: "Lorenzo Manfredi Segato",
            role: "Assistant Lead Software Engineer",
            major: "Robotics Engineering and Computer Science",
            class: "2025",
            quote: "The fire of extravagance can never burn simplicity",
            image: lorenzo,
            audio: funny,
        },
        {
            name: "Devin Mihaichuk",
            role: "Algorithms",
            major: "Computer Science",
            class: "2026",
            quote: "I want to be the best like no one ever was, I guess.",
            image: devin,
            audio: funny,
        },
        {
            name: "Brendan Reilly",
            role: "Backend Database Engineer",
            major: "Computer Science",
            class: "2026",
            quote: "To do anything to a high level, it has to be total obsession - Conor McGregor",
            image: brendan,
            audio: funny,
        },
        {
            name: "Christian Reynolds",
            role: "Algorithms",
            major: "Computer Science",
            class: "2026",
            quote: "You miss 100% of the shots you don't take - Wayne Gretzky",
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
            quote: "Ooohh... I like that",
            image: colin,
            audio: funny,
        },
        {
            name: "Brandon Yeu",
            role: "Product Owner",
            major: "Computer Science / Data Science",
            class: "2026",
            quote: "Do the best you can until you know better. Then when you know better, do better. — Maya Angelou",
            image: brandon,
            audio: funny,
        },
        {
            name: "Tao Zou",
            role: "Documentation Analyst",
            major: "Robotic Engineering",
            class: "2024",
            quote: "宽以律己 严以待人",
            image: tao,
            audio: funny,
        },
    ];

    const toggleQuote = (member: typeof teamMembers[number]) => {
        setSelectedMember(member.quote === selectedMember ? null : member.quote);
    };

    return (
        <div>
            <div className="flex items-center justify-center pt-10 text-4xl font-bold">
                <h1>About Us</h1>
            </div>
            <div className="grid gap-x-3 gap-y-3 grid-cols-3 auto-rows-auto pt-10 p-10" style={{ display: 'flex', flexWrap: 'wrap', alignContent: 'flex-start' }}>
                {teamMembers.map((member, index) => (
                    <div key={index} style={{flex: '0 0 calc(33.33% - 2rem)'}}>
                        <PortraitCard className="bg-secondary shadow-md hover:cursor-pointer hover:outline" onClick={() => toggleQuote(member)}>
                            <CardContent style={{height: selectedMember === member.quote ? 'auto' : '475px' }}>
                                <div className="flex flex-col justify-between h-full">
                                    <div>
                                        <img className="rounded-md" src={member.image} alt={member.name}/>
                                        <div className="mt-3">
                                            <CardTitle>{member.name}</CardTitle>
                                            <CardDescription className="mt-1">{member.role}</CardDescription>
                                            <CardDescription>{member.major} Major</CardDescription>
                                            <CardDescription>Class of {member.class}</CardDescription>
                                        </div>
                                    </div>
                                    {selectedMember === member.quote && (
                                        <div className="p-4 italic">
                                            <CardDescription className="text-center">Quote: {member.quote}</CardDescription>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </PortraitCard>
                    </div>
                ))}
            </div>
            {/* Thank you message */}
            <div className="text-center mt-10 mb-20 text-lg text-white-600">
                <p>Special thanks to the Women's Hospital and Andrew Shinn-Senior Planner, for their time and input.</p>
            </div>
        </div>
    );
}
