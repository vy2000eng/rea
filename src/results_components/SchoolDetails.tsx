import {
	Card,
	CardContent,

} from "@/components/ui/card";
import { Tabs,TabsList,TabsTrigger } from "@radix-ui/react-tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	School as SchoolIcon,
	MapPin
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import CrimeChart from "./CrimeChart";

import { CrimeData} from "@/Model/CrimeModel";
import { PropertyInformation } from "@/Model/SchoolModel";
import { Property} from "@/Model/RealEstateModel";
import RealEstateDashboard from "@/components/RealEstateDashBoard";
const SchoolDetails = ({properties, title}: {properties: PropertyInformation[] | CrimeData[] | Property[][],title:string
}) => {
	// console.log("All properties:", properties);
	// console.log("School Information:", properties);
  console.log("Title in school Details" +title)
  console.log("All properties:", properties);


  if (title === "Real Estate"){
    return(

        
      <div className="w-full overflow-hidden">
      <Tabs defaultValue="for-sale" className="w-full max-w-full">
        <TabsList className="grid grid-cols-2 gap-4 mb-4 sm:mb-8" style={{ backgroundColor: "transparent", padding: 0, boxShadow: "none" }}>
          <TabsTrigger 
            value="for-sale" 
            style={{ 
              backgroundColor: "white", 
              color: "#374151", 
              border: "1px solid #e5e7eb", 
              borderRadius: "0.375rem",
              padding: "0.5rem" 
            }}
            className="hover:bg-gray-50 data-[state=active]:border-blue-600 data-[state=active]:text-blue-700 font-medium text-sm sm:text-base"
          >
            For Sale
          </TabsTrigger>
          <TabsTrigger 
            value="for-rent" 
            style={{ 
              backgroundColor: "white", 
              color: "#374151", 
              border: "1px solid #e5e7eb", 
              borderRadius: "0.375rem",
              padding: "0.5rem" 
            }}
            className="hover:bg-gray-50 data-[state=active]:border-blue-600 data-[state=active]:text-blue-700 font-medium text-sm sm:text-base"
          >
            For Rent
          </TabsTrigger>
        </TabsList> 
        <h1 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-6 px-2">Real Estate Market Overview</h1>
        <ScrollArea className="h-[60vh]">
          <div className="px-2">
            <RealEstateDashboard allRealEstateData={properties as Property[][]}/>
          </div>
        </ScrollArea>
      </Tabs>
    </div>

      
      
    )
  }

  if (title === "Crime"){
    return(
      <div className="w-full px-2 py-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-bold mb-4">Crime Rates Overview</h2>
          <p className="text-sm text-gray-600 mb-6">Explore monthly crime data by agency.</p>
          <div className="w-full overflow-x-auto">
            <CrimeChart crimeData={properties as CrimeData[]}/>
          </div>
        </div>
      </div>
    )
  }
  if(title !== "All locations"){
    	return (

    <div className="w-full p-2 sm:p-4">
    {/* Outer Accordion open by default */}
    <Accordion type="single" defaultValue="locations" collapsible className="w-full border rounded-lg max-w-full">
      <AccordionItem value="locations" className="max-w-full">
        <AccordionTrigger className="bg-gray-100  py-2 rounded-t-lg">
          <div className="text-lg font-semibold">{title}</div>
        </AccordionTrigger>
        <AccordionContent className="max-w-full overflow-hidden">
          <Accordion type="single" collapsible className="w-full">
            {(properties as PropertyInformation[]).map((school, index) => (
              <AccordionItem key={school.id} value={`item-${index}`} className="max-w-full">
                <AccordionTrigger className="bg-white">
                  <div className="flex items-center gap-2 text-left max-w-full">
                    <SchoolIcon className="flex-shrink-0 w-5 h-5 text-blue-600" />
                    <div className="min-w-0 flex-1 truncate">
                      <div className="font-semibold truncate">{school.displayName.text}</div>
                      <div className="text-sm text-slate-500 flex items-center gap-1">
                        <MapPin className="flex-shrink-0 w-3 h-3" />
                        <span className="truncate">{school.formattedAddress}</span>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pt-2">
                    <h3 className="text-lg font-semibold mb-4">Reviews</h3>
                    <ScrollArea className="h-[300px] max-w-full">
                      <div className="space-y-4 pr-2">
                        {school.reviews?.map((review) => (
                          <Card key={review.name} className="max-w-full">
                            <CardContent className="p-4 light">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                                  <span className="text-sm font-medium">
                                    {review.authorAttribution.displayName[0]}
                                  </span>
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="font-medium truncate">
                                    {review.authorAttribution.displayName}
                                  </p>
                                  <p className="text-sm text-slate-500">
                                    {review.relativePublishTimeDescription}
                                  </p>
                                </div>
                              </div>
                              {review.originalText?.text && (
                                <p className="text-slate-600 break-words">
                                  {review.originalText.text}
                                </p>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
	);
    
  }

};

export default SchoolDetails;
