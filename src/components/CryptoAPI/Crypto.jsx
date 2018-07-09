import React, { Component } from "react";
import "./Crypto.css";

//Material UI Components
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';

import CryptoNews from "../CryptoNews/CryptoNews.jsx";


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 100,
  },
});

class Crypto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: [],
      anchorEl: null
    };
  }

  //MenuItem handlers
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  componentDidMount() {
    //API to GET all cryptocurrency tickers
    const url =
      "https://api.coinmarketcap.com/v2/ticker/?convert=CAD&limit=50&sort=rank&structure=array";
    //fetch data from API
    fetch(url)
      .then(res => res.json())
      .then(result => {
        this.setState("Set state"[result]);
        // console.log("Original Format", result);
        var coins = Object.values(result.data);
        this.setState({ coins: coins });
        // console.log("Here's the array", coins);
      });
  }
  render() {
    const { anchorEl } = this.state;
    return (
      <div className="Crypto-Ticker">
        <Grid container spacing={4}>
          <Grid item xs={8} style={{ padding: '4%' }} >
            <Paper settings={{ padding: '2%' }}>

              <h1 style={{ padding: '2em' }}> Top 100 Cryptocurrencies </h1>
              {/* <Paper> */}
              <Table  >
                <TableHead>
                  <TableRow>
                    <TableCell width='10%'>Rank</TableCell>
                    <TableCell width='15%'>Symbol</TableCell>
                    <TableCell width='30%'>Name</TableCell>
                    <TableCell width='30%'>Price</TableCell>
                    <TableCell>Change (24h)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.coins.map((coin, c) => {
                    return (
                      <TableRow key={c}>
                        <TableCell>{coin.rank}</TableCell>
                        <TableCell>{coin.symbol}</TableCell>
                        <TableCell>{coin.name}</TableCell>
                        <TableCell>
                          $ {Math.round(coin.quotes.CAD.price * 100) / 100}
                        </TableCell>
                        <TableCell>
                          {coin.quotes.CAD.percent_change_24h} %
                    </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
          </Grid>

        <Grid item xs={4} style={{ padding: '4%' }} >
          <Paper settings={{ padding: '4%' }}>
            <CryptoNews />
          </Paper>
        </Grid>
        </Grid>

      </div>
    );
  }
}

export default Crypto;
