import React, { Component } from 'react';
import SearchListItem from './SearchListItem/SearchListItem'

class SearchList extends Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      items: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  componentDidMount()
  {
    this.setState({
      items: this.props.items
    });
  }

  componentWillReceiveProps(nextProps)
  {
    this.setState({
      items: nextProps.items
    });
  }

  handleChange(e)
  {
    let currentList, nextList;

    if(e.target.value !== "")
    {
      currentList = this.props.items;

      const filter = e.target.value.toLowerCase();

      nextList = currentList.filter(model => {
        
        const lc = model.symbol.toLowerCase();
        
        return lc.includes(filter);
      });
    }
    else
    {
      nextList = this.props.items;
    }

    this.setState({
      items: nextList
    });
  }

  handleOnClick(e)
  {
    //e.target;
    console.log("clicked", e);
  }

  render()
  {
    let {items} = this.state;

    return (
      <section>
        
        <div className="input-group">

          <input type="text" className="form-control" placeholder="Search a stock" onChange={this.handleChange} />
          <div className="input-group-append">
            <button className="btn btn-secondary" type="button">
              <i className="fa fa-search"></i>
            </button>
          </div>

        </div>

        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Symbol</th>
              <th scope="col">Last Price</th>
              <th scope="col">Last Volume</th>
              <th scope="col">Volume</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <SearchListItem key={item.symbol} onClick={this.handleOnClick.bind(this, item)} model={item} />
            ))}
          </tbody>
        </table>

        <nav aria-label="...">
          <ul className="pagination">
            <li className="page-item disabled">
              <a className="page-link" href="#" tabIndex="-1">Previous</a>
            </li>
            <li className="page-item"><a className="page-link" href="#">1</a></li>
            <li className="page-item active">
              <a className="page-link" href="#">2 <span className="sr-only">(current)</span></a>
            </li>
            <li className="page-item"><a className="page-link" href="#">3</a></li>
            <li className="page-item">
              <a className="page-link" href="#">Next</a>
            </li>
          </ul>
        </nav>
      </section>
    )
  }
}

export default SearchList;