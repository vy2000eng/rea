import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import {
	AdvancedMarker,
	Pin,
	useAdvancedMarkerRef,
	InfoWindow,
	useMap,
} from "@vis.gl/react-google-maps";
import { Poi } from "@/components/ui/GoogleMaps";
import { type Marker, MarkerClusterer } from "@googlemaps/markerclusterer";
import { 
  GraduationCap, 
  Hospital, 
  Building2, 
  Landmark, 
  Trees, 
  Mailbox, 
  Church, 
  ShoppingCart, 
  Dumbbell, 
  Utensils 
} from "lucide-react";

export type MarkerProps = {
	poi: Poi;
	onClick: (poi: Poi) => void;
	setMarkerRef: (marker: Marker | null, key: string) => void;
};
export const MarkerWithInfo = (props: MarkerProps) => {
	const { poi, onClick, setMarkerRef } = props;
	const [infoWindowShown, setInfoWindowShown] = useState(false);
	const ref = useCallback(
		(marker: google.maps.marker.AdvancedMarkerElement) =>
			setMarkerRef(marker, poi.key),
		[setMarkerRef, poi.key]
	);
	const handleClick = useCallback(() => onClick(poi), [onClick, poi]);

	return (
		<>
			{
				<AdvancedMarker ref={ref} position={poi.location} onClick={handleClick}>
           {poi.type === "university" ? 
              <Pin 
                background={"#4285F4"} 
                glyphColor={"white"} 
                borderColor={"white"} 
                scale={1.2}
                glyph={"🎓"} 
              /> :
            poi.type === "hospital" ? 
              <Pin 
                background={"#EA4335"} 
                glyphColor={"white"} 
                borderColor={"white"} 
                scale={1.2}
                glyph={"+"} 
              /> :
            poi.type === "corporate_office" ? 
              <Pin 
                background={"#FBBC04"} 
                glyphColor={"black"} 
                borderColor={"white"} 
                scale={1.2}
                glyph={"🏢"} 
              /> :
            poi.type === "bank" ? 
              <Pin 
                background={"#34A853"} 
                glyphColor={"white"} 
                borderColor={"white"} 
                scale={1.2}
                glyph={"$"} 
              /> :
            poi.type === "park" ? 
              <Pin 
                background={"#0F9D58"} 
                glyphColor={"white"} 
                borderColor={"white"} 
                scale={1.2}
                glyph={"🌳"} 
              /> :
            poi.type === "post_office" ? 
              <Pin 
                background={"#9C27B0"} 
                glyphColor={"white"} 
                borderColor={"white"} 
                scale={1.2}
                glyph={"✉"} 
              /> :
            poi.type === "church" ? 
              <Pin 
                background={"#673AB7"} 
                glyphColor={"white"} 
                borderColor={"white"} 
                scale={1.2}
                glyph={"✝"} 
              /> :
            poi.type === "grocery_store" ? 
              <Pin 
                background={"#FF9800"} 
                glyphColor={"white"} 
                borderColor={"white"} 
                scale={1.2}
                glyph={"🛒"} 
              /> :
            poi.type === "gym" ? 
              <Pin 
                background={"#E91E63"} 
                glyphColor={"white"} 
                borderColor={"white"} 
                scale={1.2}
                glyph={"💪"} 
              /> :
            poi.type === "restaurant" ? 
              <Pin 
                background={"#795548"} 
                glyphColor={"white"} 
                borderColor={"white"} 
                scale={1.2}
                glyph={"🍽"} 
              /> :
			  poi.type === "police_department" ? 
              <Pin 
                background={"#795548"} 
                glyphColor={"white"} 
                borderColor={"white"} 
                scale={1.2}
                glyph={"🚔"} 
              /> :
              <Pin 
                background={"#FBBC04"} 
                glyphColor={"#000"} 
                borderColor={"#000"} 
                scale={1.1}
              />
           }
          
				</AdvancedMarker>
			}
		</>
	);
};

export const PoiMarkers = (props: { pois: Poi[] }) => {
	const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
	const [selectedPoiKey, setSelectedPoiKey] = useState<string | null>(null);

	const selectedPoi = useMemo(
		() =>
			props.pois && selectedPoiKey
				? props.pois.find((t) => t.key === selectedPoiKey)!
				: null,
		[props.pois, selectedPoiKey]
	);

	const map = useMap();

	const clusterer = useMemo(() => {
		if (!map) return null;

		return new MarkerClusterer({ map });
	}, [map]);

	const handleMarkerClick = useCallback((poi: Poi) => {
		setSelectedPoiKey(poi.key);
	}, []);

	const handleInfoWindowClose = useCallback(() => {
		setSelectedPoiKey(null);
	}, []);

	useEffect(() => {
		if (!clusterer) return;

		clusterer.clearMarkers();
		clusterer.addMarkers(Object.values(markers));
	}, [clusterer, markers]);

	const setMarkerRef = useCallback((marker: Marker | null, key: string) => {
		setMarkers((markers) => {
			if ((marker && markers[key]) || (!marker && !markers[key]))
				return markers;

			if (marker) {
				return { ...markers, [key]: marker };
			} else {
				const { [key]: _, ...newMarkers } = markers;

				return newMarkers;
			}
		});
	}, []);

	return (
		<>
			{props.pois.map((poi) => (
				<MarkerWithInfo
					key          =  {poi.key}
					poi          =  {poi}
					setMarkerRef =  {setMarkerRef}
					onClick      =  {handleMarkerClick}
				/>
			))}
			{selectedPoiKey && (
				<InfoWindow
					anchor={markers[selectedPoiKey]}
					onCloseClick={handleInfoWindowClose}
				>
					<div className="p-3 min-w-[250px]">
						<div className="mb-4">
							<h2 className="text-xl font-semibold text-gray-900 mb-1">
								{selectedPoi?.name}
							</h2>
							<p className="text-gray-600">{selectedPoi?.address}</p>
						</div>

						<div className="flex items-center space-x-1 mb-2">
							{/* Star rating */}
							<div className="text-yellow-500 text-lg">
								{"★".repeat(Math.floor(selectedPoi?.averageRating ?? 0))}
								{"☆".repeat(5 - Math.floor(selectedPoi?.averageRating ?? 0))}
							</div>
							<span className="text-gray-700 font-medium">
								{selectedPoi?.averageRating.toFixed(1)}
							</span>
						</div>
					</div>
				</InfoWindow>
			)}
		</>
	);
};
