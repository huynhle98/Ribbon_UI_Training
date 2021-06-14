import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { SkinService } from '../../service/skin/skin.service'
import { Skin } from '../../model/skin';
import { MessageService, ConfirmationService } from 'primeng/api';
import { SKINTYPE } from '../../data/skin-type';
import { SkinType } from '../../model/skinType';
import { SKINS } from 'src/app/data/mock-skins';
import { DomSanitizer } from '@angular/platform-browser';
import { TransferService } from '../../service/transfer/transfer.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

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
  skinTypes = SKINTYPE;
  showDialog = false;
  txtHeader: string;
  skinChosen: Skin;
  typeDialog = 0;
  skinsFile: Skin[];
  lazyUpload = false;

  constructor(
    private skinService: SkinService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private sanitizer: DomSanitizer,
    private transferService: TransferService
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

  addSingleNotify(stt, title, content, time?: number) {
    if (time != undefined) {
      this.messageService.add({ severity: stt, summary: title, detail: content, life: time });
    }
    else {
      this.messageService.add({ severity: stt, summary: title, detail: content, life: 2000 });
    }
  }
  clear() {
    this.messageService.clear();
  }
  checkImg(url) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  onFilterData(event) {
    // this.totalSkin = event.filteredValue.length;
  }
  paginate(event, tb) {
    var element = document.querySelector(".p-card-body");
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  getSkins(): void {
    this.skinService.getSkins()
      .subscribe(skins => (this.skins = skins.reverse()));
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
            }).subscribe();
          }
        }
      });
    }
  }
  editSkin(val) {
    this.showDialog = true;
    this.txtHeader = "Skin Detai";
    this.skinChosen = val;
    this.typeDialog = 1;
  }
  deleteSkin(val) {
    this.confirmationService.confirm({
      header: 'Delete Skin',
      message: `Are you sure that you want to delete ` + val.name.bold() +` skin?`,
      accept: () => {

        // this.skinService.deleteSkin
        this.skinService.deleteSkin(val.id, () => {
          this.skins = this.skins.filter(s => s != val);
          this.addSingleNotify("success", "Successful", "Skin Deleted");
        }).subscribe();
      }
    });
  }
  onNewSkin() {
    this.showDialog = true;
    this.txtHeader = "New Skin";
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
  }
  updateSkin(val) {
    this.addSingleNotify("success", "Successful", "Update skin success");
  }
  exportExcel() {
    this.transferService.exportExcel(this.skins);
  }
  onImportFile(val, iFile) {
    var self = this;
    if (val.currentFiles[0]) {
      this.confirmationService.confirm({
        header: 'Upload data',
        message: `Do you want to upload data to table?`,
        accept: () => {
          self.lazyUpload = true;
          setTimeout(() => {
            self.transferService.uploadFileExcel(iFile, (e) => {
              self.callbackUpload(e, iFile);
            });
          }, 2000);
          setTimeout(() => {
            if (self.lazyUpload) {
              self.lazyUpload = false;
            }
           },5000);
        },
        reject: () => {
          iFile.clear();
        }
      });
    }
    else {
      if (val.files[0]) {
        this.addSingleNotify("error", "Error", "Invalid file type. Allow: .xlsx, .xls", 5000);
      }
    }
  }
  callbackUpload(data, tb) {
    var self = this;
    self.skinsFile = data as Skin[];
    self.skinsFile.forEach(el => {
      if (this.skins.length > 0) {
        el.id = null;
      }
      self.skinService.addSkin(el as Skin).subscribe(
        skin => {
          self.skins.unshift(skin);
        }
      )
    });
    tb.clear();
    self.skinsFile = [];
    self.lazyUpload = false;
    self.addSingleNotify("success", "Successful", "Upload file success");
  }
  resetTable(tb) {
    tb.clear();
  }
  onSearchTable(tb, e) {
    tb.filterGlobal(e.target.value, 'contains');
  }
}
