export interface IGameDetail {
    readonly info: { title: string, steamAPPId: string };
    readonly cheapestPriceEver: { price: string, date: Date };
    readonly deals: Array<object>;
}