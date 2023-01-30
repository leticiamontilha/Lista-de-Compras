import * as express from 'express'

declare global {
    namespace Express {
        interface Request {
            listShop: {
                indexListShop: number
            };

            validateItensData: {
                listName: string;
                data: dataList[]
            }
        }
    }
}