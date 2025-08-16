interface CardHeaderProps
{
    Title: string
}

export default function CardHeader({Title}: CardHeaderProps)
{
    return (
        <div className="card card-header">
            <h3>{Title}</h3>
        </div>
    )
}