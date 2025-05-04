import { useNavigate } from "react-router-dom"
import { FormEvent, useState } from "react"





export function Index() {
    const navigate = useNavigate()
    const [location, setLocation] = useState("")

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        navigate(`/search/${location}`)
    }

    return (
        // Add padding-top to push the form lower on the page
        <div className="flex flex-col items-center justify-center w-full pt-64">
          <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
            <div className="flex flex-col items-center gap-2">
              <div className="text-white font-medium text-sm mb-1 self-start">
                Location
              </div>
              <div className="flex w-full">
                <input
                  type="text"
                  id="location-input"
                  placeholder="Address, zip code, or city"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-l-md focus:outline-none text-gray-800 bg-slate-100"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-800 text-white font-medium rounded-r-md hover:bg-blue-800 transition-colors"
                >
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      )
}