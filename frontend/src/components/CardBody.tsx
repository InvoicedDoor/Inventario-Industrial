export default function CardBody() {
    return (
        <div className="card card-body">
            <div className="d-flex" style={{ width: "100%" }}>
                <div className="container" style={{ width: "50%" }}>
                    <div className="row mb-10 align-items-center"
                        style={{ height: 50, width: "100%" }}>
                        <div className="bg-primary align-items-center justify-center d-flex"
                            style={{ width: 210, height: 50 }}>
                            <label htmlFor="selectExistence" className="col-form-label">Tipo de producto</label>
                        </div>
                        <div className="col-sm-3 card border-primary"
                            style={{ padding: 0, width: 220, height: "100%" }}>
                            <select name="selectExistence" id="selectExistence" className="form-select"
                                style={{ height: "100%" }}>
                                <option disabled selected value="0">Selecciona una opción</option>
                                <option value="1">Nuevo</option>
                                <option value="2">Existente</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mb-10"
                        style={{ height: 50, width: "100%" }}>
                        <div className="bg-primary align-items-center justify-center d-flex"
                            style={{ width: 210, height: 50 }}>
                            <label htmlFor="" className="col-form-label">Frecuencia de consumo</label>
                        </div>
                        <div className="col-sm-3 card border-primary"
                            style={{ padding: 0, width: 220 }}>
                            <select name="" id="" className="form-select"
                                style={{ height: "100%" }}>
                                <option value=""></option>
                            </select>
                        </div>
                    </div>
                    <div className="row mb-10"
                        style={{ height: 50, width: "100%" }}>
                        <div className="bg-primary align-items-center justify-center d-flex"
                            style={{ width: 210, height: 50 }}>
                            <label htmlFor="" className="col-form-label">Producto</label>
                        </div>
                        <div className="card border-primary"
                            style={{ padding: 0, width: 220 }}>
                            <select name="" id="" className="form-select"
                                style={{ height: "100%" }}>
                                <option value=""></option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="container" style={{ width: "50%" }}>
                    <div className="row mb-10 align-items-center"
                        style={{ height: 50, width: "100%" }}>
                        <div className="bg-primary align-items-center justify-center d-flex"
                            style={{ width: 110, height: 50 }}>
                            <label htmlFor="selectExistence" className="col-form-label">Cantidad</label>
                        </div>
                        <div className="col-sm-3 card border-primary"
                            style={{ padding: 0, width: 120, height: "100%" }}>
                            <input type="text" style={{ height: "100%", fontSize: 22 }} name="" id="" />
                        </div>
                        <div className="card border-primary" style={{ width: "12.5rem", padding: 0, height: "100%" }}>
                            <select className="form-select" style={{ height: "100%", width: "100%" }} name="" id="">
                                <option disabled selected value="0">Seleccionar</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mb-10"
                        style={{ height: 50, width: "100%" }}>
                        <div className="bg-primary align-items-center justify-center d-flex"
                            style={{ width: 110, height: 50 }}>
                            <label htmlFor="" className="col-form-label">Fecha</label>
                        </div>
                        <div className="card border-primary"
                            style={{ padding: 0, width: 320 }}>
                            <input type="datetime-local" style={{ height: "100%", fontSize: 22 }} name="" id="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}