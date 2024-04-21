import React from 'react';
import webstormLogo from "/src/images/webstorm-logo.png";
import DockerLogo from "/src/images/docker-logo.png";
import NodejsLogo from "/src/images/nodejs-logo.png";
import PostgreSQLLogo from "/src/images/postgresql-logo.png";
import SlackLogo from "/src/images/slack-log.png";
import PrismaLogo from "/src/images/prisma-logo.svg";
import FigmaLogo from "/src/images/figma-logo.png";
import TaigaLogo from "/src/images/taiga-logo.png";
import DrawioLogo from "/src/images/drawio-logo.png";
import LucideLogo from "/src/images/lucide-logo.png";
import RadixLogo from "/src/images/radix-logo.png";
import Background from "/src/images/background.png";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const CreditPage: React.FC = () => {
    return (
        <div style={{...styles.container, backgroundImage: `url(${Background})`}}>
            <div style={styles.content}>
            <h1 style={styles.heading}>Credits</h1>
            <p style={styles.text}>This project was made possible with the help of the following software:</p>
            <div style={styles.cardContainer}>

                <Card>
                    <CardHeader>
                        <img src={webstormLogo} alt="Webstorm Logo" style={styles.logo}/>
                        <CardTitle>Webstorm (2023.3.4)</CardTitle>
                    </CardHeader>
                    <CardContent>
                    </CardContent>
                    <CardFooter className="flex justify-center items-center">
                        <a
                            href="https://www.jetbrains.com/webstorm/"
                            className="inline-block bg-accent text-foreground text-md py-2 px-4 rounded hover:bg-primary"
                            style={styles.link}
                        >
                            Learn more
                        </a>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <img src={DockerLogo} alt="Docker Logo" style={styles.logo}/>
                        <CardTitle>Docker (4.28.0)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p></p>
                    </CardContent>
                    <CardFooter className="flex justify-center items-center">
                        <a
                            href="https://www.docker.com/"
                            className="inline-block bg-accent text-foreground text-md py-2 px-4 rounded hover:bg-primary"
                            style={styles.link}
                        >
                            Learn more
                        </a>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <img src={NodejsLogo} alt="Node.js Logo" style={styles.logo}/>
                        <CardTitle>Node.js (v20.11.0)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p></p>
                    </CardContent>
                    <CardFooter className="flex justify-center items-center">
                        <a
                            href="https://nodejs.org/"
                            className="inline-block bg-accent text-foreground text-md py-2 px-4 rounded hover:bg-primary"
                            style={styles.link}
                        >
                            Learn more
                        </a>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <img src={PostgreSQLLogo} alt="PostgreSQL Logo" style={styles.logo}/>
                        <CardTitle>PostgreSQL (16.2)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p></p>
                    </CardContent>
                    <CardFooter className="flex justify-center items-center">
                        <a
                            href="https://www.postgresql.org/"
                            className="inline-block bg-accent text-foreground text-md py-2 px-4 rounded hover:bg-primary"
                            style={styles.link}
                        >
                            Learn more
                        </a>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <img src={SlackLogo} alt="Slack Logo" style={styles.logo}/>
                        <CardTitle>Slack (4.37.98)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p></p>
                    </CardContent>
                    <CardFooter className="flex justify-center items-center">
                        <a
                            href="https://slack.com/"
                            className="inline-block bg-accent text-foreground text-md py-2 px-4 rounded hover:bg-primary"
                            style={styles.link}
                        >
                            Learn more
                        </a>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <img src={PrismaLogo} alt="Prisma Logo" style={styles.logo}/>
                        <CardTitle>Prisma ORM</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p></p>
                    </CardContent>
                    <CardFooter className="flex justify-center items-center">
                        <a
                            href="https://www.prisma.io/"
                            className="inline-block bg-accent text-foreground text-md py-2 px-4 rounded hover:bg-primary"
                            style={styles.link}
                        >
                            Learn more
                        </a>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <img src={FigmaLogo} alt="Figma Logo" style={styles.logo}/>
                        <CardTitle>Figma</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p></p>
                    </CardContent>
                    <CardFooter className="flex justify-center items-center">
                        <a
                            href="https://www.figma.com/"
                            className="inline-block bg-accent text-foreground text-md py-2 px-4 rounded hover:bg-primary"
                            style={styles.link}
                        >
                            Learn more
                        </a>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <img src={TaigaLogo} alt="Taiga Logo" style={styles.logo}/>
                        <CardTitle>Taiga</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p></p>
                    </CardContent>
                    <CardFooter className="flex justify-center items-center">
                        <a
                            href="https://www.taiga.io/"
                            className="inline-block bg-accent text-foreground text-md py-2 px-4 rounded hover:bg-primary"
                            style={styles.link}
                        >
                            Learn more
                        </a>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <img src={DrawioLogo} alt="Draw.io Logo" style={styles.logo}/>
                        <CardTitle>Draw.io</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p></p>
                    </CardContent>
                    <CardFooter className="flex justify-center items-center">
                        <a
                            href="https://www.diagrams.net/"
                            className="inline-block bg-accent text-foreground text-md py-2 px-4 rounded hover:bg-primary"
                            style={styles.link}
                        >
                            Learn more
                        </a>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <img src={LucideLogo} alt="Lucide Logo" style={styles.logo}/>
                        <CardTitle>Lucide</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p></p>
                    </CardContent>
                    <CardFooter className="flex justify-center items-center">
                        <a
                            href="https://lucide.dev/"
                            className="inline-block bg-accent text-foreground text-md py-2 px-4 rounded hover:bg-primary"
                            style={styles.link}
                        >
                            Learn more
                        </a>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <img src={RadixLogo} alt="Radix Logo" style={styles.logo}/>
                        <CardTitle>Radix-UI</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p></p>
                    </CardContent>
                    <CardFooter className="flex justify-center items-center">
                        <a
                            href="https://www.radix-ui.com/"
                            className="inline-block bg-accent text-foreground text-md py-2 px-4 rounded hover:bg-primary"
                            style={styles.link}
                        >
                            Learn more
                        </a>
                    </CardFooter>
                </Card>
            </div>
            <p style={styles.thanks}>Special thanks to the creators of these tools for their invaluable contributions to
                our project.</p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        margin: 'auto',
        minHeight: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        maxWidth: '800px',
        padding: '20px',
        margin: '0 auto',
    },
    heading: {
        fontSize: '36px',
        fontWeight: 'bold',
        marginBottom: '20px',
    },
    text: {
        fontSize: '18px',
        marginBottom: '20px',
    },
    cardContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, minmax(300px, 1fr))', // Display three cards per row
        gap: '20px',
        justifyContent: 'center', // Center the cards horizontally
    },
    logo: {
        width: '150px', // Make the logos bigger
        alignSelf: 'center',
        margin: '0 auto',
    },
    link: {
        textDecoration: 'none',
        color: '#fff',
        padding: '12px 24px', // Increase padding to make the button bigger
        borderRadius: '4px',
        transition: 'background-color 0.3s ease',
    },
    thanks: {
        fontSize: '16px',
        marginTop: '40px',
    },
};
export default CreditPage;
