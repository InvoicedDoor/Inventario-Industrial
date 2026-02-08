import { useEffect, useState } from "react"
import APIConnection from "@/functions/APIConnection"
import IConsumers from "@/interfaces/IConsumers"
import IEmployees from "@/interfaces/IEmployees"
import IFrequency from "@/interfaces/IFrequency"
import IConsumptionType from "@/interfaces/IConsumptionType"
import IMeasureUnit from "@/interfaces/IMeasureUnit"
import IProducts from "@/interfaces/IProducts"
import IRoles from "@/interfaces/IRoles"
import ISeller from "@/interfaces/ISeller"

const connection = new APIConnection("http://localhost:8000/api")

export default function TableInfo() {
    const [frequencies, setFrequencies] = useState<IFrequency[]>([])
    const [measureUnits, setMeasureUnits] = useState<IMeasureUnit[]>([])
    const [products, setProducts] = useState<IProducts[]>([])
    const [consumptionType, setConsumptionType] = useState<IConsumptionType[]>([])
    const [consumers, setConsumers] = useState<IConsumers[]>([])
    const [roles, setRoles] = useState<IRoles[]>([])
    const [employees, setEmployees] = useState<IEmployees[]>([])
    const [sellers, setSellers] = useState<ISeller[]>([])

    const getFrequencies = async () => {
        const request = await connection.getAllData("/consumption-frequency");
        const data = request.body["data"];
        setFrequencies(data);
        return data;
    }

    const getMeasureUnits = async () => {
        const request = await connection.getAllData("/measure-units");
        const data = request.body["data"];
        setMeasureUnits(data);
        return data;
    }

    const getProducts = async () => {
        const request = await connection.getAllData("/products");
        const data = request.body["data"];
        setProducts(data);
        return data;
        // optionsOfMenu.Products = data;
    }

    const getConsumptionType = async () => {
        const request = await connection.getAllData("/consumption-type");
        const data = request.body["data"];
        setConsumptionType(data);
        return data;
        // optionsOfMenu.IntakeTypes = data;
    }

    const getConsumers = async () => {
        const request = await connection.getAllData("/consumers");
        const data = request.body["data"];
        setConsumers(data);
        return data;
        // optionsOfMenu.Consumers = data;
    }

    const getRoles = async () => {
        const request = await connection.getAllData("/roles");
        const data = request.body["data"];
        setRoles(data);
        return data;
        // optionsOfMenu.Roles = data;
    }

    const getEmployees = async () => {
        const request = await connection.getAllData("/employees");
        const data = request.body["data"];
        setEmployees(data);
        return data;
        // optionsOfMenu.Employees = data;
    }

    const getSellers = async () => {
        const request = await connection.getAllData("/sellers");
        const data = request.body["data"];
        setSellers(data);
        return data
    }

    useEffect(() => {
        getFrequencies()
        getMeasureUnits()
        getProducts()
        getConsumptionType()
        getConsumers()
        getRoles()
        getEmployees()
        getSellers()
    }, []);

    return{
        optionsOfMenu: {
            Frequency: frequencies,
            MeasuresUnits: measureUnits,
            Products: products,
            ConsumptionType: consumptionType,
            Consumers: consumers,
            Sellers: sellers,
            Roles: roles,
            Employees: employees,
        },
        getFrequencies,
        getMeasureUnits,
        getProducts,
        getConsumptionType,
        getConsumers,
        getRoles,
        getEmployees,
    };
}