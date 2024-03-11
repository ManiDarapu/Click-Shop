import {Component} from 'react'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProductitemDetails extends Component {
  state = {
    product: {},
    apiStatus: apiStatusConstants.initial,
    wishlisted: false,
  }

  componentDidMount() {
    this.getProductItemDetails()
  }

  getProductItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {id} = this.props
    const url = `https://fakestoreapi.com/products/${id}`
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      this.setState({product: data, apiStatus: apiStatusConstants.success})
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

  onClickWish = () => {
    this.setState(prevState => ({
      wishlisted: !prevState.wishlisted,
    }))
  }

  renderSuccessView = () => {
    const {product, wishlisted} = this.state
    const {title, price, image, description, category} = product
    return (
      <div className="mainDiv1">
        <img className="productImg" src={image} alt={title} />
        <div className="productDiv2">
          <h1>{title}</h1>
          <h2>Price: ${price}</h2>
          <p>Category: {category}</p>
          <p>Description: {description}</p>
          <div className="buttonsDiv">
            {wishlisted ? (
              <button className="wish" type="button" onClick={this.onClickWish}>
                {' '}
                &#x2764; Wishlisted
              </button>
            ) : (
              <button type="button" className="wish" onClick={this.onClickWish}>
                Wishlist
              </button>
            )}

            <button className="cart" type="button">
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    )
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

export default ProductitemDetails
