import { useState,  } from 'react';
import {TabsContent} from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Home, Bed, Bath, DollarSign, ArrowRight, ArrowLeft, MapPin } from "lucide-react";
import { useParams } from 'react-router-dom';
import { Property } from '@/Model/RealEstateModel';
import { useAuth } from '@/context/AuthContext';





const PropertyCard = ({ property }: { property: Property }) => {


    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const hasPhotos = property.carouselPhotos && property.carouselPhotos.length > 0;
    
    const nextPhoto = () => {
      if (hasPhotos) {
        setCurrentPhotoIndex((prevIndex) => 
          prevIndex === property.carouselPhotos.length - 1 ? 0 : prevIndex + 1
        );
      }
    };
    
    const prevPhoto = () => {
      if (hasPhotos) {
        setCurrentPhotoIndex((prevIndex) => 
          prevIndex === 0 ? property.carouselPhotos.length - 1 : prevIndex - 1
        );
      }
    };
    
    return (
      <Card className="overflow-hidden">
        <div className="relative h-48 bg-gray-100">
          {hasPhotos ? (
            <>
              <img 
                src={property.carouselPhotos[currentPhotoIndex].url} 
                alt={`Photo ${currentPhotoIndex + 1} of ${property.address}`} 
                className="w-full h-full object-cover"
              />
              
              {property.carouselPhotos.length > 1 && (
                <>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 rounded-full h-8 w-8"
                    onClick={prevPhoto}
                  >
                    <ArrowLeft size={16} className="text-white" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 rounded-full h-8 w-8"
                    onClick={nextPhoto}
                  >
                    <ArrowRight size={16} className="text-white" />
                  </Button>
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1">
                    {property.carouselPhotos.map((_, index) => (
                      <div 
                        key={index} 
                        className={`h-1.5 w-1.5 rounded-full ${currentPhotoIndex === index ? 'bg-white' : 'bg-white/50'}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <Home size={48} className="text-gray-400" />
            </div>
          )}
          <Badge className="absolute top-2 right-2 bg-white text-black">
            {property.listingStatus === "RECENTLY_SOLD" ? "Sold" : 
             property.listingStatus === "FOR_SALE" ? "For Sale" : "For Rent"}
          </Badge>
        </div>
        
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{property.address}</CardTitle>
          <CardDescription>
            <span className="flex items-center">
              <MapPin size={14} className="mr-1" />
              {property.country}
            </span>
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="flex justify-between mb-3">
            <span className="flex items-center text-green-600 font-bold">
              <DollarSign size={16} className="mr-1" />
              {parseInt(property.price).toLocaleString('en-US')}
            </span>
            <div className="flex space-x-4">
              <span className="flex items-center">
                <Bed size={16} className="mr-1" />
                {property.bedrooms}
              </span>
              <span className="flex items-center">
                <Bath size={16} className="mr-1" />
                {property.bathrooms}
              </span>
            </div>
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <Home size={14} className="mr-1" />
            <span>{property.propertyType}</span>
            {property.livingArea && (
              <span className="ml-2">{property.livingArea} sqft</span>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="bg-gray-50">
          <a 
            href={`https://zillow.com${property.detailUrl}`}
            target="_blank"
            rel="noopener noreferrer" 
            className="w-full"
          >
            <Button variant="outline" size="sm" className="w-full">
              View on Zillow
              <ArrowRight size={14} className="ml-1" />
            </Button>
          </a>
        </CardFooter>
      </Card>
    );
  };
  
  const RealEstateDashboard = ({ allRealEstateData }: { allRealEstateData: Property[][] }) => {
    // Define labels for each property group
    const categories = [ "For Sale", "For Rent"];
    const [properties, setProperties] = useState<Property[][]>(allRealEstateData);
    const [page, setPage] = useState(2);
    const [isLoading, setIsLoading] = useState(false);
    const { location } = useParams();
    const{accessToken,authFetch} = useAuth()
  
    const loadMoreProperties = async (catergoryIndex:number) => {
      if (isLoading || !location) return;
      
      setIsLoading(true);
      try {
        const response = await authFetch(`${import.meta.env.VITE_GET_MORE_REAL_ESTATE_DATA}${import.meta.env.VITE_GET_MORE_REAL_ESTATE_DATA_PARAM_1}=${encodeURIComponent(location)}&${import.meta.env.VITE_GET_MORE_REAL_ESTATE_DATA_PARAM_2}=${catergoryIndex}&${import.meta.env.VITE_GET_MORE_REAL_ESTATE_DATA_PARAM_3}=${page}`,{
            headers: {
                'Authorization': `Bearer ${accessToken}`
              }
        });
        const data = await response.json();
        
        setProperties(prev => {
          const newProperties = [...prev];
          if (newProperties[catergoryIndex]) {
            newProperties[catergoryIndex] = [...newProperties[catergoryIndex], ...data["moreListings"].props];
            allRealEstateData.push(data["moreListings"].props);
          }
          return newProperties;
        });
        setPage(page + 1);
        
      } catch (error) {
        console.error("Error loading more properties:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    return (
      <div className="container mx-auto p-4">
          
          {/* Individual Category Tabs */}
            {categories.map((category, index) => (
                <TabsContent key={category} value={category.toLowerCase().replace(' ', '-')}>
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">{category}</h2>
                    <Badge variant="outline" className="text-sm">
                        {properties[index]?.length || 0} Properties
                    </Badge>
                    </div>

                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {properties[index]?.map((property, propertyIndex) => (
                        <PropertyCard 
                        key={property.zpid || `property-${propertyIndex}`} 
                        property={property} 
                        />
                    ))}

                    </div>

                </div>
                <div className="flex justify-center mt-6">
                    <button 
                        onClick={() =>  loadMoreProperties(index)}
                        disabled={isLoading}
                        className="px-5 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
                    >
                        {isLoading ? "Loading..." : "Load More Properties"}
                    </button>
                </div>
                </TabsContent>
            ))}
        {/* </Tabs> */}
      </div>
    );
  };
  
    
    export default RealEstateDashboard;