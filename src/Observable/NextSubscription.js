export class NextSubscription {
  constructor(next) {
    this.nextFunc = next;
  }

  next(value) {
    this.nextFunc(value);
  }
}
