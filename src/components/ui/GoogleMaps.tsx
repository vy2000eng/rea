import {
	APIProvider,
	Map,
	AdvancedMarker,
	Pin,
} from "@vis.gl/react-google-maps";

//import { SchoolInformation } from '@/pages/Results';
import { PropertyInformation } from "@/Model/SchoolModel";
import { Review } from "@/Model/SchoolModel";
import { PoiMarkers } from "@/results_components/MapMarkers";

export type Poi = {
	key: string;
	location: google.maps.LatLngLiteral;
	name: string;
	address: string;
	averageRating: number;
};

export function GoogleMap({
	properties,
}: {
	properties: PropertyInformation[];
}) {
	const getAverageRating = (reviews: Review[]) => {
		let totalStars: number = 0;

		reviews.forEach((r) => (totalStars += r.rating));
		return totalStars / reviews.length;
	};

	//const API_KEY = import.meta.env.DEV_VITE_GOOGLE_API_KEY
	const locations: Poi[] = properties.map((locationInformation) => ({
		key: locationInformation.displayName.text,
		location: {
			lat: locationInformation.location.latitude,
			lng: locationInformation.location.longitude,
		},
		name: locationInformation.displayName.text,
		address: locationInformation.formattedAddress, // Add the name
		averageRating: getAverageRating(locationInformation.reviews),
	}));

	return (
		<div className="w-full h-[75vh]  mx-auto">
			<APIProvider
				apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
				onLoad={() => console.log("Maps API has loaded.")}
			>
				<Map
					style={{ width: "100%", height: "100%" }}
					defaultCenter={{
						lat: properties[0].location.latitude,
						lng: properties[0].location.longitude,
					}}
					defaultZoom={8}
					gestureHandling={"greedy"}
					mapId={"cbf7dada0ba33cac"}
					disableDefaultUI
				>
					<PoiMarkers pois={locations} />
				</Map>
			</APIProvider>
		</div>
	);
}
