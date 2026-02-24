# Specification

## Summary
**Goal:** Build AdAware, an Explainable AI decision-support web application for predicting adolescent concern levels over unhealthy food advertisements, with mock ML insights, analytics dashboard, and health recommendations.

**Planned changes:**
- Implement Motoko backend actor to store prediction records (userId, timestamp, 7 input features, concern level, recommendation) and provide analytics methods (total predictions, concern distribution, age/gender breakdowns)
- Create Home page with project overview, hero section, and call-to-action button
- Build Predict page with 7-field input form (Age Group, Gender, Daily Screen Time, Primary Platform, Ad Frequency, Ad Type, Ad Persuasiveness) and loading animation
- Create Results page displaying predicted concern level badge (Low/Medium/High), personalized health recommendation, SHAP explanation placeholder, and PDF download button
- Implement Model Insights page showing mock ML performance metrics (Accuracy, Precision, Recall, F1), confusion matrix heatmap, feature importance bar chart, and Random Forest vs Logistic Regression comparison chart
- Build Admin Dashboard page with total predictions counter, concern distribution pie chart, age group analysis chart, and gender bias visualization using backend data
- Create About Project page with sections for objective, ML pipeline overview, SHAP/Explainable AI explanation, ethical AI considerations, future scope, and Random Forest justification
- Implement responsive navigation bar linking all pages with consistent Tailwind CSS layout using health + AI aesthetic (clean, minimal design with smooth animations)
- Integrate Chart.js library for all data visualizations with interactive tooltips
- Implement PDF report generation from Results page including user inputs, prediction, SHAP summary placeholder, recommendation, and timestamp

**User-visible outcome:** Users can input adolescent demographic and ad exposure data through a prediction form, receive a concern level prediction (Low/Medium/High) with personalized health recommendations, view mock ML model insights and performance metrics, download PDF reports, and access an admin dashboard showing prediction analytics and bias analysis across age groups and gender.
