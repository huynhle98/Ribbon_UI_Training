import { DomSanitizer } from '@angular/platform-browser';

export class formatter {
  constructor(private sanitizer: DomSanitizer) {
  }
  checkImg(url) {
    console.log(typeof url, url)
    if (url != "undefined") {
      return this.sanitizer.bypassSecurityTrustUrl(url);
    }
    return;
  }
}
