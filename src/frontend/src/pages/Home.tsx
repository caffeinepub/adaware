import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, TrendingUp, Heart } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-green-50 to-blue-50 dark:from-teal-950 dark:via-green-950 dark:to-blue-950">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block rounded-lg bg-teal-100 dark:bg-teal-900 px-3 py-1 text-sm text-teal-900 dark:text-teal-100">
                Academic Research Project
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-gray-900 dark:text-gray-100">
                AdAware
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-300 font-medium">
                An Explainable AI-Based Framework for Predicting Adolescent Concern Over Unhealthy Food Advertisements
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                A Web-Based Explainable AI Decision Support System for Public Health and Adolescent Media Awareness
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => navigate({ to: '/predict' })}
                  className="bg-teal-600 hover:bg-teal-700 text-white"
                >
                  Start Prediction
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate({ to: '/about' })}
                  className="border-teal-600 text-teal-600 hover:bg-teal-50 dark:border-teal-400 dark:text-teal-400 dark:hover:bg-teal-950"
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="/assets/generated/hero-banner.dim_1200x400.png"
                alt="AdAware AI Framework"
                className="rounded-lg shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Key Features
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our system combines machine learning with explainable AI to provide transparent, actionable insights
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-teal-200 dark:border-teal-800 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mb-4 flex justify-center">
                  <img
                    src="/assets/generated/ml-model-icon.dim_200x200.png"
                    alt="ML Model"
                    className="w-24 h-24"
                  />
                </div>
                <CardTitle className="text-center text-teal-700 dark:text-teal-300">
                  <Brain className="inline-block mr-2 h-6 w-6" />
                  ML Prediction
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Random Forest classifier predicts concern levels (Low, Medium, High) based on demographic and advertisement exposure data
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-green-200 dark:border-green-800 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mb-4 flex justify-center">
                  <img
                    src="/assets/generated/explainability-icon.dim_200x200.png"
                    alt="Explainability"
                    className="w-24 h-24"
                  />
                </div>
                <CardTitle className="text-center text-green-700 dark:text-green-300">
                  <TrendingUp className="inline-block mr-2 h-6 w-6" />
                  SHAP Explainability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Transparent AI explanations using SHAP values to understand which factors influence predictions
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-blue-200 dark:border-blue-800 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mb-4 flex justify-center">
                  <img
                    src="/assets/generated/health-icon.dim_200x200.png"
                    alt="Health Recommendations"
                    className="w-24 h-24"
                  />
                </div>
                <CardTitle className="text-center text-blue-700 dark:text-blue-300">
                  <Heart className="inline-block mr-2 h-6 w-6" />
                  Health Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Personalized health recommendations based on prediction results to promote healthier media habits
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* System Overview */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8">
              How It Works
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">Input Demographics & Exposure Data</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Provide information about age, gender, screen time, platform usage, and advertisement exposure
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">AI Analysis</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Random Forest model analyzes patterns and predicts concern level with high accuracy
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">Explainable Results</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Receive transparent predictions with SHAP explanations and personalized health recommendations
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
