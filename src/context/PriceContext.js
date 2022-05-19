import React, { createContext, Component } from "react";

// export default createContext(null);

export const PriceContext = createContext();

class PriceContextProvider extends Component {
  state = {
    cosm: 0,
  };
  componentDidMount() {
    // https://api.coingecko.com/api/v3/simple/price?ids=cosmo-coin&vs_currencies=usd
    // get api data from server
    fetch("https://api.coingecko.com/api/v3/simple/price?ids=cosmo-coin&vs_currencies=usd")
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                cosm: data['cosmo-coin']['usd'],
            });
            }
        )
  }
  render() {
    return (
      // pass state and fun to whole app
      <PriceContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </PriceContext.Provider>
    );
  }
}

export default PriceContextProvider;
