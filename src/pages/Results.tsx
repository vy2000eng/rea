import { useParams } from "react-router-dom"
import { useEffect, useState ,useRef} from "react"
import SchoolDetails from "@/results_components/SchoolDetails";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
  } from "@/components/ui/card";
  import { Badge } from "@/components/ui/badge";
  import { ScrollArea } from "@/components/ui/scroll-area";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";

  import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

  import { 
    School, 
    MapPin, 
    Star,
    StarHalf,
    Clock
  } from "lucide-react";

import { GoogleMap } from "@/components/ui/GoogleMaps";
import { SchoolInformation } from "@/Model/SchoolModel";
import { GeoCachedLocation } from "@/Model/SchoolModel";
//import SchoolDetails from "@/results_components/SchoolDetails";



// export type SchoolInformation = {
//     id: number,
//     displayName: Text,
//     formattedAddress:string,
//     location: {   
//         latitude: number, 
//         longitude: number
//     },
//     reviews: Review []


// }
// export type Review = {

//     id:number,
//     authorAttribution: AuthorAttribution,
//     name: string,
//     relativePublishTimeDescription: string,
//     rating: number,
//     originalText:Text,



// }

// export type AuthorAttribution = {
//     displayName: string,
//     photoUri: string,
//     uri: string

// }

// export type Text = {
//     languageCode: string,
//     text: string,
// }

// export type GeoCachedLocation = {
//   formatted_address :string,
//   latitude: number,
//   longitude:number
// }




export function SearchResults() {
    const { location } = useParams()
    const [properties, setProperties] = useState<SchoolInformation[]>([])
   // const [geoCachcedLocation, setGeoCachedLocation] = useState<GeoCachedLocation>()
    const [loading, setLoading] = useState(true)
    //const [sortOrder, setSortOrder] = useState('rating');
    const [isDialogOpen, setIsDialogOpen] = useState(false);


    const isFirstMount = useRef(true);  // Track first mount

    useEffect(() => {
        // Skip the second mount in development
        if (!isFirstMount.current) {
            return;
        }
        isFirstMount.current = false;

        const fetchProperties = async () => {
            if (!location) return;
            try {
                setLoading(true);
              


                const response = await fetch(
                    `${import.meta.env.VITE_GET_LOCATION_ENDPOINT}${encodeURIComponent(location)}`
                );
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setProperties(data["schoolInformation"])


            
                setLoading(false);
            } catch (error) {
                console.error('Error fetching properties:', error);
                setLoading(false);
            }
        };

        fetchProperties();
    }, [location]);

    console.log("school info",properties)

    // type Poi ={ key: string, location: google.maps.LatLngLiteral }
    // const locations: Poi[] = properties.map((locationInformation) =>(
    //     {
    //       key: locationInformation.displayName.text,
    //       location:{lat: locationInformation.location.latitude, lng:locationInformation.location.longitude}
    //      }
    // ))



    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-lg">Loading schools...</div>
            </div>
        );
    }

    return (
         
        <>
        <div className="max-w-6xl mx-auto p-4 space-y-6">
          {/* Map Section */}
          <div className="w-full h-[32rem] rounded-lg overflow-hidden border">
            <GoogleMap properties={properties} />
          </div>
          
          {/* Cards Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Location Card */}
            <Card 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setIsDialogOpen(true)}
            >
              <CardHeader>
                <div className="flex items-center gap-2">
                  <School className="h-5 w-5" />
                  <CardTitle>School Information</CardTitle>

                </div>
              </CardHeader>
              <CardContent>
                  <p className="text-muted-foreground">
                  {properties.length} schools found in the area

                  </p>


             
              </CardContent>
            </Card>
  
            {/* Property Details Card */}
            <Card>
              <CardHeader>
                <CardTitle>Property Details</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Property information here</p>
              </CardContent>
            </Card>
  
            {/* Contact Card */}
            <Card>
              <CardHeader>
                <CardTitle>Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Contact information here</p>
              </CardContent>
            </Card>
          </div>
        </div>
  
        {/* Dialog/Popup */}
       {/* Dialog/Popup */}
       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[800px] h-[90vh] overflow-y-auto">
            <DialogHeader>
                <div className="flex justify-between items-center">
                    <DialogTitle>School Details</DialogTitle>
                   
                </div>
            </DialogHeader>
                <SchoolDetails properties={properties} />
            
            
          </DialogContent>
        </Dialog>
      </>
    );
}
