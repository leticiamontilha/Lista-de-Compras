import express, { Application } from "express";
import { createList, deleteListId, getAllList, getListId, updateList } from "./logic";
import { idListShopExist } from "./middlewares";

const app: Application = express()
app.use(express.json())

app.post("/purchaseList", createList)

app.get("/purchaseList", getAllList)
app.get("/purchaseList/:id", idListShopExist, getListId)

app.patch("/purchaseList/:id/:item", idListShopExist, updateList)

app.delete("/purchaseList/:id", idListShopExist, deleteListId)
// app.delete("/purchaseList/:id/:item", idListShopExist, deleteItenData)

app.listen(3000, () => {
    console.log("server is running!")
})