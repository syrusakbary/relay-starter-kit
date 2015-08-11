class App extends React.Component {
  _loadMore() {
    this.props.relay.setVariables({
      count: this.props.relay.variables.count + 1
    });
  }
  render() {
    return (
      <div>
        <h1>Widget list</h1>
        <ul>
          {this.props.viewer.widgets.edges.map(edge =>
            <li>{edge.node.name} (ID: {edge.node.id})</li>
          )}
        </ul>
        <a onClick={this._loadMore.bind(this)}>Load More</a>
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  initialVariables: {
    count: 1
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        widgets(first: $count) {
          edges {
            node {
              id,
              name,
            },
          },
        },
      }
    `,
  },
});
