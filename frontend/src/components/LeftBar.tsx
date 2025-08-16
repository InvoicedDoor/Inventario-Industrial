import APIConnection from "@/functions/APIConnection";
import IConsumers from "@/interfaces/IConsumers";
import IFrequency from "@/interfaces/IFrequency";
import IIntakeType from "@/interfaces/IIntakeType";
import IMeasureUnit from "@/interfaces/IMeasureUnit";
import IProducts from "@/interfaces/IProducts";
import IRoles from "@/interfaces/IRoles";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import LeftButtonBar from "./LeftBarButton";
import IEmployees from "@/interfaces/IEmployees";

export interface LeftBarProps {
    setReloadTable: Dispatch<SetStateAction<() => Promise<void>>>
    setBody: Dispatch<SetStateAction<Array<Record<string, string>>>>
    setHeaders: Dispatch<SetStateAction<Record<string, string>>>
    setDataToAdd: Dispatch<SetStateAction<Record<string, string>>>
    setPageTitle: Dispatch<SetStateAction<string>>
    setEndpoint: Dispatch<SetStateAction<string>>
    setOptionsToSelect?: Dispatch<SetStateAction<{
        Frequency: IFrequency[],
        MeasuresUnits: IMeasureUnit[],
        Products: IProducts[],
        IntakeTypes: IIntakeType[],
        Consumers: IConsumers[],
        Roles: IRoles[],
        Employees: IEmployees[]
    }>>
}


const connection = new APIConnection("http://localhost:8000/api")

