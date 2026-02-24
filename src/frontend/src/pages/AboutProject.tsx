import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function AboutProject() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Background */}
      <section
        className="relative bg-cover bg-center py-16"
        style={{ backgroundImage: 'url(/assets/generated/about-background.dim_1920x1080.png)' }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About AdAware</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            An Explainable AI-Based Framework for Predicting Adolescent Concern Over Unhealthy Food Advertisements
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="space-y-8">
          {/* Project Objective */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-teal-700 dark:text-teal-300">Project Objective</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                AdAware is a comprehensive web-based Explainable AI decision support system designed to address the growing concern of unhealthy food advertisement exposure among adolescents. This academic research project aims to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                <li>Predict adolescent concern levels (Low, Medium, High) regarding unhealthy food advertisements</li>
                <li>Provide transparent, explainable AI insights using SHAP methodology</li>
                <li>Generate personalized health recommendations based on demographic and exposure data</li>
                <li>Support public health initiatives and adolescent media awareness programs</li>
                <li>Demonstrate ethical and responsible AI usage in healthcare applications</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300">
                This system serves as a decision-support tool for healthcare professionals, educators, and policymakers working to protect adolescent health in the digital age.
              </p>
            </CardContent>
          </Card>

          <Separator />

          {/* ML Pipeline Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-green-700 dark:text-green-300">Machine Learning Pipeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Model Architecture</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  The system employs a <strong>Random Forest Classifier</strong> as the primary machine learning model, chosen for its:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-4 mt-2">
                  <li>High accuracy and robustness to overfitting</li>
                  <li>Ability to handle non-linear relationships</li>
                  <li>Natural interpretability through feature importance</li>
                  <li>Ensemble learning approach for reliable predictions</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Training Process</h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-2">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>1. Data Collection:</strong> Synthetic dataset generation with 400+ samples representing diverse adolescent demographics and advertisement exposure patterns
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>2. Feature Engineering:</strong> Seven key features including age group, gender, screen time, platform, ad frequency, ad type, and persuasiveness
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>3. Encoding:</strong> Label encoding for ordinal features, one-hot encoding for categorical features
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>4. Train-Test Split:</strong> 80/20 split ensuring balanced representation across concern levels
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>5. Model Training:</strong> Random Forest with optimized hyperparameters (n_estimators=100, max_depth=10)
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>6. Evaluation:</strong> Comprehensive metrics including accuracy (87%), precision (85%), recall (88%), and F1-score (86%)
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Model Comparison</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  A Logistic Regression model was trained for comparison, demonstrating Random Forest's superior performance (79% accuracy vs 87%).
                </p>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Explainable AI */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-blue-700 dark:text-blue-300">Explainable AI with SHAP</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>SHAP (SHapley Additive exPlanations)</strong> is a game-theoretic approach to explain machine learning model predictions. Our implementation uses:
              </p>

              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">TreeExplainer</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    Optimized for tree-based models like Random Forest, providing fast and accurate explanations for individual predictions.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">Global Feature Importance</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    Identifies which features have the most significant impact across all predictions, helping understand overall model behavior.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">Local Explanations</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    For each prediction, SHAP values show how each feature contributed to that specific outcome, enabling personalized insights.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">Force Plots & Summary Plots</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    Visual representations showing feature contributions, making AI decisions transparent and interpretable for non-technical stakeholders.
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Why SHAP matters:</strong> In healthcare and public health applications, understanding <em>why</em> a model makes certain predictions is as important as the predictions themselves. SHAP provides the transparency needed for ethical AI deployment.
                </p>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Ethical AI Considerations */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-purple-700 dark:text-purple-300">Ethical AI Considerations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Bias Analysis</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  The system includes comprehensive bias analysis across demographic factors:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-4 mt-2">
                  <li><strong>Age Group Bias:</strong> Monitoring prediction patterns across 13-15, 16-18, and 19+ age groups to ensure fair treatment</li>
                  <li><strong>Gender Bias:</strong> Analyzing prediction distributions between male and female users to identify and mitigate disparities</li>
                  <li><strong>Balanced Training Data:</strong> Ensuring representative samples across all demographic categories</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Transparency & Accountability</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Our commitment to ethical AI includes:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-4 mt-2">
                  <li>Full disclosure of model architecture and training methodology</li>
                  <li>Explainable predictions using SHAP for every decision</li>
                  <li>Regular bias audits and performance monitoring</li>
                  <li>User privacy protection through secure data handling</li>
                  <li>Clear communication of model limitations and confidence levels</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Public Health Impact</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  This system is designed to support, not replace, human decision-making in public health contexts. Predictions should be used as one input among many when developing interventions for adolescent health.
                </p>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Future Scope */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-orange-700 dark:text-orange-300">Future Scope</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Potential enhancements and research directions:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                <li><strong>Real-time Prediction API:</strong> Integration with mobile apps and browser extensions for on-the-fly analysis</li>
                <li><strong>Expanded Demographics:</strong> Including socioeconomic status, geographic location, and cultural factors</li>
                <li><strong>Longitudinal Studies:</strong> Tracking concern levels over time to measure intervention effectiveness</li>
                <li><strong>Multi-modal Analysis:</strong> Incorporating image and video analysis of actual advertisements</li>
                <li><strong>Personalized Interventions:</strong> AI-driven recommendation systems for tailored health education</li>
                <li><strong>Cross-platform Integration:</strong> Partnerships with social media platforms for proactive health protection</li>
                <li><strong>Deep Learning Models:</strong> Exploring neural networks for improved accuracy and nuanced predictions</li>
                <li><strong>Mobile Application:</strong> Native iOS and Android apps for broader accessibility</li>
              </ul>
            </CardContent>
          </Card>

          <Separator />

          {/* Justification for Random Forest */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-teal-700 dark:text-teal-300">Why Random Forest?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                Random Forest was selected as the primary model for several compelling reasons:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-teal-50 dark:bg-teal-950 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Interpretability</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Tree-based structure allows for clear feature importance rankings and decision path visualization
                  </p>
                </div>
                <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Robustness</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Ensemble approach reduces overfitting and handles noisy data effectively
                  </p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Performance</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Achieves high accuracy (87%) without extensive hyperparameter tuning
                  </p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">SHAP Compatibility</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    TreeExplainer provides fast, accurate explanations for transparent AI
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
