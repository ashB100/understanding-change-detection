import { Component, NgZone } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // the expression is evaluated by CD, compared to previous value
  // and if there's a change the DOM is updated, then the expression
  // is evaluated again, if the value is different this time, it gives
  // the changed after checked error. Date.now() will be different on
  // the second evaluation from the first.

  // get time() {
  //   return Date.now();
  // }

  // Since the second check is done synchronouly, updating the time
  // asynchronously should cause the expression to not change on the
  // second check.
  // ... but setTimeout causes change detection causing an infinite loop
  // of change detection.
  get time() {
    return this._time;
  }
  _time;

  // constructor() {
  //   this._time = Date.now();
  //
  //   setInterval(() => {
  //     // updated asynchronously
  //     this._time = Date.now();
  //   }, 1);
  // }

  constructor(zone: NgZone) {
    this._time = Date.now();

    zone.runOutsideAngular(() => {
      setInterval(() => {
        this._time = Date.now();
      });
    });
  }
}
