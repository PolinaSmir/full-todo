function* myGenerator() {
  ///
  yield 1;
  ///
  yield 2;
  ///
  yield 3;
}

const gen = myGenerator();
console.log(gen);

function* mySecondGenerator(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

const gen2 = mySecondGenerator(1, 5);

function* myThirdGenerator() {
  let value = yield;
  console.log(value);
}

const gen3 = myThirdGenerator();

const numbers = [1, 2, 3, 4, 5];

const iterator = numbers[Symbol.iterator]();

// Custom iterator

const myIterator = {
  data: [1, 2, 3, 4, 5],
  currentIndex: 0,
  next() {
    if (this.currentIndex < this.data.length) {
      return {
        value: this.data[this.currentIndex++],
        done: false,
      };
    } else {
      return {
        value: undefined,
        done: true,
      };
    }
  },
};

function* generatorOneHundred() {
  let sum = 0;
  for (let i = 0; i <= 100; i++) {
    yield i;
    sum += i;
  }

  return sum;
}

const genOneHundred = generatorOneHundred();
