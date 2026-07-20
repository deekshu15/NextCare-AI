import { motion } from "framer-motion";

function StatCard({ title, value, icon, color }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white rounded-2xl shadow-md p-6 border-l-8"
      style={{ borderColor: color }}
    >
      <div className="flex justify-between items-center">

        <div>

          <p className="text-gray-500 text-sm">

            {title}

          </p>

          <h2 className="text-4xl font-bold mt-2">

            {value}

          </h2>

        </div>

        <div
          className="text-5xl"
          style={{ color }}
        >
          {icon}
        </div>

      </div>

    </motion.div>
  );
}

export default StatCard;