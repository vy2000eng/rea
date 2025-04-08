/**
 * Chart configuration type definition
 */
type ChartConfigEntry = {
    label: string;
    color: string;
    pattern?: "dashed" | "dotted" | "solid";
  };
  import { ChartConfig } from "@/components/ui/chart";
  
  /**
   * Complete chart configuration type
   */
  type CrimeChartConfig = {
    [key: string]: ChartConfigEntry;
  } 
  
  /**
   * Generates a chart configuration from a Set of strings
   * @param dataSet - Set of strings to generate chart config from
   * @returns Chart configuration object
   */
  function generateChartConfig(dataSet: Set<string>): CrimeChartConfig {
    const chartConfig: CrimeChartConfig = {};
  const colorIndices: Record<string, number> = {};
  let colorCount = 1;
  
  // Define a maximum color count to cycle through
  const MAX_COLOR_COUNT = 12; // Or however many color variables you have defined
  
  // Convert set to array for processing
  const entries = Array.from(dataSet);
  
  // Process all entries
  entries.forEach(entry => {
    // Check if this is a clearance entry
    const isClearance = entry.includes("Clearances");
    
    // Find the base entity (remove " Clearances" if present)
    const baseEntity = isClearance ? entry.replace(" Clearances", "") : entry;
    
    // Assign a color index if this is a new base entity
    if (!colorIndices[baseEntity] && !isClearance) {
      colorIndices[baseEntity] = colorCount++;
      
      // Cycle through colors if we exceed the maximum
      if (colorCount > MAX_COLOR_COUNT) {
        colorCount = 1;
      }
    }
    
    // Get color index for this entry
    const colorIndex = colorIndices[baseEntity] || colorCount++;
    
    // Create the config entry
    chartConfig[entry] = {
      label: entry,
      color: `hsl(var(--chart-${colorIndex}))`,
      ...(isClearance && { pattern: "dashed" })
    };
  });
  
  return chartConfig satisfies ChartConfig;
  }
  export { generateChartConfig, type CrimeChartConfig , type ChartConfigEntry };
