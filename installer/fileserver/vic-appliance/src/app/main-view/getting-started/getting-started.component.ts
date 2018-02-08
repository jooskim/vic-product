import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-getting-started',
  templateUrl: './getting-started.component.html',
  styleUrls: ['./getting-started.component.scss']
})
export class GettingStartedComponent implements OnInit {
  @Input() admiralAddr: string;
  @Input() fileServerAddr: string;

  constructor() { }

  ngOnInit() {
  }

}
