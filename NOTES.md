STATE
<!-- Global -->
  gameOptions = {
    size: 4, 6
    theme: numbers/icons
    players: 1,2,3,4
    time?
  }

  gamePlayers = [
    {
      name?,
      number of moves,
      turn?
      score
    }
  ]

  gameStatus =  {
    start, inProgress, finish - won, lost, draw
  }

<!-- Local -->

  board = [
    {
      number: ?
      icon: from lib
      isFound: true, false
   },
    {}
  ]



  turn  = {
      first selection,
      second selection
  }


LOGIC

turn:
if
  1st selection === 2nd selection
    change both items state in  board
    add 1 to player score
    check if game complete

complete
if
  every item in board isFound game is complete

