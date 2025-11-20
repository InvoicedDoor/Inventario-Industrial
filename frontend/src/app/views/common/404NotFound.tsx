import "./styles/404NotFound.css"

export default function NotFound() {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
            <div className="d-grid align-center" style={{
                borderRight: "solid",
                borderColor: "#593196"
            }}>
                <h1 className="text-center text-white" style={{
                    color: "white",
                    WebkitTextStroke: "1px black",
                    textShadow: "-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000"
                }}>404</h1>
                <h2 className="text-primary">Not Found</h2>
            </div>
            <div className="m-3">
                <h3 className="text-primary"><b>Opps!</b></h3>
                <h4>La página no está disponible.</h4>
            </div>
        </div>
    )
}