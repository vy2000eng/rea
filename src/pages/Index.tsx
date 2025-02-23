import { Input } from "@/components/ui/input.tsx"
import { Label } from "@/components/ui/label.tsx"
import { Button } from "@/components/ui/button.tsx"
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
        <form onSubmit={handleSubmit}>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="location-input">Location</Label>
                <div className="flex gap-2">
                    <Input
                        type="text"
                        id="location-input"
                        placeholder="Address, zip code, or city"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />

                    <Button type="submit">Search</Button>
                </div>
            </div>

        </form>

    )
}
