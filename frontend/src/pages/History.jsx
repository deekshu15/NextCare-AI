import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import PageHeader from "../components/common/PageHeader";
import Card from "../components/common/Card";

import { getAssessmentHistory } from "../services/assessmentService";

import {
  FaSearch,
  FaEye,
  FaComments,
  FaClipboardList,
} from "react-icons/fa";

function History() {
  const navigate = useNavigate();

  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    try {
      const data = await getAssessmentHistory();
      setAssessments(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const filteredData = useMemo(() => {
    return assessments.filter((item) => {
      const matchesSearch =
        item.symptoms
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        item.recommended_specialist
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" ||
        item.urgency_level === filter;

      return matchesSearch && matchesFilter;
    });
  }, [assessments, search, filter]);

  const badgeColor = (urgency) => {
    switch (urgency) {
      case "High":
        return "bg-red-100 text-red-700";

      case "Medium":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-green-100 text-green-700";
    }
  };

  return (
    <DashboardLayout>

      <PageHeader
        title="Assessment History"
        subtitle="Review all your previous health assessments"
      />

      <Card>

        <div className="flex flex-col lg:flex-row gap-4 justify-between mb-8">

          <div className="relative w-full lg:w-96">

            <FaSearch className="absolute left-4 top-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search symptoms or specialist..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full pl-12 pr-4 py-3 border rounded-xl"
            />

          </div>

          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value)
            }
            className="border rounded-xl px-4 py-3"
          >
            <option>All</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

        </div>

        {loading ? (
          <div className="text-center py-10">
            Loading...
          </div>
        ) : filteredData.length === 0 ? (
          <div className="text-center py-16">

            <FaClipboardList className="mx-auto text-6xl text-gray-300 mb-6" />

            <h2 className="text-2xl font-bold">
              No Assessments Found
            </h2>

            <p className="text-gray-500 mt-3">
              Try changing your search or create a new assessment.
            </p>

          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b">

                  <th className="text-left py-4">
                    Symptoms
                  </th>

                  <th className="text-left">
                    Duration
                  </th>

                  <th className="text-left">
                    Specialist
                  </th>

                  <th className="text-left">
                    Urgency
                  </th>

                  <th className="text-left">
                    Date
                  </th>

                  <th className="text-center">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredData.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b hover:bg-slate-50 transition"
                  >

                    <td className="py-5">
                      {item.symptoms}
                    </td>

                    <td>
                      {item.duration}
                    </td>

                    <td>
                      {item.recommended_specialist}
                    </td>

                    <td>

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${badgeColor(
                          item.urgency_level
                        )}`}
                      >
                        {item.urgency_level}
                      </span>

                    </td>

                    <td>
                      {new Date(
                        item.created_at
                      ).toLocaleDateString()}
                    </td>

                    <td>

                      <div className="flex justify-center gap-3">

                        <button
                          onClick={() =>
                            navigate(
                              `/result/${item.id}`
                            )
                          }
                          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg"
                        >
                          <FaEye />
                        </button>

                        <button
                          onClick={() =>
                            navigate(
                              `/chat/${item.id}`
                            )
                          }
                          className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg"
                        >
                          <FaComments />
                        </button>

                      </div>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        )}

      </Card>

    </DashboardLayout>
  );
}

export default History;