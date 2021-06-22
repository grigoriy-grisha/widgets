import { NextSubscription } from "./NextSubscription";

export class NextSubject {
  constructor() {
    this.observables = [];
  }

  subscribe(next) {
    const subscribe = new NextSubscription(next);
    this.observables.push(subscribe);
    return subscribe;
  }

  next(value) {
    this.observables.forEach((observable) => observable.next(value));
  }
}
