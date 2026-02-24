import Int "mo:core/Int";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Order "mo:core/Order";

actor {
  type AgeGroup = { #_13to15; #_16to18; #_19plus };
  type Gender = { #male; #female };
  type ScreenTime = { #under2hrs; #_2to5hrs; #over5hrs };
  type Platform = { #youtube; #instagram; #tv; #multiple };
  type Frequency = { #rare; #sometimes; #often };
  type AdType = { #fastFood; #sugaryDrinks; #snacks };
  type AdPersuasiveness = { #low; #medium; #high };
  type ConcernLevel = { #low; #medium; #high };

  type Prediction = {
    userId : Principal;
    timestamp : Int;
    ageGroup : AgeGroup;
    gender : Gender;
    screenTime : ScreenTime;
    platform : Platform;
    frequency : Frequency;
    adType : AdType;
    adPersuasiveness : AdPersuasiveness;
    concernLevel : ConcernLevel;
    recommendation : Text;
  };

  module Prediction {
    public func compare(p1 : Prediction, p2 : Prediction) : Order.Order {
      Int.compare(p1.timestamp, p2.timestamp);
    };
  };

  let predictions = Map.empty<Int, Prediction>();
  var nextPredictionId = 0;

  public shared ({ caller }) func submitPrediction(ageGroup : AgeGroup, gender : Gender, screenTime : ScreenTime, platform : Platform, frequency : Frequency, adType : AdType, adPersuasiveness : AdPersuasiveness) : async (ConcernLevel, Text) {
    let concernLevel : ConcernLevel = switch (ageGroup, screenTime, frequency, adPersuasiveness) {
      case (#_13to15, #over5hrs, #often, #high) { #high };
      case (#_16to18, #_2to5hrs, #sometimes, #medium) { #medium };
      case (#_19plus, #under2hrs, #rare, #low) { #low };
      case (_) { #medium };
    };

    let recommendation = switch (concernLevel) {
      case (#high) { "High concern: Limit screen time, balance activities, promote healthy food choices." };
      case (#medium) { "Medium concern: Monitor ad exposure, moderate screen use, encourage healthy habits." };
      case (#low) { "Low concern: Continue current habits, maintain healthy lifestyle balance." };
    };

    let prediction : Prediction = {
      userId = caller;
      timestamp = time();
      ageGroup;
      gender;
      screenTime;
      platform;
      frequency;
      adType;
      adPersuasiveness;
      concernLevel;
      recommendation;
    };

    let currentId = nextPredictionId;
    predictions.add(currentId, prediction);
    nextPredictionId += 1;

    (concernLevel, recommendation);
  };

  func time() : Int { 0 };

  public query ({ caller }) func getPredictionCount() : async Nat {
    predictions.size();
  };

  public query ({ caller }) func getConcernDistribution() : async {
    low : Nat;
    medium : Nat;
    high : Nat;
  } {
    var low = 0;
    var medium = 0;
    var high = 0;

    predictions.values().forEach(func(prediction) {
      switch (prediction.concernLevel) {
        case (#low) { low += 1 };
        case (#medium) { medium += 1 };
        case (#high) { high += 1 };
      };
    });
    {
      low;
      medium;
      high;
    };
  };

  public query ({ caller }) func getPredictionsByAgeGroup(ageGroup : AgeGroup) : async [Prediction] {
    predictions.values().toArray().sort().filter(func(p) { p.ageGroup == ageGroup });
  };

  public query ({ caller }) func getPredictionsByGender(gender : Gender) : async [Prediction] {
    predictions.values().toArray().sort().filter(func(p) { p.gender == gender });
  };

  public query ({ caller }) func getAllPredictions() : async [Prediction] {
    predictions.values().toArray().sort();
  };

  public query ({ caller }) func getPredictionsByConcernLevel(concernLevel : ConcernLevel) : async [Prediction] {
    predictions.values().toArray().filter(func(p) { p.concernLevel == concernLevel });
  };
};
