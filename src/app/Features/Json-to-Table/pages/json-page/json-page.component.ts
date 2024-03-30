import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Auth/services/auth.service';

@Component({
  selector: 'app-json-page',
  templateUrl: './json-page.component.html',
  styleUrls: ['./json-page.component.scss'],
})
export class JsonPageComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
  signOut() {
    this.authService.logout();
  }
}
