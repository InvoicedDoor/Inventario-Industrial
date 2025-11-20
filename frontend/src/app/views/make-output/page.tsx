import CardBodyOutputs from "@/components/Outputs/CardBodyOutputs";
import CardHeader from "@/components/common/CardHeader";
import ExtraProperties from "@/components/common/ExtraProperties";

export default function Index() {
    return (
        <div>
            <div className="d-flex justify-center" style={{ width: "100%" }}>
                <div className="card text-white bg-primary mt-3" style={{ width: "60rem" }}>
                    <CardHeader Title="Consumos" />
                    <CardBodyOutputs />
                </div>
            </div>
            <div className="d-flex justify-center" style={{ width: "100%" }}>
                <div className="card text-white bg-primary mt-3" style={{ width: "60rem" }}>
                    <ExtraProperties />
                </div>
            </div>
        </div>
    )
}