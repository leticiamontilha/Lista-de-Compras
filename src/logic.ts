import { Request, Response } from "express"
import { allList } from "./database"
import { IListComplete, IListRequest, ItensListRequiredData, ItensListRequiredKeys } from "./interfaces"

const validateDataList = (payload: any): IListRequest => {

    const keys: Array<string> = Object.keys(payload)
    const requiredKeys: Array<ItensListRequiredKeys> = ["listName", "data"]

    const containsAllList: boolean = requiredKeys.every((key: string) => {
        return keys.includes(key)
    })

    if(payload.data.length === 0){
        throw new Error ("A lista precisa ter pelo menos um item")
    }

    if(!containsAllList) {
        throw new Error(`As chaves sao obrigatorias: ${requiredKeys}`)
    }

    return payload
}

export const createList = (request: Request, response: Response ): Response => {
   try {
    const listData: IListRequest = validateDataList(request.body)

    if (typeof listData.listName !== "string") {
        return response.status(400).json({
            message: "o nome da lista deve ser do tipo string",
        });
    }

    const verificItensData = listData.data.find(el => Object.keys(el).length > 2)
    if (verificItensData){
        return response.status(400).json({
            message: "A sua lista só pode conter as chaves ListName e Data"
        })
    }
    
    const newListData: IListComplete = {
        id: allList.length+1,
        ...listData
    }

    allList.push(newListData)

    return response.status(201).json(newListData)

   } catch (error) {
    
    if(error instanceof Error){
        return response.status(400).json({
            message:error.message
        })
    }

    console.log(error)
    return response.status(500).json({
        message: "internal server error"
    })
   }
}

export const getAllList =  (request: Request, response: Response): Response => {
    return response.status(200).json(allList)
}

export const getListId =  (request: Request, response: Response): Response => {

    const indexListShop: number = request.listShop.indexListShop

    return response.status(200).json(allList[indexListShop])
}

export const updateList = (request: Request, response: Response): Response => {
    
    const indexListShop: string = request.params.id 
    const itemListShop = request.params.item
   
    const list = allList.find(el => el.id === +indexListShop) as IListComplete

    const updateIndex = list?.data.findIndex(el => el.name === itemListShop)

    for (const key in request.body){
        if(key !== "name" && key !== "quantity"){
            return response.status(400).json({
                message: "o item só pode conter name ou quantity",
            });  
        }

        if( typeof request.body[key] !== "string"){
            return response.status(400).json({
                message: "o item só pode ser do",
            }); 
        }
    }

    if(updateIndex === -1) {
        return response.status(404).json({
            message: `o item ${itemListShop} não existe`,
        });
    }

    if(request.body.name){
        list.data[updateIndex].name = request.body.name
    }

    if(request.body.quantity){
        list.data[updateIndex].quantity = request.body.quantity
    }

   return response.status(200).json(list.data[updateIndex])
}

export const deleteListId = (request: Request, response: Response): Response => {
   
    const indexListShop: number = request.listShop.indexListShop

    allList.splice(indexListShop, 1)

    return response.status(204).send()
}

export const deleteItenData = (request: Request, response: Response): Response => {
    
    const indexListShop: string = request.params.id 
    const itemListShop = request.params.item

    const list = allList.find(el => el.id === +indexListShop) as IListComplete

    const deleteIndex = list?.data.findIndex(el => el.name === itemListShop) 

    if(deleteIndex === -1){
        return response.status(404).json({
            message: `o item ${itemListShop} não existe`,
        });
    }
    
    list.data.splice(deleteIndex, 1)


    return response.status(204).json({})
    
}

