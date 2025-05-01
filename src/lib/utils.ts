import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { CrimeData } from "@/Model/CrimeModel"
import { PropertyInformation } from "@/Model/SchoolModel"
import { Text } from "@/Model/SchoolModel"
import {v4 as uuidv4} from 'uuid';
import { Property, } from "@/Model/RealEstateModel"



export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export function parsePoliceDepartmentData(crimeData: CrimeData[]){
  
  
  let propertyInformation:PropertyInformation[] = []
 

  crimeData.forEach(crime => {

      let text:Text = {
        languageCode: "en",
        text:crime.agency_name

      }


      let propertyIndex:PropertyInformation = {
        id: uuidv4(),
        displayName:text,
        type:"police_department",
        formattedAddress:crime.agency_name,
        location:{
          latitude:crime.latitude,
          longitude:crime.longitude
        },
        reviews:[]

      }

      propertyInformation.push (propertyIndex)
      })
  return propertyInformation
}


export function parseRealEstateData(realEstateData:Property[],propertyType:string){
  let propertyInformation:PropertyInformation[] = []
  realEstateData.forEach(x=>{
    let text:Text = {
      languageCode: "en",
      text:x.address

    }


    let propertyIndex:PropertyInformation = {
      id: uuidv4(),
      displayName: text,
      type:propertyType,
      formattedAddress: x.price,
      location:{
        latitude: Number(x.latitude),
        longitude: Number(x.longitude),

      },
      reviews:[]
    }
    propertyInformation.push(propertyIndex);
  })
  return propertyInformation



}

