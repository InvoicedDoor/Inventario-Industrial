export default interface IProducts
{
    id?: number
    name: string
    unit: number
    frequency: number
    stock: number
    min_stock?: number
    max_stock?: number
    active?: boolean
}