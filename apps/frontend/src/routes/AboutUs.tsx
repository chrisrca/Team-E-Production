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


export default function AboutUs() {
    // Array of objects representing each team member
    const teamMembers = [
        {
            name: "Yan Acevedo",
            role: "Project Manager",
            image: yan,
        },
        {
            name: "Kai Davidson",
            role: "Lead Developer",
            image: kai,
        },
        {
            name: "Aksel Jensen",
            role: "Assistant Lead Developer",
            image: aksel,
        },
        {
            name: "Tri Vien Le",
            role: "Scrum Master",
            image: tri,
        },
        {
            name: "Lorenzo Manfredi Segato",
            role: "Assistant Lead Software Engineer",
            image: lorenzo,
        },
        {
            name: "Devin Mihaichuk",
            role: "Algorithms",
            image: devin,
        },
        {
            name: "Brendan Reilly",
            role: "Backend Database Engineer",
            image: brendan,
        },
        {
            name: "Christian Reynolds",
            role: "Algorithms",
            image: christian,
        },
        {
            name: "Marc Wehbe",
            role: "Frontend",
            image: marc,
        },
        {
            name: "Colin Williams",
            role: "Frontend",
            image: colin,
        },
        {
            name: "Brandan Yeu",
            role: "Product Owner",
            image: brandon,
        },
        {
            name: "Tao Zou",
            role: "Documentation Analyst",
            image: tao,
        },
    ];

    return (
        <div className="grid gap-x-3 gap-y-6 grid-cols-3 auto-rows-auto pt-10 p-10">
            {/* Iterate over the teamMembers array and render each team member */}
            {teamMembers.map((member, index) => (
                <PortraitCard key={index}>
                    <CardContent>
                        <img src={member.image} alt={member.name} />
                    </CardContent>
                    <div>
                       <CardTitle>{member.name}</CardTitle>
                        <CardDescription>{member.role}</CardDescription>
                    </div>
                </PortraitCard>
            ))}
        </div>
    );
}
