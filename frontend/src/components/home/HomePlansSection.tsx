import { motion, useInView } from "motion/react";

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

export default function HomePlansSection({ show }: { show: boolean }) {
  const orderedPlans = [
    plans[0], // Explorer (highlight)
    plans[1], // Pro
    plans[2], // Free
  ];

  return (
    <>
      <section className="py-20 bg-white text-center">
        {show ? (
          <>
            <h2 className="text-4xl font-black mb-2">Pricing Plans</h2>
            <p className="text-lg mb-12 w-180 mx-auto">
              Simple and transparent pricing. No hidden fees. Cancel anytime.
            </p>
          </>
        ) : (
          <h2 className="text-4xl font-black mb-12">Pricing Plans</h2>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto ">
          {orderedPlans.map((plan, idx) => (
            <div
              key={plan.title}
              className={`flex flex-col justify-between rounded-2xl border px-8 py-4 h-120 shadow-md hover:shadow-lg  transition transform ${
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
      <div className="text-center mt-4 mb-10">
        <p className="text-xl mb-4">
          It's nothing like any other travel planner. We are confident you will
          love it!
        </p>
        <a href="/explore">
          <button className="bg-indigo-600 font-semibold rounded-md px-3 py-2.5 text-xl text-white shadow-sm hover:bg-indigo-700 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600">
            Try it for free
          </button>
        </a>
      </div>
    </>
  );
}
