import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import   SchoolDetails from "@/results_components/SchoolDetails";
import CrimeChart from "@/results_components/CrimeChart";
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

import { GoogleMap } from "@/components/ui/GoogleMaps";
import {CrimeData, OffensesData, PropertyInformation } from "@/Model/SchoolModel";

export function SearchResults() {
  const {location}                                                = useParams                      (  );
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
  const [activeProperties         , setActiveProperties         ] = useState<PropertyInformation[]>([]);
  const [activeTitle              , setActiveTitle              ] = useState<string>("School Details" );
  const [loading                  , setLoading                  ] = useState(true                     );
  const [isDialogOpen             , setIsDialogOpen             ] = useState(false                    );
  const [crimeData, setCrimeData] = useState<CrimeData[]>([])
  const isFirstMount                                              = useRef  (true                     ); 
  const d = [];


  useEffect(() => {
    // Skip the second mount in development
    if (!isFirstMount.current) {
      return;
    }
    isFirstMount.current  = false;

    const fetchProperties = async () => {
      if (!location) return;
      try {
            setLoading                           (true                                                                          );
            const response = await fetch         (`${import.meta.env.VITE_GET_LOCATION_ENDPOINT}${encodeURIComponent(location)}`);
            if (!response.ok) throw new Error    (`HTTP error! status: ${response.status}`                                      );
            const data     = await response.json (                                                                              );
            setSchoolProperties                  (data["schoolInformation"]                                                     );
            setCorporateOfficeProperties         (data["corporateOfficeInformation"]                                                   );
            setHospitalProperties                (data["hospitalInformation"]                                            );
            setBankProperties                    (data["bankInformation"]                                                       );
            setParkProperties                    (data["parksInformation"]                                                      );
            setPostOfficeProperties              (data["postOfficeInformation"]                                                 );
            setChurchesProperties                (data["churchInformation"]                                                     );
            setGroceryStoreProperties            (data["groceryStoreInformation"]                                               );
            setGymProperties                     (data["gymInformation"]                                                        );
            setRestarauntProperties              (data["restaurantInformation"]                                                 );
            setCrimeData(data["crimeInformation"]);
            setLoading                           (false);
            setActiveProperties                  (data["schoolInformation"] )
            setActiveTitle                       ("Universities")


            //console.log(activeProperties)
      } catch (error) {
            console.error("Error fetching properties:", error);
            setLoading(false);
      }
    };

    fetchProperties();
  }, [location]);





  const propertyCards = [
    {title: "Universities      ", count: schoolProperties         .length, type: "schools"     ,data: schoolProperties          },
    {title: "Hospitals"         , count: hospitalProperties       .length, type: "hospitals"   ,data: hospitalProperties        },
    {title: "Corporate Offices" , count: corporateOfficeProperties.length, type: "offices"     ,data: corporateOfficeProperties },
    {title: "Banks"             , count: bankProperties           .length, type: "banks"       ,data: bankProperties            },
    {title: "Parks"             , count: parkProperties           .length, type: "parks"       ,data: parkProperties            },
    {title: "Post Offices"      , count: postOfficeProperties     .length, type: "post offices",data: postOfficeProperties      },
    {title: "Churches"          , count: churchesProperties       .length, type: "churches"    ,data: churchesProperties        },
    {title: "GroceryStore"      , count: groceryStoreProperties   .length, type: "groceries"   ,data: groceryStoreProperties    },
    {title: "Gyms"              , count: gymStoreProperties       .length, type: "gyms"        ,data: gymStoreProperties        },
    {title: "Restaurants"       , count: restarauntProperties     .length, type: "restaurants" ,data: restarauntProperties      },
  
    {title: "Crime"       , count: restarauntProperties     .length, type: "crimes" ,data: restarauntProperties      }
  ];
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-lg">Loading schools...</div>
      </div>
    );
  }
  return (
    <>
      <div className=" mx-auto space-y-6 relative bg-white">
      
         <CrimeChart crimeData={crimeData}/>
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
        <SchoolDetails properties={activeProperties} title= {activeTitle} />

      <div className="grid md:grid-cols-5 gap-6">
            {propertyCards.map(card => {
              return (
                <Card
                  key={card.title}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => {
                      setActiveProperties(card.data);
                      setActiveTitle     (card.title);
                      setIsDialogOpen    (true);
                    }
                  }
                >
                <CardHeader>
                  <div className="flex items-center gap-2">
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
      {/* <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[800px] h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle>{activeTitle}</DialogTitle>
            </div>
          </DialogHeader> */}
        {/* </DialogContent>
      </Dialog> */}
    </>
  );
}
