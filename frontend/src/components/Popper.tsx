interface PopperProperties
{
    Text: string
    id: string
    Ref: React.RefObject<HTMLDivElement | null>
}

export default function Popper(data: PopperProperties)
{
    return (
    <div key={data.id} id={data.id} ref={data.Ref}
    className="d-none top-full left-0 bg-white border rounded shadow m-2 z-50">
        {data.Text}
    </div>
    )
}