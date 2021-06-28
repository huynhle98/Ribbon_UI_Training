import { RestService } from 'rbn-common-lib';
import { Injectable } from '@angular/core';
import { HOST, VERSION } from '../api/constant';

@Injectable({
  providedIn: 'root'
})
export class GetMessagesService {

  constructor(private restService: RestService) { }

  getSystemMessage() {
    const url = `${HOST}/${VERSION}/gui/events/system`;
    return this.restService.get(url);
  }

  getOrchestrationMessage() {
    const url = `${HOST}/${VERSION}/gui/events/orchestration`;
    return this.restService.get(url);
  }
}
