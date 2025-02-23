
export type SchoolInformation = {
    id: number,
    displayName: Text,
    formattedAddress:string,
    location: {   
        latitude: number, 
        longitude: number
    },
    reviews: Review []


}
export type Review = {

    id:number,
    authorAttribution: AuthorAttribution,
    name: string,
    relativePublishTimeDescription: string,
    rating: number,
    originalText:Text,



}

export type AuthorAttribution = {
    displayName: string,
    photoUri: string,
    uri: string

}

export type Text = {
    languageCode: string,
    text: string,
}

export type GeoCachedLocation = {
  formatted_address :string,
  latitude: number,
  longitude:number
}


// }
// export type SchoolDetails = {
//     id: number,
//     displayName: {
//         languageCode: string,
//         text: string
//     },
//     formattedAddress: string,
//     location: {
//         latitude: number,
//         longitude: number
//     },
//     reviews: {
//         id: number,
//         authorAttribution: {
//             displayName: string,
//             photoUri: string,
//             uri: string
//         },
//         name: string,
//         relativePublishTimeDescription: string,
//         rating: number,
//         originalText: {
//             languageCode: string,
//             text: string
//         }
//     }[],
//     geoCachedLocation?: {
//         formatted_address: string,
//         latitude: number,
//         longitude: number
//     }
// }