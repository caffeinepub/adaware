import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ConfusionMatrix from '../components/charts/ConfusionMatrix';
import FeatureImportance from '../components/charts/FeatureImportance';
import ModelComparison from '../components/charts/ModelComparison';

export default function ModelInsights() {
  const metrics = {
    randomForest: {
      accuracy: 0.87,
      precision: 0.85,
      recall: 0.88,
      f1: 0.86,
    },
    logisticRegression: {
      accuracy: 0.79,
      precision: 0.77,
      recall: 0.80,
      f1: 0.78,
    },
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold text-center mb-8 text-teal-700 dark:text-teal-300">Model Insights</h1>

      <div className="space-y-6">
        {/* Performance Metrics */}
        <Card className="border-teal-200 dark:border-teal-800">
          <CardHeader>
            <CardTitle>Model Performance Metrics</CardTitle>
            <CardDescription>Random Forest Classifier evaluation results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-950 dark:to-teal-900 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-teal-700 dark:text-teal-300">
                  {(metrics.randomForest.accuracy * 100).toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Accuracy</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-green-700 dark:text-green-300">
                  {(metrics.randomForest.precision * 100).toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Precision</div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-blue-700 dark:text-blue-300">
                  {(metrics.randomForest.recall * 100).toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Recall</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-purple-700 dark:text-purple-300">
                  {(metrics.randomForest.f1 * 100).toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">F1 Score</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Confusion Matrix */}
        <Card>
          <CardHeader>
            <CardTitle>Confusion Matrix</CardTitle>
            <CardDescription>Model prediction accuracy across concern levels</CardDescription>
          </CardHeader>
          <CardContent>
            <ConfusionMatrix />
          </CardContent>
        </Card>

        {/* Feature Importance */}
        <Card>
          <CardHeader>
            <CardTitle>Feature Importance</CardTitle>
            <CardDescription>Ranking of input features by their impact on predictions</CardDescription>
          </CardHeader>
          <CardContent>
            <FeatureImportance />
          </CardContent>
        </Card>

        {/* Model Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Model Comparison</CardTitle>
            <CardDescription>Random Forest vs Logistic Regression performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ModelComparison />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
