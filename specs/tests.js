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

  it("should have some tests", () => {
    expect(false).toBeTruthy();
  });
});
