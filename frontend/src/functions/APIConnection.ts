export default class APIConnection {
    public _BASEURL: string = ""

    constructor(BASEURL: string) {
        this._BASEURL = BASEURL
    }

    public async getAllData(endpoint: string) {
        const response = await fetch(`${this._BASEURL}${endpoint}`,{
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok)
            return {
                message: "Error en la petición",
                body: []
            }

        const data = await response.json();

        if (data === null)
            return {
                message: data.message,
                body: []
            }

        return {
            message: data.message,
            body: data
        }
    }

    public async getDataById(endpoint: string) {
        const response = await fetch(`${this._BASEURL}/${endpoint}`);

        const data = await response.json()

        if (!response.ok)
            return {
                message: data.message,
                body: null
            }

        return {
            message: "Datos encontrados",
            body: data
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async addData(endpoint: string, newData: any) {
        try {
            const response = await fetch(`${this._BASEURL}/${endpoint}`, {
                body: JSON.stringify(newData),
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST"
            })

            const data = await response.json()

            if (!response.ok)
                return {
                    message: data.message,
                    status: false
                }

            return {
                message: data.message,
                status: true
            }
        } catch
        {
            return {
                message: "Error al enviar la información",
                status: false
            }
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async editData(endpoint: string, modifiedData: any) {
        const response = await fetch(`${this._BASEURL}/${endpoint}`, {
            body: JSON.stringify(modifiedData),
            headers: {
                "Content-Type": "application/json"
            },
            method: "PATCH"
        })

        const data = await response.json()

        if (!response.ok)
            return {
                message: data.message,
                status: false
            }

        return {
            message: data.message,
            status: true
        }
    }

    public async deleteData(endpoint: string) {
        const APIURL: URL = new URL(endpoint, this._BASEURL)

        const response = await fetch(APIURL, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "DELETE"
        })

        if (!response.ok)
            return {
                message: "No se pudo borrar el dato",
            }

        return {
            message: "Datos eliminado",
        }
    }
}