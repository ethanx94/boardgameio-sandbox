import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Client } from 'boardgame.io/react-native';

import logo from '../../assets/images/logo.png';
import TicTacToe from './TicTacToe';
import ConnectFour from './ConnectFour';
import Board from './board';

const TicTacView = Client({
  game: TicTacToe,
  board: Board,
});

// Replace with implementation
const ConnectFourView = Client({
  game: ConnectFour,
  board: Board,
});

const Singleplayer = ({ gameKey }) => {
  return (
    <View style={styles.container}>
      {gameKey === "tictactoe" && (
        <>
          <Image source={logo} style={styles.logo} />
          <TicTacView matchID="single" />
        </>
      )}
      {gameKey === "connectfour" && <ConnectFourView matchID="single" />}
    </View>
  )
};

export default Singleplayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 300,
    height: 90,
    marginBottom: 24,
  },
});
