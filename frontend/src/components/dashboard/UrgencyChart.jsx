import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function UrgencyChart({ data }) {
  const COLORS = [
    "#ef4444",
    "#f59e0b",
    "#10b981",
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 h-[400px]">

      <h2 className="text-2xl font-bold mb-6">

        Urgency Distribution

      </h2>

      <ResponsiveContainer width="100%" height="90%">

        <PieChart>

          <Pie

            data={data}

            dataKey="value"

            nameKey="name"

            outerRadius={120}

            label

          >

            {

              data.map((entry, index) => (

                <Cell

                  key={index}

                  fill={
                    COLORS[index % COLORS.length]
                  }

                />

              ))

            }

          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}

export default UrgencyChart;