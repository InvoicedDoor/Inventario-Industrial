import { ChangeEvent } from "react"

interface SelectComponentProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleChange: (selectedId: any) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    elementsArray: any[]
    width?: number
    knowProduct?: boolean
    value?: string
}

export default function SelectComponent({ handleChange, elementsArray, width, knowProduct, value }: SelectComponentProps) {
    return (
        <div className="card border-primary"
            style={{ padding: 0, width: width ?? 220, height: "100%" }}>
            <select disabled={knowProduct} value={value ??  "0"} onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                const selectedId = Number(e.target.value)
                const selectedProduct = elementsArray.find(element => element.id === selectedId)
                if (selectedProduct) {
                    handleChange(selectedProduct)
                }
            }} name="selectProduct" id="selectProduct" className="form-select"
                style={{ height: "100%" }}>
                <option disabled value="0">Seleccionar</option>
                {elementsArray.map(element => (
                    <option key={element.id} value={element.id} id={element.id.toString()}>{element.name || element.unit || element.frequency || element.intake_type}</option>
                ))}
            </select>
        </div>
    )
}
