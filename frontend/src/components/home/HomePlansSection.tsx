const plans = [
  {
    title: "PlanIt Free",
    price: "Free",
    features: [
      "Limited trip generation",
      "Basic AI itinerary",
      "No calendar export",
      "No PDF export",
    ],
    highlight: false,
    action: "Sign Up – Free",
    subtext: "Learn more about Free Version",
  },
  {
    title: "PlanIt Explorer",
    price: "$20 per year",
    features: [
      "Unlimited trip generation",
      "Export to PDF",
      "Calendar sync",
      "Live travel updates",
    ],
    highlight: true,
    action: "Explorer Plan",
    subtext: "Learn more about Explorer Version",
  },
  {
    title: "PlanIt Pro",
    price: "$15 per year",
    features: [
      "Unlimited smart trips",
      "Priority GPT planning",
      "Collaborative trips",
      "AI-based suggestions",
    ],
    highlight: false,
    action: "Pro Plan",
    subtext: "Learn more about Pro Version",
  },
];

export default function HomePlansSection() {
  return (
    <section className="py-20 bg-white text-center">
      <h2 className="text-4xl font-black mb-12">Pricing Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto ">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`flex flex-col justify-between rounded-2xl border px-8 py-4 h-120 shadow-lg transition transform ${
              plan.highlight
                ? "bg-black text-white scale-110 "
                : "bg-white text-black"
            }`}
          >
            <div>
              <h3 className="text-xl font-semibold mb-.5">{plan.title}</h3>
              <p className="text-3xl font-extrabold mb-1">{plan.price}</p>
              <hr className="mb-4 opacity-15 mt-4"></hr>
              <ul className="text-left space-y-3 text-sm mb-8">
                {plan.features.map((feat, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <span className="text-lg">✔️</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <button
                className={`w-full py-3 rounded-lg font-semibold transition ${
                  plan.highlight
                    ? "bg-white text-black hover:bg-gray-200"
                    : "bg-black text-white hover:bg-gray-900"
                }`}
              >
                {plan.action}
              </button>
              <p className="text-xs mt-2 opacity-70">{plan.subtext}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
