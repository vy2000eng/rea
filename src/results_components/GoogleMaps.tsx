import {
	APIProvider,
	Map
} from "@vis.gl/react-google-maps";
import { ControlPanel } from "../components/ui/controlPanel";
import { useState,useMemo } from "react";
import { PropertyInformation } from "@/Model/SchoolModel";
import { Review              } from "@/Model/SchoolModel";
import { PoiMarkers          } from "@/results_components/MapMarkers";
import { getCategories       } from "@/Model/SchoolModel";

export type Poi = {

	key: string;
    type:string;
	location: google.maps.LatLngLiteral;
	name: string;
	address: string;
	averageRating: number;
};

export function GoogleMap(
    {
        schoolProperties         ,
        hospitalProperties       ,
        corporateOfficeProperties,
        bankProperties           ,
        parkProperties           ,
        postOfficeProperties     ,
        churchesProperties       , 
        groceryStoreProperties   ,
        gymStoreProperties       ,
        restarauntProperties     ,
        policeDepartments        ,
        forSaleProperties,
        forRentProperties,

    }: 
    {
     schoolProperties         : PropertyInformation[],
     hospitalProperties       : PropertyInformation[],
     corporateOfficeProperties: PropertyInformation[],
     bankProperties           : PropertyInformation[],
     parkProperties           : PropertyInformation[],
     postOfficeProperties     : PropertyInformation[],
     churchesProperties       : PropertyInformation[],
     groceryStoreProperties   : PropertyInformation[],
     gymStoreProperties       : PropertyInformation[],
     restarauntProperties     : PropertyInformation[],
     policeDepartments        : PropertyInformation[],
     forSaleProperties        :PropertyInformation[],
     forRentProperties        :PropertyInformation[]


    }) 
    {
        console.log(policeDepartments)
    

        const getAverageRating = (reviews: Review[]) => {
            let totalStars: number = 0;

            reviews.forEach((r) => (totalStars += r.rating));
            return totalStars / reviews.length;
        };

        const allProperties = schoolProperties
                                .concat(hospitalProperties)
                                .concat(corporateOfficeProperties)
                                .concat(bankProperties)
                                .concat(parkProperties)
                                .concat(postOfficeProperties)
                                .concat(churchesProperties)
                                .concat(groceryStoreProperties)
                                .concat(gymStoreProperties)
                                .concat(restarauntProperties)
                                .concat(policeDepartments)
                                .concat(forSaleProperties)
                                .concat(forRentProperties)
                                .filter(property => property !== null && property !== undefined);;
        const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

        const categories = useMemo(() => getCategories(allProperties), [allProperties]);
        

        const filteredProperties = useMemo(() => {
          if (!allProperties) return null;
      
          return allProperties.filter(
            l => !selectedCategory || l.type === selectedCategory
          );
        }, [allProperties, selectedCategory]);

                            


        //const API_KEY = import.meta.env.DEV_VITE_GOOGLE_API_KEY
        const locations = useMemo(() => {
            return filteredProperties
              ? filteredProperties.map((locationInformation) => ({
                  key: locationInformation.id,
                  type: locationInformation.type,
                  location: {
                      lat: locationInformation.location.latitude,
                      lng: locationInformation.location.longitude,
                  },
                  name: locationInformation.displayName.text,
                  address: locationInformation.formattedAddress,
                  averageRating: getAverageRating(locationInformation.reviews),
              }))
              : [];
          }, [filteredProperties]);



        return (
            <div className="w-full h-[75vh]  mx-auto">
                <APIProvider
                    apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                    onLoad={() => console.log("Maps API has loaded.")}
                >  
                 
                    <Map
                        style={{ width: "100%", height: "100%" }}
                        defaultCenter={{
                            lat: schoolProperties[0].location.latitude,
                            lng: schoolProperties[0].location.longitude,
                        }}
                        defaultZoom={8}
                        gestureHandling={"greedy"}
                        mapId={"cbf7dada0ba33cac"}
                        disableDefaultUI
                    >
                        <PoiMarkers pois={locations} />
                    </Map>

                    <ControlPanel 
                        categories      = {categories}
                        onCategoryChange= {setSelectedCategory}
                    
                    />
                 
                </APIProvider>
            </div>
        );
}
Array