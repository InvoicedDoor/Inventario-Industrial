import CardBody from "@/components/CardBody"
import CardHeader from "@/components/CardHeader"

export default function Index() {
    return (
        <div className="d-flex justify-center" style={{ width: "100%" }}>
            <div className="card text-white bg-primary mt-3" style={{ width: "60rem" }}>
                <CardHeader Title="Entradas" />
                <CardBody />
            </div>
        </div>
    )
}