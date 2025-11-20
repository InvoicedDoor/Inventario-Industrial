interface InputComponentProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleChange?: (selectedId: any) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleWrite?: (e: any) => void
    width?: number
    type?: string
    knowProduct?: boolean
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value?: any
}

export default function InputComponent({ width, type, knowProduct, value, handleWrite }: InputComponentProps) {
    return (
        <div className="card border-primary"
            style={{ padding: 0, width: width ?? 220, height: "100%" }}>
            <input type={type ?? "text"} defaultValue={value ?? ""} 
            onInput={handleWrite} disabled={knowProduct} style={{ height: "100%" }} placeholder="Ingresar valor" />
        </div>
    )
}