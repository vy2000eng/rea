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
	console.log("All properties:", properties);
	console.log("School Information:", properties);
  if (title === "Real Estate"){
    return(

// Just add these style classes to your existing components
<Tabs defaultValue="for-sale" className="w-full">
  <TabsList className="grid grid-cols-2 gap-4 mb-8" style={{ backgroundColor: "transparent", padding: 0, boxShadow: "none" }}>
    <TabsTrigger 
      value="for-sale" 
      style={{ 
        backgroundColor: "white", 
        color: "#374151", 
        border: "1px solid #e5e7eb", 
        borderRadius: "0.375rem",
        padding: "0.75rem" 
      }}
      className="hover:bg-gray-50 data-[state=active]:border-blue-600 data-[state=active]:text-blue-700 font-medium"
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
        padding: "0.75rem" 
      }}
      className="hover:bg-gray-50 data-[state=active]:border-blue-600 data-[state=active]:text-blue-700 font-medium"
    >
      For Rent
    </TabsTrigger>
  </TabsList> 
  <h1 className="text-3xl font-bold mb-6">Real Estate Market Overview</h1>
  <ScrollArea className="h-dvh">
    <RealEstateDashboard allRealEstateData={properties as Property[][]}/>
  </ScrollArea>
</Tabs>

      
      
    )
  }

  if (title === "Crime"){
    return(
      
      
         <CrimeChart crimeData={properties as CrimeData[]}/>
    )
  }
	return (

    <div className="container mx-auto p-4 space-y-6">
    {/* Outer Accordion to collapse all locations */}
    <Accordion type="single" collapsible className="w-full border rounded-lg">
      <AccordionItem value="locations">
        <AccordionTrigger className="bg-gray-100 px-4 py-2 rounded-lg">
          <div className="text-lg font-semibold">{title}</div>
        </AccordionTrigger>
        <AccordionContent>
          <Accordion type="single" collapsible className="w-full">
            {(properties as PropertyInformation[]).map((school, index) => (
              <AccordionItem key={school.id} value={`item-${index}`}>
                <AccordionTrigger className="bg-white">
                  <div className="flex items-center gap-2 text-left">
                    <SchoolIcon className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-semibold">{school.displayName.text}</div>
                      <div className="text-sm text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {school.formattedAddress}
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pt-2">
                    <h3 className="text-lg font-semibold mb-4">Reviews</h3>
                    <ScrollArea className="h-[300px]">
                      <div className="space-y-4 pr-4">
                        {school.reviews?.map((review) => (
                          <Card key={review.name}>
                            <CardContent className="p-4 light">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                                  <span className="text-sm font-medium">
                                    {review.authorAttribution.displayName[0]}
                                  </span>
                                </div>
                                <div>
                                  <p className="font-medium">
                                    {review.authorAttribution.displayName}
                                  </p>
                                  <p className="text-sm text-slate-500">
                                    {review.relativePublishTimeDescription}
                                  </p>
                                </div>
                              </div>
                              {review.originalText?.text && (
                                <p className="text-slate-600">
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
};

export default SchoolDetails;
