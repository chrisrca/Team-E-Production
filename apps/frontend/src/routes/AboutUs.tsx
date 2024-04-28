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
import {translate, useLanguage} from "@/components/LanguageProvider.tsx";


export default function AboutUs() {
    const { language } = useLanguage();

    // Array of objects representing each team member
    const teamMembers = [
        {
            name: translate("Yan Acevedo", language),
            role: translate("Project Manager", language),
            major: translate("Robotics", language),
            class: "2025",
            image: yan,
            audio: funny,
        },
        {
            name: translate("Kai Davidson", language),
            role: translate("Lead Developer", language),
            major: translate("ComputerBioinformatics", language),
            class: "2026",
            image: kai,
            audio: funny,
        },
        {
            name: translate("Aksel Jensen", language),
            role: translate("Assistant Lead Developer", language),
            major: translate("ComputerBioinformatics", language),
            class: "2026",
            image: aksel,
            audio: funny,
        },
        {
            name: translate("Tri Vien Le", language),
            role: translate("Scrum Master", language),
            major: translate("Computer", language),
            class: "2026",
            image: tri,
            audio: funny,
        },
        {
            name: translate("Lorenzo Manfredi Segato", language),
            role: translate("Assistant Lead Software Engineer", language),
            major: translate("ComputerRobotics", language),
            class: "2025",
            image: lorenzo,
            audio: funny,
        },
        {
            name: translate("Devin Mihaichuk", language),
            role: translate("Algorithms", language),
            major: translate("Computer", language),
            class: "2026",
            image: devin,
            audio: funny,
        },
        {
            name: translate("Brendan Reilly", language),
            role: translate("Backend Database Engineer", language),
            major: translate("Computer", language),
            class: "2026",
            image: brendan,
            audio: funny,
        },
        {
            name: translate("Christian Reynolds", language),
            role: translate("Algorithms", language),
            major: translate("Computer", language),
            class: "2026",
            image: christian,
            audio: fortnite,
        },
        {
            name: translate("Marc Wehbe", language),
            role: translate("Frontend", language),
            major: translate("Electrical", language),
            class: "2025",
            image: marc,
            audio: funny,
        },
        {
            name: translate("Colin Williams", language),
            role: translate("Frontend", language),
            major: translate("Computer", language),
            class: "2026",
            image: colin,
            audio: funny,
        },
        {
            name: translate("Brandon Yeu", language),
            role: translate("Product Owner", language),
            major: translate("Data Science", language),
            class: "2026",
            image: brandon,
            audio: funny,
        },
        {
            name: translate("Tao Zou", language),
            role: translate("Documentation Analyst", language),
            major: translate("Robotics", language),
            class: "2024",
            image: tao,
            audio: funny,
        },
    ];

    return (
        <div>
            <div className="flex items-center justify-center pt-10 text-4xl font-bold">
                {translate("aboutus", language)}
            </div>
            <div className="flex items-center text-center justify-center pt-5">
                {translate("aboutusdes1", language)} <br/>
                {translate("aboutusdes2", language)}<br/> {translate("aboutusdes3", language)}
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
                            <CardDescription>{member.major} {translate("Major", language)}</CardDescription>
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
                {translate("aboutusthank1", language)}<br/> {translate("aboutusthank2", language)}
            </div>
        </div>
    );
}
