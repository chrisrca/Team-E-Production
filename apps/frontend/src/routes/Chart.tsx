import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartData {
    [key: string]: string | number | null;
}

interface DataSource {
    displayName: string;
    dataKey: string;
}

export function Chart({ yMeasure, sources, data, dataKey }: { yMeasure: string, sources: DataSource[], data: ChartData[], dataKey: string }) {
    return (
        <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{ top: 5, right: 10, left: 15, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: yMeasure, angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    {sources.map((source, index) => (
                        <Bar key={index} dataKey={dataKey} fill={index % 2 === 0 ? "#8884d8" : "#82ca9d"} />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
