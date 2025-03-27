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


export type CrimeData = {
    agency_name: string;
    state_name:string,
    counties: string;
    latitude:number;
    longitude: number;
    offenses:OffensesData
    populations:Populations 
    tooltips: Populations

}

export interface OffensesData{ 
    offenses:{
        rates:{
            [agencyName: string]: {
                [timeperiod: string]: number | null;  // Example: "01-2021": null, "01-2022": 0
            };   
      };
    }      
};


export type Populations = {
   participated_population :{  
        [agencyName: string]: {
            [timeperiod: string]: number | null;
        }
    };
   population:  {
        [agencyName: string]: {
            [timeperiod: string]: number | null;
        };
    }; 
    
}

export type ToolTips = {
    population:  {
        percentageOfPopulationCoverage:{
            State:{
                [state: string]: {
                    [timeperiod: string]: number | null;
                };
            };
            County:{
                [country: string]: {
                        [timeperiod: string]: number | null;
                    };
            }; 
        }
    }
}



export type Actuals = {

}


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

