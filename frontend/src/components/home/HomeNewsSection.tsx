export default function HomeNewsSection() {
  return (
    <div
      style={{
        height: 450,
        backgroundImage: `url(https://images.pexels.com/photos/11003648/pexels-photo-11003648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`,
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="w-300 m-auto bg-[#101010] py-16 text-white text-center"
        style={{ borderRadius: 25 }}
      >
        <h2 className="text-4xl font-bold mb-4 w-190 m-auto">
          Never miss out on exciting travel news and offers with Traveler!
        </h2>
        <p className="text-gray-300 w-200 m-auto mb-6">
          Join our community of dreamers, and be the first to know about deals,
          new destinations, travel tips and be the first to know about deals,
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
            className="bg-white text-black px-6 border border-white py-3 rounded-r-lg font-semibold hover:bg-gray-100"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}
