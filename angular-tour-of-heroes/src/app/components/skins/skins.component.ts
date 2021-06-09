import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { SkinService } from '../../service/skin/skin.service'
import { Skin } from '../../model/skin';
import { MessageService, ConfirmationService } from 'primeng/api';
import { SKINTYPE } from '../../data/skin-type';
import { SkinType } from '../../model/skinType';
import { switchMap, tap } from 'rxjs/operators';
import { pipe, Subject, Observable } from 'rxjs';
import { map } from 'jquery';
import { SKINS } from 'src/app/data/mock-skins';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-skins',
  templateUrl: './skins.component.html',
  styleUrls: ['./skins.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class SkinsComponent implements OnInit {

  skins: Skin[];
  cols: any[];
  selectedskins: Skin[];
  totalSkin = 0;
  skinTypes = SKINTYPE;
  showDialog = false;
  txtHeader: string;
  skinChosen: Skin;
  typeDialog = 0;

  constructor(
    private skinService: SkinService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.getSkins();
    this.cols = [
      { field: 'nameHero', header: 'Hero Name', width: '16%' },
      { field: 'img', header: 'Image', width: '18%' },
      { field: 'name', header: 'Skin Name', width:'16%' },
      { field: 'price', header: 'Price(RP)', width: '15%' },
      { field: 'type', header: 'Type', width: '19%' }
    ];
  }

  addSingleNotify(stt, title, content) {
    this.messageService.add({ severity: stt, summary: title, detail: content, life: 2000 });
  }
  clear() {
    this.messageService.clear();
  }
  checkImg(url) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  onFilterData(event) {
    this.totalSkin = event.filteredValue.length;
  }
  paginate(event, tb) {
    var element = document.querySelector(".p-card-body");
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  getSkins(): void {
    this.skinService.getSkins()
      .subscribe(skins => (this.skins = skins,this.totalSkin = skins.length));
  }
  deleteSelectedSkins(event) {
    if (event.currentTarget.getAttribute("ng-reflect-disabled") != "true") {
      this.confirmationService.confirm({
        header: 'Delete Selected Skins',
        message: `Are you sure that you want to delete selected skins?`,
        accept: () => {
          for (let i = 0; i < this.selectedskins.length; i++) {
            this.skinService.deleteSkin(this.selectedskins[i].id, () => {
              this.skins = this.skins.filter(s => s != this.selectedskins[i]);
              if (i == this.selectedskins.length - 1) {
                this.selectedskins = [];
                this.addSingleNotify("success", "Successful", "Skin Deleted");
              }
            });
          }
        }
      });
    }
  }
  editSkin(val) {
    this.showDialog = true;
    this.txtHeader = "New Skin";
    this.skinChosen = val;
    this.typeDialog = 1;
  }
  deleteSkin(val) {
    this.confirmationService.confirm({
      header: 'Delete Skin',
      message: `Are you sure that you want to delete ` + val.name.bold() +` skin?`,
      accept: () => {
        this.skins = this.skins.filter(s => s != val);
        this.skinService.deleteSkin(val.id, () => {
          this.addSingleNotify("success", "Successful", "Skin Deleted");
        });
      }
    });
  }
  onNewSkin() {
    this.showDialog = true;
    this.txtHeader = "Skin Detail";
    this.skinChosen = {
      name: "",
      nameHero: "",
      price: 1,
      type: "",
      img: ""
    };
    this.typeDialog = 0;
  }
  onHideDialog(val) {
    this.showDialog = val;
  }
  addNewSkin(val) {
    this.skins.unshift(val);
    this.addSingleNotify("success", "Successful", "Add new skin success");
    this.totalSkin = this.skins.length;
  }
}
