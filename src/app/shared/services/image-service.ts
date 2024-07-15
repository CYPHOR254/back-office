import { HttpClient } from '@angular/common/http';
import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root',
})

export class ImageService {
  constructor(private http: HttpClient) {}

  getImageAsBlob() {
    return this.http.get('/assets/img/offer_letter.png', { responseType: 'blob' });
  }

  getImageAsArrayBuffer() {
    return this.http.get('/assets/img/offer_letter.png', { responseType: 'arraybuffer' });
  }

  arrayBufferToBlob(arrayBuffer: ArrayBuffer, mimeType: string): Blob {
    return new Blob([arrayBuffer], { type: mimeType });
  }


}
