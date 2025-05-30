import { useNavigate } from "react-router-dom";
import { useEffect, useState} from "react";
import   SchoolDetails from "@/results_components/SchoolDetails";

import { useMemo } from "react";

import { ArrowLeft } from 'lucide-react';

type EndPointToUse = {
  isSample:boolean,
  location: string | undefined,
  id:string | undefined

}


import { parsePoliceDepartmentData, parseRealEstateData } from "@/lib/utils";

import { GoogleMap } from "@/results_components/GoogleMaps";
import { PropertyInformation } from "@/Model/SchoolModel";
import { CrimeData} from "@/Model/CrimeModel";
import { Property } from "@/Model/RealEstateModel";
import { useAuth } from "@/context/AuthContext";

export function SearchResults({isSample, location, id,activeTitle,setActiveTitle}: { isSample: boolean, location:string|undefined, id:string|undefined, activeTitle:string,setActiveTitle:(title:string)=>void}) {
 // console.log("SearchResult "+ activeTitle)  

  const navigate = useNavigate()
  const{accessToken,authFetch} = useAuth()
  //const {location,id}                                                = useParams                      (  );
  let endpointToUse: EndPointToUse = {
    isSample: isSample,
    location: location,
    id      : id 
  };
  confirm(`active title in results component is ${activeTitle}`)



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
  const [activeTitleL             , setActiveLTitle              ] = useState<string>(activeTitle );
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
            //setActiveProperties                  (data["schoolInformation"] )
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
    

  }, [location,endpointToUse.location, endpointToUse.id]);

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

  const propertyCards = [
    {title: "university",        count: schoolProperties         .length, type: "schools"        ,data: schoolProperties          },
    {title: "hospital"         , count: hospitalProperties       .length, type: "hospitals"      ,data: hospitalProperties         },
    {title: "corporate_office" , count: corporateOfficeProperties.length, type: "offices"        ,data: corporateOfficeProperties  },
    {title: "bank"             , count: bankProperties           .length, type: "banks"          ,data: bankProperties             },
    {title: "park"             , count: parkProperties           .length, type: "parks"          ,data: parkProperties             },
    {title: "post_office"      , count: postOfficeProperties     .length, type: "post offices"   ,data: postOfficeProperties       },
    {title: "church"           , count: churchesProperties       .length, type: "churches"       ,data: churchesProperties         },
    {title: "grocery_store"    , count: groceryStoreProperties   .length, type: "groceries"      ,data: groceryStoreProperties     },
    {title: "gym"              , count: gymStoreProperties       .length, type: "gyms"           ,data: gymStoreProperties         },
    {title: "restaruant"       , count: restarauntProperties     .length, type: "restaurants"    ,data: restarauntProperties       },
    {title: "Crime"            , count: crimeData                .length, type: "Crime Agencies" ,data: crimeData                  },
    {title: "Real Estate"      , count: 0                               , type: "realEstate"     ,data: allRealEstateData          }


  ];

  useEffect(()=>{
      activeTitle = activeTitleL
     // confirm(activeTitleL)

      if(activeTitleL === "for_sale_listings" || activeTitleL ==="for_rent_listings"){
        setActiveLTitle("Real Estate")
        //setActiveTitle("for_sale_listings")
      
      }
      else if(activeTitleL === "police_department"){
        setActiveLTitle("Crime")
      }
      
      else{
        setActiveTitle(activeTitleL)


      }

      
  },[activeTitleL])



  let activeProperties = useMemo(() => {
    const matchingCard = propertyCards.find(x => x.title === activeTitle);
    return matchingCard ? matchingCard.data : schoolProperties;
  }, [ activeTitle,activeTitleL]);

  if (loading) {
    return (
      <div className="flex items-center justify-content h-96">
        <div className="text-lg">Loading schools...</div>
      </div>
    );
  }
  return (
    <>
    {/* Simple header with back button */}
    <div className="p-3 bg-white border-b">
      <button
        onClick={() => navigate('/index')}
        className="flex items-center p-2 rounded-full bg-slate-100 hover:bg-gray-100"
      >
        <ArrowLeft size={20} />
      </button>
    </div>
    
    {/* Map - fixed height with inline styles to guarantee it never changes */}
    <div className="w-full justify-content-center lg:place-items-center ">
      {/* <div style={{ height: "350px" ,width:"500px" }}> */}
      <div className="w-full h-2/3 ">
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
          onActiveTitleChange={setActiveLTitle}
        />
      </div>
    
      <div  className="w-[400px] lg:w-full">
        <SchoolDetails 
          key={activeTitle} 
          properties={activeProperties} 
          title={activeTitle} 
        />
      </div>

    </div>
 
  </>
 
  );
}

 
