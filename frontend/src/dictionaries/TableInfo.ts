import { useEffect, useState } from "react"
import APIConnection from "@/functions/APIConnection"
import IConsumers from "@/interfaces/IConsumers"
import IEmployees from "@/interfaces/IEmployees"
import IFrequency from "@/interfaces/IFrequency"
import IIntakeType from "@/interfaces/IIntakeType"
import IMeasureUnit from "@/interfaces/IMeasureUnit"
import IProducts from "@/interfaces/IProducts"
import IRoles from "@/interfaces/IRoles"

const connection = new APIConnection("http://localhost:8000/api")

export default function TableInfo() {
    const [frequencies, setFrequencies] = useState<IFrequency[]>([])
    const [measureUnits, setMeasureUnits] = useState<IMeasureUnit[]>([])
    const [products, setProducts] = useState<IProducts[]>([])
    const [intakeTypes, setIntakeTypes] = useState<IIntakeType[]>([])
    const [consumers, setConsumers] = useState<IConsumers[]>([])
    const [roles, setRoles] = useState<IRoles[]>([])
    const [employees, setEmployees] = useState<IEmployees[]>([])

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

    const getIntakeTypes = async () => {
        const request = await connection.getAllData("/intake-type");
        const data = request.body["data"];
        setIntakeTypes(data);
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

    useEffect(() => {
        getFrequencies()
        getMeasureUnits()
        getProducts()
        getIntakeTypes()
        getConsumers()
        getRoles()
        getEmployees()
    }, []);

    return{
        optionsOfMenu: {
            Frequency: frequencies,
            MeasuresUnits: measureUnits,
            Products: products,
            IntakeTypes: intakeTypes,
            Consumers: consumers,
            Roles: roles,
            Employees: employees,
        },
        getFrequencies,
        getMeasureUnits,
        getProducts,
        getIntakeTypes,
        getConsumers,
        getRoles,
        getEmployees,
    };
}