import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class XmlParserService {

  private apiUrlPath: string;

  constructor(private http: HttpClient) {
    this.apiUrlPath = environment.api_url_path;
  }

  public getFile( projectName: string, fullFilePath: string ) {
    return this.http.get<any>(environment.api_url + '/' + this.apiUrlPath + '/' + projectName + '/get_file/by_path/' + fullFilePath);
  }

  public getXMLOccurrences ( xmlDocument: XMLDocument, types: Array<string> ) {
    const occRowData = [];

    types.forEach( type => {
      // store the types in an array
      occRowData[type] = [];
      const xmlNodes = [];
      // set the xpath to fetch
      const xpath = environment.selector_configurations[type].elementsXPath;
      // Get the nodes using XPath defined in configuration (environment)
      const xp: XPathResult = xmlDocument.evaluate(xpath, xmlDocument.documentElement,
        null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);

      let node: Element = xp.iterateNext() as Element;
      while (node) {
        xmlNodes.push(node);
        node = xp.iterateNext() as Element;
      }

      xmlNodes.forEach(element => {
        if ( element.parentElement !== undefined && element.parentElement.parentElement !== undefined ) {
          if ( element.parentElement.nodeName === 'titleStmt' ) {
            // continue
            return;
          }
        }
        let id = element.getAttribute(environment.selector_configurations[type].attribute);
        if (id === null) {
          id = '';
        }
        occRowData[type].push({
          occurence: element.textContent, section: element.parentElement.textContent.substring(0, 50),
          id: id, saved: ((id==='') ? false: true)
        });
      });
    });
    return occRowData;
  }

  public b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode(parseInt(p1, 16))
    }))
  }

  // Decoding base64 ⇢ UTF8
  public b64DecodeUnicode(str) {
    return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
        // Remove possible BOM from start of string
        if (c.charCodeAt(0) === 0xFEFF) {
          c = c.substr(1);
        }
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
  }
}
