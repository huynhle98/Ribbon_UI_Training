import { Component, OnInit, Input, Output, EventEmitter, SimpleChange } from '@angular/core';
import { Skin } from '../../model/skin';
import { SKINTYPE } from '../../data/skin-type';
import { HEROES } from '../../data/mock-heroes';
import { DomSanitizer } from '@angular/platform-browser';
import { SkinService } from '../../service/skin/skin.service';
@Component({
  selector: 'app-skin-dialog',
  templateUrl: './skin-dialog.component.html',
  styleUrls: ['./skin-dialog.component.css']
})
export class SkinDialogComponent implements OnInit {

  @Input() showDialog: Boolean;
  @Input() skin: Skin;
  @Input() txtHeader: string;
  @Input() typeDialog: Number;
  @Output() hideDialog = new EventEmitter<any>();
  @Output() newSkin = new EventEmitter<any>();

  submitted = false;
  skinTypes = SKINTYPE;
  heroes = HEROES;
  constructor(
    private sanitizer: DomSanitizer,
    private skinService: SkinService
  ) {
    this.skinTypes.reverse();
    this.convertData();
   }

  ngOnInit(): void {
    if (this.skin == undefined) {
      this.initData();
    }
    else {
      this.skin.name.toLowerCase();
    }
  }
  ngOnChanges(changes: SimpleChange) {
    if (this.skin != undefined) {
      this.skin.type = this.skin.type.toLowerCase();
      this.skin.nameHero = this.skin.nameHero.toLowerCase();
    }
  }
  initData() {
    this.skin = {
      name: "",
      nameHero: "",
      price: 1,
      type: "",
      img: ""
    }
  }
  convertData() {
    var data = this.heroes;
    for (let i = 0; i < data.length; i++){
      data[i]['value'] = data[i].name.toLowerCase();
      data[i]['label'] = data[i].name.charAt(0).toUpperCase() + data[i].name.slice(1) ;
    }
    this.heroes = data;
  }
  onSave() {
    this.submitted = true;
    if (this.typeDialog == 0) {
      this.skin.name = this.skin.name.charAt(0).toUpperCase() + this.skin.name.slice(1);
      this.skin.nameHero = this.skin.nameHero.charAt(0).toUpperCase() + this.skin.nameHero.slice(1);
      this.skin.type = this.skin.type.charAt(0).toUpperCase() + this.skin.type.slice(1);
      this.skinService.addSkin(this.skin as Skin).subscribe(
        skin => {
          this.newSkin.emit(skin);
          this.hideDialog.emit(false);
        }
      )
    }
  }
  onCancel() {
    this.hideDialog.emit(false);
  }
  checkImg(url) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  onChangeImg(event) {
    let f = event.currentTarget.files;
    if (f[0]) {
      this.skin.img = URL.createObjectURL(f[0]) as string;
    }
  }
}
