import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAdminAnalytics } from '../hooks/useAdminAnalytics';
import { Loader2 } from 'lucide-react';
import ConcernDistributionPie from '../components/charts/ConcernDistributionPie';
import AgeGroupAnalysis from '../components/charts/AgeGroupAnalysis';
import GenderBiasChart from '../components/charts/GenderBiasChart';

export default function AdminDashboard() {
  const { data, isLoading, error } = useAdminAnalytics();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          Error loading analytics: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold text-center mb-8 text-teal-700 dark:text-teal-300">Admin Dashboard</h1>

      <div className="space-y-6">
        {/* Total Predictions Counter */}
        <Card className="border-teal-200 dark:border-teal-800">
          <CardHeader>
            <CardTitle>Total Predictions</CardTitle>
            <CardDescription>Overall system usage statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-5xl font-bold text-teal-700 dark:text-teal-300">
                {data?.totalPredictions.toString() || '0'}
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-2">predictions submitted</p>
            </div>
          </CardContent>
        </Card>

        {/* Concern Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Concern Level Distribution</CardTitle>
            <CardDescription>Breakdown of predictions by concern level</CardDescription>
          </CardHeader>
          <CardContent>
            <ConcernDistributionPie distribution={data?.concernDistribution} />
          </CardContent>
        </Card>

        {/* Age Group Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Age Group Analysis</CardTitle>
            <CardDescription>Prediction patterns across different age groups</CardDescription>
          </CardHeader>
          <CardContent>
            <AgeGroupAnalysis ageGroupData={data?.ageGroupData} />
          </CardContent>
        </Card>

        {/* Gender Bias Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Gender Bias Analysis</CardTitle>
            <CardDescription>Comparing prediction distributions between genders</CardDescription>
          </CardHeader>
          <CardContent>
            <GenderBiasChart genderData={data?.genderData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
