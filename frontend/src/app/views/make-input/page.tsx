import CardBodyInputs from "@/components/Inputs/CardBodyInputs"
import CardHeader from "@/components/common/CardHeader"

export default function Index() {
    return (
        <div className="d-flex justify-center" style={{ width: "100%" }}>
            <div className="card text-white bg-primary mt-3" style={{ width: "60rem" }}>
                <CardHeader Title="Entradas" />
                <CardBodyInputs />
            </div>
        </div>
    )
}