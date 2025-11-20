"use client"
import APIConnection from "@/functions/APIConnection"
import IFrequency from "@/interfaces/IFrequency"
import IMeasureUnit from "@/interfaces/IMeasureUnit"
import IProducts from "@/interfaces/IProducts"
import { ChangeEvent, useEffect, useState } from "react"
import SelectComponent from "../common/SelectComponent"
import LabelComponent from "../common/LabelComponent"
import InputComponent from "../common/InputComponent"
import InputSelect from "../manage-data/InputSelect"
import { toast } from "react-toastify"

const connection = new APIConnection("http://localhost:8000/api")

export default function CardBodyInputs() {
    const [productOption, setProductOption] = useState<number>(0)
    const [products, setProducts] = useState<Array<IProducts>>([])
    const [, setProduct] = useState<IProducts>()
    const [newProduct, setNewProduct] = useState<string>("")
    const [frequencies, setFrquencies] = useState<Array<IFrequency>>([])
    const [frequency, setFrquency] = useState<number>()
    const [measureUnits, setMeasureUnits] = useState<Array<IMeasureUnit>>([])
    const [unit, setUnit] = useState<number>()
    const [quantity, setQuantity] = useState<number>(0)

    useEffect(() => {
        getProducts()
        getFrequencies()
        getMeasureUnits()
    }, [])

    function formatDateToInput(date: Date) {
        return date.toISOString().split("T")[0];
        // recorta a "YYYY-MM-DDTHH:MM"
    }

    const handleChangeProduct = (selectedProduct: IProducts) => {
        setProduct(selectedProduct)
        setNewProduct(selectedProduct.name)
        setFrquency(selectedProduct.frequency)
        setUnit(selectedProduct.unit)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleWriteQty = (e: any) => {
        const qty = e.target.value
        setQuantity(qty)
    }

    const handleChangeFrequency = (freq: IFrequency) => {
        setFrquency(freq.id)
    }

    const handleChangeUnit = (selectedUnit: IMeasureUnit) => {
        setUnit(selectedUnit.id)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChangeNewProduct = (e: any) => {
        const prod = e.target.value
        setNewProduct(prod)
    }


    const handleChangeProductOption = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedId = Number(e.target.value)
        setProductOption(selectedId)
        if (selectedId === 1) {
            setProduct({} as IProducts)
            setFrquency(0)
            setUnit(0)
        }
    }

    const handleSendInfo = async () => {
        try {

            if (productOption === 1) {
                if (unit === undefined || frequency === undefined || newProduct === "" || quantity === 0) {
                    toast.warn("Rellene todos los campos")
                    return
                }
                const productToAdd: IProducts = {
                    name: newProduct,
                    unit: unit,
                    frequency: frequency,
                    stock: quantity,
                }

                // const res = await connection.addData("products", productToAdd)

                // if (!res.status) {
                //     toast.error(res.message || "No se pudo procesar la información")
                //     return
                // }

                // toast.success(res.message)
                console.log(productToAdd)
                return
            }

            
        } catch {
            toast.error("Error")
        }
    }

    const getProducts = async () => {
        const res = await connection.getAllData("/products")

        setProducts(res.body.data)
    }

    const getFrequencies = async () => {
        const res = await connection.getAllData("/consumption-frequency")

        setFrquencies(res.body.data)
    }

    const getMeasureUnits = async () => {
        const res = await connection.getAllData("/measure-units")

        setMeasureUnits(res.body.data)
    }

    return (
        <>
            <div className="card card-body">
                <div className="d-flex" style={{ width: "100%" }}>
                    <div className="container" style={{ width: "50%" }}>
                        <div className="row mb-10 align-items-center"
                            style={{ height: 50, width: "100%" }}>
                            <LabelComponent text="Existencia" />
                            <div className="col-sm-3 card border-primary"
                                style={{ padding: 0, width: 220, height: "100%" }}>
                                <select defaultValue={"0"}
                                    onChange={handleChangeProductOption} name="selectExistence"
                                    id="selectExistence" className="form-select"
                                    style={{ height: "100%" }}>
                                    <option disabled value="0">Selecciona una opción</option>
                                    <option value="1">Nuevo</option>
                                    <option value="2">Existente</option>
                                </select>
                            </div>
                        </div>
                        {productOption === 2 && <>
                            <div className="row mb-10"
                                style={{ height: 50, width: "100%" }}>
                                <LabelComponent text="Producto" />
                                <InputSelect listName="products" handleChange={handleChangeProduct} elementsArray={products} />
                            </div>
                            <div className="row mb-10"
                                style={{ height: 50, width: "100%" }}>
                                <LabelComponent text="Frecuencia de consumo" />
                                <SelectComponent value={frequency?.toString()} knowProduct handleChange={handleChangeProduct} elementsArray={frequencies} />
                            </div>
                        </>}
                        {productOption === 1 && <>
                            <div className="row mb-10"
                                style={{ height: 50, width: "100%" }}>
                                <LabelComponent text="Producto" />
                                <InputComponent handleWrite={handleChangeNewProduct} value={newProduct} />
                            </div>
                            <div className="row mb-10"
                                style={{ height: 50, width: "100%" }}>
                                <LabelComponent text="Frecuencia de consumo" />
                                <SelectComponent value={frequency?.toString()} elementsArray={frequencies} handleChange={handleChangeFrequency} />
                            </div>
                        </>
                        }
                    </div>
                    <div className="container" style={{ width: "50%" }}>
                        <div className="row mb-10"
                            style={{ height: 50, width: "100%" }}>
                            <LabelComponent text="Fecha" width={110} />
                            <InputComponent type="date" value={formatDateToInput(new Date())} width={320} />
                        </div>
                        {(productOption === 1 || productOption === 2) && <>
                            <div className="row mb-10 align-items-center"
                                style={{ height: 50, width: "100%" }}>
                                <LabelComponent text="Cantidad" width={110} />
                                <InputComponent handleWrite={handleWriteQty} width={120} />
                                <SelectComponent value={unit?.toString()} knowProduct={productOption === 2 ? true : false} elementsArray={measureUnits} handleChange={handleChangeUnit} width={200} />
                            </div>
                        </>}
                    </div>
                </div>
            </div>
            <button onClick={handleSendInfo} style={{
                fontSize: 25,
                fontWeight: "bolder"
            }}>Enviar</button>
        </>
    )
}