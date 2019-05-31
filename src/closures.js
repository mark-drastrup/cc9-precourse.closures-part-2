/* exported gameGenerator accountGenerator randomInteger */
/*
We've written a few tests for your Game Generator function which you can find them in the 'specs' folder.
By the end of this exercise, you'll be writing tests for the functions yourself.
*/

function randomInteger(n) {
  return Math.floor(Math.random() * (n + 1));
}

function gameGenerator(n) {
  answer = randomInteger(n);
  return {
    guessesCount: 0,

    guess(i) {
      this.guessesCount++;
      let reply = guessThisNumber(i);
      return reply.status;
    },

    reset() {
      let oldAnswer = answer;
      this.guessesCount = 0;
      answer = randomInteger(n);
      if(oldAnswer === answer) {
        this.reset();
      }
    },

    giveUp() {
      let oldAnswer = answer;
      this.reset();
      return oldAnswer;
    },

    numberGuesses() {
      return this.guessesCount;
    }
  };
}

const upperBound = 5;
let answer;

function guessThisNumber(n) {
  if (n > upperBound) {
    return {
      message: `Wrong. Please try a number between 0 and ${upperBound}.`,
      status: false
    };
  } else if (n === answer) {
    return {
      message: "You win!",
      status: true
    };
  }

  return {
    message: `Wrong. Please try a number between 0 and ${upperBound}.`,
    status: false
  };
}

function accountGenerator(initial) {
  let balance = initial;

  return {
    withdraw: function(amount) {
      if (balance - amount >= 0) {
        const approvedWithdrawal = {
          type: "withdrawal",
          amount: amount,
          before: balance,
          after: balance - amount,
          status: "approved"
        };
        balance = balance - amount;
        return approvedWithdrawal;
      }
      const deniedWithdrawal = {
        type: "withdrawal",
        amount: amount,
        before: balance,
        after: balance,
        status: "denied"
      };
      return deniedWithdrawal;
    },
    deposit: function(amount) {
      balance = balance + amount;
      return `Your balance is: $${balance}`;
    },
    getBalance: function() {
      return balance;
    }
  };
}
