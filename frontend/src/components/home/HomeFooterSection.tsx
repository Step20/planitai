export default function HomeFooterSection() {
  return (
    <footer className=" bg-[#101010] text-gray-400 pt-10 pb-5">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 px-6">
        <div>
          <h3 className="font-bold text-white mb-2">Traveler</h3>
          <p>AI travel itineraries and trip plans curated just for you.</p>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-2">Category</h4>
          <ul className="space-y-1 text-sm">
            <li>City Guides</li>
            <li>Weekend Trips</li>
            <li>Adventure Travel</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-2">Destinations</h4>
          <ul className="space-y-1 text-sm">
            <li>Europe</li>
            <li>Asia</li>
            <li>America</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-2">Support</h4>
          <ul className="space-y-1 text-sm">
            <li>Help Center</li>
            <li>Privacy Policy</li>
            <li>Terms of Use</li>
          </ul>
        </div>
      </div>
      <div className="text-center text-sm mt-10 text-gray-500">
        © 2025 PlanIt AI. All rights reserved.
      </div>
    </footer>
  );
}
