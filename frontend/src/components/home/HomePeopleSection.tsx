const reviews = [
  {
    name: "Ali Singh",
    tag: "Digital Nomad",
    text: "Roam Around has been fantastic for me as a solo digital nomad. The instant plans have saved me hours of research.",
  },
  {
    name: "Maria López",
    tag: "Traveler",
    text: "It brings my trips to life! I love being able to explore cities on my own terms with AI suggestions.",
  },
  {
    name: "James Cooper",
    tag: "Backpacker",
    text: "The itinerary builder is great — it made my trip through Europe seamless. I recommend it to anyone solo backpacking too.",
  },
];

export default function HomePeopleSection() {
  return (
    <section className="bg-white py-20 px-6 text-center">
      <h2 className="text-3xl font-bold mb-10">What people are saying</h2>
      <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
        {reviews.map((r, idx) => (
          <div
            key={idx}
            className="border p-6 rounded-xl bg-gray-50 text-left shadow-sm"
          >
            <p className="text-gray-700 mb-4">“{r.text}”</p>
            <div className="text-sm font-semibold text-gray-800">
              {r.name} <span className="text-xs text-gray-500">· {r.tag}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
