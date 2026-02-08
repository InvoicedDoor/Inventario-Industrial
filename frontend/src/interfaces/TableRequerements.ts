import { Dispatch, SetStateAction } from "react";
import IFrequency from "./IFrequency";
import IMeasureUnit from "./IMeasureUnit";
import IProducts from "./IProducts";
import IIntakeType from "./IConsumptionType";
import IConsumers from "./IConsumers";
import IRoles from "./IRoles";
import IEmployees from "./IEmployees";

export default interface TableRequerements
{
    TitlePage: string
    Headers: Record<string, string>
    Body: Record<string, string>[];
    dataToAdd: Record<string, string>;
    setBody: Dispatch<SetStateAction<Record<string,string>[]>>
    setDataToAdd: Dispatch<SetStateAction<Record<string, string>>>
    setViewModalEdit: Dispatch<SetStateAction<boolean>>
    setViewModalAdd: Dispatch<SetStateAction<boolean>>
    setDataToEdit: Dispatch<SetStateAction<Record<string, string>>>
    optionsToSelect?: {
            Frequency?: IFrequency[],
            MeasuresUnits?: IMeasureUnit[],
            Products?: IProducts[],
            IntakeTypes?: IIntakeType[],
            Consumers: IConsumers[],
            Roles: IRoles[],
            Employees: IEmployees[]
        } | null
}