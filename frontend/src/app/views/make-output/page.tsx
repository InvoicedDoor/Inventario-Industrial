import CardBody from "@/components/CardBody";
import CardHeader from "@/components/CardHeader";
import ExtraProperties from "@/components/ExtraProperties";

export default function Index() {
    return (
        <div>
            <div className="d-flex justify-center" style={{ width: "100%" }}>
                <div className="card text-white bg-primary mt-3" style={{ width: "60rem" }}>
                    <CardHeader Title="Consumos" />
                    <CardBody />
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