"use client"

import LeftBar from "@/components/manage-data/LeftBar";
import ModalAdd from "@/components/manage-data/ModalAdd";
import ModalEdit from "@/components/manage-data/ModalEdit";
import Table from "@/components/manage-data/Table";
import IConsumers from "@/interfaces/IConsumers";
import IEmployees from "@/interfaces/IEmployees";
import IFrequency from "@/interfaces/IFrequency";
import IConsumptionType from "@/interfaces/IConsumptionType";
import IMeasureUnit from "@/interfaces/IMeasureUnit";
import IProducts from "@/interfaces/IProducts";
import IRoles from "@/interfaces/IRoles";
import { useState } from "react";

export default function Index() {
    // Cuerpo de la tabla
    const [body, setBody] = useState<Record<string, string>[]>([]);
    // Encabezados de la tabla
    const [headers, setHeaders] = useState<Record<string, string>>({});
    // Cuerpo vacío para los datos a agregar en la base de datos
    const [dataToAdd, setDataToAdd] = useState<Record<string, string>>({});
    const [dataToEdit, setDataToEdit] = useState<Record<string, string>>({});
    // Función para refrescar los datos que vienen de la base de datos cuando se actualizan o se agregan datos
    const [reloadTable, setReloadTable] = useState<() => Promise<void>>(() => async () => {});
    // Bandera para visualizar el modal de agregar elementos
    const [viewModalAdd, setViewModalAdd] = useState(false);
    // Bandera para visualizar el modal de actualizar elementos
    const [viewModalEdit, setViewModalEdit] = useState(false);
    // Variable para guardar la info que se quiere visualizar
    const [pageTitle, setPageTitle] = useState<string>("");
    // Variable para registrar el Endpoint que se quiere trabajar
    const [endpoint, setEndpoint] = useState<string>("");
    // Se;eccionador de opciones según la tabla que se busca
    const [optionsToSelect, setOptionsToSelect] = useState<{
        Frequency: IFrequency[],
        MeasuresUnits: IMeasureUnit[],
        Products: IProducts[],
        ConsumptionType: IConsumptionType[],
        Consumers: IConsumers[],
        Roles: IRoles[],
        Employees: IEmployees[]
    }>({
        Frequency: [],
        MeasuresUnits: [],
        Products: [],
        ConsumptionType: [],
        Consumers: [],
        Roles: [],
        Employees: []
    });

    return <div className="d-flex" style={{ width: "100%", height: "100vh" }}>
        <div style={{ width: "20%", height: "100%" }}>
            <LeftBar
                setReloadTable={setReloadTable}
                setEndpoint={setEndpoint}
                setDataToAdd={setDataToAdd}
                setBody={setBody}
                setHeaders={setHeaders}
                setOptionsToSelect={setOptionsToSelect}
                setPageTitle={setPageTitle} />
        </div>
        <div style={{ width: "80%" }} className="d-flex justify-center mt-5">
            <div style={{
                width: "70%"
            }}>
                {pageTitle !== "" ? (
                    <Table
                        setDataToAdd={setDataToAdd}
                        setDataToEdit={setDataToEdit}
                        setViewModalAdd={setViewModalAdd}
                        setViewModalEdit={setViewModalEdit}
                        dataToAdd={dataToAdd}
                        Headers={headers} 
                        Body={body} 
                        setBody={setBody} 
                        optionsToSelect={optionsToSelect} 
                        TitlePage={pageTitle} />
                ) : (
                    <h3 className="text-center">Seleccione los datos a mostrar</h3>
                )}
                {viewModalAdd && (
                    <ModalAdd
                        reloadTable={reloadTable}
                        pageTitle={pageTitle}
                        optionsToSelect={optionsToSelect}
                        headers={headers}
                        setViewModal={setViewModalAdd} 
                        endpoint={endpoint}
                        dataToAdd={dataToAdd}
                        setDataToAdd={setDataToAdd} />
                )}

                {viewModalEdit && headers && (
                    <ModalEdit
                        reloadTable={reloadTable}
                        setDataToEdit={setDataToEdit}
                        endpoint={endpoint}
                        pageTitle={pageTitle}
                        optionsToSelect={optionsToSelect}
                        data={dataToEdit}
                        headers={headers}
                        setViewModal={setViewModalEdit}
                        setBody={setBody}
                    />
                )}
            </div>
        </div>
    </div>
}