// tests/test-styles.js

import { expect } from 'https://cdn.jsdelivr.net/npm/chai@5.1.1/chai.js';

class ConsoleReporter {
  constructor(runner) {
    this.total = 0;
    this.passed = 0;
    this.failed = 0;

    runner.on('test', () => {
      this.total++;
    });

    runner.on('pass', (test) => {
      this.passed++;
    });

    runner.on('fail', (test, err) => {
      this.failed++;
      console.error(`FAIL: ${test.fullTitle()}\n  ${err.message}`);
    });

    runner.on('end', () => {
      console.log(`\nTest run complete. Total: ${this.total}, Passed: ${this.passed}, Failed: ${this.failed}`);
    });
  }
}

// Setup mocha inside this file
mocha.setup({ ui: 'bdd', reporter: ConsoleReporter });

describe('Math operations', function () {
  it('should add positive numbers correctly', function () {
    expect(2 + 3).to.equal(5);
  });

  it('should fail for incorrect addition', function () {
    expect(2 + 2).to.equal(5);
  });
});

// Run tests after definitions
mocha.run();
