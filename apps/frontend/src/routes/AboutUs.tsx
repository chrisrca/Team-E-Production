import {Card, CardContent, CardDescription, CardTitle} from "@/components/ui/card.tsx";
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
    return (
    <div className="grid gap-x-3 gap-y-6 grid-cols-3 auto-rows-auto">
        <Card className="bg-amber-800">
            <CardTitle>
                Yan Acevedo
            </CardTitle>
            <CardContent>
                <img src={yan} alt="Yan" />
            </CardContent>
            <CardDescription>
                Project Manager
            </CardDescription>
        </Card>
        <Card>
            <CardTitle>
                Kai Davidson
            </CardTitle>
            <CardContent>
                <img src={kai} alt="Kai" />
            </CardContent>
            <CardDescription>
                Lead Developer
            </CardDescription>
        </Card>
        <Card>
            <CardTitle>
                Aksel Jensen
            </CardTitle>
            <CardContent>
                <img src={aksel} alt="Aksel" />
            </CardContent>
            <CardDescription>
                Assistant Lead Developer
            </CardDescription>
        </Card>
        <Card>
            <CardTitle>
                Tri Vien Le
            </CardTitle>
            <CardContent>
                <img src={tri} alt="Tri" />
            </CardContent>
            <CardDescription>
                Scrum Master
            </CardDescription>
        </Card>
        <Card>
            <CardTitle>
                Lorenzo Manfredi Segato
            </CardTitle>
            <CardContent>
                <img src={lorenzo} alt="Lorenzo" />
            </CardContent>
            <CardDescription>
                Assistant Lead Developer
            </CardDescription>
        </Card>
        <Card>
            <CardTitle>
                Devin Mihaichuk
            </CardTitle>
            <CardContent>
                <img src={devin} alt="Devin" />
            </CardContent>
            <CardDescription>
                Algorithms
            </CardDescription>
        </Card>
        <Card>
            <CardTitle>
                Brendan Reilly
            </CardTitle>
            <CardContent>
                <img src={brendan} alt="Brendan" />
            </CardContent>
            <CardDescription>
                Back-End Database Engineer
            </CardDescription>
        </Card>
        <Card>
            <CardTitle>
                Christian Reynolds
            </CardTitle>
            <CardContent>
                <img src={christian} alt="Christian" />
            </CardContent>
            <CardDescription>
                Algorithms
            </CardDescription>
        </Card>
        <Card>
            <CardTitle>
                Marc Webhe
            </CardTitle>
            <CardContent>
                <img src={marc} alt="Marc" />
            </CardContent>
            <CardDescription>
                Front-end
            </CardDescription>
        </Card>
        <Card>
            <CardTitle>
                Colin Williams
            </CardTitle>
            <CardContent>
                <img src={colin} alt="Colin" />
            </CardContent>
            <CardDescription>
                Front-End
            </CardDescription>
        </Card>
        <Card>
            <CardTitle>
                Brandon Yeu
            </CardTitle>
            <CardContent>
                <img src={brandon} alt="Brandon" />
            </CardContent>
            <CardDescription>
                Product Owner
            </CardDescription>
        </Card>
        <Card>
            <CardTitle>
                Tao Zou
            </CardTitle>
            <CardContent>
                <img src={tao} alt="Tao" />
            </CardContent>
            <CardDescription>
                Documentation Analyst
            </CardDescription>
        </Card>
    </div>);
}
