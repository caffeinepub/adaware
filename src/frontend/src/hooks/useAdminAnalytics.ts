import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { AgeGroup, Gender, Prediction } from '../backend';

export function useAdminAnalytics() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['adminAnalytics'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not initialized');

      const [totalPredictions, concernDistribution, age13to15, age16to18, age19plus, male, female] =
        await Promise.all([
          actor.getPredictionCount(),
          actor.getConcernDistribution(),
          actor.getPredictionsByAgeGroup(AgeGroup._13to15),
          actor.getPredictionsByAgeGroup(AgeGroup._16to18),
          actor.getPredictionsByAgeGroup(AgeGroup._19plus),
          actor.getPredictionsByGender(Gender.male),
          actor.getPredictionsByGender(Gender.female),
        ]);

      return {
        totalPredictions,
        concernDistribution,
        ageGroupData: {
          _13to15: age13to15,
          _16to18: age16to18,
          _19plus: age19plus,
        },
        genderData: {
          male,
          female,
        },
      };
    },
    enabled: !!actor && !isFetching,
  });
}
