const ProductList = React.createClass({
  getInitialState: function () {
    return {
      products: [],
      orderTrack: 0,
    };
  },
  componentDidMount: function () {
      this.updateState();
  },
  updateOrder: function() {
    var products = [];
    var orderTrack = null
    if(this.state.orderTrack == 0) {
      products = Data.sort((a, b) => {
        return b.votes - a.votes;
      });
      orderTrack = 1;
    }
    else {
      products = Data.sort((a, b) => {
        return a.votes - b.votes;
      });
      orderTrack = 0;
    }
    this.setState({ products: products, orderTrack: orderTrack})
  },
  updateState: function () {
    const products = Data.sort((a, b) => {
      return a.votes - b.votes;
    });
    this.setState({ products: products });
  },
  handleProductUpVote: function (productId) {
    Data.forEach((el) => {
      if (el.id === productId) {
        el.votes = el.votes + 1;
        return;
      }
    });
    this.updateOrder();
  },
  handleProductDownVote: function (productId) {
    Data.forEach((el) => {
      if (el.id === productId) {
        el.votes = el.votes - 1;
        return;
      }
    });
    this.updateOrder();
  },
  render: function() {
    const products = this.state.products.map((product) => {
      return (
        <Product
          key={'product-' + product.id}
          id={product.id}
          title={product.title}
          description={product.description}
          url={product.url}
          votes={product.votes}
          submitter_avatar_url={product.submitter_avatar_url}
          product_image_url={product.product_image_url}
          onVoteUp={this.handleProductUpVote}
          onVoteDown={this.handleProductDownVote}
        />
      );
    });
    return (
      <div className='ui items'>
        <SortButton
          products={products}
          toggleSort={this.updateOrder}
        />
        {products}
      </div>
    )
  },
});

const SortButton = React.createClass({
  handleSort: function () {
    this.props.toggleSort();
  },
  render: function() {
    return (
      <button onClick={this.handleSort} className='fluid ui button'>
        Toggle sort
      </button>
    );
  },
});

const Product = React.createClass({
  handleUpVote: function () {
    this.props.onVoteUp(this.props.id);
  },
  handleDownVote: function () {
    this.props.onVoteDown(this.props.id);
  },
  render: function() {
    return (
      <div className='item'>
        <div className='image'>
          <img src={this.props.product_image_url} />
        </div>
        <div className='middle aligned content'>
          <div className='header'>
            <a onClick={this.handleUpVote}>
              <i className='large caret up icon'></i>
            </a>
              {this.props.votes}
            <a onClick={this.handleDownVote}>
              <i className='large caret down icon'></i>
            </a>
          </div>
          <div className='description'>
            <a href={this.props.url}>
              {this.props.title}
            </a>
          </div>
          <div className='extra'>
            <span>Submitted by:</span>
            <img
              className='ui avatar image'
              src={this.props.submitter_avatar_url}
            />
          </div>
        </div>
      </div>
    );
  },
});

ReactDOM.render(
  <ProductList />,
  document.getElementById('content')
);
