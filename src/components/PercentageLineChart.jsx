import { LineChart, Line, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";


export default function PercentageLineChart({ series = [], unit = '%', height = 350 }) {

    function combineData() {
        const map = new Map();

        series.forEach((s, index) => {
            if (!s.data) return;

            const key = s.dataKey || `value_${index}`;

            s.data.forEach(item => {
                if (item.value !== null && item.value !== undefined) {
                    const existing = map.get(item.date) || { date: item.date };
                    existing[key] = item.value;
                    map.set(item.date, existing);
                }
            });
        });

        return Array.from(map.values()).sort((a, b) => a.date - b.date);
    };

    const chartData = combineData();

    if (chartData.length === 0) return null;

    return (
        <div style={{ width: '100%', height: height }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} style={{ outline: 'none' }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#4b4b4b42" />
                    <XAxis
                        dataKey="date"
                        fontSize={12}
                        tickMargin={10}
                        axisLine={false}
                        tickLine={true}
                    />
                    <YAxis
                        fontSize={12}
                        axisLine={false}
                        tickLine={true}
                        tickFormatter={(value) => `${value}${unit}`}
                    />
                    <Tooltip
                        contentStyle={{
                            borderRadius: '12px',
                            border: 'none',
                            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            backdropFilter: 'blur(4px)',
                            zIndex: 10
                        }}
                        formatter={(value) => [`${value.toFixed(2)}${unit}`]}
                    />
                    <Legend verticalAlign="top" height={36} />
                    {series.map((s, index) => (
                        <Line
                            key={s.label || index}
                            name={s.label}
                            type="monotone"
                            dataKey={s.dataKey || `value_${index}`}
                            stroke={s.color || '#3b82f6'}
                            strokeWidth={3}
                            dot={false}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}