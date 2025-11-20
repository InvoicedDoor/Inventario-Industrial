import IFrequency from "@/interfaces/IFrequency";
import { LeftBarProps } from "./LeftBar";
import IMeasureUnit from "@/interfaces/IMeasureUnit";
import IProducts from "@/interfaces/IProducts";
import IIntakeType from "@/interfaces/IIntakeType";
import IRoles from "@/interfaces/IRoles";
import IConsumers from "@/interfaces/IConsumers";
import IEmployees from "@/interfaces/IEmployees";

interface ILeftButtonBar extends LeftBarProps {
    reloadTable?: () => () => Promise<void>
    body: Array<Record<string, string>>
    headers: Record<string, string>
    dataToAdd?: Record<string, string>
    pageTitle: string
    endpoint: string
    buttonName: string
    optionsOfMenu?: {
            Frequency: IFrequency[],
            MeasuresUnits: IMeasureUnit[],
            Products: IProducts[],
            IntakeTypes: IIntakeType[],
            Consumers: IConsumers[],
            Roles: IRoles[],
            Employees: IEmployees[]
        }
}


export default function LeftButtonBar({ setBody, body, setHeaders, headers, endpoint, pageTitle, setEndpoint, setPageTitle, setReloadTable, reloadTable, dataToAdd, setDataToAdd, buttonName, setOptionsToSelect, optionsOfMenu }: ILeftButtonBar) {
    return (
        <button
            className="btn btn-secondary m-3"
            onClick={() => {
                setBody(body);
                setHeaders(headers);
                setPageTitle(pageTitle)
                setEndpoint(endpoint)
                if (setReloadTable && reloadTable) {
                    setReloadTable(reloadTable);
                }

                if (setDataToAdd && dataToAdd) {
                    setDataToAdd(dataToAdd)
                }

                if (setOptionsToSelect && optionsOfMenu) {
                    setOptionsToSelect(optionsOfMenu)
                }
            }}
            style={{ width: "90%", height: "70px" }}>Tabla de {buttonName}</button>
    )
}