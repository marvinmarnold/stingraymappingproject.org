MainLayout = React.createClass({
  render() {
    return (
      <div>
        <Navbar />
        {this.props.children}
      </div>
    )
  }
})
