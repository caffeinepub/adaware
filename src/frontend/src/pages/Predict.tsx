import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Loader2 } from 'lucide-react';
import { usePrediction } from '../hooks/usePrediction';
import { usePredictionContext } from '../components/PredictionContext';
import { AgeGroup, Gender, ScreenTime, Platform, Frequency, AdType } from '../backend';
import { AdPersuasiveness } from '../types/AdPersuasiveness';

export default function Predict() {
  const navigate = useNavigate();
  const { submitPrediction, isLoading } = usePrediction();
  const { setPredictionData } = usePredictionContext();

  const [formData, setFormData] = useState<{
    ageGroup: AgeGroup | null;
    gender: Gender | null;
    screenTime: ScreenTime | null;
    platform: Platform | null;
    frequency: Frequency | null;
    adType: AdType | null;
    adPersuasiveness: AdPersuasiveness | null;
  }>({
    ageGroup: null,
    gender: null,
    screenTime: null,
    platform: null,
    frequency: null,
    adType: null,
    adPersuasiveness: null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.ageGroup ||
      !formData.gender ||
      !formData.screenTime ||
      !formData.platform ||
      !formData.frequency ||
      !formData.adType ||
      !formData.adPersuasiveness
    ) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const result = await submitPrediction(
        formData.ageGroup,
        formData.gender,
        formData.screenTime,
        formData.platform,
        formData.frequency,
        formData.adType,
        formData.adPersuasiveness
      );

      setPredictionData({
        concernLevel: result.concernLevel,
        recommendation: result.recommendation,
        inputs: {
          ageGroup: formData.ageGroup,
          gender: formData.gender,
          screenTime: formData.screenTime,
          platform: formData.platform,
          frequency: formData.frequency,
          adType: formData.adType,
          adPersuasiveness: formData.adPersuasiveness,
        },
      });

      navigate({ to: '/results' });
    } catch (error) {
      console.error('Prediction error:', error);
      alert('Failed to submit prediction. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Card className="border-teal-200 dark:border-teal-800">
        <CardHeader>
          <CardTitle className="text-3xl text-teal-700 dark:text-teal-300">Prediction Form</CardTitle>
          <CardDescription>
            Please provide the following information to predict adolescent concern level over unhealthy food advertisements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Age Group */}
            <div className="space-y-2">
              <Label htmlFor="ageGroup">Age Group *</Label>
              <Select
                value={formData.ageGroup || ''}
                onValueChange={(value) => setFormData({ ...formData, ageGroup: value as AgeGroup })}
              >
                <SelectTrigger id="ageGroup">
                  <SelectValue placeholder="Select age group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={AgeGroup._13to15}>13-15</SelectItem>
                  <SelectItem value={AgeGroup._16to18}>16-18</SelectItem>
                  <SelectItem value={AgeGroup._19plus}>19+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label>Gender *</Label>
              <RadioGroup
                value={formData.gender || ''}
                onValueChange={(value) => setFormData({ ...formData, gender: value as Gender })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={Gender.male} id="male" />
                  <Label htmlFor="male" className="font-normal cursor-pointer">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={Gender.female} id="female" />
                  <Label htmlFor="female" className="font-normal cursor-pointer">Female</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Daily Screen Time */}
            <div className="space-y-2">
              <Label htmlFor="screenTime">Daily Screen Time *</Label>
              <Select
                value={formData.screenTime || ''}
                onValueChange={(value) => setFormData({ ...formData, screenTime: value as ScreenTime })}
              >
                <SelectTrigger id="screenTime">
                  <SelectValue placeholder="Select screen time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ScreenTime.under2hrs}>&lt;2 hours</SelectItem>
                  <SelectItem value={ScreenTime._2to5hrs}>2-5 hours</SelectItem>
                  <SelectItem value={ScreenTime.over5hrs}>&gt;5 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Primary Platform */}
            <div className="space-y-2">
              <Label htmlFor="platform">Primary Platform *</Label>
              <Select
                value={formData.platform || ''}
                onValueChange={(value) => setFormData({ ...formData, platform: value as Platform })}
              >
                <SelectTrigger id="platform">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={Platform.youtube}>YouTube</SelectItem>
                  <SelectItem value={Platform.instagram}>Instagram</SelectItem>
                  <SelectItem value={Platform.tv}>TV</SelectItem>
                  <SelectItem value={Platform.multiple}>Multiple</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Ad Frequency */}
            <div className="space-y-2">
              <Label htmlFor="frequency">Ad Frequency *</Label>
              <Select
                value={formData.frequency || ''}
                onValueChange={(value) => setFormData({ ...formData, frequency: value as Frequency })}
              >
                <SelectTrigger id="frequency">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={Frequency.rare}>Rare</SelectItem>
                  <SelectItem value={Frequency.sometimes}>Sometimes</SelectItem>
                  <SelectItem value={Frequency.often}>Often</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Ad Type */}
            <div className="space-y-2">
              <Label htmlFor="adType">Ad Type *</Label>
              <Select
                value={formData.adType || ''}
                onValueChange={(value) => setFormData({ ...formData, adType: value as AdType })}
              >
                <SelectTrigger id="adType">
                  <SelectValue placeholder="Select ad type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={AdType.fastFood}>Fast Food</SelectItem>
                  <SelectItem value={AdType.sugaryDrinks}>Sugary Drinks</SelectItem>
                  <SelectItem value={AdType.snacks}>Snacks</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Ad Persuasiveness */}
            <div className="space-y-2">
              <Label htmlFor="adPersuasiveness">Ad Persuasiveness *</Label>
              <Select
                value={formData.adPersuasiveness || ''}
                onValueChange={(value) => setFormData({ ...formData, adPersuasiveness: value as AdPersuasiveness })}
              >
                <SelectTrigger id="adPersuasiveness">
                  <SelectValue placeholder="Select persuasiveness" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={AdPersuasiveness.low}>Low</SelectItem>
                  <SelectItem value={AdPersuasiveness.medium}>Medium</SelectItem>
                  <SelectItem value={AdPersuasiveness.high}>High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Submit Prediction'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
