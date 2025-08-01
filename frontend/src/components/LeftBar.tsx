import APIConnection from "@/functions/APIConnection";
import IFrequency from "@/interfaces/IFrequency";
import IMeasureUnit from "@/interfaces/IMeasureUnit";
import IProducts from "@/interfaces/IProducts";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type LeftBarProps = {
    setReloadTable: Dispatch<SetStateAction<() => Promise<void>>>
    setBody: Dispatch<SetStateAction<Array<Record<string, string>>>>
    setHeaders: Dispatch<SetStateAction<Record<string, string>>>
    setDataToAdd: Dispatch<SetStateAction<Record<string, string>>>
    setPageTitle: Dispatch<SetStateAction<string>>
    setEndpoint: Dispatch<SetStateAction<string>>
    setOptionsToSelect?: Dispatch<SetStateAction<{
        Frequency: IFrequency[],
        MeasuresUnits: IMeasureUnit[],
        Products: IProducts[]
    }>>
}


const connection = new APIConnection("http://localhost:8000/api")

export default function LeftBar({ setReloadTable, setBody, setHeaders, setOptionsToSelect, setPageTitle, setDataToAdd, setEndpoint }: LeftBarProps) {
    const [frequencies, setFrequencies] = useState<IFrequency[]>([])
    const [measureUnits, setMeasureUnits] = useState<IMeasureUnit[]>([])
    const [products, setProducts] = useState<IProducts[]>([])

    const optionsOfMenu: {
        Frequency: IFrequency[],
        MeasuresUnits: IMeasureUnit[],
        Products: IProducts[]
    } = {
        Frequency: frequencies,
        MeasuresUnits: measureUnits,
        Products: products
    };

    const getFrequencies = async () => {
        const request = await connection.getAllData("/consumption-frequency");
        setFrequencies(request.body["data"]);
    }

    const getMeasureUnits = async () => {
        const request = await connection.getAllData("/measure-units");
        const data = request.body["data"];
        setMeasureUnits(data);
        optionsOfMenu.MeasuresUnits = data;
    }

    const getProducts = async () => {
        const request = await connection.getAllData("/products");
        const data = request.body["data"];
        setProducts(data);
        optionsOfMenu.Products = data;
    }
    
    useEffect(() => {
        getFrequencies()
        getMeasureUnits()
        getProducts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const tableHeaders = {
        Frequency: {
            frequency: "Frecuencia"
        },
        MeasuresUnits: {
            unit: "Unidad"
        },
        Products: {
            name: "Nombre",
            unit: "Unidad de medida",
            frequency: "Frecuencia",
            stock: "Stock",
            min_stock: "Stock mínimo",
            max_stock: "Stock máximo",
            active: "Activo"
        }
    }

    return (
        <div style={{ height: "90%" }} className="bg-secondary d-flex align-items-start justify-center">
            <div style={{ height: "100%" }}>
                <button
                    className="btn btn-secondary m-3"
                    onClick={() => {
                        setBody(frequencies.map((item) => ({
                            id: String(item.id),
                            frequency: String(item.frequency)
                        })));
                        setHeaders(tableHeaders.Frequency);
                        setPageTitle("ConsumptionFrequency")
                        setEndpoint("/")
                    }}
                    style={{ width: "90%", height: "7%" }}>Tabla de frecuencia</button>
                <button
                    className="btn btn-secondary m-3"
                    onClick={() => {
                        setBody(optionsOfMenu.MeasuresUnits.map(item => ({
                            id: String(item.id),
                            unit: String(item.unit)
                        })))
                        setHeaders(tableHeaders.MeasuresUnits)
                        setReloadTable(() => async () => {
                            await getMeasureUnits()
                            setBody(optionsOfMenu.MeasuresUnits.map(item => ({
                                id: String(item.id),
                                unit: String(item.unit)
                            })))
                        })
                        setPageTitle("MeasureUnits")
                        setEndpoint("measure-units")
                        setDataToAdd({ unit: "" })
                    }}
                    style={{ width: "90%", height: "7%" }}>Tabla de unidades de medida</button>
                <button
                    className="btn btn-secondary m-3"
                    onClick={() => {
                        setBody(optionsOfMenu.Products.map(item => ({
                            id: String(item.id),
                            max_stock: String(item.max_stock),
                            min_stock: String(item.min_stock),
                            unit: String(measureUnits.find(u => u.id === item.unit)?.unit),
                            active: item.active === true ? "Activo" : "Inactivo",
                            frequency: String(frequencies.find(f => f.id === item.frequency)?.frequency),
                            name: String(item.name),
                            stock: String(item.stock)
                        })))
                        setDataToAdd({
                            name: "",
                            unit: "",
                            frequency: "",
                            stock: "",
                            min_stock: "",
                            max_stock: "",
                            active: "",
                        })
                        setReloadTable(() => async () => {
                            await getProducts()
                            setBody(optionsOfMenu.Products.map(item => ({
                                id: String(item.id),
                                max_stock: String(item.max_stock),
                                min_stock: String(item.min_stock),
                                unit: String(measureUnits.find(u => u.id === item.unit)?.unit),
                                active: item.active === true ? "Activo" : "Inactivo",
                                frequency: String(frequencies.find(f => f.id === item.unit)?.frequency),
                                name: String(item.name),
                                stock: String(item.stock)
                            })))
                        })
                        setHeaders(tableHeaders.Products)
                        if (setOptionsToSelect) {
                            setOptionsToSelect(optionsOfMenu)
                        }
                        setEndpoint("products")
                        setPageTitle("Products")
                    }}
                    style={{ width: "90%", height: "7%" }}>Tabla de productos</button>
            </div>
        </div>
    )
}