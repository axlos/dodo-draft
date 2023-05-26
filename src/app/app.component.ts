import { Component, Inject, OnInit } from '@angular/core';
import { NB_WINDOW, NbMenuService } from '@nebular/theme';
import { filter, map } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  public items = [
    {title: 'Buy Credits'},
    {title: 'Logout'},
  ];

  constructor(
    private nbMenuService: NbMenuService,
    @Inject(NB_WINDOW) private window: Window,
  ) {
  }

  ngOnInit() {
    this.nbMenuService.onItemClick()
      .pipe(
        filter(({tag}) =>
          tag === 'my-context-menu'),
        map(({item: {title}}) =>
          title
        ),
      )
      .subscribe(title =>
        console.log(`${title} was clicked!`)
      );
  }
}
