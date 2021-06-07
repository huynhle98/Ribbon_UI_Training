import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { SkinService } from '../../service/skin/skin.service'
import { Skin } from '../../model/skin';

@Component({
  selector: 'app-skins',
  templateUrl: './skins.component.html',
  styleUrls: ['./skins.component.css']
})
export class SkinsComponent implements OnInit {

  skins: Skin[];
  cols: any[];
  constructor(
    private skinService: SkinService
  ) { }

  ngOnInit() {
    this.getHeroes();
    console.log(this.skins);
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Name Skin' },
      { field: 'nameHero', header: 'Name Hero' },
      { field: 'price', header: 'Price' },
      { field: 'type', header: 'Type' }
    ];
  }

  getHeroes(): void {
    this.skinService.getSkins()
      .subscribe(skins => (this.skins = skins));
  }
}
