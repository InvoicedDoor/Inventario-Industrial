import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    const navbarElements = {
        "manageData": {
            src: "/views/manage-data",
            imgSrc: "/table-solid-full-white.svg"
        },
        "makeInput": {
            src: "/views/make-input",
            imgSrc: "/inbox-solid-full.svg"
        },
        "makeOutput": {
            src: "/views/make-output",
            imgSrc: "/cart-shopping-solid-full.svg"
        }
    }

    return (
        <nav className="navbar navbar-expand-lg bg-primary d-flex">
            <div className="container-fluid">
                <Link href="/" className="navbar-brand">
                    <Image
                        src={"/inventario_industrial.svg"}
                        alt=""
                        className="bg-white"
                        style={{ borderRadius: "100%" }}
                        width={50}
                        height={50} />
                </Link>
                <div className="" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        {Object.entries(navbarElements).map(([key, value],) => (
                            <li key={key} className="nav-item">
                                <Link href={value.src} className="nav-link">
                                    <Image
                                        src={value.imgSrc}
                                        alt=""
                                        className="white"
                                        width={50}
                                        height={50} />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>)
}