function fizzbuzz() {
  for (let n = 1; n <= 151; n++) {
    if (n % 3 === 0) {
      console.log("Fizz");
    }
    if (n % 5 === 0) {
      console.log("Buzz");
    }
    if (n % 3 === 0 && n % 5 === 0) {
      console.log("FizzBuzz");
    } else {
      console.log(n);
    }
  }
}

fizzbuzz();
