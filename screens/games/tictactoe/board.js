/*
 * Copyright 2018 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import PropTypes from 'prop-types';

const Board = ({
  ctx,
  isMultiplayer,
  isConnected,
  G,
  moves,
  playerID,
  isActive,
}) => {
  let player = null;
  let disconnected = null;
  let winner = null;
  const tbody = [];
  const marker = {
    0: 'X',
    1: 'O',
  };

  for (let i = 0; i < 3; i++) {
    const cells = [];
    for (let j = 0; j < 3; j++) {
      const id = 3 * i + j;
      cells.push(
        <TouchableHighlight
          key={id}
          onPress={() => onClick(id)}
          style={[styles.cell, styles[`cell${id}`]]}
          underlayColor="transparent"
        >
          <Text style={styles.value}>{marker[G.cells[id]]}</Text>
        </TouchableHighlight>
      );
    }
    tbody.push(
      <View key={i} style={styles.row}>
        {cells}
      </View>
    );
  }

  const onClick = (id) => {
    if (isActiveCheck(id)) {
      moves.clickCell(id);
    }
  };

  const isActiveCheck = (id) => {
    if (!isActive) return false;
    if (G.cells[id] !== null) return false;
    return true;
  }

  return (
    <View>
      <View id="board">{tbody}</View>
      <View style={styles.info}>
        {playerID !== null && (
          <Text id="player" style={styles.infoText}>
            Player: {playerID}
          </Text>
        )}
        {ctx.gameover !== undefined && (
          <Text id="winner" style={styles.infoText}>
            Winner: {marker[ctx.gameover]}
          </Text>
        )}
        {isMultiplayer && !isConnected && (
          <Text id="disconnected" style={styles.infoText}>
            Disconnected!
          </Text>
        )}
      </View>
    </View>
  );
}

Board.propTypes = {
  G: PropTypes.any.isRequired,
  ctx: PropTypes.any.isRequired,
  moves: PropTypes.any.isRequired,
  playerID: PropTypes.string,
  isActive: PropTypes.bool,
  isMultiplayer: PropTypes.bool,
  isConnected: PropTypes.bool,
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cell: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 96,
    height: 96,
    borderWidth: 4,
    borderColor: '#666',
    borderStyle: 'solid',
  },
  value: {
    fontSize: 48,
    fontWeight: '700',
    color: '#373748',
  },
  cell0: {
    borderLeftColor: 'transparent',
    borderTopColor: 'transparent',
  },
  cell1: {
    borderTopColor: 'transparent',
  },
  cell2: {
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
  },
  cell3: {
    borderLeftColor: 'transparent',
  },
  cell5: {
    borderRightColor: 'transparent',
  },
  cell6: {
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  cell7: {
    borderBottomColor: 'transparent',
  },
  cell8: {
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderStyle: 'solid',
  },
  info: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    marginTop: 24,
  },
  infoText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#373748',
  },
});

export default Board;