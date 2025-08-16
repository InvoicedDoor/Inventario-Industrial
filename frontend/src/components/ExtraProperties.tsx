export default function ExtraProperties() {
    return (
        <div className="card border-primary text-white">
            <div className="card card-header bg-primary text-center">
                <h5>Unidades metricas cuadráticas</h5>
            </div>
            <div className="justify-center d-flex p-10" style={{ width: "100%" }}>
                <div className="d-flex justify-center" style={{ width: "30rem" }}>
                    <div style={{ width: "100%" }}>
                        <div className="d-flex mb-4 align-items-center justify-center"
                            style={{ height: 50, width: "100%" }}>
                            <div className="bg-primary align-items-center justify-center d-flex"
                                style={{ width: 150, height: 50 }}>
                                <label htmlFor="selectExistence" className="col-form-label">Largo</label>
                            </div>
                            <div className="col-sm-3 card border-primary"
                                style={{ padding: 0, width: 200, height: "100%" }}>
                                <input type="text" style={{ height: "100%", fontSize: 22 }} name="" id="" />
                            </div>
                        </div>
                        <div className="d-flex mb-4 align-items-center justify-center"
                            style={{ height: 50, width: "100%" }}>
                            <div className="bg-primary align-items-center justify-center d-flex"
                                style={{ width: 150, height: 50 }}>
                                <label htmlFor="selectExistence" className="col-form-label">Ancho</label>
                            </div>
                            <div className="col-sm-3 card border-primary"
                                style={{ padding: 0, width: 200, height: "100%" }}>
                                <input type="text" style={{ height: "100%", fontSize: 22 }} name="" id="" />
                            </div>
                        </div>
                        <div className="d-flex mb-4 align-items-center justify-center"
                            style={{ height: 50, width: "100%" }}>
                            <div className="bg-primary align-items-center justify-center d-flex"
                                style={{ width: 150, height: 50 }}>
                                <label htmlFor="selectExistence" className="col-form-label">Unidad</label>
                            </div>
                            <div className="card border-primary" style={{ width: "12.5rem", padding: 0, height: "100%" }}>
                            <select className="form-select" style={{ height: "100%", width: "100%" }} name="" id="">
                                <option disabled selected value="0">Seleccionar</option>
                            </select>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}