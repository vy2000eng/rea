import { CrimeData } from "./CrimeModel";

export interface PropertyOrCrimeData {
    data : PropertyInformation[] |CrimeData[]
}

export type PropertyInformation = {
	id: string;

	displayName: Text;
	formattedAddress: string;
    type:string;
	location: {
		latitude: number;
		longitude: number;
	};
	reviews: Review[];
};
export type Review = {
	id: number;
	authorAttribution: AuthorAttribution;
	name: string;
	relativePublishTimeDescription: string;
	rating: number;
	originalText: Text;
};

export type AuthorAttribution = {
	displayName: string;
	photoUri: string;
	uri: string;
};

export type Text = {
	languageCode: string;
	text: string;
};

export type GeoCachedLocation = {
	formatted_address: string;
	latitude: number;
	longitude: number;
};

export type CategoryData = {
    key: string;
    label: string;
    count: number;
};


export function getCategories(properties?: PropertyInformation []){
    if (!properties) return []
    const countByCategory: {[c: string]: number} = {};
    for (const p of properties) {
        if (!countByCategory[p.type]) countByCategory[p.type] = 0;
        countByCategory[p.type]++;
    }
    return Object.entries(countByCategory).map(([key, value]) => {

        const label = key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        return {
            key: key,
            label,
            count: value
        };
    });


}

