
export type CrimeData = {
    agency_name: string;
    state_name:string,
    counties: string;
    latitude:number;
    longitude: number;
    offenses:OffensesData
    populations:Populations 
    tooltips: Populations
    type:string

}

export type CrimeDataPoint = {
    [key: string]: string | number|null;  
  };


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
