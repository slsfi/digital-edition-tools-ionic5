import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TocItem } from 'src/app/models/toc';
import { Publication } from 'src/app/models/publication';
import Handsontable from 'handsontable';

export interface DropInfo {
  targetId: string;
  action?: string;
}

@Component({
  selector: 'app-toc-grid',
  templateUrl: './toc-grid.component.html',
  styleUrls: ['./toc-grid.component.scss'],
})

export class TocGridComponent implements OnInit {

  @ViewChild("toc_table") toc_table: ElementRef;

  public dataTable: Handsontable;


  public tocColumns = [
    { data: 'text', readOnly: false },
    { data: 'collectionId', readOnly: false },
    { data: 'itemId', readOnly: false },
    { data: 'type', readOnly: false },
    { data: 'date', readOnly: false },
    { data: 'url', readOnly: false },
    { data: 'collapsed', readOnly: false }
  ];

  constructor() {

  }
  ngOnInit() {
    console.log(this.toc_table)
    if (this.toc_table) {
      console.log(this.toc_table.nativeElement.getBoundingClientRect())
    }
  };

  ngAfterViewInit() {
    this.createDataTable();
    console.log(this.toc_table)
    if (this.toc_table) {
      console.log(this.toc_table.nativeElement.getBoundingClientRect())
    }
  };

  ionViewDidEnter() {
    console.log(this.toc_table)
    if (this.toc_table) {
      console.log(this.toc_table.nativeElement.getBoundingClientRect())
    }
  };


  createDataTable () {
    const toc_table = this.toc_table.nativeElement;
    const __parent = this;
    this.dataTable = new Handsontable(this.toc_table.nativeElement, {
      data: [],
      columns: this.tocColumns,
      colHeaders: ['Text', 'Collection Id', 'Item id', 'Type', 'Date', 'Url', 'Collapsed?'],
      columnSorting: false,
      rowHeaders: true,
      contextMenu: true,
      stretchH: 'all',
      nestedRows: true,
      width: '100%',
      height: '100vh',
      filters: false,
      dropdownMenu: true,
      allowInsertColumn: false,
      manualColumnMove: true,
      manualColumnResize: true,
      rowHeaderWidth: 80,
      hiddenColumns: {
        columns: [],
        indicators: true
      },
      licenseKey: 'non-commercial-and-evaluation',
      afterChange: function (change, source) {
      },
      afterCreateRow: function (index, amount, source?) {

      },
      afterAddChild: function (parent, element, index?) {
      }
    });
    this.getLocations();
  }

  async getLocations() {
    const projectName = localStorage.getItem('selectedProjectName');
    this.dataTable.loadData(this.transform(this.tmpToc));
    this.dataTable.refreshDimensions();
  }

  /** Only works if we don't have any properties named 'children' */
  public transform(node) {
    const s = JSON.stringify(node);
    const t = s.replace(/"children"/g, '"__children"');
    return JSON.parse(t);
  }

