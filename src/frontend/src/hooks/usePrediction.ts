import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { AgeGroup, Gender, ScreenTime, Platform, Frequency, AdType, ConcernLevel } from '../backend';
import { AdPersuasiveness } from '../types/AdPersuasiveness';

export function usePrediction() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      ageGroup,
      gender,
      screenTime,
      platform,
      frequency,
      adType,
      adPersuasiveness,
    }: {
      ageGroup: AgeGroup;
      gender: Gender;
      screenTime: ScreenTime;
      platform: Platform;
      frequency: Frequency;
      adType: AdType;
      adPersuasiveness: AdPersuasiveness;
    }) => {
      if (!actor) throw new Error('Actor not initialized');

      const [concernLevel, recommendation] = await actor.submitPrediction(
        ageGroup,
        gender,
        screenTime,
        platform,
        frequency,
        adType,
        adPersuasiveness
      );

      return { concernLevel, recommendation };
    },
    onSuccess: () => {
      // Invalidate analytics queries to refresh admin dashboard
      queryClient.invalidateQueries({ queryKey: ['predictionCount'] });
      queryClient.invalidateQueries({ queryKey: ['concernDistribution'] });
      queryClient.invalidateQueries({ queryKey: ['ageGroupData'] });
      queryClient.invalidateQueries({ queryKey: ['genderData'] });
    },
  });

  return {
    submitPrediction: async (
      ageGroup: AgeGroup,
      gender: Gender,
      screenTime: ScreenTime,
      platform: Platform,
      frequency: Frequency,
      adType: AdType,
      adPersuasiveness: AdPersuasiveness
    ) => {
      return mutation.mutateAsync({
        ageGroup,
        gender,
        screenTime,
        platform,
        frequency,
        adType,
        adPersuasiveness,
      });
    },
    isLoading: mutation.isPending,
    error: mutation.error,
  };
}
