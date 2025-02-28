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

import { School, MapPin, Star, StarHalf, Clock } from "lucide-react";

import { GoogleMap } from "@/components/ui/GoogleMaps";
import { Review, PropertyInformation } from "@/Model/SchoolModel";

export function SearchResults() {
  const { location } = useParams();
  const [schoolProperties         , setSchoolProperties         ] = useState<PropertyInformation[]>([]);
  const [hospitalProperties       , setHospitalProperties       ] = useState<PropertyInformation[]>([]);
  const [corporateOfficeProperties, setCorporateOfficeProperties] = useState<PropertyInformation[]>([]);
  const [bankProperties           , setBankProperties           ] = useState<PropertyInformation[]>([]);
  const [parkProperties           , setParkProperties           ] = useState<PropertyInformation[]>([]);
  const [postOfficeProperties     , setPostOfficeProperties     ] = useState<PropertyInformation[]>([]);
  const [churchesProperties       , setChurchesProperties       ] = useState<PropertyInformation[]>([]);
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
        setParkProperties           (data["parkInformation"])
        setPostOfficeProperties     (data["postOfficeInformation"])
        setChurchesProperties       (data["churchInformation"])
        setGymProperties            (data["gymInformation"])
        setRestarauntProperties     (data["restaurantInformation "])



        setLoading(false);
      } catch (error) {
        console.error("Error fetching properties:", error);
        setLoading(false);
      }
    };

    fetchProperties();
  }, [location]);

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
      <div className=" mx-auto space-y-6">
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
          gymStoreProperties        = {gymStoreProperties       }
          restarauntProperties      = {restarauntProperties}
          
          />
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-4 gap-6">
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
                {schoolProperties.length} schools found in the area
              </p>
            </CardContent>
          </Card>
          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setIsDialogOpen(true)}
          >
            <CardHeader>
              <div className="flex items-center gap-2">
                <School className="h-5 w-5" />
                <CardTitle>Restaraunts</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {schoolProperties.length} schools found in the area
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
          <SchoolDetails properties={schoolProperties} />
        </DialogContent>
      </Dialog>
    </>
  );
}
