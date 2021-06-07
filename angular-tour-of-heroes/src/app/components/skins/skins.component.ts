import { Component, OnInit } from '@angular/core';
// import { TableModule } from 'primeng/table';
import { SkinService } from '../../service/skin/skin.service'
import { Skin } from '../../model/skin';

@Component({
  selector: 'app-skins',
  templateUrl: './skins.component.html',
  styleUrls: ['./skins.component.css']
})
export class SkinsComponent implements OnInit {

  skins: Skin[];

  constructor(
    private skinService: SkinService
  ) { }

  ngOnInit() {
    this.getHeroes();
    console.log(this.skins);
  }

  getHeroes(): void {
    this.skinService.getSkins()
      .subscribe(skins => (this.skins = skins));
  }
}
