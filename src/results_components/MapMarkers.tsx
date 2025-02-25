
import { useState,useCallback } from 'react';
import {
    AdvancedMarker,
    Pin,
    useAdvancedMarkerRef,
    InfoWindow,
  
    
  } from '@vis.gl/react-google-maps';
  import { Poi } from '@/components/ui/GoogleMaps';
  import {MarkerClusterer} from '@googlemaps/markerclusterer';
  import type {Marker} from '@googlemaps/markerclusterer';//type Poi ={ key: string, location: google.maps.LatLngLiteral,  name: string ,address:string, averageRating:number}



export const MarkerWithInfo = ({ poi  }: { poi: Poi }) => {
  const [infoWindowShown, setInfoWindowShown] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();


  const handleMarkerClick = useCallback(
    () => setInfoWindowShown(isShown => !isShown),
    []
  );

  const handleClose = useCallback(() => setInfoWindowShown(false), []);



    return (
      <>
      {
            <AdvancedMarker
              ref={markerRef}
              position={poi.location}
              onClick={handleMarkerClick}
              >
                  {infoWindowShown && (
                    <InfoWindow anchor={marker} onClose={handleClose}>
                      <div className="p-3 min-w-[250px]">
                        <div className="mb-4">
                            <h2 className="text-xl font-semibold text-gray-900 mb-1">{poi.name}</h2>
                            <p className="text-gray-600">{poi.address}</p>
                        </div>
                        
                        <div className="flex items-center space-x-1 mb-2">
                            {/* Star rating */}
                            <div className="text-yellow-500 text-lg">
                                {'★'.repeat(Math.floor(poi.averageRating))}
                                {'☆'.repeat(5 - Math.floor(poi.averageRating))}
                            </div>
                            <span className="text-gray-700 font-medium">
                                {poi.averageRating.toFixed(1)}
                            </span>
                         </div>
                      </div>
                    </InfoWindow>
                  )}
              <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
            </AdvancedMarker>
      }

      </>
    );
  };
  
  export const PoiMarkers = (props: {pois: Poi[]}) => {
    return (
        
          <>
              {props.pois.map((poi) => (
                  <MarkerWithInfo 
                      key={poi.key} 
                      poi={poi} 
                      //clusterer={clusterer}
                  />
              ))}
          </>
           


          
        
    );
};