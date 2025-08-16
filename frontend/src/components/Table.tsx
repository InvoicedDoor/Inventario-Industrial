"use client";

import TableRequerements from "@/interfaces/TableRequerements";
import { faGear, faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createPopper, Placement } from "@popperjs/core"
import { useEffect, useRef, useState } from "react";
import Popper from "./Popper";

export default function Table({Body, Headers, TitlePage, optionsToSelect, setDataToEdit, setViewModalAdd, setViewModalEdit}: TableRequerements) {
    const popperEdit = useRef<HTMLDivElement>(null);
    const popperDelete = useRef<HTMLDivElement>(null);
    const btnRef = useRef<HTMLButtonElement>(null);
    const popperRef = useRef<HTMLDivElement>(null);
    const [tempDataToEdit, setTempDataToEdit] = useState<Record<string, string>[]>([])
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (btnRef.current && popperRef.current && visible) {
            createPopper(btnRef.current, popperRef.current, {
                placement: 'bottom-end' as Placement,
                modifiers: [
                    {
                        name: 'offset',
                        options: {
                            offset: [0, 0]
                        }
                    }
                ]
            })
        }

        // Verifica el botón presionado para cargar la información referente a ese botón
        if (TitlePage === "Products")
            setTempDataToEdit(optionsToSelect?.Products as unknown as Array<Record<string, string>>)
        else if (TitlePage === "MeasureUnits")
            setTempDataToEdit(optionsToSelect?.MeasuresUnits as unknown as Array<Record<string, string>>)
        else if (TitlePage === "ConsumptionFrequency")
            setTempDataToEdit(optionsToSelect?.Frequency as unknown as Array<Record<string, string>>)
        else if (TitlePage === "IntakeTypes")
            setTempDataToEdit(optionsToSelect?.IntakeTypes as unknown as Array<Record<string, string>>)
        else if (TitlePage === "Consumers")
            setTempDataToEdit(optionsToSelect?.Consumers as unknown as Array<Record<string, string>>)
        else if (TitlePage === "Roles")
            setTempDataToEdit(optionsToSelect?.Roles as unknown as Array<Record<string, string>>)
        else if (TitlePage === "Employees")
            setTempDataToEdit(optionsToSelect?.Employees as unknown as Array<Record<string, string>>)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible]);

    const handleMouseEnterEvent = (rowId: string) => {
        setVisible(true);
        const element = document.getElementById(rowId)

        if (!element) {
            return;
        }

        const elementPosition = element.classList.contains("d-none")

        if (elementPosition) {
            element.classList.replace("d-none", "absolute")
        }

    };

    const handleMouseLeaveEvent = (rowId: string) => {
        setVisible(false);
        const element = document.getElementById(rowId)

        if (!element) {
            return
        }

        const elementPosition = element.classList.contains("absolute")

        if (elementPosition) {
            element.classList.replace("absolute", "d-none");
        }

    };

    return (
        <div className="overflow-y-scroll hide-scrollbar" style={{ maxHeight: "90%" }}>
            <table className="table">
                <thead className="t-head">
                    <tr className="table-primary">
                        {// headers 
                        Object.entries(Headers).map(([fieldKey, label], index) => (
                            <th id={fieldKey} className="col" key={index}>{label}</th>
                        ))}
                        <th className="col col-3 text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {Body.map((row, rowIndex) => (
                        <tr className="table-default" key={rowIndex}>
                            {(Object.entries(Headers)).map(([fieldKey, value], cellIndex) => 
                            value == "active" ? (
                                <td className="col" key={cellIndex}>{row[fieldKey] === "0" ? "No" : row[fieldKey] === "1" ? "Sí" : "-"}</td>
                            ) : (
                                <td className="col" key={cellIndex}>{row[fieldKey] ?? "-"}</td>
                            ) )}
                            <td className="d-flex justify-content-around">
                                <div className="relative">
                                    <button className="btn btn-primary" ref={btnRef}
                                        onMouseEnter={() => handleMouseEnterEvent(`popper-edit-${rowIndex}`)}
                                        onMouseLeave={() => handleMouseLeaveEvent(`popper-edit-${rowIndex}`)}
                                        onClick={() => {
                                            setDataToEdit(tempDataToEdit.find(b => String(b["id"]) === String(row["id"])) ?? {})
                                            setViewModalEdit(true)}} >
                                        <FontAwesomeIcon className="h-5" icon={faGear} />
                                    </button>
                                    <Popper Text="Editar" id={`popper-edit-${rowIndex}`} Ref={popperEdit} />
                                </div>
                                <div className="relative">
                                    <button className="btn btn-danger" disabled 
                                    style={{display: TitlePage === "ConsumptionFrequency"
                                        ? "none" : "flex"
                                    }}
                                    ref={btnRef}
                                        onMouseEnter={() => handleMouseEnterEvent(`popper-delete-${rowIndex}`)}
                                        onMouseLeave={() => handleMouseLeaveEvent(`popper-delete-${rowIndex}`)} >
                                        <FontAwesomeIcon className="h-5" icon={faTrash} />
                                    </button>
                                    <Popper Text="Borrar" id={`popper-delete-${rowIndex}`} Ref={popperDelete} />
                                </div>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td>
                            <button
                                onClick={() => setViewModalAdd(true)}
                                className="btn btn-primary"
                                style={{display: TitlePage === "ConsumptionFrequency"
                                    ? "none" : "flex"
                                }}>
                                <FontAwesomeIcon className="h-5 w-10" icon={faPlusCircle} />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}