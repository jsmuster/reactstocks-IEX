import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';

import StockItemModel from '../../models/StockItemModel'
import SearchList from '../../components/SearchList/SearchList'
import IEX from '../../services/iex'
import './App.css';

class App extends Component 
{
  constructor(props)
  {
    super(props);

    this.state = {
      list: [StockItemModel.create("AAPL", 173.93, 100, 348225),
      StockItemModel.create("CSCO", 51.755, 10, 633394),
      StockItemModel.create("BKK", 14.99, 100, 100)]
    };

    this.setup();
  }

  componentDidMount()
  {
    const newItem = document.getElementById("addInput");
    const form = document.getElementById("addItemForm");

    const refs = {newItem, form};

    this.addItem = this.addItem.bind(this, refs);
    this.removeItem = this.removeItem.bind(this, refs);
  }

  componentWillUnmount()
  {
    
  }

  setup()
  {

  }

  addItem(refs, e)
  {
    e.preventDefault();

    let list = this.state.list;

    const { newItem, form } = refs;
    
    let symbol = newItem.value;

    if(symbol !== "")
    {
      IEX.stockQuotes(symbol).then((data) => {
        list.push(StockItemModel.create(data.symbol, data.lastSalePrice, data.lastSaleSize, data.volume));
        
        this.setState({
          list: list
        });

        newItem.classList.remove("is-danger");
        form.reset();
      });

    }
    else
    {
      newItem.classList.add("is-danger");
    }
  }

  removeItem(refs, item)
  {
    const list = this.state.list.slice();
    
    list.some((el, i) => {
      if (el === item)
      {
        list.splice(i, 1);
        return true;
      }
      else
      {
        return false;
      }
    });
    
    this.setState({
      list: list
    });
  }

  render() {
    return (
      <div className="content">
        <div className="container">
          <section className="section">
            <BrowserRouter>
              <Switch>
                <Route 
                   exact path="/"
                  render={() => (
                    <div>
                      <SearchList items={this.state.list} delete={this.removeItem} />
                      <hr/>
                      <form className="form-inline" id="addItemForm">
                        <div className="form-group mx-sm-3 mb-2">
                          <label htmlFor="inputPassword2" className="sr-only">Password</label>
                          <input className="form-control" id="addInput" placeholder="" />
                        </div>
                        <button type="submit" className="btn btn-primary mb-2" onClick={(e) => this.addItem(e) }>Add Stock</button>
                      </form>
                    </div>
                    )}
                />
                <Route 
                  path="/stock/:symbol" 
                  render={(props) => (<span>Diff page</span>)}
                />
              </Switch>
            </BrowserRouter>
            
          </section>
          
        </div>
      </div>
    );
  }

}

export default App;
