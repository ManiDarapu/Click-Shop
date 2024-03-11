import {Component} from 'react'
import ProductItemDetails from '../ProductItemDetails'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Products extends Component {
  state = {
    originalProductsList: [],
    productsList: [],
    apiStatus: apiStatusConstants.initial,
    displayProduct: false,
    id: 0,
    wishlist: [],
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://fakestoreapi.com/products'
    const response = await fetch(url)
    console.log(response)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      this.setState({
        originalProductsList: data,
        productsList: data,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div>
      <img src="https://cdn.dribbble.com/users/160117/screenshots/3197970/main.gif" alt="loading..." />
    </div>
  )

  renderFailureView = () => (
    <div>
      <img
        src="https://cdn.dribbble.com/users/774806/screenshots/3823110/something-went-wrong.gif"
        alt="failure"
      />
    </div>
  )

  onClickProduct = id => {
    this.setState({displayProduct: true, id})
  }

  applyfilter = name => {
    const {originalProductsList} = this.state
    const filteredProducts = originalProductsList.filter(
      each => each.category === name,
    )
    this.setState({productsList: filteredProducts})
  }

  goBack = () => {
    this.setState({displayProduct: false})
  }

  renderSuccessView = () => {
    const {productsList, displayProduct, id} = this.state
    return (
      <div className="div1">
        <div className="div2">
          <nav className="nav">
            <img
              src="https://th.bing.com/th/id/OIP.ZxbgbCxCkm0dFZLA806XKAHaHa?rs=1&pid=ImgDetMain"
              alt="logo"
              className="logo"
            />
            <ul className="navUl">
              <li
                onClick={() => this.applyfilter('electronics')}
                className="navLi"
              >
                Electronics
              </li>
              <li
                onClick={() => this.applyfilter('jewelery')}
                className="navLi"
              >
                Jewellery
              </li>
              <li
                onClick={() => this.applyfilter("men's clothing")}
                className="navLi"
              >
                Mens Clothing
              </li>
              <li
                onClick={() => this.applyfilter("women's clothing")}
                className="navLi"
              >
                Womens Clothing
              </li>
            </ul>
          </nav>
          {displayProduct ? (
            <>
              <ProductItemDetails id={id} wishlist={this.wishlist} />
              <button type="button" onClick={this.goBack} className="backBtn">
                Back
              </button>
            </>
          ) : (
            <ul className="productsUl">
              {productsList.map(each => (
                <li
                  key={each.id}
                  className="productsLi"
                  onClick={() => this.onClickProduct(each.id)}
                >
                  <img
                    src={each.image}
                    alt={each.name}
                    className="productsImg"
                  />
                  <p className="p">{each.title}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }

  addToWishList = id => {
    const {originalProductsList} = this.state
    const likedProduct = originalProductsList.filter(each => each.id === id)
    this.setState(prevState => ({
      wishlist: [...(prevState.wishlist + likedProduct)],
    }))
  }

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default Products
