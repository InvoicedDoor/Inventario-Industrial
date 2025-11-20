import IProducts from "@/interfaces/IProducts";
import { ChangeEvent } from "react";

interface InputSelectProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleChange: (selectedId: any) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    elementsArray: any[]
    width?: number
    value?: string
    listName: string
}

export default function InputSelect({ handleChange, elementsArray, width, listName }: InputSelectProps) {
    const internalHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedText = e.target.value;
        const selectedItem: IProducts = elementsArray.find(el => el.name === selectedText || el.unit === selectedText || el.frequency === selectedText)
        if (selectedItem)
            handleChange(selectedItem)
    }

    return (
        <div className="card border-primary"
            style={{ padding: 0, width: width ?? 220, height: "100%" }}>
            <input 
            style={{ height: "100%" }} 
            list={listName} 
            onChange={internalHandleChange}
            placeholder="Seleccionar" />

            <datalist id={listName}>
                {elementsArray.map(element => (
                    <option 
                    key={element.id} 
                    value={element.name || element.unit || element.frequency}></option>
                ))}
            </datalist>
        </div>
    )
}
