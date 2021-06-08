import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { SkinService } from '../../service/skin/skin.service'
import { Skin } from '../../model/skin';
import { MessageService, ConfirmationService } from 'primeng/api';

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

  constructor(
    private skinService: SkinService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.getSkins();
    this.cols = [
      { field: 'nameHero', header: 'Hero Name', width: '16%' },
      { field: 'img', header: 'Image', width: '18%' },
      { field: 'name', header: 'Skin Name', width:'16%' },
      { field: 'price', header: 'Price(RP)', width: '15%' },
      { field: 'type', header: 'Type', width: '15%' }
    ];
  }

  onFilterData(event) {
    this.totalSkin = event.filteredValue.length;
  }
  paginate(event) {
    var element = document.querySelector(".p-card-body");
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  addSingleNotify(stt, title, content) {
    this.messageService.add({ severity: stt, summary: title, detail: content, life: 2000 });
  }
  clear() {
    this.messageService.clear();
  }
  getSkins(): void {
    this.skinService.getSkins()
      .subscribe(skins => (this.skins = skins,this.totalSkin = skins.length));
  }
  deleteSelectedSkins() {
    console.log(this.selectedskins);
    this.addSingleNotify("success", "Successful","Skins Deleted");
  }
  editSkin(val) {
    console.log(val);
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
}
