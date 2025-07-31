import { Dispatch, SetStateAction } from "react";

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
    setElementId: Dispatch<SetStateAction<number>>
    optionsToSelect?: object | null
}