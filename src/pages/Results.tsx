import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import   SchoolDetails from "@/results_components/SchoolDetails";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMemo } from "react";

import { ArrowLeft } from 'lucide-react';

type EndPointToUse = {
  isSample:boolean,
  location: string | undefined,
  id:string | undefined

}


import { parsePoliceDepartmentData, parseRealEstateData } from "@/lib/utils";

import { GoogleMap } from "@/results_components/GoogleMaps";
import {PropertyInformation } from "@/Model/SchoolModel";
import { CrimeData} from "@/Model/CrimeModel";
import { Property } from "@/Model/RealEstateModel";
import { useAuth } from "@/context/AuthContext";

export function SearchResults({isSample, location, id,activeTitle}: { isSample: boolean, location:string|undefined, id:string|undefined, activeTitle:string}) {
 // console.log("SearchResult "+ activeTitle)  

  const navigate = useNavigate()
  const{accessToken,authFetch} = useAuth()
  //const {location,id}                                                = useParams                      (  );
  let endpointToUse: EndPointToUse = {
    isSample: isSample,
    location: location,
    id      : id 
  };


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
  //const [activeProperties         , setActiveProperties         ] = useState<PropertyInformation[] | CrimeData[]|Property[][]>([]);
 // const [activeTitle              , setActiveTitle              ] = useState<string>("School Details" );
  const [loading                  , setLoading                  ] = useState(true                     );
  const [crimeData                , setCrimeData                ] = useState<CrimeData[]>([])
  const [forSaleListings          , setForSaleListings          ] = useState<Property[]> ();
  const [forRentListings          , setForRentLstings           ] = useState<Property[]> ();

  //const isFirstMount                                              = useRef  (true                     ); 


  useEffect(() => {
 
    //isFirstMount.current  = false;

    const fetchProperties = async () => {


      //if (!isSample && !location) return;
     // if (!endpointToUse.isSample ) return;
      if(!endpointToUse.id && !endpointToUse) return; 


      try {
            setLoading                           (true                         );
            let endpoint = "";
            if(endpointToUse.location != undefined){
              endpoint = isSample
              ?`${import.meta.env.VITE_TEST_LOCATIONENPOINT}`
              :`${import.meta.env.VITE_GET_LOCATION_ENDPOINT}${encodeURIComponent(location!)}`
            }else{
              endpoint = `${import.meta.env.VITE_GET_USER_QUERY_BY_ID}${id}`
            }
            const response = await authFetch         (endpoint,{
              headers: {
                'Authorization': `Bearer ${accessToken}`
              }
            }
            );
            if (!response.ok) throw new Error    (`HTTP error! status: ${response.status}`                                      );
            const data     = await response.json (                                                                              );
            setSchoolProperties                  (data["schoolInformation"]                                                     );
            setCorporateOfficeProperties         (data["corporateOfficeInformation"]                                            );
            setHospitalProperties                (data["hospitalInformation"]                                                   );
            setBankProperties                    (data["bankInformation"]                                                       );
            setParkProperties                    (data["parksInformation"]                                                      );
            setPostOfficeProperties              (data["postOfficeInformation"]                                                 );
            setChurchesProperties                (data["churchInformation"]                                                     );
            setGroceryStoreProperties            (data["groceryStoreInformation"]                                               );
            setGymProperties                     (data["gymInformation"]                                                        );
            setRestarauntProperties              (data["restaurantInformation"]                                                 );
            setCrimeData                         (data["crimeInformation"]);
           // setActiveProperties                  (data["schoolInformation"] )
            setForSaleListings                   (data["forSaleListings"].props);
            setForRentLstings                    (data["rentalListings"].props);
            //setActiveTitle                       ("Universities")
            setLoading                           (false);

      } catch (error) {
            console.error("Error fetching properties:", error);
            setLoading(false);
      }
    };

    fetchProperties();
    
    //sendDataToParent(propertyCards)

  }, [location]);

  let policeDepartmentProperties:PropertyInformation[] = parsePoliceDepartmentData(crimeData)
 let forRentProperties          :PropertyInformation[] = []
 let forSaleProperties          :PropertyInformation[] = []
  let allRealEstateData: Property[][] = []

  if (forSaleListings && forRentListings){
    forRentProperties = parseRealEstateData(forRentListings as Property[], "for_rent_listings");
    forSaleProperties = parseRealEstateData(forSaleListings as Property [], "for_sale_listings");
    allRealEstateData.push(forSaleListings)
    allRealEstateData.push(forRentListings)
  }

 // console.log(allRealEstateData)

  const propertyCards = [
    {title: "University", count: schoolProperties         .length, type: "schools"        ,data: schoolProperties          },
    {title: "Hospital"         , count: hospitalProperties       .length, type: "hospitals"      ,data: hospitalProperties         },
    {title: "Corporate Offices" , count: corporateOfficeProperties.length, type: "offices"        ,data: corporateOfficeProperties  },
    {title: "Bank"             , count: bankProperties           .length, type: "banks"          ,data: bankProperties             },
    {title: "Parks"             , count: parkProperties           .length, type: "parks"          ,data: parkProperties             },
    {title: "Post Offices"      , count: postOfficeProperties     .length, type: "post offices"   ,data: postOfficeProperties       },
    {title: "Churches"          , count: churchesProperties       .length, type: "churches"       ,data: churchesProperties         },
    {title: "GroceryStore"      , count: groceryStoreProperties   .length, type: "groceries"      ,data: groceryStoreProperties     },
    {title: "Gyms"              , count: gymStoreProperties       .length, type: "gyms"           ,data: gymStoreProperties         },
    {title: "Restaurants"       , count: restarauntProperties     .length, type: "restaurants"    ,data: restarauntProperties       },
    {title: "Crime"             , count: crimeData                .length, type: "Crime Agencies" ,data: crimeData                  },
    {title: "Real Estate"       , count: 0                               , type: "realEstate"     ,data: allRealEstateData          }


  ];

  // useEffect(()=>{
  //   propertyCards.forEach(x =>{
  //     if(x.title === activeTitle){
  //       setActiveProperties(x.data);
        
  //     }

  //   })
  //  // sendDataToParent(propertyCards)
  // },[activeTitle])
  const activeProperties = useMemo(() => {
    const matchingCard = propertyCards.find(x => x.title === activeTitle);
    return matchingCard ? matchingCard.data : schoolProperties;
  }, [ activeTitle]);

  if (loading) {
    return (
      <div className="flex items-center justify-content h-96">
        <div className="text-lg">Loading schools...</div>
      </div>
    );
  }
  return (
    <>
    <div className=" relative bg-white">
    {/* Left-aligned arrow button */}
      <div className="flex justify-start p-4">
        <button
          onClick={() => navigate('/index')} // Replace with your actual route
          className="flex items-center p-2 rounded hover:bg-gray-100 transition bg-slate-100"
          aria-label="Back to search"

        >
          <ArrowLeft size={24} />
        </button>
      </div>

    {/* ...rest of your content */}
  </div>
  {/* Map Section - takes full height minus any other elements */}
  <div className="flex flex-col h-full">
  {/* Map container */}
  <div className="h-3/5 w-full">
    <GoogleMap 
      schoolProperties={schoolProperties}
      hospitalProperties={hospitalProperties}
      corporateOfficeProperties={corporateOfficeProperties}
      bankProperties={bankProperties}
      parkProperties={parkProperties}
      postOfficeProperties={postOfficeProperties}
      churchesProperties={churchesProperties}
      groceryStoreProperties={groceryStoreProperties}
      gymStoreProperties={gymStoreProperties}
      restarauntProperties={restarauntProperties}
      policeDepartments={policeDepartmentProperties}
      forSaleProperties={forSaleProperties}
      forRentProperties={forRentProperties}
      activeTitle={activeTitle}
    />
  </div>
  
  {/* Fixed width container for SchoolDetails */}
  <div className="h-2/5 overflow-auto">
    <div className="w-full min-w-[600px] mx-auto">
      <SchoolDetails key={activeTitle} properties={activeProperties} title={activeTitle} />
    </div>
  </div>
</div>
  {/* Uncomment if needed */}


      {/* <div className="grid md:grid-cols-5 gap-6">
            {propertyCards.map(card => {
              return (
                <Card
                  key={card.title}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => {
                      setActiveProperties(card.data);
                      setActiveTitle     (card.title);
                    }
                  }
                >
                <CardHeader>
                  <div className="flex items-center gap-2">
                 
                    <CardTitle>{card.title}</CardTitle>
                  </div>
                </CardHeader>

                <CardContent>
                  {card.title == "Real Estate" ? (
                    <p className="text-muted-foreground">
                   
                    Recently Sold, For Sale, accordion For Rent Properties
                  </p>

                  ): (
                    <p className="text-muted-foreground">
                   
                    {card.count} {card.type} found in the area
                  </p>
                  )}
                  
                </CardContent>
              </Card>
              );
            })}
      </div> */}
    </>
  );
}