export default function LeftBar({ setReloadTable, setBody, setHeaders, setOptionsToSelect, setPageTitle, setDataToAdd, setEndpoint }: LeftBarProps) {
    const [frequencies, setFrequencies] = useState<IFrequency[]>([])
    const [measureUnits, setMeasureUnits] = useState<IMeasureUnit[]>([])
    const [products, setProducts] = useState<IProducts[]>([])
    const [intakeTypes, setIntakeTypes] = useState<IIntakeType[]>([])
    const [consumers, setConsumers] = useState<IConsumers[]>([])
    const [roles, setRoles] = useState<IRoles[]>([])
    const [employees, setEmployees] = useState<IEmployees[]>([])

    const optionsOfMenu: {
        Frequency: IFrequency[],
        MeasuresUnits: IMeasureUnit[],
        Products: IProducts[],
        IntakeTypes: IIntakeType[],
        Consumers: IConsumers[],
        Roles: IRoles[],
        Employees: IEmployees[]
    } = {
        Frequency: frequencies,
        MeasuresUnits: measureUnits,
        Products: products,
        IntakeTypes: intakeTypes,
        Consumers: consumers,
        Roles: roles,
        Employees: employees
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

    const getInakeTypes = async () => {
        const request = await connection.getAllData("/intake-type");
        const data = request.body["data"];
        setIntakeTypes(data);
        optionsOfMenu.IntakeTypes = data;
    }

    const getConsumers = async () => {
        const request = await connection.getAllData("/consumers");
        const data = request.body["data"];
        setConsumers(data);
        optionsOfMenu.Consumers = data;
    }

    const getRoles = async () => {
        const request = await connection.getAllData("/roles");
        const data = request.body["data"];
        setRoles(data);
        optionsOfMenu.Roles = data;
    }

        const getEmployees = async () => {
        const request = await connection.getAllData("/employees");
        const data = request.body["data"];
        setEmployees(data);
        optionsOfMenu.Employees = data;
    }

    useEffect(() => {
        getFrequencies()
        getMeasureUnits()
        getProducts()
        getInakeTypes()
        getConsumers()
        getRoles()
        getEmployees()
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
        },
        IntakeTypes: {
            intake_type: "Tipo de consumo"
        },
        Consumers: {
            name: "Consumidor"
        },
        Roles: {
            rol: "Rol"
        },
        Employees: {
            name: "Nombre",
            rol: "Rol"
        }
    }

    return (
        <div style={{ height: "90%" }} className="bg-secondary d-flex align-items-start justify-center">
            <div style={{ height: "100%" }}>
                <LeftButtonBar
                buttonName="frecuencia"
                    setReloadTable={()=>{}}
                    setDataToAdd={setDataToAdd}
                    setBody={setBody}
                    setPageTitle={setPageTitle}
                    setEndpoint={setEndpoint}
                    setHeaders={setHeaders}
                    pageTitle="ConsumptionFrequency"
                    endpoint="consumption-frequency"
                    setOptionsToSelect={setOptionsToSelect}
                    optionsOfMenu={optionsOfMenu}
                    body={
                        optionsOfMenu.Frequency.map((item) => ({
                            id: String(item.id),
                            frequency: String(item.frequency)
                        }))
                    }
                    headers={tableHeaders.Frequency}
                />
                <LeftButtonBar
                buttonName="unidades de medida"
                    setBody={setBody}
                    setPageTitle={setPageTitle}
                    setEndpoint={setEndpoint}
                    setReloadTable={setReloadTable}
                    setHeaders={setHeaders}
                    setDataToAdd={setDataToAdd}
                    setOptionsToSelect={setOptionsToSelect}
                    pageTitle="MeasureUnits"
                    endpoint="measure-units"
                    headers={tableHeaders.MeasuresUnits}
                    body={optionsOfMenu.MeasuresUnits.map(item => ({
                        id: String(item.id),
                        unit: String(item.unit)
                    }))}
                    optionsOfMenu={optionsOfMenu}
                    reloadTable={() => async () => {
                        await getMeasureUnits()
                        setBody(optionsOfMenu.MeasuresUnits.map(item => ({
                            id: String(item.id),
                            unit: String(item.unit)
                        })))
                    }}
                    dataToAdd={{ "unit": "" }}
                />
                <LeftButtonBar
                buttonName="productos"
                    setBody={setBody}
                    setPageTitle={setPageTitle}
                    setEndpoint={setEndpoint}
                    setReloadTable={setReloadTable}
                    setHeaders={setHeaders}
                    setDataToAdd={setDataToAdd}
                    setOptionsToSelect={setOptionsToSelect}
                    pageTitle="Products"
                    endpoint="products"
                    headers={tableHeaders.Products}
                    body={optionsOfMenu.Products.map(item => ({
                        id: String(item.id),
                        max_stock: String(item.max_stock),
                        min_stock: String(item.min_stock),
                        unit: String(measureUnits.find(u => u.id === item.unit)?.unit),
                        active: item.active === true ? "Activo" : "Inactivo",
                        frequency: String(frequencies.find(f => f.id === item.frequency)?.frequency),
                        name: String(item.name),
                        stock: String(item.stock)
                    }))}
                    optionsOfMenu={optionsOfMenu}
                    reloadTable={() => async () => {
                        await getProducts()
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
                    }}
                    dataToAdd={{
                        name: "",
                        unit: "",
                        frequency: "",
                        stock: "",
                        min_stock: "",
                        max_stock: "",
                        active: "",
                    }}
                />
                <LeftButtonBar
                buttonName="tipos de consumo"
                    setBody={setBody}
                    setPageTitle={setPageTitle}
                    setEndpoint={setEndpoint}
                    setReloadTable={setReloadTable}
                    setHeaders={setHeaders}
                    setDataToAdd={setDataToAdd}
                    setOptionsToSelect={setOptionsToSelect}
                    optionsOfMenu={optionsOfMenu}
                    pageTitle="IntakeTypes"
                    endpoint="intake-type"
                    headers={tableHeaders.IntakeTypes}
                    body={optionsOfMenu.IntakeTypes.map(item => ({
                            id: String(item.id),
                            intake_type: String(item.intake_type)
                        }))}
                    reloadTable={() => async () => {
                        await getMeasureUnits()
                        setBody(optionsOfMenu.IntakeTypes.map(item => ({
                            id: String(item.id),
                            intake_type: String(item.intake_type)
                        })))
                    }}
                    dataToAdd={{"intake_type": ""}}
                />
                <LeftButtonBar
                buttonName="consumidores"
                    setBody={setBody}
                    setPageTitle={setPageTitle}
                    setEndpoint={setEndpoint}
                    setReloadTable={setReloadTable}
                    setHeaders={setHeaders}
                    setDataToAdd={setDataToAdd}
                    setOptionsToSelect={setOptionsToSelect}
                    optionsOfMenu={optionsOfMenu}
                    pageTitle="Consumers"
                    endpoint="consumers"
                    headers={tableHeaders.Consumers}
                    body={optionsOfMenu.Consumers.map(item => ({
                            id: String(item.id),
                            name: String(item.name)
                        }))}
                    reloadTable={() => async () => {
                            await getConsumers()
                            setBody(optionsOfMenu.Consumers.map(item => ({
                                id: String(item.id),
                                name: String(item.name)
                            })))
                        }}
                    dataToAdd={{ name: "" }}
                />

                <LeftButtonBar
                buttonName="roles"
                    setBody={setBody}
                    setPageTitle={setPageTitle}
                    setEndpoint={setEndpoint}
                    setReloadTable={setReloadTable}
                    setHeaders={setHeaders}
                    setDataToAdd={setDataToAdd}
                    setOptionsToSelect={setOptionsToSelect}
                    optionsOfMenu={optionsOfMenu}
                    pageTitle="Roles"
                    endpoint="roles"
                    headers={tableHeaders.Roles}
                    body={optionsOfMenu.Roles.map(item => ({
                            id: String(item.id),
                            rol: String(item.rol)
                        }))}
                    reloadTable={() => async () => {
                            await getConsumers()
                            setBody(optionsOfMenu.Roles.map(item => ({
                                id: String(item.id),
                                rol: String(item.rol)
                            })))
                        }}
                    dataToAdd={{ rol: "" }}
                />

                <LeftButtonBar
                buttonName="empleados"
                    setBody={setBody}
                    setPageTitle={setPageTitle}
                    setEndpoint={setEndpoint}
                    setReloadTable={setReloadTable}
                    setHeaders={setHeaders}
                    setDataToAdd={setDataToAdd}
                    setOptionsToSelect={setOptionsToSelect}
                    optionsOfMenu={optionsOfMenu}
                    pageTitle="Employees"
                    endpoint="employees"
                    headers={tableHeaders.Employees}
                    body={optionsOfMenu.Employees.map(item => ({
                            id: String(item.id),
                            name: String(item.name),
                            rol: String(roles.find(r => r.id === item.rol)?.rol)
                        }))}
                    reloadTable={() => async () => {
                            await getEmployees()
                            setBody(optionsOfMenu.Employees.map(item => ({
                                id: String(item.id),
                                rol: String(roles.find(r => r.id === item.rol)?.rol),
                                name: item.name
                            })))
                        }}
                    dataToAdd={{ rol: "", name: "" }}
                />
            </div>
        </div>
    )
}