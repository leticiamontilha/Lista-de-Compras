export interface dataList {
    name: string,
    quantity: string
    
}

export interface IListRequest  {
    listName: string,
    data: dataList[]
}

export interface IListComplete extends IListRequest {
    id: number
}

export type ItensListRequiredKeys = "listName" | "data"

export type ItensListRequiredData = "name" | "quantity"