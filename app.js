window.addEventListener('load', function () {

  console.log('working');


  new Vue({
    el: '#app',
    data: {
      playerPoints: 100,
      monsterPoints: 100,
      wounds: false,
      gameStarted: false,
      gameLog: []
    },
    methods: {
      startGame: function () {
        console.log('game started');
        this.playerPoints = 100;
        this.monsterPoints = 100;
        this.wounds = false;
        this.gameStarted = true;
      },
      attack: function () {
        console.log('attack');
        this.wounds = true;
        x = Math.ceil(this.randomNum() * 10);
        y = Math.ceil(this.randomNum() * 10);
        this.monsterPoints -= x;
        this.playerPoints -= y;
        this.pushLog('You inflicted ' + x + ' damages');
        this.pushLog('You received ' + y + ' damages');
      },
      specialAttack: function () {
        console.log('special attack');
        this.wounds = true;
        x = Math.ceil(this.randomNum() * 20);
        y = Math.ceil(this.randomNum() * 20);
        this.monsterPoints -= x;
        this.playerPoints -= y;
        this.pushLog('You inflicted ' + x + ' damages');
        this.pushLog('You received ' + y + ' damages');
      },
      heal: function () {
        console.log('heal');
        x = Math.ceil(this.randomNum() * 10);
        y = Math.ceil(this.randomNum() * 10);
        this.playerPoints += x;
        this.playerPoints -= y;
        this.pushLog('You healed ' + x + ' damages');
        this.pushLog('You received ' + y + ' damages');
      },
      giveUp: function () {
        console.log('give up');
        this.gameStarted = false;
      },
      // RANDOM NUM
      randomNum: function () {
        return Math.random();
      },
      // DIALOG BOX
      dialogBox: function (text) {
        return confirm(text);
      },
      pushLog: function (entry) {
        this.gameLog.push(entry);
      }
    },
    watch: {
      playerPoints: function () {
        if (this.playerPoints <= 0) {
          this.gameStarted = false;
          let promise = new Promise((resolve, reject) => {
            resolve(this.dialogBox('YOU LOST. Wanna play again?'));
          });
          promise.then((x) => {
            if (x) {
              this.startGame();
            }
          })
        }

      },
      monsterPoints: function () {
        if (this.monsterPoints <= 0) {
          this.gameStarted = false;
          let x = this.dialogBox('YOU WON. Wanna play again?')
          if (x) {
            this.startGame();
          }
        }
      }
    }
  })
})