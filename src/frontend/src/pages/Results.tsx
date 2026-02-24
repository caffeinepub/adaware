import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';
import { usePredictionContext } from '../components/PredictionContext';
import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import DownloadPDFButton from '../components/DownloadPDFButton';
import { ConcernLevel } from '../backend';

export default function Results() {
  const { predictionData } = usePredictionContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!predictionData) {
      navigate({ to: '/predict' });
    }
  }, [predictionData, navigate]);

  if (!predictionData) {
    return null;
  }

  const { concernLevel, recommendation, inputs } = predictionData;

  const getConcernBadge = () => {
    switch (concernLevel) {
      case ConcernLevel.low:
        return <Badge className="bg-green-600 hover:bg-green-700 text-white text-lg px-4 py-2">Low Concern</Badge>;
      case ConcernLevel.medium:
        return <Badge className="bg-yellow-600 hover:bg-yellow-700 text-white text-lg px-4 py-2">Medium Concern</Badge>;
      case ConcernLevel.high:
        return <Badge className="bg-red-600 hover:bg-red-700 text-white text-lg px-4 py-2">High Concern</Badge>;
    }
  };

  const getConcernIcon = () => {
    switch (concernLevel) {
      case ConcernLevel.low:
        return <CheckCircle className="h-6 w-6 text-green-600" />;
      case ConcernLevel.medium:
        return <AlertTriangle className="h-6 w-6 text-yellow-600" />;
      case ConcernLevel.high:
        return <AlertCircle className="h-6 w-6 text-red-600" />;
    }
  };

  const formatInputLabel = (key: string): string => {
    const labels: Record<string, string> = {
      ageGroup: 'Age Group',
      gender: 'Gender',
      screenTime: 'Daily Screen Time',
      platform: 'Primary Platform',
      frequency: 'Ad Frequency',
      adType: 'Ad Type',
      adPersuasiveness: 'Ad Persuasiveness',
    };
    return labels[key] || key;
  };

  const formatInputValue = (key: string, value: string): string => {
    if (key === 'ageGroup') {
      if (value === '_13to15') return '13-15';
      if (value === '_16to18') return '16-18';
      if (value === '_19plus') return '19+';
    }
    if (key === 'screenTime') {
      if (value === 'under2hrs') return '<2 hours';
      if (value === '_2to5hrs') return '2-5 hours';
      if (value === 'over5hrs') return '>5 hours';
    }
    if (key === 'adPersuasiveness' || key === 'frequency') {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
    if (key === 'adType') {
      if (value === 'fastFood') return 'Fast Food';
      if (value === 'sugaryDrinks') return 'Sugary Drinks';
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold text-center mb-8 text-teal-700 dark:text-teal-300">Prediction Results</h1>

      <div className="space-y-6">
        {/* Prediction Result */}
        <Card className="border-teal-200 dark:border-teal-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getConcernIcon()}
              Predicted Concern Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center mb-4">
              {getConcernBadge()}
            </div>
            <p className="text-center text-gray-600 dark:text-gray-400">
              Based on the provided information, the AI model has predicted the concern level for unhealthy food advertisement exposure.
            </p>
          </CardContent>
        </Card>

        {/* Recommendation */}
        <Card className="border-green-200 dark:border-green-800">
          <CardHeader>
            <CardTitle>Personalized Health Recommendation</CardTitle>
            <CardDescription>Actionable advice based on your prediction</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert>
              <AlertTitle>Recommendation</AlertTitle>
              <AlertDescription className="text-base">{recommendation}</AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* User Inputs Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Your Input Summary</CardTitle>
            <CardDescription>Review the information you provided</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Feature</TableHead>
                  <TableHead>Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(inputs).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell className="font-medium">{formatInputLabel(key)}</TableCell>
                    <TableCell>{formatInputValue(key, value)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* SHAP Explanation Placeholder */}
        <Card className="border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle>Explainable AI Insights (SHAP)</CardTitle>
            <CardDescription>Understanding the prediction factors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-6 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <strong>SHAP (SHapley Additive exPlanations)</strong> provides transparent insights into which features most influenced this prediction.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Key factors considered in this prediction:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li><strong>Ad Persuasiveness:</strong> Higher persuasiveness increases concern levels</li>
                <li><strong>Screen Time:</strong> Extended exposure correlates with higher concern</li>
                <li><strong>Ad Frequency:</strong> Frequent exposure impacts prediction significantly</li>
                <li><strong>Age Group:</strong> Younger adolescents may show different concern patterns</li>
                <li><strong>Platform Type:</strong> Different platforms have varying influence levels</li>
              </ul>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-4 italic">
                Note: SHAP visualizations provide feature importance rankings and contribution analysis for transparent AI decision-making.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Download PDF */}
        <div className="flex justify-center">
          <DownloadPDFButton predictionData={predictionData} />
        </div>
      </div>
    </div>
  );
}
