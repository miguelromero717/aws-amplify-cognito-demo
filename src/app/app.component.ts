import { Component } from '@angular/core';

import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';

Amplify.configure(awsconfig);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'aws-amplify-demo';
}
