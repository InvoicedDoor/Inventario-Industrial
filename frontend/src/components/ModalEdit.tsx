import { Dispatch, SetStateAction } from "react";
import { ModalManageProps } from "./ModalAdd";

export interface ModalEditProps extends ModalManageProps {
    data: Record<string, string>
    setBody: Dispatch<SetStateAction<Array<Record<string, string>>>>
}

export default function ModalEdit(props: ModalEditProps) {
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
                        <div key={headerIndex} style={{ width: "100%" }}>
                            <label className="col-form-label mt-4" htmlFor={`input-${header}$`}>{header}</label>
                            {header == "Activo" ? (
                                <select value={props.data[keyHeader]} id={`input-${header}$`} onChange={(e) =>
                                {
                                    props.setBody(prev =>
                                        prev.map(row =>
                                            row["Id"] === props.data["Id"]
                                                ? { ...row, [keyHeader]: e.target.value }
                                                : row
                                        )
                                    )
                                }} className="form-control">
                                    <option value="1">Sí</option>
                                    <option value="0">No</option>
                                </select>
                            ) : header == "Frecuencia" ? (
                                <select value={props.data[keyHeader]} onChange={(e) =>
                                {
                                    props.setBody(prev =>
                                        prev.map(row =>
                                            row["Id"] === props.data["Id"]
                                            ? { ...row, [header]: e.target.selectedOptions[0].text }
                                            : row
                                        )
                                    )
                                }
                                } id={`input-${header}$`} className="form-control">
                                    <option value="1">Común</option>
                                    <option value="0">Especial</option>
                                </select>) : (
                                <input
                                    id={`input-${header}$`}
                                    value={props.data[keyHeader]}
                                    type="text"
                                    onChange={(e) =>
                                        props.setBody(prev =>
                                            prev.map(row =>
                                                row["Id"] === props.data["Id"]
                                                    ? { ...row, [header]: e.target.value }
                                                    : row
                                            )
                                        )
                                    }
                                    className="form-control"
                                />
                            )}
                        </div>
                    ))}
                </div>
                <div className="flex justify-end mt-4 gap-2">
                    <button className="btn btn-primary">Save</button>
                    <button onClick={() => props.setViewModal(false)} className="btn btn-secondary">Close</button>
                </div>
            </div>
        </div>
    );
}