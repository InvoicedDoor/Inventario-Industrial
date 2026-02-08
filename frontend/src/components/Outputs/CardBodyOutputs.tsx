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
import IIntake from "@/interfaces/IIntakes"
import IIntakeType from "@/interfaces/IConsumptionType"
import { toast } from "react-toastify"
import IEmployees from "@/interfaces/IEmployees"
import IConsumers from "@/interfaces/IConsumers"

const connection = new APIConnection("http://localhost:8000/api")

export default function CardBodyOutputs() {
    const [productOption, setProductOption] = useState<number>(2)
    const [products, setProducts] = useState<Array<IProducts>>([])
    const [product, setProduct] = useState<IProducts>()
    const [newProduct, setNewProduct] = useState<string>("")
    const [frequencies, setFrquencies] = useState<Array<IFrequency>>([])
    const [frequency, setFrquency] = useState<number>()
    const [measureUnits, setMeasureUnits] = useState<Array<IMeasureUnit>>([])
    const [unit, setUnit] = useState<number>()
    const [intake, setIntake] = useState<IIntake>({} as IIntake)
    const [quantity, setQuantity] = useState<number>(0)
    const [intakeType, setIntakeType] = useState<number>(0)
    const [intakesType, setIntakesType] = useState<IIntakeType[]>([])
    const [employees, setEmployees] = useState<IEmployees[]>([])
    const [employee, setEmployee] = useState<IEmployees>({} as IEmployees)
    const [consumers, setConsumers] = useState<IConsumers[]>([])
    const [consumer, setConsumer] = useState<IConsumers>({} as IConsumers)

    useEffect(() => {
        getProducts()
        getFrequencies()
        getMeasureUnits()
        getIntakeType()
        getEmployees()
        getConsumers()
    }, [])

    function formatDateToInput(date: Date) {
        return date.toISOString().split("T")[0];
        // recorta a "YYYY-MM-DDTHH:MM"
    }

    const handleChangeProduct = (selectedProduct: IProducts) => {
        setProduct(selectedProduct)
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

    const handleChangeIntakeType = (selectedIntake: IIntakeType) => {
        setIntakeType(selectedIntake.id)
    }

    const handleChangeUnit = (selectedUnit: IMeasureUnit) => {
        setUnit(selectedUnit.id)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChangeNewProduct = (e: any) => {
        const prod = e.target.value
        setNewProduct(prod)
    }

    const handleChangeEmployee = (employee: IEmployees) => {
        setEmployee(employee)
    }

    const handleChangeConsumer = (consumer: IConsumers) => {
        setConsumer(consumer)
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

                const res = await connection.addData("products", productToAdd)

                if (!res.status) {
                    toast.error(res.message || "No se pudo procesar la información")
                    return
                }

                toast.success(res.message)
            }
            const newIntake: IIntake = {
                intake_type: intakeType ?? 0,
                product: product?.id ?? 0,
                customer: intakeType === 1 ? employee?.id : consumer?.id,
                date: new Date,
                quantity: quantity ?? 0
            }
            setIntake(newIntake)

            const res = await connection.addData("", intake);

            if (!res.status) {
                toast.error("Error al agregar el consumo.")
                return
            }

            toast.success("Consumo registrado")
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

    const getIntakeType = async () => {
        const res = await connection.getAllData("/intake-type")

        setIntakesType(res.body.data)
    }

    const getEmployees = async () => {
        const res = await connection.getAllData("/employees")

        setEmployees(res.body.data)
    }

    const getConsumers = async () => {
        const res = await connection.getAllData("/consumers")

        setConsumers(res.body.data)
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
                                <select defaultValue={"2"}
                                    disabled
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
                                <LabelComponent text="Tipo de consumo" width={110} />
                                <SelectComponent value={intakeType?.toString()} elementsArray={intakesType} handleChange={handleChangeIntakeType} width={320} />
                            </div>
                            <div className="row mb-10 align-items-center"
                                style={{ height: 50, width: "100%" }}>
                                <LabelComponent text="Cantidad" width={110} />
                                <InputComponent handleWrite={handleWriteQty} width={120} />
                                <SelectComponent value={unit?.toString()} knowProduct={productOption === 2 ? true : false} elementsArray={measureUnits} handleChange={handleChangeUnit} width={200} />
                            </div>
                            {intakeType && <div className="row mb-10 align-items-center"
                            style={{ height: 50, width: "100%" }}>
                                <LabelComponent text="Consumidor" />
                                <InputSelect elementsArray={intakeType === 1 ? employees : consumers} listName="employees" handleChange={intakeType === 1 ? handleChangeEmployee : handleChangeConsumer} />
                            </div>}
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