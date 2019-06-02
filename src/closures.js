/* exported gameGenerator accountGenerator randomInteger */
/*
We've written a few tests for your Game Generator function which you can find them in the 'specs' folder.
By the end of this exercise, you'll be writing tests for the functions yourself.
*/

function randomInteger(n) {
  return Math.floor(Math.random() * (n + 1));
}

function gameGenerator(n) {
  const upperBound = n;
  let guessesCount = 0;
  let answer = randomInteger(n);
  return {
    guess(i) {
      guessesCount++;
      let reply;
      if (i > upperBound) {
        reply = {
          message: `Wrong. Please try a number between 0 and ${upperBound}.`,
          status: false
        };
        return reply.status;
      } else if (i === answer) {
        reply = {
          message: "You win!",
          status: true
        };
        return reply.status;
      } else {
        reply = {
          message: `Wrong. Please try a number between 0 and ${upperBound}.`,
          status: false
        };
        return reply.status;
      }
    },

    reset() {
      let oldAnswer = answer;
      guessesCount = 0;
      answer = randomInteger(n);
      if(oldAnswer === answer) {
        this.reset();
      }
    },

    giveUp() {
      let oldAnswer = answer;
      guessesCount = 0;
      answer = randomInteger(n)
      if(oldAnswer === answer) {
        answer = randomInteger(n)
      }
      return oldAnswer;
    },

    numberGuesses() {
      return guessesCount;
    }
  };
}

function accountGenerator(initial) {
  let balance = initial;
  let transactions = [];
  return {
    withdraw: function(amount) {
      if (balance - amount >= 0) {
        const approvedWithdrawal = {
          type: "withdrawal",
          amount: amount,
          before: balance,
          after: balance - amount,
          status: "approved",
          time: new Date()
        };
        balance = balance - amount;
        transactions.push(approvedWithdrawal);
        return approvedWithdrawal;
      }
      const deniedWithdrawal = {
        type: "withdrawal",
        amount: amount,
        before: balance,
        after: balance,
        status: "denied",
        time: new Date()
      };
      transactions.push(deniedWithdrawal);
      return deniedWithdrawal;
    },
    deposit: function(amount) {
      const approvedDeposit = {
        type: "deposit",
        amount: amount,
        before: balance,
        after: balance + amount,
        status: "approved",
        time: new Date()
      };
      balance = balance + amount;
      transactions.push(approvedDeposit);
      return approvedDeposit;
    },
    getBalance: function() {
      return balance;
    },
    transactionHistory: function(n) {
      return transactions.slice(transactions.length - n > 0 ? transactions.length - n : 0)
    },
    averageTransaction: function() {
      let withdrawals = transactions.filter(transaction => transaction.type === "withdrawal" && transaction.status !== "denied");
      let withdrawalTotal = withdrawals.reduce((acc, current) => {
        return acc + current.amount;
      }, 0) 
      let withdrawalAverage = withdrawalTotal / withdrawals.length;

      let deposits = transactions.filter(transaction => transaction.type === "deposit");
      let depositTotal = deposits.reduce((acc, current) => {
        return acc + current.amount;
      }, 0)
      let depositAverage = depositTotal / deposits.length;

      return {deposit: depositAverage, withdrawal: withdrawalAverage}
    }
  };
}
