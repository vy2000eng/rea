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

export type MarkerProps = {
	poi: Poi;
	onClick: (poi: Poi) => void;
	setMarkerRef: (marker: Marker | null, key: string) => void;
};

// import {MarkerClusterer} from '@googlemaps/markerclusterer';
// import type {Marker} from '@googlemaps/markerclusterer';//type Poi ={ key: string, location: google.maps.LatLngLiteral,  name: string ,address:string, averageRating:number}

export const MarkerWithInfo = (props: MarkerProps) => {
	const { poi, onClick, setMarkerRef } = props;
	const [infoWindowShown, setInfoWindowShown] = useState(false);
	//const [markerRef, marker] = useAdvancedMarkerRef();
	const ref = useCallback(
		(marker: google.maps.marker.AdvancedMarkerElement) =>
			setMarkerRef(marker, poi.key),
		[setMarkerRef, poi.key]
	);
	const handleClick = useCallback(() => onClick(poi), [onClick, poi]);

	// const handleMarkerClick = useCallback(
	// 	() => setInfoWindowShown((isShown) => !isShown),
	// 	[]
	// );

	//const handleClose = useCallback(() => setInfoWindowShown(false), []);

	return (
		<>
			{
				<AdvancedMarker ref={ref} position={poi.location} onClick={handleClick}>
					<Pin
						background={"#FBBC04"}
						glyphColor={"#000"}
						borderColor={"#000"}
					/>
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
					key={poi.key}
					poi={poi}
					setMarkerRef={setMarkerRef}
					onClick={handleMarkerClick}
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
