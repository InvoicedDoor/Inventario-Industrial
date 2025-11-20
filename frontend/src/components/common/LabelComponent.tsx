interface LabelComponentProps
{
    text: string
    width?: number
}

export default function LabelComponent({text, width}: LabelComponentProps) {
    return (
        <div className="bg-primary align-items-center justify-center d-flex"
            style={{ width: width ?? 210, height: 50 }}>
            <label className="col-form-label">{text}</label>
        </div>
    )
}