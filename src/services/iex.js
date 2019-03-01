const axios = require('axios');

let tokenUid = 'pk_4b148c640161420086b2e50006a27df9';

class IEX
{
	static stockQuotes(stockSymbol)
	{
		let url = `https://cloud.iexapis.com/beta/tops?token=${tokenUid}&symbols=${stockSymbol}`;

		return axios({
		  method: 'get',
		  url: url,
		}).then(response => {
			
			if(response.status == 200 && response.data && response.data.length > 0)
			{
				return response.data[0];
			}

	   }).catch(error => {
			console.log("Error loading stockQuotes " + error);
		});
	}

}

export default IEX;