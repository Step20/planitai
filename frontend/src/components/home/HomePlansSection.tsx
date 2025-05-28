const plans = [
  {
    title: "Planit Free",
    price: "Free",
    features: [
      "Limited trip generation",
      "Basic AI itinerary",
      "No calendar export",
      "No PDF export",
    ],
    highlight: false,
    action: "Sign Up – Free",
  },
  {
    title: "Planit Explorer",
    price: "$20 per year",
    features: [
      "Unlimited trip generation",
      "Export to PDF",
      "Calendar sync",
      "Live travel updates",
    ],
    highlight: true,
    action: "Explorer Plan",
  },
  {
    title: "Planit Pro",
    price: "$15 per year",
    features: [
      "Unlimited smart trips",
      "Priority GPT planning",
      "Collaborative trips",
      "AI-based suggestions",
    ],
    highlight: false,
    action: "Explorer Plan",
  },
];

export default function HomePlansSection() {
  return (
    <section className="py-20 bg-white text-center h-full">
      <h2 className="text-4xl font-bold mb-10">Pricing Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`rounded-xl border p-6 shadow-md ${
              plan.highlight ? "bg-black text-white scale-105" : "bg-white"
            }`}
          >
            <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>
            <p className="text-3xl font-bold mb-4">{plan.price}</p>
            <ul className="text-left mb-6 space-y-2 text-sm">
              {plan.features.map((feat, i) => (
                <li key={i}>✅ {feat}</li>
              ))}
            </ul>
            <button
              className={`w-full px-4 py-2 font-semibold rounded ${
                plan.highlight
                  ? "bg-white text-black"
                  : "bg-black text-white hover:bg-gray-900"
              }`}
            >
              {plan.action}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
