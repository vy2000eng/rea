

export type SearchQueries = {
    userSearchQuery:UserSearchModel[]
}


export type UserSearchModel  = {
    placeId:number
    originalQuery:string
    googleGeneratedSearchQuery: string
    createdAt: string
}