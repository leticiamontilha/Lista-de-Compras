import { Request, Response, NextFunction } from "express";
import { allList } from "./database";


export const idListShopExist = (request : Request, response : Response, next: NextFunction): Response | void  => {
    const id: number= parseInt(request.params.id)

    const indexListShop = allList.findIndex(el => el.id === id)
    
    if(indexListShop === -1){
        return response.status(404).json({
            message: "Lista não encontrada"
        })    
    }
    
    request.listShop = {
        indexListShop: indexListShop
    }

    const { listName, data } = request.body;

    request.validateItensData = { listName, data} 

    return next()
}
