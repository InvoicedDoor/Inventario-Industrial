import { Dispatch, SetStateAction } from "react";
import { ModalManageProps } from "./ModalAdd";
import IFrequency from "@/interfaces/IFrequency";
import IMeasureUnit from "@/interfaces/IMeasureUnit";
import IProducts from "@/interfaces/IProducts";
import { toast } from "react-toastify";
import APIConnection from "@/functions/APIConnection";

export interface ModalEditProps extends ModalManageProps {
    data: Record<string, string>
    setBody: Dispatch<SetStateAction<Array<Record<string, string>>>>
    setDataToEdit: Dispatch<SetStateAction<Record<string, string>>>
    optionsToSelect?: {
        Frequency?: IFrequency[],
        MeasuresUnits?: IMeasureUnit[],
        Products?: IProducts[]
    } | null
}

const connection = new APIConnection("http://localhost:8000/api")

export default function ModalEdit({data, headers, optionsToSelect, setViewModal, setDataToEdit, pageTitle, endpoint, reloadTable}: ModalEditProps) {
    const editElement = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const button = e.currentTarget as HTMLButtonElement;

        try
        {
            button.disabled = true;
            for (const [k, v] of Object.entries(data)) {
                if (v === "") {
                    toast.warn(`El campo "${headers[k]}" está vacío.`);
                    button.disabled = false;
                    return;
                }
            }

            const request = await connection.editData(`${endpoint}/${data.id}`, data);

            if (!request.status) {
                toast.error(request.message);
                button.disabled = false;
                return;
            }

            button.disabled = false;
            toast.success(request.message);
            await reloadTable();
        } catch (e)
        {
            toast.error(String(e));
            button.disabled = false;
        }
    }

    const handleChangeData = (key: string, value: string) => {
        setDataToEdit(prev => ({
            ...prev,
            [key]: value
        }))
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded shadow p-6 w-full max-w-md">
                <div className="flex justify-between items-center border-b mb-4">
                    <h5 className="text-lg font-semibold">Editar elemento</h5>
                    <button
                        onClick={() => setViewModal(false)}
                        className="text-gray-600 hover:text-red-600"
                    >
                        ✕
                    </button>
                </div>
                <div className="modal-body">
                    {Object.entries(headers).map(([keyHeader, header], headerIndex) => (
                        <div key={headerIndex} style={{ width: "100%" }}>
                            <label className="col-form-label mt-4" htmlFor={`input-${header}$`}>{header}</label>
                            {header == "Activo" ? (
                                <select value={data[keyHeader].toString() === "true" || data[keyHeader] === "1" ? "1" : "0"} id={`input-${header}$`} onChange={(e) => handleChangeData(keyHeader, e.target.value)} className="form-control">
                                    <option value={""} disabled>Selecciona una opción</option>
                                    <option value="1">Sí</option>
                                    <option value="0">No</option>
                                </select>
                            ) : keyHeader === "frequency" && pageTitle !== "ConsumptionFrequency" ? (
                                <select id={`input-${header}$`}
                                    value={data[keyHeader] ?? ""}
                                    onChange={(e) => handleChangeData(keyHeader, e.target.value)}
                                    className="form-control">
                                    <option value={""} disabled>Selecciona una opción</option>
                                    {optionsToSelect?.Frequency!.map(u => (
                                        <option key={u.id} value={u.id}>{u.frequency}</option>
                                    ))}
                                </select>) : keyHeader === "unit" && pageTitle !== "MeasureUnits" ? (
                                <select id={`input-${header}$`}
                                    value={data[keyHeader]}
                                    onChange={(e) => handleChangeData(keyHeader, e.target.value)}
                                    className="form-control">
                                    <option value={""} disabled>Selecciona una opción</option>
                                    {optionsToSelect?.MeasuresUnits!.map(u => (
                                        <option key={u.id} value={u.id}>{u.unit}</option>
                                    ))}
                                </select>) : (<input
                                    id={`input-${header}$`}
                                    value={data[keyHeader] ?? ""}
                                    type="text"
                                    onChange={(e) => handleChangeData(keyHeader, e.target.value)}
                                    className="form-control"
                                />
                            )}
                        </div>
                    ))}
                </div>
                <div className="flex justify-end mt-4 gap-2">
                    <button className="btn btn-primary" onClick={(e) => editElement(e)}>Save</button>
                    <button onClick={() => setViewModal(false)} className="btn btn-secondary">Close</button>
                </div>
            </div>
        </div>
    );
}