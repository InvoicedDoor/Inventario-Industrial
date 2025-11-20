interface PopperProperties
{
    Text: string
    id: string
    Ref: React.RefObject<HTMLDivElement | null>
    position?: string
}

export default function Popper(data: PopperProperties)
{
    return (
    <div key={data.id} id={data.id} ref={data.Ref}
    className={"d-none top-full left-0 bg-white border rounded shadow m-2 z-50"}>
        <h2
        style={{
            fontFamily: "fantasy",
            fontSize: 30,
            fontStyle: "revert-layer",
            margin: 10
        }}>
            {data.Text}
        </h2>
    </div>
    )
}