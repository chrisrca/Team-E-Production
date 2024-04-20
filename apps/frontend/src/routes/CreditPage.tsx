import React from 'react';

const CreditPage: React.FC = () => {
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Credits</h1>
            <p>This project was made possible with the help of the following software:</p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                <li><a href="https://www.jetbrains.com/webstorm/">Webstorm (2023.3.4)</a></li>
                <li><a href="https://www.docker.com/">Docker (4.28.0)</a></li>
                <li><a href="https://nodejs.org/">Node.js (v20.11.0)</a></li>
                <li><a href="https://www.postgresql.org/">PostgreSQL (16.2)</a></li>
                <li><a href="https://slack.com/">Slack (4.37.98)</a></li>
                <li><a href="https://www.prisma.io/">Prisma ORM</a></li>
                <li><a href="https://www.figma.com/">Figma</a></li>
                <li><a href="https://www.taiga.io/">Taiga</a></li>
                <li><a href="https://www.diagrams.net/">Draw.io</a></li>
            </ul>
            <p>Special thanks to the creators of these tools for their invaluable contributions to our project.</p>
        </div>
    );
};

export default CreditPage;


