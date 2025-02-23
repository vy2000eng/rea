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
    School as SchoolIcon, 
    MapPin, 
    Star,
    StarHalf,
    Clock
  } from "lucide-react";



import { SchoolInformation } from "@/Model/SchoolModel";
const SchoolDetails = ({properties}:{ properties: SchoolInformation[] }) => {
    console.log('All properties:', properties);
    console.log('School Information:', properties);


  return (
    <div className="container mx-auto p-4 space-y-6">
    {properties.map((school) => (
      <Card key={school.id}>
        <CardHeader className="border-b bg-slate-50">
          <div className="flex items-center gap-2">
            <SchoolIcon className="w-5 h-5 text-blue-600" />
            <CardTitle>{school.displayName.text}</CardTitle>
          </div>
          <CardDescription className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-slate-400" />
            {school.formattedAddress}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Reviews</h3>
          <ScrollArea className="h-[400px]">
            <div className="space-y-4 pr-4">
              {school.reviews?.map((review) => (
                <Card key={review.name}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                        <span className="text-sm font-medium">
                          {review.authorAttribution.displayName[0]}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{review.authorAttribution.displayName}</p>
                        <p className="text-sm text-slate-500">{review.relativePublishTimeDescription}</p>
                      </div>
                    </div>
                    {review.originalText?.text && (
                      <p className="text-slate-600">{review.originalText.text}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    ))}
  </div>
  );
};

export default SchoolDetails;