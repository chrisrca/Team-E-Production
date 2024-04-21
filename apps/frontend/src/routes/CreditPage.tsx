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
const CreditPage: React.FC = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Credits</h1>
            <p style={styles.text}>This project was made possible with the help of the following software (Clicking the software to their website):</p>
            <ul style={styles.list}>
                <li style={styles.listItem}>
                    <a href="https://www.jetbrains.com/webstorm/"><img src={webstormLogo} alt="Webstorm Logo"
                                                                       style={styles.logo}/></a>
                    <a href="https://www.jetbrains.com/webstorm/">Webstorm (2023.3.4)</a>
                </li>

                <li style={styles.listItem}>
                    <a href="https://www.docker.com/"><img src={DockerLogo} alt="Docker Logo" style={styles.logo}/></a>
                    <a href="https://www.docker.com/">Docker (4.28.0)</a>
                </li>

                <li style={styles.listItem}>
                    <a href="https://nodejs.org/"><img src={NodejsLogo} alt="Node.js Logo" style={styles.logo}/></a>
                    <a href="https://nodejs.org/">Node.js (v20.11.0)</a>
                </li>

                <li style={styles.listItem}>
                    <a href="https://www.postgresql.org/"><img src={PostgreSQLLogo} alt="PostgreSQL Logo"
                                                               style={styles.logo}/></a>
                    <a href="https://www.postgresql.org/">PostgreSQL (16.2)</a>
                </li>

                <li style={styles.listItem}>
                    <a href="https://slack.com/"><img src={SlackLogo} alt="Slack Logo" style={styles.logo}/></a>
                    <a href="https://slack.com/">Slack (4.37.98)</a>
                </li>

                <li style={styles.listItem}>
                    <a href="https://www.prisma.io/"><img src={PrismaLogo} alt="Prisma Logo" style={styles.logo}/></a>
                    <a href="https://www.prisma.io/">Prisma ORM</a>
                </li>

                <li style={styles.listItem}>
                    <a href="https://www.figma.com/"><img src={FigmaLogo} alt="Figma Logo" style={styles.logo}/></a>
                    <a href="https://www.figma.com/">Figma</a>
                </li>

                <li style={styles.listItem}>
                    <a href="https://www.taiga.io/"><img src={TaigaLogo} alt="Taiga Logo" style={styles.logo}/></a>
                    <a href="https://www.taiga.io/">Taiga</a>
                </li>

                <li style={styles.listItem}>
                    <a href="https://www.diagrams.net/"><img src={DrawioLogo} alt="Draw.io Logo" style={styles.logo}/></a>
                    <a href="https://www.diagrams.net/">Draw.io</a>
                </li>

                <li style={styles.listItem}>
                    <a href="https://lucide.dev/"><img src={LucideLogo} alt="Lucide Logo" style={styles.logo}/></a>
                    <a href="https://lucide.dev/">Lucide</a>
                </li>

            </ul>
            <p style={styles.thanks}>Special thanks to the creators of these tools for their invaluable contributions to
                our project.</p>
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        margin: 'auto',
        maxWidth: '600px',
        padding: '20px',
    },
    heading: {
        fontSize: '28px',
        fontWeight: 'bold',
        marginBottom: '20px',
    },
    text: {
        fontSize: '18px',
        marginBottom: '10px',
    },
    list: {
        listStyle: 'none',
        padding: 0,
        textAlign: 'left',
    },
    listItem: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
    },
    thanks: {
        fontSize: '16px',
        marginTop: '20px',
    },
    logo: {
        width: '70px', // Adjust the size of the logo
        marginRight: '30px', // Add some space between logo and software title
    },
};

export default CreditPage;
