import { RiRoadMapLine } from "react-icons/ri";
export default function HomeFooterSection() {
  return (
    <footer className="relative bg-[#101010] text-gray-400 pt-16 pb-10 overflow-hidden">
      {/* Faded background word */}
      <div className="absolute top-0 left-0 w-full text-center text-[30vw] font-extrabold tracking-tight select-none pointer-events-none">
        <span className="bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a] to-[#3a3a3a] bg-clip-text text-transparent">
          PlanIt
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo + Tagline */}
        <div>
          <div className="flex items-center mb-3 gap-2">
            {/* Replace with actual logo image if needed */}
            <RiRoadMapLine size={30} />
            <span className="text-white font-bold text-lg">PlanIt</span>
          </div>
          <p className="text-sm mb-4">
            The world’s hidden treasures are at your fingertips, waiting to be
            discovered
          </p>

          <div className="flex gap-2 mt-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
              className="h-10"
            />
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="App Store"
              className="h-10"
            />
          </div>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-white font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li>About Us</li>
            <li>News Room</li>
            <li>New Features</li>
            <li>Career</li>
            <li>Investor</li>
          </ul>
        </div>

        {/* Destinations */}
        <div>
          <h4 className="text-white font-semibold mb-3">Destinations</h4>
          <ul className="space-y-2 text-sm">
            <li>Exotic Beach</li>
            <li>Cultural Capitals</li>
            <li>Adventure Escapes</li>
            <li>Family Vacations</li>
            <li>Luxury Travel</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-white font-semibold mb-3">Support</h4>
          <ul className="space-y-2 text-sm">
            <li>Help Center</li>
            <li>Anti-discrimination</li>
            <li>Disability Support</li>
            <li>Cancellation Options</li>
            <li>Report Neighborhood Concern</li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal Row */}
      <div className="relative z-10 mt-12 text-center text-sm text-gray-500 space-x-4">
        <span>© 2025 PlanIt. All rights reserved.</span>
        <a href="#" className="hover:underline">
          Privacy Policy
        </a>
        <a href="#" className="hover:underline">
          Terms of Service
        </a>
        <a href="#" className="hover:underline">
          Manage Cookies
        </a>
      </div>
    </footer>
  );
}
