




export type RealEstateModel ={
    properties:Property[]

}



export type Property = {


    address: string

    bathrooms: string

    bedrooms: string

    carouselPhotos: PropertyPhoto[]

    country: string

    currency: string

    dateSold: string

    daysOnZillow: string

    detailUrl: string

    hasImage: string

    latitude: string

    listingStatus: string

    livingArea: string

    longitude: string

    lotAreaValue: string

    price: string

    propertyType: string

    rentZestimate: string

    zpid: string
}


export type PropertyPhoto = {
    url:string

}