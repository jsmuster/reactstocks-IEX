import React, { Component } from 'react';

class SearchListItem extends Component
{
	// constructor(props)
	// {
	// 	super(props);
	// }

	componentDidMount()
	{
	}

	render()
	{
		let { model, onClick } = this.props;
		
		return (
		<tr onClick={onClick}>
          <th scope="row">{model.symbol}</th>
          <td>{model.lastPrice}</td>
          <td>{model.lastVolume}</td>
          <td>{model.volume}</td>
        </tr>
		);
	}
}

export default SearchListItem;