  public tmpToc = [{
    "text": "Dagb\u00f6cker",
    "collectionId": "218",
    "type": "title",
    "children": [{
        "date": "",
        "text": 1832,
        "type": "subtitle",
        "url": "",
        "children": [{
            "date": "1832-10-00",
            "text": "Oktober",
            "type": "est",
            "url": "",
            "itemId": "218_20230_ch2"
        }, {
            "date": "1832-11-00",
            "text": "November",
            "type": "est",
            "url": "",
            "itemId": "218_20230_ch3"
        }, {
            "date": "1832-12-00",
            "text": "December",
            "type": "est",
            "url": "",
            "itemId": "218_20230_ch4"
        }],
        "itemId": ""
    }, {
        "date": "",
        "text": 1833,
        "type": "subtitle",
        "url": "",
        "children": [{
            "date": "",
            "text": "Dagbok. F\u00f6r \u00e5r 1833. Helsingfors Den 7 Januarii 1833.",
            "type": "subtitle",
            "url": "",
            "children": [{
                "date": "",
                "text": "Januari",
                "type": "est",
                "url": "",
                "itemId": "218_20231_ch2"
            }, {
                "date": "",
                "text": "Februari (\u201317.)",
                "type": "est",
                "url": "",
                "itemId": "218_20231_ch3"
            }],
            "itemId": ""
        }, {
            "date": "",
            "text": "Journal. Februarii, Martii. Andra Afdelningen af \u00e5r 1833. Tredje h\u00e4ftet. Helsingfors Den 21 Februarii 1833.",
            "type": "subtitle",
            "url": "",
            "children": [{
                "date": "",
                "text": "Februari (18.\u2013)",
                "type": "est",
                "url": "",
                "itemId": "218_20231_ch4"
            }, {
                "date": "",
                "text": "Mars (\u201328.)",
                "type": "est",
                "url": "",
                "itemId": "218_20231_ch5"
            }],
            "itemId": ""
        }, {
            "date": "",
            "text": "Journal f\u00f6r Martii, April och Maji M\u00e5nader. 4. H\u00e4ftet. 7de och 8de M\u00e5naderne. 1833. Helsingfors Den 1 April 1833.",
            "type": "subtitle",
            "url": "",
            "children": [{
                "date": "",
                "text": "Mars (28.\u2013)",
                "type": "est",
                "url": "",
                "itemId": "218_20231_ch6"
            }, {
                "date": "",
                "text": "April",
                "type": "est",
                "url": "",
                "itemId": "218_20231_ch7"
            }, {
                "date": "",
                "text": "Maj",
                "type": "est",
                "url": "",
                "itemId": "218_20231_ch8"
            }],
            "itemId": ""
        }, {
            "date": "",
            "text": "Oafbruten Journal. f\u00f6r Junii, Julii och Augusti M\u00e5nader af \u00e5ret 1833. B\u00f6rjad den 1. Junii 1833 uti Helsingfors. Femte H\u00e4ftet.",
            "type": "subtitle",
            "url": "",
            "children": [{
                "date": "",
                "text": "Juni",
                "type": "est",
                "url": "",
                "itemId": "218_20231_ch9"
            }, {
                "date": "",
                "text": "Juli",
                "type": "est",
                "url": "",
                "itemId": "218_20231_ch10"
            }, {
                "date": "",
                "text": "Augusti",
                "type": "est",
                "url": "",
                "itemId": "218_20231_ch11"
            }],
            "itemId": ""
        }, {
            "date": "",
            "text": "Oafbruten Journal. f\u00f6r September, October, November och December M\u00e5nader af \u00e5ret 1833. B\u00f6rjad i NyCarleby Den 1. September 1833. Siette H\u00e4ftet.",
            "type": "subtitle",
            "url": "",
            "children": [{
                "date": "",
                "text": "September",
                "type": "est",
                "url": "",
                "itemId": "218_20231_ch12"
            }, {
                "date": "",
                "text": "Oktober",
                "type": "est",
                "url": "",
                "itemId": "218_20231_ch13"
            }, {
                "date": "",
                "text": "November",
                "type": "est",
                "url": "",
                "itemId": "218_20231_ch14"
            }, {
                "date": "",
                "text": "December",
                "type": "est",
                "url": "",
                "itemId": "218_20231_ch15"
            }],
            "itemId": ""
        }],
        "itemId": ""
    }, {
        "date": "",
        "text": 1834,
        "type": "subtitle",
        "url": "",
        "children": [{
            "date": "",
            "text": "Journal F\u00f6r Januarii, Februarii, Martiii och Aprill M\u00e5nader af \u00e5ret 1834. 7 H\u00e4ftet.",
            "type": "subtitle",
            "url": "",
            "children": [{
                "date": "",
                "text": "Januari",
                "type": "est",
                "url": "",
                "itemId": "218_20232_ch2"
            }, {
                "date": "",
                "text": "Februari",
                "type": "est",
                "url": "",
                "itemId": "218_20232_ch3"
            }, {
                "date": "",
                "text": "Mars",
                "type": "est",
                "url": "",
                "itemId": "218_20232_ch4"
            }, {
                "date": "",
                "text": "April",
                "type": "est",
                "url": "",
                "itemId": "218_20232_ch5"
            }],
            "itemId": ""
        }, {
            "date": "",
            "text": "Iournal. 8 H\u00e4ftet f\u00f6r Maj och Juni M\u00e5nader 1834. Helsingfors, Orisberg & Nykarleby.",
            "type": "subtitle",
            "url": "",
            "children": [{
                "date": "",
                "text": "Maj",
                "type": "est",
                "url": "",
                "itemId": "218_20232_ch6"
            }, {
                "date": "",
                "text": "Juni",
                "type": "est",
                "url": "",
                "itemId": "218_20232_ch7"
            }],
            "itemId": ""
        }, {
            "date": "",
            "text": "Dagbok under Julii, Augusti, September M\u00e5nader Anno 1834. Kudnis.",
            "type": "subtitle",
            "url": "",
            "children": [{
                "date": "",
                "text": "Juli",
                "type": "est",
                "url": "",
                "itemId": "218_20232_ch8"
            }, {
                "date": "",
                "text": "Augusti",
                "type": "est",
                "url": "",
                "itemId": "218_20232_ch9"
            }, {
                "date": "",
                "text": "September (\u201318.)",
                "type": "est",
                "url": "",
                "itemId": "218_20232_ch10"
            }],
            "itemId": ""
        }, {
            "date": "",
            "text": "Oafbruten Dagbok. Fr\u00e5n och med den 19 September 1834 till och med \u00e5rets slut. Helsingfors den 27 Sept. 1834.",
            "type": "subtitle",
            "url": "",
            "children": [{
                "date": "",
                "text": "September (19.\u2013)",
                "type": "est",
                "url": "",
                "itemId": "218_20232_ch11"
            }, {
                "date": "",
                "text": "Oktober",
                "type": "est",
                "url": "",
                "itemId": "218_20232_ch12"
            }, {
                "date": "",
                "text": "November",
                "type": "est",
                "url": "",
                "itemId": "218_20232_ch13"
            }, {
                "date": "",
                "text": "December",
                "type": "est",
                "url": "",
                "itemId": "218_20232_ch14"
            }],
            "itemId": ""
        }],
        "itemId": ""
    }, {
        "date": "",
        "text": 1835,
        "type": "subtitle",
        "url": "",
        "children": [{
            "date": "",
            "text": "Dagbok. 1835. 1:sta afd. NyCarleby & Helsingfors. & Ule\u00e5borg.",
            "type": "subtitle",
            "url": "",
            "children": [{
                "date": "",
                "text": "Januari",
                "type": "est",
                "url": "",
                "itemId": "218_20237_ch2"
            }, {
                "date": "",
                "text": "Februari",
                "type": "est",
                "url": "",
                "itemId": "218_20237_ch3"
            }, {
                "date": "",
                "text": "Mars",
                "type": "est",
                "url": "",
                "itemId": "218_20237_ch4"
            }, {
                "date": "",
                "text": "April",
                "type": "est",
                "url": "",
                "itemId": "218_20237_ch5"
            }],
            "itemId": ""
        }, {
            "date": "",
            "text": "Dagbok \u00e5r 1835. H\u00e4ftet 2. NyCarleby & Kudnis",
            "type": "subtitle",
            "url": "",
            "children": [{
                "date": "",
                "text": "Maj",
                "type": "est",
                "url": "",
                "itemId": "218_20237_ch6"
            }, {
                "date": "",
                "text": "Juni",
                "type": "est",
                "url": "",
                "itemId": "218_20237_ch7"
            }, {
                "date": "",
                "text": "Juli",
                "type": "est",
                "url": "",
                "itemId": "218_20237_ch8"
            }, {
                "date": "",
                "text": "Augusti",
                "type": "est",
                "url": "",
                "itemId": "218_20237_ch9"
            }],
            "itemId": ""
        }, {
            "date": "",
            "text": "D.a.g.b.o.k. 1835. 3. Ny-Carleby",
            "type": "subtitle",
            "url": "",
            "children": [{
                "date": "",
                "text": "September",
                "type": "est",
                "url": "",
                "itemId": "218_20237_ch10"
            }, {
                "date": "",
                "text": "Oktober",
                "type": "est",
                "url": "",
                "itemId": "218_20237_ch11"
            }, {
                "date": "",
                "text": "November",
                "type": "est",
                "url": "",
                "itemId": "218_20237_ch12"
            }, {
                "date": "",
                "text": "December",
                "type": "est",
                "url": "",
                "itemId": "218_20237_ch13"
            }],
            "itemId": ""
        }],
        "itemId": ""
    }, {
        "date": "",
        "text": 1836,
        "type": "subtitle",
        "url": "",
        "children": [{
            "date": "",
            "text": "Ephemeron. Z. Topelii Dagbok, Anteckningar m. m. f\u00f6r \u00e5r 1836. 6 \u00e5rg\u00e5ngen.",
            "type": "subtitle",
            "url": "",
            "children": [{
                "date": "",
                "text": "Januari",
                "type": "est",
                "url": "",
                "itemId": "218_20238_ch2"
            }],
            "itemId": ""
        }, {
            "date": "",
            "text": "Z. Topelii Dagbok 1836, Februarii M\u00e5nad.",
            "type": "subtitle",
            "url": "",
            "children": [{
                "date": "",
                "text": "Februari",
                "type": "est",
                "url": "",
                "itemId": "218_20238_ch3"
            }, {
                "date": "",
                "text": "Mars",
                "type": "est",
                "url": "",
                "itemId": "218_20238_ch4"
            }, {
                "date": "",
                "text": "April",
                "type": "est",
                "url": "",
                "itemId": "218_20238_ch5"
            }, {
                "date": "",
                "text": "Maj",
                "type": "est",
                "url": "",
                "itemId": "218_20238_ch6"
            }, {
                "date": "",
                "text": "Juni",
                "type": "est",
                "url": "",
                "itemId": "218_20238_ch7"
            }],
            "itemId": ""
        }, {
            "date": "",
            "text": "Dagbok 1836. Julii, Augusti, September, October, November, December. NyCarleby et Helsingfors. H\u00e4ftet A.",
            "type": "subtitle",
            "url": "",
            "children": [{
                "date": "",
                "text": "Juli",
                "type": "est",
                "url": "",
                "itemId": "218_20238_ch8"
            }, {
                "date": "",
                "text": "Augusti",
                "type": "est",
                "url": "",
                "itemId": "218_20238_ch9"
            }, {
                "date": "",
                "text": "September",
                "type": "est",
                "url": "",
                "itemId": "218_20238_ch10"
            }],
            "itemId": ""
        }, {
            "date": "",
            "text": "Dagbok 1836. Julii, Augusti, September, October, November, December. Helsingfors et NyCarleby. H\u00e4ftet B.",
            "type": "subtitle",
            "url": "",
            "children": [{
                "date": "",
                "text": "Oktober",
                "type": "est",
                "url": "",
                "itemId": "218_20238_ch11"
            }, {
                "date": "",
                "text": "November",
                "type": "est",
                "url": "",
                "itemId": "218_20238_ch12"
            }, {
                "date": "",
                "text": "December",
                "type": "est",
                "url": "",
                "itemId": "218_20238_ch13"
            }],
            "itemId": ""
        }],
        "itemId": ""
    }, {
        "date": "",
        "text": 1837,
        "type": "subtitle",
        "url": "",
        "children": [{
            "date": "",
            "text": "Ephemeron. MDCCCXXXVII. Dagbok 1837.",
            "type": "subtitle",
            "url": "",
            "children": [{
                "date": "",
                "text": "Januari",
                "type": "est",
                "url": "",
                "itemId": "218_20233_ch2"
            }, {
                "date": "",
                "text": "Februari",
                "type": "est",
                "url": "",
                "itemId": "218_20233_ch3"
            }, {
                "date": "",
                "text": "Mars",
                "type": "est",
                "url": "",
                "itemId": "218_20233_ch4"
            }, {
                "date": "",
                "text": "April",
                "type": "est",
                "url": "",
                "itemId": "218_20233_ch5"
            }, {
                "date": "",
                "text": "Maj",
                "type": "est",
                "url": "",
                "itemId": "218_20233_ch6"
            }, {
                "date": "",
                "text": "Juni",
                "type": "est",
                "url": "",
                "itemId": "218_20233_ch7"
            }],
            "itemId": ""
        }, {
            "date": "",
            "text": "Ephemeris. Dagbok. 1837. b. NyCarleby och Helsingfors.",
            "type": "subtitle",
            "url": "",
            "children": [{
                "date": "",
                "text": "Juli",
                "type": "est",
                "url": "",
                "itemId": "218_20233_ch8"
            }, {
                "date": "",
                "text": "Augusti",
                "type": "est",
                "url": "",
                "itemId": "218_20233_ch9"
            }, {
                "date": "",
                "text": "September",
                "type": "est",
                "url": "",
                "itemId": "218_20233_ch10"
            }, {
                "date": "",
                "text": "Oktober",
                "type": "est",
                "url": "",
                "itemId": "218_20233_ch11"
            }, {
                "date": "",
                "text": "November",
                "type": "est",
                "url": "",
                "itemId": "218_20233_ch12"
            }, {
                "date": "",
                "text": "December",
                "type": "est",
                "url": "",
                "itemId": "218_20233_ch13"
            }],
            "itemId": ""
        }],
        "itemId": ""
    }, {
        "date": "",
        "text": 1838,
        "type": "subtitle",
        "url": "",
        "children": [{
            "date": "",
            "text": "Ephemeris. Dagbok 1838. NyCarleby och Helsingfors.",
            "type": "subtitle",
            "url": "",
            "children": [{
                "date": "",
                "text": "Januari",
                "type": "est",
                "url": "",
                "itemId": "218_20234_ch2"
            }, {
                "date": "",
                "text": "Februari",
                "type": "est",
                "url": "",
                "itemId": "218_20234_ch3"
            }, {
                "date": "",
                "text": "Mars",
                "type": "est",
                "url": "",
                "itemId": "218_20234_ch4"
            }, {
                "date": "",
                "text": "April",
                "type": "est",
                "url": "",
                "itemId": "218_20234_ch5"
            }, {
                "date": "",
                "text": "Maj",
                "type": "est",
                "url": "",
                "itemId": "218_20234_ch6"
            }, {
                "date": "",
                "text": "Juni",
                "type": "est",
                "url": "",
                "itemId": "218_20234_ch7"
            }, {
                "date": "",
                "text": "Juli",
                "type": "est",
                "url": "",
                "itemId": "218_20234_ch8"
            }, {
                "date": "",
                "text": "Augusti",
                "type": "est",
                "url": "",
                "itemId": "218_20234_ch9"
            }],
            "itemId": ""
        }, {
            "date": "",
            "text": "Ephemeris. Dagbok 1838. H: 2. September, October, November, December 1838. NyCarleby.",
            "type": "subtitle",
            "url": "",
            "children": [{
                "date": "",
                "text": "September",
                "type": "est",
                "url": "",
                "itemId": "218_20234_ch10"
            }, {
                "date": "",
                "text": "Oktober",
                "type": "est",
                "url": "",
                "itemId": "218_20234_ch11"
            }, {
                "date": "",
                "text": "November",
                "type": "est",
                "url": "",
                "itemId": "218_20234_ch12"
            }, {
                "date": "",
                "text": "December",
                "type": "est",
                "url": "",
                "itemId": "218_20234_ch13"
            }],
            "itemId": ""
        }],
        "itemId": ""
    }, {
        "date": "",
        "text": 1839,
        "type": "subtitle",
        "url": "",
        "children": [{
            "date": "",
            "text": "Ephemeris 1839. W\u00e5r och Winter. H: 1. NyCarleby 1839. Helsingfors.",
            "type": "subtitle",
            "url": "",
            "children": [{
                "date": "",
                "text": "Januari",
                "type": "est",
                "url": "",
                "itemId": "218_20235_ch2"
            }, {
                "date": "",
                "text": "Februari",
                "type": "est",
                "url": "",
                "itemId": "218_20235_ch3"
            }, {
                "date": "",
                "text": "Mars",
                "type": "est",
                "url": "",
                "itemId": "218_20235_ch4"
            }, {
                "date": "",
                "text": "April",
                "type": "est",
                "url": "",
                "itemId": "218_20235_ch5"
            }],
            "itemId": ""
        }, {
            "date": "",
            "text": "Anno. Post. Christum. Natum. MDCCCXL. 1839. Ephemeris. Tolfte \u00c5rg\u00e5ngen. H. 2.",
            "type": "subtitle",
            "url": "",
            "children": [{
                "date": "",
                "text": "Maj",
                "type": "est",
                "url": "",
                "itemId": "218_20235_ch6"
            }, {
                "date": "",
                "text": "Juni",
                "type": "est",
                "url": "",
                "itemId": "218_20235_ch7"
            }, {
                "date": "",
                "text": "Juli",
                "type": "est",
                "url": "",
                "itemId": "218_20235_ch8"
            }, {
                "date": "",
                "text": "Augusti",
                "type": "est",
                "url": "",
                "itemId": "218_20235_ch9"
            }, {
                "date": "",
                "text": "September",
                "type": "est",
                "url": "",
                "itemId": "218_20235_ch10"
            }, {
                "date": "",
                "text": "Oktober",
                "type": "est",
                "url": "",
                "itemId": "218_20235_ch11"
            }, {
                "date": "",
                "text": "November",
                "type": "est",
                "url": "",
                "itemId": "218_20235_ch12"
            }, {
                "date": "",
                "text": "December",
                "type": "est",
                "url": "",
                "itemId": "218_20235_ch13"
            }],
            "itemId": ""
        }],
        "itemId": ""
    }, {
        "date": "",
        "text": 1840,
        "type": "subtitle",
        "url": "",
        "children": [{
            "date": "",
            "text": "Anno Post Christum Natum MDCCCXL. 1840. Ephemeris. Decennium III. Lustrum V. Trettonde \u00c5rg\u00e5ngen. H. 1. Helsingfors \u2013 NyCarleby.",
            "type": "subtitle",
            "url": "",
            "children": [{
                "date": "",
                "text": "Januari",
                "type": "est",
                "url": "",
                "itemId": "218_20236_ch2"
            }, {
                "date": "",
                "text": "Februari",
                "type": "est",
                "url": "",
                "itemId": "218_20236_ch3"
            }, {
                "date": "",
                "text": "Mars",
                "type": "est",
                "url": "",
                "itemId": "218_20236_ch4"
            }, {
                "date": "",
                "text": "April",
                "type": "est",
                "url": "",
                "itemId": "218_20236_ch5"
            }, {
                "date": "",
                "text": "Maj",
                "type": "est",
                "url": "",
                "itemId": "218_20236_ch6"
            }, {
                "date": "",
                "text": "Juni",
                "type": "est",
                "url": "",
                "itemId": "218_20236_ch7"
            }, {
                "date": "",
                "text": "Juli",
                "type": "est",
                "url": "",
                "itemId": "218_20236_ch8"
            }, {
                "date": "",
                "text": "Augusti (\u20139.)",
                "type": "est",
                "url": "",
                "itemId": "218_20236_ch9"
            }],
            "itemId": ""
        }, {
            "date": "",
            "text": "Anno Post Christum Natum MDCCCXL. Ephemeris. H\u00f6stdagar 1840. Decennium III. Lustrum V.",
            "type": "subtitle",
            "url": "",
            "children": [{
                "date": "",
                "text": "Augusti (9.\u2013)",
                "type": "est",
                "url": "",
                "itemId": "218_20236_ch10"
            }, {
                "date": "",
                "text": "September",
                "type": "est",
                "url": "",
                "itemId": "218_20236_ch11"
            }, {
                "date": "",
                "text": "Oktober",
                "type": "est",
                "url": "",
                "itemId": "218_20236_ch12"
            }, {
                "date": "",
                "text": "November",
                "type": "est",
                "url": "",
                "itemId": "218_20236_ch13"
            }, {
                "date": "",
                "text": "December",
                "type": "est",
                "url": "",
                "itemId": "218_20236_ch14"
            }],
            "itemId": ""
        }],
        "itemId": ""
    }, {
        "date": "",
        "text": 1842,
        "type": "subtitle",
        "url": "",
        "children": [{
            "date": "",
            "text": "Dagbok under de dagar, d\u00e5 Zonas unga lif swartnade f\u00f6r en djup sorg och gr\u00f6nskade f\u00f6r en h\u00f6g gl\u00e4dje, [...] Den Svartgr\u00f6na Sommaren 1842.",
            "type": "subtitle",
            "url": "",
            "children": [{
                "date": "",
                "text": "Juni (18.\u2013)",
                "type": "est",
                "url": "",
                "itemId": "218_20239_ch2"
            }, {
                "date": "",
                "text": "Juli",
                "type": "est",
                "url": "",
                "itemId": "218_20239_ch3"
            }, {
                "date": "",
                "text": "Augusti (\u20132.)",
                "type": "est",
                "url": "",
                "itemId": "218_20239_ch4"
            }],
            "itemId": ""
        }],
        "itemId": ""
    }]
}];

}
