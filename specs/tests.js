describe("gameGenerator", () => {
  it("should be there", () => {
    expect(gameGenerator).toBeDefined();
    expect(typeof gameGenerator).toBe("function");
  });

  it("should generate some games!", () => {
    const game = gameGenerator(4);
    expect(typeof game).toBe("object");
  });

  it("should have just one winning number", () => {
    const bound = 4;
    const game = gameGenerator(bound);
    const number = [];
    for (let i = 0; i < bound + 1; i++) {
      if (game.guess(i)) {
        number.push(i);
      }
    }
    expect(number.length).toBe(1);
  });

  it("should have a reset method", () => {
    const game = gameGenerator(3);
    expect(game.reset).toBeDefined();
    expect(typeof(game.reset)).toBe('function');
  });

  it("should have a giveUp method", () => {
    const game = gameGenerator(3);
    expect(game.giveUp).toBeDefined();
    expect(typeof(game.giveUp)).toBe('function');
  });

  it("The giveUp function should set a new winning number", () => {
    const game = gameGenerator(5);
    expect(game.giveUp()).not.toEqual(answer)
  })

  it("should have a numberGuesses method", () => {
    const game = gameGenerator(5);
    expect(game.numberGuesses).toBeDefined();
    expect(typeof(game.numberGuesses)).toBe('function');
  });

  it("should return the number of guesses, when the numberGuesses function is invoked", () => {
    const game = gameGenerator(5);
    let guesses = [];
    for(let i = 0; i < 5; i++) {
      game.guess(i);
      guesses.push(i)
    }
    expect(game.numberGuesses()).toEqual(guesses.length);
  }) 
});

describe("accountGenerator", () => {

  it("should be there", () => {
    expect(accountGenerator).toBeDefined();
    expect(typeof accountGenerator).toBe("function");
  });

  it("should have a method 'getBalance' that return the current balance", () => {
    const account = accountGenerator(100);
    let balance = account.getBalance();
    account.withdraw(50);
    expect(account.getBalance).toBeDefined();
    expect(typeof(account.getBalance)).toBe('function');
    expect(balance).not.toEqual(account.getBalance())
  });

  it("should return a transaction object, when 'withdraw' is invoked", () => {
    const account = accountGenerator(100);
    const withdrawal = account.withdraw(50)
    expect(typeof withdrawal).toBe("object");
    expect(withdrawal.time instanceof Date).toBe(true);
  });

  it("should withdraw the input amount if the account has sufficient funds", () => {
    const account = accountGenerator(100);
    const deniedWithdrawal = account.withdraw(200);
    const approvedWithdrawal = account.withdraw(50);
    expect(deniedWithdrawal.status).toEqual("denied");
    expect(approvedWithdrawal.status).toEqual("approved");
    expect(account.getBalance()).toEqual(50);
  })

  it("should return a transaction object, when 'deposit' is invoked", () => {
    const account = accountGenerator(100);
    const deposit = account.deposit(50)
    expect(typeof deposit).toBe("object");
    expect(deposit.time instanceof Date).toBe(true);
  });

  it("should deposit the input amount", () => {
    const account = accountGenerator(100);
    const originalBalance = account.getBalance();
    account.deposit(50);
    const newBalance = account.getBalance();

    expect(originalBalance).toEqual(100);
    expect(newBalance).toEqual(150)
  })

  it("should have a method 'transactionHistory' that returns the last 'n' withdrawals and deposits", () => {
    const account = accountGenerator(100);
    account.deposit(45);
    account.deposit(90);
    account.withdraw(100);
    account.withdraw(1000);
    const history = account.transactionHistory(3);

    expect(typeof account.transactionHistory).toBe("function");
    expect(Array.isArray(history)).toBe(true);
    expect(typeof history[0]).toBe("object");
    expect(history.length).toEqual(3);
  });
});
