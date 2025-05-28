export default function HomeNewsSection() {
  return (
    <section className="relative  bg-[#101010] py-16 text-white text-center">
      <h2 className="text-3xl font-bold mb-4">
        Never miss out on exciting travel news and offers with Traveler!
      </h2>
      <p className="text-gray-300 mb-6">
        Join our community of dreamers, and be the first to know about deals,
        new destinations, travel tips & more.
      </p>
      <form className="max-w-xl mx-auto flex items-center">
        <input
          type="email"
          style={{ color: "white" }}
          placeholder="Input your email for subscribe"
          className="w-full px-4 py-3 border border-white rounded-l-lg  focus:outline-none"
        />
        <button
          type="submit"
          className="bg-white text-black px-6 border border-white py-3 rounded-r-lg font-bold hover:bg-gray-300"
        >
          Subscribe
        </button>
      </form>
    </section>
  );
}
