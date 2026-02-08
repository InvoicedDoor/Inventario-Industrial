import IConsumers from "@/interfaces/IConsumers";
import IFrequency from "@/interfaces/IFrequency";
import IConsumptionType from "@/interfaces/IConsumptionType";
import IMeasureUnit from "@/interfaces/IMeasureUnit";
import IProducts from "@/interfaces/IProducts";
import IRoles from "@/interfaces/IRoles";
import { CSSProperties, Dispatch, SetStateAction } from "react";
import LeftButtonBar from "./LeftBarButton";
import IEmployees from "@/interfaces/IEmployees";
import TableHeaders from "@/dictionaries/TableHeaders";
import TableInfo from "@/dictionaries/TableInfo";

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
        ConsumptionType: IConsumptionType[],
        Consumers: IConsumers[],
        Roles: IRoles[],
        Employees: IEmployees[]
    }>>
}

const leftBarStyles: CSSProperties = { 
    height: "90%",
    overflowY: "scroll",
    scrollbarWidth: "none"
}

export default function LeftBar({ setReloadTable, setBody, setHeaders, setOptionsToSelect, setPageTitle, setDataToAdd, setEndpoint }: LeftBarProps) {
    const tableHeaders = TableHeaders

    const {
        optionsOfMenu,
        getMeasureUnits,
        getRoles,
        getConsumptionType,
        getProducts,
        getConsumers,
        getEmployees,
    } = TableInfo();

    return (
        <div style={leftBarStyles} className="bg-secondary d-flex align-items-start justify-center">
            <div style={{ height: "100%" }}>
                <LeftButtonBar
                    buttonName="frecuencia"
                    setReloadTable={() => { }}
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
                        optionsOfMenu.MeasuresUnits = await getMeasureUnits()
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
                        unit: String(optionsOfMenu.MeasuresUnits.find(u => u.id === item.unit)?.unit),
                        active: item.active === true ? "Activo" : "Inactivo",
                        frequency: String(optionsOfMenu.Frequency.find(f => f.id === item.frequency)?.frequency),
                        name: String(item.name),
                        stock: String(item.stock)
                    }))}
                    optionsOfMenu={optionsOfMenu}
                    reloadTable={() => async () => {
                        optionsOfMenu.Products = await getProducts()
                        setBody(optionsOfMenu.Products.map(item => ({
                            id: String(item.id),
                            max_stock: String(item.max_stock),
                            min_stock: String(item.min_stock),
                            unit: String(optionsOfMenu.MeasuresUnits.find(u => u.id === item.unit)?.unit),
                            active: item.active === true ? "Activo" : "Inactivo",
                            frequency: String(optionsOfMenu.Frequency.find(f => f.id === item.frequency)?.frequency),
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
                    pageTitle="ConsumptionType"
                    endpoint="consumption-type"
                    headers={tableHeaders.ConsumptionType}
                    body={optionsOfMenu.ConsumptionType.map(item => ({
                        id: String(item.id),
                        consumption_type: String(item.consumption_type)
                    }))}
                    reloadTable={() => async () => {
                        optionsOfMenu.ConsumptionType = await getConsumptionType()
                        setBody(optionsOfMenu.ConsumptionType.map(item => ({
                            id: String(item.id),
                            consumption_type: String(item.consumption_type)
                        })))
                    }}
                    dataToAdd={{ "consumption_type": "" }}
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
                        optionsOfMenu.Roles = await getRoles()
                        setBody(optionsOfMenu.Roles.map(item => ({
                            id: String(item.id),
                            rol: String(item.rol)
                        })))
                    }}
                    dataToAdd={{ rol: "" }}
                />

                <LeftButtonBar
                    buttonName="Compradores"
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
                        optionsOfMenu.Consumers = await getConsumers()
                        setBody(optionsOfMenu.Consumers.map(item => ({
                            id: String(item.id),
                            name: String(item.name)
                        })))
                    }}
                    dataToAdd={{ name: "" }}
                />

                <LeftButtonBar
                    buttonName="Vendedores"
                    setBody={setBody}
                    setPageTitle={setPageTitle}
                    setEndpoint={setEndpoint}
                    setReloadTable={setReloadTable}
                    setHeaders={setHeaders}
                    setDataToAdd={setDataToAdd}
                    setOptionsToSelect={setOptionsToSelect}
                    optionsOfMenu={optionsOfMenu}
                    pageTitle="Sellers"
                    endpoint="sellers"
                    headers={tableHeaders.Consumers}
                    body={optionsOfMenu.Consumers.map(item => ({
                        id: String(item.id),
                        name: String(item.name)
                    }))}
                    reloadTable={() => async () => {
                        optionsOfMenu.Consumers = await getConsumers()
                        setBody(optionsOfMenu.Consumers.map(item => ({
                            id: String(item.id),
                            name: String(item.name)
                        })))
                    }}
                    dataToAdd={{ name: "" }}
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
                        rol: String(optionsOfMenu.Roles.find(r => r.id === item.rol)?.rol)
                    }))}
                    reloadTable={() => async () => {
                        optionsOfMenu.Employees = await getEmployees()
                        setBody(optionsOfMenu.Employees.map(item => ({
                            id: String(item.id),
                            rol: String(optionsOfMenu.Roles.find(r => r.id === item.rol)?.rol),
                            name: item.name
                        })))
                    }}
                    dataToAdd={{ rol: "", name: "" }}
                />
            </div>
        </div>
    )
}