import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AuthForm } from '@/components/auth_form';



const LandingPage = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
        <div className="relative bg-blue-600 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
                Discover Your Perfect Home
                </h1>
                <p className="mt-3 max-w-md mx-auto text-lg text-blue-100 sm:text-xl md:mt-5 md:max-w-3xl">
                The most comprehensive real estate platform combining property listings with local insights.
                </p>
                
                <div className="mt-10 max-w-xl mx-auto">
                    <div className="flex flex-col items-center space-y-4 rounded-md">
                       
                      
                        <AuthForm/>
                        <Button asChild className="w-auto px-6 bg-white hover:bg-gray-100 text-blue-700 font-medium py-2 rounded-md shadow-sm transition duration-150 ease-in-out mx-auto mt-4">
                        <Link to={"/sampleSearchLocation"} className="flex items-center justify-center">
                            View Sample Search Results
                        </Link>
                        </Button>
                    </div>
                </div>

            </div>
        </div>

      {/* Feature Sections */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Real Estate Market Overview
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Browse properties and explore local community information all in one place.
            </p>
          </div>

          {/* Property Section with Screenshots */}
          <div className="mt-16">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
              <div className="lg:col-span-5">
                <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  For Sale and For Rent Options
                </h2>
                <p className="mt-3 text-lg text-gray-500">
                  Browse our extensive property listings with detailed information on homes for sale and rent. From affordable starter homes to spacious family residences, find exactly what you're looking for.
                </p>
                <div className="mt-8 flex space-x-4">
                  <button className="px-5 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors">
                    For Sale
                  </button>
                  <button className="px-5 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors">
                    For Rent
                  </button>
                </div>
              </div>
              <div className="mt-12 lg:mt-0 lg:col-span-7">
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                  {/* Property Listings Screenshot */}
                  <div className="relative w-full h-64 bg-gray-200">
                    <img 
                      src="src/assets/landing_page_pictures/real_estate_for_Rent_data.png" 
                      alt="Property listings showing homes for rent and sale" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
                      Property Listings
                    </div>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium text-gray-900">Featured Properties</h3>
                    <div className="mt-4 bg-gray-50 p-4 rounded-md">
                      <p className="text-sm text-gray-600">
                        Our platform features detailed property listings with:
                      </p>
                      <ul className="mt-2 text-sm text-gray-600 space-y-1">
                        <li>• Pricing information for sale and rental properties</li>
                        <li>• Bedroom and bathroom counts</li>
                        <li>• Square footage details</li>
                        <li>• High-quality property images</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Feature with Screenshot */}
          <div className="mt-16">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
              <div className="lg:col-span-7">
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                  {/* Map Screenshot */}
                  <div className="relative w-full h-64 bg-gray-200">
                    <img 
                      src="src/assets/landing_page_pictures/map_with_all_locations.png" 
                      alt="Interactive map with location markers" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
                      Interactive Map
                    </div>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium text-gray-900">Interactive Location Map</h3>
                    <div className="mt-4 bg-gray-50 p-4 rounded-md">
                      <p className="text-sm text-gray-600">
                        Our interactive map shows:
                      </p>
                      <ul className="mt-2 text-sm text-gray-600 space-y-1">
                        <li>• Color-coded location markers for different point types</li>
                        <li>• Cluster view for areas with multiple points of interest</li>
                        <li>• Filter options to view different categories</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-12 lg:mt-0 lg:col-span-5">
                <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  Explore the Neighborhood
                </h2>
                <p className="mt-3 text-lg text-gray-500">
                  Our interactive map helps you explore the area around your potential new home. View nearby universities, hospitals, corporate offices, and more to understand the community.
                </p>
                <div className="mt-8">
                  <div className="flex flex-wrap gap-2">
                    <button className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm">
                      Universities
                    </button>
                    <button className="px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm">
                      Hospitals
                    </button>
                    <button className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm">
                      Corporate Offices
                    </button>
                    <button className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm">
                      Banks
                    </button>
                    <button className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm">
                      Parks
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Universities Section with Screenshot */}
          <div className="mt-16">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
              <div className="lg:col-span-5">
                <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  Local Education Options
                </h2>
                <p className="mt-3 text-lg text-gray-500">
                  Find detailed information about local universities and colleges to help make informed decisions about your new neighborhood.
                </p>
              </div>
              <div className="mt-12 lg:mt-0 lg:col-span-7">
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                  {/* University Screenshot */}
                  <div className="relative w-full h-64 bg-gray-200">
                    <img 
                      src="src/assets/landing_page_pictures/map_with_universities.png" 
                      alt="List of universities in the area" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
                      University Listings
                    </div>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium text-gray-900">Universities in the Area</h3>
                    <div className="mt-4 bg-gray-50 p-4 rounded-md">
                      <p className="text-sm text-gray-600">
                        Our platform displays detailed information about educational institutions in your area of interest, including:
                      </p>
                      <ul className="mt-2 text-sm text-gray-600 space-y-1">
                        <li>• Location and contact information</li>
                        <li>• User reviews and ratings</li>
                        <li>• Campus details and amenities</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Crime Statistics with Screenshot */}
          <div className="mt-16">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
              <div className="lg:col-span-7">
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                  {/* Crime Chart Screenshot */}
                  <div className="relative w-full h-64 bg-gray-200">
                    <img 
                      src="src/assets/landing_page_pictures/crime_stats.png" 
                      alt="Crime rate trends chart" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
                      Crime Statistics
                    </div>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium text-gray-900">Crime Rate Trends</h3>
                    <div className="mt-4 bg-gray-50 p-4 rounded-md">
                      <p className="text-sm text-gray-600">
                        Our platform provides:
                      </p>
                      <ul className="mt-2 text-sm text-gray-600 space-y-1">
                        <li>• Historical crime data visualization</li>
                        <li>• Comparison between local and national rates</li>
                        <li>• Monthly and yearly trend analysis</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-12 lg:mt-0 lg:col-span-5">
                <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  Safety Information
                </h2>
                <p className="mt-3 text-lg text-gray-500">
                  View crime statistics and trends for different areas to help you make informed decisions about neighborhood safety.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default LandingPage;