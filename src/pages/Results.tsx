import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import SchoolDetails from "@/results_components/SchoolDetails";
import { ControlPanel } from "@/components/ui/controlPanel";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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

//import { School, MapPin, Star, StarHalf, Clock } from "lucide-react";

import { GoogleMap } from "@/components/ui/GoogleMaps";
import { Review, PropertyInformation } from "@/Model/SchoolModel";
import { 
  School, 
  Hospital, 
  Building2, 
  Landmark, 
  Trees, 
  Mailbox, 
  Church, 
  Dumbbell, 
  Utensils,
  ShoppingCart 
} from "lucide-react";


export function SearchResults() {
  const { location } = useParams();
  const [schoolProperties         , setSchoolProperties         ] = useState<PropertyInformation[]>([]);
  const [hospitalProperties       , setHospitalProperties       ] = useState<PropertyInformation[]>([]);
  const [corporateOfficeProperties, setCorporateOfficeProperties] = useState<PropertyInformation[]>([]);
  const [bankProperties           , setBankProperties           ] = useState<PropertyInformation[]>([]);
  const [parkProperties           , setParkProperties           ] = useState<PropertyInformation[]>([]);
  const [postOfficeProperties     , setPostOfficeProperties     ] = useState<PropertyInformation[]>([]);
  const [churchesProperties       , setChurchesProperties       ] = useState<PropertyInformation[]>([]);
  const [groceryStoreProperties   , setGroceryStoreProperties   ] = useState<PropertyInformation[]>([]);

  const [gymStoreProperties       , setGymProperties            ] = useState<PropertyInformation[]>([]);
  const [restarauntProperties     , setRestarauntProperties     ] = useState<PropertyInformation[]>([]);


  // const [geoCachcedLocation, setGeoCachedLocation] = useState<GeoCachedLocation>()
  const [loading, setLoading] = useState(true);
  //const [sortOrder, setSortOrder] = useState('rating');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isFirstMount = useRef(true); // Track first mount

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

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        setSchoolProperties         (data["schoolInformation"]);
        setCorporateOfficeProperties(data["hospitalInformation"]);
        setHospitalProperties       (data["corporateOfficeInformation"]);
        setBankProperties           (data["bankInformation"])
        setParkProperties           (data["parksInformation"])
        setPostOfficeProperties     (data["postOfficeInformation"])
        setChurchesProperties       (data["churchInformation"])
        setGroceryStoreProperties   (data["groceryStoreInformation"])
        setGymProperties            (data["gymInformation"])
        setRestarauntProperties     (data["restaurantInformation"])



        setLoading(false);
      } catch (error) {
        console.error("Error fetching properties:", error);
        setLoading(false);
      }
    };

    fetchProperties();
  }, [location]);


  const propertyCards = [
    { icon: School, title: "School Information", count: schoolProperties.length, type: "schools" },
    { icon: Hospital, title: "Hospitals", count: hospitalProperties.length, type: "hospitals" },
    { icon: Building2, title: "Corporate Offices", count: corporateOfficeProperties.length, type: "offices" },
    { icon: Landmark, title: "Banks", count: bankProperties.length, type: "banks" },
    { icon: Trees, title: "Parks", count: parkProperties.length, type: "parks" },
    { icon: Mailbox, title: "Post Offices", count: postOfficeProperties.length, type: "post offices" },
    { icon: Church, title: "Churches", count: churchesProperties.length, type: "churches" },
    { icon: Utensils, title: "GroceryStore", count: groceryStoreProperties.length, type: "groceries" },

    { icon: Dumbbell, title: "Gyms", count: gymStoreProperties.length, type: "gyms" },
    { icon: Utensils, title: "Restaurants", count: restarauntProperties.length, type: "restaurants" }
  ];

  console.log("school info", schoolProperties);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-lg">Loading schools...</div>
      </div>
    );
  }

  return (
    <>
      <div className=" mx-auto space-y-6 relative">
        {/* Map Section */}
        <div className="w-full h-full rounded-sm  border ">
          <GoogleMap 
            schoolProperties          = {schoolProperties         }
            hospitalProperties        = {hospitalProperties       }
            corporateOfficeProperties = {corporateOfficeProperties}
            bankProperties            = {bankProperties           }
            parkProperties            = {parkProperties           }
            postOfficeProperties      = {postOfficeProperties     }
            churchesProperties        = {churchesProperties       }
            groceryStoreProperties    = {groceryStoreProperties   }
            gymStoreProperties        = {gymStoreProperties       }
            restarauntProperties      = {restarauntProperties     }
          
          />
        </div>

        {/* Cards Grid */}
        {/* <div className="grid md:grid-cols-8 gap-6">
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
                {schoolProperties.length} schools found in the area
              </p>
            </CardContent>
          </Card>
     
        </div> */}
         <div className="grid md:grid-cols-5 gap-6">
          {propertyCards.map(card => {
            const Icon = card.icon;
            return (
              <Card
                key={card.title}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setIsDialogOpen(true)}
              >
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5" />
                    <CardTitle>{card.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {card.count} {card.type} found in the area
                  </p>
                </CardContent>
              </Card>
            );
          })}
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
          <SchoolDetails properties={schoolProperties} />
        </DialogContent>
      </Dialog>
    </>
  );
}
