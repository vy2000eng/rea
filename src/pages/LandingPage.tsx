import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AuthForm } from '@/components/auth_form';



const LandingPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
    {/* Hero Section */}
      <div className="relative bg-slate-800 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              Discover Your Ideal Location
              </h1>
              <p className="mt-3 max-w-md mx-auto text-lg text-gray-300 sm:text-xl md:mt-5 md:max-w-3xl">
              The most comprehensive location intelligence platform combining property data with local area insights.
              </p>
              
              <div className="mt-10 max-w-xl mx-auto">
                  <div className="flex flex-col items-center space-y-4 rounded-md">
                     
                    
                      <AuthForm/>
                      <Button asChild className="w-auto px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded-md shadow-sm transition duration-150 ease-in-out mx-auto mt-4">
                      <Link to={"/sampleSearchLocation"} className="flex items-center justify-center">
                          View Sample Research Results
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
            Location Intelligence Platform
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Research neighborhoods and explore local community information all in one place.
          </p>
        </div>

        {/* Property Section with Screenshots */}
        <div className="mt-16">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            <div className="lg:col-span-5">
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Comprehensive Property Data
              </h2>
              <p className="mt-3 text-lg text-gray-500">
                Access detailed property information to understand market trends, pricing variations, and availability across different neighborhoods. Compare options to identify the best areas for your specific needs.
              </p>
              <div className="mt-8 flex space-x-4">
                <button className="px-5 py-3 bg-emerald-600 text-white font-medium rounded-md hover:bg-emerald-700 transition-colors">
                  Market Trends
                </button>
                <button className="px-5 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors">
                  Property Analysis
                </button>
              </div>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-7">
              <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                {/* Property Listings Screenshot */}
                <div className="relative w-full h-64 bg-gray-200">
                  <img 
                    src="/landing_page_pictures/real_estate_for_Rent_data.png" 
                    alt="Property data showing market trends and statistics" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 bg-emerald-600 px-3 py-1 rounded-full text-sm font-medium text-white shadow-md">
                    Property Analytics
                  </div>
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">Detailed Market Insights</h3>
                  <div className="mt-4 bg-gray-50 p-4 rounded-md">
                    <p className="text-sm text-gray-600">
                      Our platform provides comprehensive property data:
                    </p>
                    <ul className="mt-2 text-sm text-gray-600 space-y-1">
                      <li>• Pricing trends and market analysis</li>
                      <li>• Property specifications and details</li>
                      <li>• Square footage and value comparisons</li>
                      <li>• Historical price data and forecasting</li>
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
                    src="/landing_page_pictures/map_with_all_locations.png" 
                    alt="Interactive map with location markers" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 bg-emerald-600 px-3 py-1 rounded-full text-sm font-medium text-white shadow-md">
                    Interactive Map
                  </div>
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">Location Intelligence Map</h3>
                  <div className="mt-4 bg-gray-50 p-4 rounded-md">
                    <p className="text-sm text-gray-600">
                      Our interactive map provides:
                    </p>
                    <ul className="mt-2 text-sm text-gray-600 space-y-1">
                      <li>• Color-coded location markers for different point types</li>
                      <li>• Cluster view for areas with multiple points of interest</li>
                      <li>• Custom filtering options for tailored research</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-5">
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Explore Area Demographics
              </h2>
              <p className="mt-3 text-lg text-gray-500">
                Our interactive maps help you research and analyze neighborhoods by visualizing key location data. View nearby universities, hospitals, corporate offices, and more to understand community infrastructure.
              </p>
              <div className="mt-8">
                <div className="flex flex-wrap gap-2">
                  <button className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                    Universities
                  </button>
                  <button className="px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm">
                    Hospitals
                  </button>
                  <button className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm">
                    Corporate Offices
                  </button>
                  <button className="px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm">
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
                Educational Institution Data
              </h2>
              <p className="mt-3 text-lg text-gray-500">
                Research detailed information about local universities and colleges to analyze educational opportunities in potential neighborhoods.
              </p>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-7">
              <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                {/* University Screenshot */}
                <div className="relative w-full h-64 bg-gray-200">
                  <img 
                    src="/landing_page_pictures/map_with_universities.png" 
                    alt="List of universities in the area" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 bg-emerald-600 px-3 py-1 rounded-full text-sm font-medium text-white shadow-md">
                    Education Analysis
                  </div>
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">Academic Institutions Database</h3>
                  <div className="mt-4 bg-gray-50 p-4 rounded-md">
                    <p className="text-sm text-gray-600">
                      Our platform provides detailed educational data:
                    </p>
                    <ul className="mt-2 text-sm text-gray-600 space-y-1">
                      <li>• Comprehensive institution profiles</li>
                      <li>• Geographic distribution analysis</li>
                      <li>• Program offerings and specializations</li>
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
                    src="/landing_page_pictures/crime_stats.png" 
                    alt="Crime rate trends chart" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 bg-emerald-600 px-3 py-1 rounded-full text-sm font-medium text-white shadow-md">
                    Safety Analytics
                  </div>
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">Safety Trend Analysis</h3>
                  <div className="mt-4 bg-gray-50 p-4 rounded-md">
                    <p className="text-sm text-gray-600">
                      Our platform provides comprehensive safety data:
                    </p>
                    <ul className="mt-2 text-sm text-gray-600 space-y-1">
                      <li>• Multi-year crime data visualization</li>
                      <li>• Comparative neighborhood safety indices</li>
                      <li>• Trend analysis with predictive insights</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-5">
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Community Safety Research
              </h2>
              <p className="mt-3 text-lg text-gray-500">
                Access detailed safety statistics and trend analysis to make data-driven decisions when researching potential neighborhoods.
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