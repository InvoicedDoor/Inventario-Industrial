export default interface IProducts
{
    id: number
    name: string
    measureunit_id: number
    frequency_id: number
    stock: number
    min_stock: number
    max_stock: number
    active: boolean
}