import APIConnection from "@/functions/APIConnection"
import IFrequency from "@/interfaces/IFrequency"
import IMeasureUnit from "@/interfaces/IMeasureUnit"
import IProducts from "@/interfaces/IProducts"
import IRoles from "@/interfaces/IRoles"
import { Dispatch, SetStateAction } from "react"
import { toast } from "react-toastify"

export interface ModalManageProps {
    setViewModal: Dispatch<SetStateAction<boolean>>
    endpoint: string
    headers: Record<string, string>
    pageTitle: string
    reloadTable: () => Promise<void>
}

interface ModalAddProps extends ModalManageProps {
    dataToAdd: Record<string, string>
    endpoint: string
    setDataToAdd: Dispatch<SetStateAction<Record<string, string>>>
    optionsToSelect?: {
        Frequency?: IFrequency[],
        MeasuresUnits?: IMeasureUnit[],
        Products?: IProducts[],
        Roles?: IRoles[],
    } | null
}

const connection = new APIConnection("http://localhost:8000/api")

export default function ModalAdd(props: ModalAddProps) {
    const addElement = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const button = e.currentTarget as HTMLButtonElement;

        try
        {
            button.disabled = true;
            for (const [k, v] of Object.entries(props.dataToAdd)) {
                if (v === "") {
                    toast.warn(`El campo "${props.headers[k]}" está vacío.`);
                    button.disabled = false;
                    return;
                }
            }

            const request = await connection.addData(props.endpoint, props.dataToAdd);

            if (!request.status) {
                toast.error(request.message);
                button.disabled = false;
                return;
            }

            await props.reloadTable();

            props.setDataToAdd(prev => {
                const cleared = { ...prev };
                Object.keys(cleared).forEach(k => cleared[k] = "");
                return cleared;
            })
            toast.success(request.message);
            button.disabled = false;
        } catch (e)
        {
            toast.error(String(e));
            button.disabled = false;
        }
    }

    const handleChangeData = (key: string, value: string) => {
        props.setDataToAdd(prev => ({
            ...prev,
            [key]: value
        }))
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded shadow p-6 w-full max-w-md">
                <div className="flex justify-between items-center border-b mb-4">
                    <h5 className="text-lg font-semibold">Agrega un nuevo elemento</h5>
                    <button
                        onClick={() => props.setViewModal(false)}
                        className="text-gray-600 hover:text-red-600"
                    >
                        ✕
                    </button>
                </div>
                <div className="modal-body">
                    {Object.entries(props.headers).map(([keyHeader, header], headerIndex) => (
                        <div id={keyHeader} key={headerIndex} style={{ width: "100%" }}>
                            <label className="col-form-label mt-4" htmlFor={`input-${header}$`}>{header}</label>
                            {keyHeader === "active" ? (
                                <select
                                    id={`input-${header}`}
                                    value={props.dataToAdd[keyHeader]}
                                    onChange={(e) => handleChangeData(keyHeader, e.target.value)}
                                    className="form-control">
                                    <option value={""} disabled>Selecciona una opción</option>
                                    <option value="1">Sí</option>
                                    <option value="0">No</option>
                                </select>
                            ) : keyHeader === "frequency" ? (
                                <select id={`input-${header}$`}
                                    value={props.dataToAdd[keyHeader] ?? ""}
                                    onChange={(e) => handleChangeData(keyHeader, e.target.value)}
                                    className="form-control">
                                    <option value={""} disabled>Selecciona una opción</option>
                                    {props.optionsToSelect?.Frequency!.map(f => (
                                        <option key={f.id} value={f.id}>{f.frequency}</option>
                                    ))}
                                </select>
                            ) : keyHeader === "unit" && props.pageTitle !== "MeasureUnits" ? (
                                <select id={`input-${header}$`}
                                    value={props.dataToAdd[keyHeader] ?? ""}
                                    onChange={(e) => handleChangeData(keyHeader, e.target.value)}
                                    className="form-control">
                                    <option value={""} disabled>Selecciona una opción</option>
                                    {props.optionsToSelect?.MeasuresUnits!.map(u => (
                                        <option key={u.id} value={u.id}>{u.unit}</option>
                                    ))}
                                </select>
                            ) : keyHeader === "rol" && props.pageTitle !== "Roles" ? (
                                <select id={`input-${header}$`}
                                    value={props.dataToAdd[keyHeader] ?? ""}
                                    onChange={(e) => handleChangeData(keyHeader, e.target.value)}
                                    className="form-control">
                                    <option value={""} disabled>Selecciona una opción</option>
                                    {props.optionsToSelect?.Roles!.map(r => (
                                        <option key={r.id} value={r.id}>{r.rol}</option>
                                    ))}
                                </select> ) : (
                                    <input id={`input-${header}$`}
                                        value={props.dataToAdd[keyHeader] ?? ""}
                                        onChange={(e) => handleChangeData(keyHeader, e.target.value)}
                                        type="text" className="form-control" />
                                )}
                        </div>
                    ))}
                </div>
                <div className="flex justify-end mt-4 gap-2">
                    <button onClick={async (e) => addElement(e)} className="btn btn-primary">Save</button>
                    <button onClick={() => props.setViewModal(false)} className="btn btn-secondary">Close</button>
                </div>
            </div>
        </div>
    )
} 