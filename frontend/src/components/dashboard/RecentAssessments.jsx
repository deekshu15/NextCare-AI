import { useNavigate } from "react-router-dom";

function RecentAssessments({ data }) {

  const navigate = useNavigate();

  return (

    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-2xl font-bold mb-6">

        Recent Assessments

      </h2>

      <table className="w-full">

        <thead>

          <tr className="text-left border-b">

            <th className="pb-3">

              Symptoms

            </th>

            <th>

              Urgency

            </th>

            <th>

              Specialist

            </th>

            <th>

              Action

            </th>

          </tr>

        </thead>

        <tbody>

          {

            data.map((item) => (

              <tr

                key={item.id}

                className="border-b"

              >

                <td className="py-4">

                  {item.symptoms}

                </td>

                <td>

                  {item.urgency}

                </td>

                <td>

                  {item.specialist}

                </td>

                <td>

                  <button

                    onClick={() =>
                      navigate(
                        `/result/${item.id}`
                      )
                    }

                    className="bg-blue-600 text-white px-4 py-2 rounded"

                  >

                    View

                  </button>

                </td>

              </tr>

            ))

          }

        </tbody>

      </table>

    </div>

  );

}

export default RecentAssessments;