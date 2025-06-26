export default function HomeTopSection() {
  return (
    <div className="hts-container ">
      <div className="hts-left">
        <img
          src="https://cdn.getyourguide.com/img/tour/6e9a6a4ea774e61c9d92a2eb0d3542583b60924429c23fe0a372ef22de4e5236.jpeg/155.jpg"
          alt="Home Top Section"
        />
      </div>
      <div className="hts-right">
        <div className="form-card ">
          <h1 className="font-black text-4xl mb-2">Plan Your Next Trip</h1>
          <p className="text-gray-500 mb-5">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </p>
          <form>
            <div className=" grid grid-cols-1 gap-x-6 gap-y-4.5 sm:grid-cols-6">
              <div className="col-span-full">
                <label htmlFor="location">Location</label>
                <input
                  className="block w-full rounded-md bg-white px-3 py-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  type="text"
                  id="location"
                  placeholder="Enter your location"
                  required
                />
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="date">Check In</label>
                <input
                  className="block w-full rounded-md bg-white px-3 py-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  placeholder="Add Date"
                  type="date"
                  id="date"
                  required
                />
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="date">Check Out</label>
                <input
                  className="block w-full rounded-md bg-white px-3 py-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  placeholder="Add Date"
                  type="date"
                  id="date"
                  required
                />
              </div>
              <div className="sm:col-span-2 ">
                <label htmlFor="travelers">Travelers</label>
                <input
                  type="number"
                  id="travelers"
                  placeholder="Add number of travelers"
                  required
                  className="block w-full rounded-md bg-white px-3 py-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
              {/* <div className="sm:col-span-2 ">
                <label htmlFor="days">Days</label>
                <input
                  type="number"
                  id="days"
                  placeholder="Add number of days"
                  required
                  className="block w-full rounded-md bg-white px-3 py-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div> */}
              <div className="sm:col-span-2">
                <label htmlFor="budget">Budget</label>
                <input
                  type="number"
                  id="budget"
                  placeholder="Add Budget"
                  required
                  className="block w-full rounded-md bg-white px-3 py-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>

              <div className="sm:col-span-2 ">
                <label htmlFor="personalize">Personalize</label>
                <input
                  type="text"
                  id="personalize"
                  placeholder="Add personality tag"
                  required
                  className="block w-full rounded-md bg-white px-3 py-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <button className="mt-6 w-full rounded-md bg-indigo-600 px-3 py-3 text-base text-white shadow-sm hover:bg-indigo-700 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600">
              Get Started — Plan your Trip
            </button>
          </form>
        </div>
      </div>
      <div className="hts-download mb-5 mr-5">
        <a href="/download">
          <img
            width={110}
            height={100}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/1280px-Download_on_the_App_Store_Badge.svg.png"
            alt="Apple Download"
          />
        </a>
        <a href="/download">
          <img
            width={110}
            height={100}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png"
            alt="Android Download"
          />
        </a>
      </div>
    </div>
  );
}
