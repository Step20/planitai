const reviews = [
  {
    name: "Ajit Singh",
    tag: "Digital Nomad",
    text: "PlanIt has been fantastic for me as a digital nomad that makes short trips most weekends. I’ve been able to quickly find the best places to visit in new areas. All without having to spend hours on google or reading through tabs of travel blogs.",
    avatar:
      "https://images.pexels.com/photos/3930029/pexels-photo-3930029.jpeg?cs=srgb&dl=pexels-yogendras31-3930029.jpg&fm=jpg",
  },
  {
    name: "Marta López",
    tag: "Avid traveller",
    text: "Traveling relaxes me and brings me joy. I love PlanIt because it helps me get a quick overview of what to expect on my next trip. I still go for some local friends for advice but amazing how much of the work it already does for me.",
    avatar:
      "https://media.istockphoto.com/id/1446043855/photo/black-woman-on-road-enjoying-window-view-of-desert-and-traveling-in-jeep-on-holiday-road-trip.jpg?s=612x612&w=0&k=20&c=L9D0ysLsdvfGozIt5MQBFI7QNkIQ8lLZrHc0vPhQ9q8=",
  },
  {
    name: "James Cooper",
    tag: "Backpacker",
    text: "Love how quick and simple this is to use. Have recommended it to all my friends. Will definitely be using it for my next backpacking trip to Bali.",
    avatar:
      "https://expertvagabond.com/wp-content/uploads/matthew-karsten-travel-blogger-headshot-1.jpg",
  },
];

export default function HomePeopleSection() {
  return (
    <section className="bg-white py-30 px-6 text-center">
      <h2 className="text-4xl font-black mb-12">What people are saying</h2>
      <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
        {reviews.map((r, idx) => (
          <div
            key={idx}
            className="border rounded-xl bg-white p-6 text-left h-110 shadow-md hover:shadow-lg transition"
          >
            <div className="flex items-center mb-4">
              <img
                src={r.avatar}
                alt={r.name}
                className="w-12 h-12 rounded-full mr-3 bg-grey object-cover"
              />
              <div>
                <div className="text-sm font-bold text-gray-900">{r.name}</div>
                <div className="text-xs text-gray-500">{r.tag}</div>
              </div>
            </div>
            <div className="relative text-gray-700 text-sm">
              <span className="absolute text-3xl text-gray-300 top-[-10px] left-[-10px]">
                “
              </span>
              <p className="leading-8">{r.text}</p>
              <span className="absolute text-3xl text-gray-300 bottom-[-10px] right-[-10px]">
                ”
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
