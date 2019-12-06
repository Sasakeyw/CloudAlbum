import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.scss']
})
export class HamburgerMenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  // logout() {
  //   // ログイン情報を削除する
  //   localStorage.removeItem('dsLoginUser');
  // }

}
