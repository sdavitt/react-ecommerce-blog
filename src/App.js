import React, { Component } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import { Switch, Route } from 'react-router-dom';
import Main from './views/Main';
import Something from './views/Something';
import Blog from './views/Blog';
import BlogPost from './components/BlogPost';
import Cart from './views/Cart';
import Martketplace from './views/Martketplace';
import './App.css';


export default class App extends Component {
  constructor() {
    // console.log("Constructed")
    super();

    this.state = {
      employees: [],
      employeeInformation: {},
      products: [],
      cart: [],
      cartTotal: 0
    }
  }

  componentDidMount() {
    // console.log("Mounted")
    fetch('./data.json')
      .then(response => response.json())
      .then(data => {
        this.setState({ 
          employees: data
         })
      })

    fetch('http://localhost:5000/api/shop')
      .then(response => response.json())
      .then(data => this.setState({
        products: data
      }));
  }

  handleSelectEmployee = (empObj) => {
    this.setState({
      employeeInformation: empObj
    })
    // console.log(empObj);
  }

  // updateTotal = (cartProducts) => {
  //   var count = 0; 
  //   for (const p of cartProducts) {
  //       count += p.price;
  //   }
  //   return count
  // }

  handleAddToCart = productObj => {
    var count = this.state.cartTotal;

    this.setState({
      cart: this.state.cart.concat(productObj)
    })

    this.setState({
      cartTotal: count += productObj.price
    })
  }

  render() {
    // console.log(this.state.products);
    // console.log("Rendered")

    return (
      <div>
        <Header cart={this.state.cart} cartTotal={this.state.cartTotal} />

        <main>
          <div className="container">
            <Switch>
              <Route exact path="/" render={() => <Main employees={this.state.employees} handleSelectEmployee={this.handleSelectEmployee} employeeInformation={this.state.employeeInformation}  />} />
              <Route exact path="/something" render={() => <Something />} />
              <Route exact path="/blog" render={() => <Blog />} />
              <Route exact path="/blog/:postId" render={({ match }) => <BlogPost match={match} />} />
              <Route exact path="/marketplace" render={() => <Martketplace products={this.state.products} handleAddToCart={this.handleAddToCart} />} />
              <Route exact path="/cart" render={() => <Cart />} />
            </Switch>
          </div>
        </main>

        <Footer />
      </div>
    )
  }
}