"use client"
import {CartesianGrid, XAxis,YAxis } from "recharts"
import { CrimeDataPoint } from "@/Model/CrimeModel"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { CrimeData} from "@/Model/CrimeModel"

import { Legend } from "recharts"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { generateChartConfig } from "@/utils/chartConfig"

  import {  Line, LineChart } from "recharts"
  import { TrendingUp } from "lucide-react"
  import { useState } from "react"





const CrimeChart = ({crimeData}: {crimeData:CrimeData[]}) =>{


        const [selectedCategory, setSelectedCategory] = useState("");

    
        let cf  = new Set<string>()
        const cData:CrimeDataPoint [] = []

         crimeData.forEach((place) => {
            let listOfKeys:string[] = Object.keys(place.offenses.offenses.rates)
            .filter(x =>
                    x.includes("Police Department") 
                ||  x.includes("United States")
                ||  x.includes(place.state_name)  
            
            )
            listOfKeys.forEach(key =>{
                if(!cf.has(key)){
                    let listOfEntries:[string,number|null][] = Object.entries(place.offenses.offenses.rates[key])
                    
                    listOfEntries.forEach((entry,index) =>{
                        

                        if(entry[1] !== 0 && entry[1] !== -1){
                            let f = cData[index]
                            if(f!== undefined){
                                f[key]= entry[1]

                            }else{
                                let chartItem:CrimeDataPoint={
                                    date:entry[0]
                                }
                                chartItem.date = entry[0]
                                chartItem[key] = entry[1] 
                                cData.push(chartItem)

                            }
                        }



                    })

                }
                cf.add(key)
            })
        })
        cData.sort((a, b) => {
            if (!a.date) return -1; // Null dates come first
            if (!b.date) return 1;
            
            const aDateStr = String(a.date);
            const bDateStr = String(b.date);
            
            const aParts = aDateStr.split('-');
            const bParts = bDateStr.split('-');
            
            if (aParts.length !== 2 || bParts.length !== 2) {
              return 0;
            }
            
            const aMonth = parseInt(aParts[0]);
            const aYear = parseInt(aParts[1]);
            const bMonth = parseInt(bParts[0]);
            const bYear = parseInt(bParts[1]);
            
            if (aYear !== bYear) {
              return aYear - bYear;
            }
            return aMonth - bMonth;
          });
          console.log(cData)



        const chartConfig = generateChartConfig(cf);

        console.log(chartConfig)

        function selectCategory(catergory:string){
            setSelectedCategory(catergory)
            console.log(catergory)


        }

        const getKeysForCategory = (category:string) => {
            if (!category) return [];
  
            // Get all keys (not filtered)
            const allKeys = Object.keys(chartConfig);
            
            const baseKeys = allKeys.slice(0, 2);
            
            // Filter keys that match the selected category
            const categoryKeys = allKeys.filter(key => 
              chartConfig[key].label === category || 
              (category === "All" && key.includes("Clearances"))
            );
            
            // Combine the base keys with category keys, removing duplicates
            const combinedKeys = [...new Set([...baseKeys, ...categoryKeys])];
            
            return combinedKeys;
          };

        const keysToDisplay = selectedCategory
        ? getKeysForCategory(selectedCategory)
        : Object.keys(chartConfig)
            .filter(key => !key.includes("Clearances"))
            .slice(0, 3);


        return ( 
            <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Crime Rates Overview</CardTitle>
                  <CardDescription>Explore monthly crime data by agency.</CardDescription>
                </div>
                <Select onValueChange={selectCategory}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select Agency" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(chartConfig).map(({ label }, idx) => (
                      <SelectItem key={label + idx} value={label}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
          
            <CardContent>
              <ChartContainer config={chartConfig}>
                <LineChart
                  accessibilityLayer
                  data={cData}
                  margin={{ left: 20, right: 20, top: 20, bottom: 20 }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <YAxis
                    domain={[0, 'auto']}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                  <Legend />
                  {keysToDisplay.map((key) => (
                    <Line
                      key={key}
                      dataKey={key}
                      type="monotone"
                      stroke={chartConfig[key].color}
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                      connectNulls
                      isAnimationActive={false}
                      dot={false}
                    />
                  ))}
                </LineChart>
              </ChartContainer>
            </CardContent>
          
            <CardFooter>
              <div className="flex w-full items-start gap-3 text-sm">
                <div className="grid gap-1">
                  <div className="flex items-center gap-2 font-medium leading-none">
                    Crime Rate Trends <TrendingUp className="h-4 w-4" />
                  </div>
                  <div className="text-muted-foreground">
                    Visualizing crime rates over time for selected agencies.
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>
          
            )
        }





export default CrimeChart;
