import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Prediction {
    userId: Principal;
    adPersuasiveness: AdPersuasiveness;
    platform: Platform;
    adType: AdType;
    concernLevel: ConcernLevel;
    gender: Gender;
    timestamp: bigint;
    frequency: Frequency;
    screenTime: ScreenTime;
    recommendation: string;
    ageGroup: AgeGroup;
}
export enum AdPersuasiveness {
    low = "low",
    high = "high",
    medium = "medium"
}
export enum AdType {
    fastFood = "fastFood",
    snacks = "snacks",
    sugaryDrinks = "sugaryDrinks"
}
export enum AgeGroup {
    _19plus = "_19plus",
    _16to18 = "_16to18",
    _13to15 = "_13to15"
}
export enum ConcernLevel {
    low = "low",
    high = "high",
    medium = "medium"
}
export enum Frequency {
    often = "often",
    rare = "rare",
    sometimes = "sometimes"
}
export enum Gender {
    female = "female",
    male = "male"
}
export enum Platform {
    tv = "tv",
    instagram = "instagram",
    multiple = "multiple",
    youtube = "youtube"
}
export enum ScreenTime {
    over5hrs = "over5hrs",
    under2hrs = "under2hrs",
    _2to5hrs = "_2to5hrs"
}
export interface backendInterface {
    getAllPredictions(): Promise<Array<Prediction>>;
    getConcernDistribution(): Promise<{
        low: bigint;
        high: bigint;
        medium: bigint;
    }>;
    getPredictionCount(): Promise<bigint>;
    getPredictionsByAgeGroup(ageGroup: AgeGroup): Promise<Array<Prediction>>;
    getPredictionsByConcernLevel(concernLevel: ConcernLevel): Promise<Array<Prediction>>;
    getPredictionsByGender(gender: Gender): Promise<Array<Prediction>>;
    submitPrediction(ageGroup: AgeGroup, gender: Gender, screenTime: ScreenTime, platform: Platform, frequency: Frequency, adType: AdType, adPersuasiveness: AdPersuasiveness): Promise<[ConcernLevel, string]>;
}
