import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import PageHeader from "../components/common/PageHeader";

import StatCard from "../components/dashboard/StatCard";

import RecentAssessments from "../components/dashboard/RecentAssessments";

import { getDashboardData } from "../services/dashboardService";

import {
  FaClipboardCheck,
  FaExclamationTriangle,
  FaHeartbeat,
  FaCheckCircle,
} from "react-icons/fa";

function Dashboard() {

  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {

    const loadDashboard = async () => {

      try {

        const data =
          await getDashboardData();

        setDashboard(data);

      } catch (err) {

        console.log(err);

      }

    };

    loadDashboard();

  }, []);

  if (!dashboard) {

    return (

      <DashboardLayout>

        Loading...

      </DashboardLayout>

    );

  }

  return (

    <DashboardLayout>

      <PageHeader

        title="Healthcare Dashboard"

        subtitle="Overview of your health assessments"

      />

      <div className="grid grid-cols-4 gap-6 mb-8">

        <StatCard

          title="Total"

          value={dashboard.total_assessments}

          icon={<FaClipboardCheck />}

          color="#2563eb"

        />

        <StatCard

          title="High"

          value={dashboard.high_priority}

          icon={<FaExclamationTriangle />}

          color="#ef4444"

        />

        <StatCard

          title="Medium"

          value={dashboard.medium_priority}

          icon={<FaHeartbeat />}

          color="#f59e0b"

        />

        <StatCard

          title="Low"

          value={dashboard.low_priority}

          icon={<FaCheckCircle />}

          color="#10b981"

        />

      </div>

      <div>
        <RecentAssessments
          data={dashboard.recent_assessments}
        />
      </div>

    </DashboardLayout>

  );

}

export default Dashboard;
