class StockItemModel
{
	constructor(symbol, lastPrice, lastVolume, volume)
	{
		this.symbol = symbol;
		this.lastPrice = lastPrice;
		this.lastVolume = lastVolume;
		this.volume = volume;
	}

	static create(symbol, lastPrice, lastVolume, volume)
	{
		return new StockItemModel(symbol, lastPrice, lastVolume, volume);
	}
}

export default StockItemModel;