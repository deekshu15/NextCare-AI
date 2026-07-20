import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import PageHeader from "../components/common/PageHeader";
import Card from "../components/common/Card";

import { getAssessment } from "../services/assessmentService";

import {
  FaHeartbeat,
  FaUserMd,
  FaRobot,
  FaClipboardCheck,
  FaExclamationTriangle,
  FaHistory,
  FaComments,
} from "react-icons/fa";

function Result() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [assessment, setAssessment] = useState(null);

  useEffect(() => {

    const loadAssessment = async () => {

      try {

        const data = await getAssessment(id);

        setAssessment(data);

      } catch (err) {

        console.log(err);

      }

    };

    loadAssessment();

  }, [id]);

  if (!assessment) {

    return (

      <DashboardLayout>

        <div className="text-center py-20 text-2xl font-bold">

          Loading Medical Report...

        </div>

      </DashboardLayout>

    );

  }

  const urgencyColor = {

    High: "bg-red-500",

    Medium: "bg-yellow-500",

    Low: "bg-green-500",

  };

  return (

    <DashboardLayout>

      <PageHeader

        title="Medical Assessment Report"

        subtitle="AI-generated healthcare recommendation"

      />

      <div className="grid grid-cols-2 gap-8">

        <Card>

          <div className="flex items-center gap-4 mb-4">

            <FaHeartbeat className="text-red-500 text-3xl" />

            <h2 className="text-2xl font-bold">

              Symptoms

            </h2>

          </div>

          <p>{assessment.symptoms}</p>

        </Card>

        <Card>

          <div className="flex items-center gap-4 mb-4">

            <FaHeartbeat className="text-blue-600 text-3xl" />

            <h2 className="text-2xl font-bold">

              Duration

            </h2>

          </div>

          <p>{assessment.duration}</p>

        </Card>

        <Card>

          <div className="flex items-center gap-4 mb-4">

            <FaHeartbeat className="text-purple-600 text-3xl" />

            <h2 className="text-2xl font-bold">

              Pain Level

            </h2>

          </div>

          <p>{assessment.pain_level}/10</p>

        </Card>

        <Card>

          <div className="flex items-center gap-4 mb-4">

            <FaHeartbeat className="text-green-600 text-3xl" />

            <h2 className="text-2xl font-bold">

              Medical History

            </h2>

          </div>

          <p>

            {assessment.medical_history || "No medical history"}

          </p>

        </Card>

      </div>

      <div className="mt-8">

        <Card>

          <div className="flex justify-between items-center">

            <div>

              <h2 className="text-2xl font-bold">

                Urgency Level

              </h2>

            </div>

            <span
              className={`text-white px-6 py-3 rounded-full text-lg font-bold ${urgencyColor[assessment.urgency_level]}`}
            >
              {assessment.urgency_level}
            </span>

          </div>

        </Card>

      </div>

      <div className="grid grid-cols-3 gap-8 mt-8">

        <Card>

          <FaUserMd className="text-4xl text-blue-600 mb-4" />

          <h2 className="text-xl font-bold mb-3">

            Recommended Specialist

          </h2>

          <p>

            {assessment.recommended_specialist}

          </p>

        </Card>

        <Card>

          <FaRobot className="text-4xl text-green-600 mb-4" />

          <h2 className="text-xl font-bold mb-3">

            AI Summary

          </h2>

          <p>

            {assessment.ai_summary}

          </p>

        </Card>

        <Card>

          <FaClipboardCheck className="text-4xl text-purple-600 mb-4" />

          <h2 className="text-xl font-bold mb-3">

            Next Steps

          </h2>

          <p>

            {assessment.next_steps}

          </p>

        </Card>

      </div>

      <div className="mt-8">

        <Card>

          <div className="flex gap-4 items-center mb-4">

            <FaExclamationTriangle className="text-red-600 text-3xl" />

            <h2 className="text-2xl font-bold">

              Warning Signs

            </h2>

          </div>

          <p>

            {assessment.warning_signs}

          </p>

        </Card>

      </div>

      <div className="flex gap-4 mt-10">

        <button

          onClick={() => navigate("/assessment")}

          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"

        >

          New Assessment

        </button>

        <button

          onClick={() => navigate("/history")}

          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl flex items-center gap-2"

        >

          <FaHistory />

          History

        </button>

        <button

          onClick={() => navigate(`/chat/${assessment.id}`)}

          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl flex items-center gap-2"

        >

          <FaComments />

          AI Chat

        </button>

      </div>

    </DashboardLayout>

  );

}

export default Result;