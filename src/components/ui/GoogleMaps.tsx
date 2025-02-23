import {APIProvider, Map,AdvancedMarker, Pin} from '@vis.gl/react-google-maps';

//import { SchoolInformation } from '@/pages/Results';
import { SchoolInformation } from '@/Model/SchoolModel';
import {PoiMarkers} from '@/results_components/MapMarkers'

type Poi ={ key: string, location: google.maps.LatLngLiteral }



export function GoogleMap ({properties}:{ properties: SchoolInformation[] })  {

    //const API_KEY = import.meta.env.DEV_VITE_GOOGLE_API_KEY
    const locations: Poi[] = properties.map((locationInformation) =>(
        {
          key: locationInformation.displayName.text,
          location:{lat: locationInformation.location.latitude, lng:locationInformation.location.longitude}
         }
    ))

    return (
        <APIProvider
            apiKey={'AIzaSyCva1AXooMQldRHZ4L-WF-z08PGNUwN1Tw'} onLoad={() => console.log('Maps API has loaded.')}
            //apiKey={API_KEY}
            //solutionChannel='GMP_devsite_samples_v3_rgmbasicmap'

        >
            <Map
                style={{width: '50vw', height: '50vh'}}
                //defaultCenter={{lat: 41.411835, lng: -75.665245}}
                defaultCenter = {{lat:properties[0].location.latitude, lng:properties[0].location.longitude}}
                defaultZoom={12}
                gestureHandling={'greedy'}
                mapId={'cbf7dada0ba33cac'}
                //disableDefaultUI={false}
            >
               <PoiMarkers pois={locations} />


            </Map>
        </APIProvider>
    )


};