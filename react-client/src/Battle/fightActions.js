import axios from 'axios';

export const setLobbyInfo = ((roomInfo, player) => {
  return (dispatch) => {
    dispatch({
      type: 'GET_LOBBY_INFO',
      payload: {
        playeriam: player,
        roomName: roomInfo.roomName,
        player1: roomInfo.player1,
        player2: roomInfo.player2,

      },
    });
  };
});

export const setPlayerNumber = ((playernumber) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_PLAYER_NUMBER',
      payload: {
        user: playernumber,
      },
    });
  };
});

export const setMonsterFighter = ((player, squaddie) => {
  return (dispatch) => {
    dispatch({
      type: 'CHOOSE_FIGHTER',
      payload: {
        player,
        monster: squaddie,
        monsterCurrentHP: squaddie.user_monster_hp,
        monsterAttack: squaddie.user_monster_attack,
        monsterDefense: squaddie.user_monster_defense,
      },
    });
  };
});

export const decreaseHealth = ((damage, user_monster_id) => {
  return (dispatch) => {
    dispatch({
      type: 'DECREASE_HEALTH',
      payload: {
        damage,
        user_monster_id,
      },
    });
  };
});

// Not used
export const setActivePlayer = ((playernumber) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_ACTIVE_PLAYER',
      payload: {
        activePlayer: playernumber,
      },
    });
  };
});

export const resetState = () => ({ type: 'RESET_STATE' });

export const surrendered = surrenderPlayer => ({ type: 'SURRENDER', payload: { surrenderPlayer } });

export const addXPtoMonster = (monID, xp) => (
  dispatch => (
    axios.patch('/monsterXP', { monID, xp })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  )
);

export const levelup = monID => (
  dispatch => (
    axios.patch('/levelup', { monID })
      .then((res) => {
        console.log('done leveling', res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  )
);
