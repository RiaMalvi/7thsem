import React from 'react'

const About = () => {
  return (
    <div className="bg-gray-50 p-4 pb-16">
      <div className="max-w-8xl px-24 mx- mx-20 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Left Sidebar - Reminders */}
        <div className="col-span-1 bg-white p-4 rounded-lg shadow-md text-black">
          <h2 className="text-xl font-bold text-gray-700">Reminders</h2>
          <ul className="mt-4 space-y-3">
            <li className="bg-gray-200 p-3 rounded-md shadow-sm">
              Group study session on Tuesday in the science building, room 315
            </li>
            <li className="bg-gray-200 p-3 rounded-md shadow-sm">
              Onion rings special this Friday at the cafeteria
            </li>
            <li className="bg-gray-200 p-3 rounded-md shadow-sm">
              Return Chemistry textbook to the library by Thursday at 4:00pm
            </li>
            <li className="bg-gray-200 p-3 rounded-md shadow-sm">
              Site visit to Harold Melner`&apos;`s hospital on Wednesday afternoon
            </li>
            <li className="bg-gray-200 p-3 rounded-md shadow-sm">
              Volunteer at the children`&apos;`s home this Sunday
            </li>
          </ul>
        </div>

        {/* Center Section - About */}
        <div className="col-span-2 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800">
            2026/2027 Financial Aid Update
          </h2>
          <p className="mt-4 text-gray-600">
            Financial aid for the year 2026/2027 will be disbursed on February
            15th, 2025. Students are asked to check in with the accounts office
            to make sure all relevant documentation is provided and any
            grievances ironed out. Incoming freshmen are asked to fill out the
            necessary forms before Thanksgiving break and have them at the
            accounts office no later than December 2nd. The accounts office will
            be closed throughout Thanksgiving and will reopen the following
            Monday. Have a wonderful day!
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8">
            Gaia Dorm Closed for Renovations
          </h2>
          <p className="mt-4 text-gray-600">
            Starting Monday, July 7th, 2025, Gaia Dorm will be closed for
            renovations. The 8-year-old building will undergo maintenance work
            to improve living conditions and will be ready to reopen for the
            upcoming semester.
          </p>
        </div>

        {/* Right Sidebar - Announcements */}
        <div className="col-span-1 bg-white p-4 rounded-lg shadow-md text-black">
          <h2 className="text-xl font-bold text-gray-700">Upcoming Events</h2>
          <ul className="mt-4 space-y-3">
            <li className="bg-gray-100 p-3 rounded-md shadow-sm">
              Leadership Conference
            </li>
            <li className="bg-gray-100 p-3 rounded-md shadow-sm">
              Women`&apos;`s Soccer vs Badgers
            </li>
            <li className="bg-gray-100 p-3 rounded-md shadow-sm">
              Magic Show
            </li>
            <li className="bg-gray-100 p-3 rounded-md shadow-sm">
              Men`&apos;`s Basketball vs Eagles
            </li>
            <li className="bg-gray-100 p-3 rounded-md shadow-sm">
              Fall Finals
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default About;
