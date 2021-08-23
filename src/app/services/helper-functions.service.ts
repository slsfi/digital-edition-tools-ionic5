import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperFunctionsService {

  constructor() { }

  // https://github.com/helyo-world/fuzzysearch-ts
  fuzzysearch (needle: string, haystack: string) {
    const hlen = haystack.length;
    const nlen = needle.length;
    if (nlen > hlen) {
      return false;
    }
    if (nlen === hlen) {
      return needle === haystack;
    }
    outer: for (var i = 0, j = 0; i < nlen; i++) {
      var nch = needle.charCodeAt(i);
      while (j < hlen) {
        if (haystack.charCodeAt(j++) === nch) {
          continue outer;
        }
      }
      return false;
    }
    return true;
  }
}
