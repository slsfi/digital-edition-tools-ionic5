import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonInfiniteScroll, IonSearchbar, IonSegment, IonVirtualScroll, ModalController, NavParams } from '@ionic/angular';
import { FacsimileService } from '../../../services/facsimile.service';
import { element } from 'protractor';
import { ManuscriptService } from '../../../services/manuscript.service';
import { VersionService } from '../../../services/version.service';

interface FacsimileCollection {
  number_of_pages: number,
  external_url: string,
  start_page_number: number,
  description: string,
  title: string
};

@Component({
  selector: 'app-facsimile-collection-modal',
  templateUrl: './facsimile-collection-modal.page.html',
  styleUrls: ['./facsimile-collection-modal.page.scss'],
})
export class FacsimileCollectionModalPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonVirtualScroll) virtualScroll: IonVirtualScroll;

  public modalTitle: string;
  public selectedProjectName: string;
  public facsimileCollections: any[];
  public collectionList: any[];
  public searchbar: HTMLIonSearchbarElement;
  public selectedSegment: string;
  public selectedFacsimileCollection: FacsimileCollection;
  public selectedPublicationId: any;

  public selectedManuscriptId: number;
  public selectedVersionId: number;
  public versionId: number;
  public manuscriptId: number;

  public publicationManuscripts: any[];
  public publicationVersions: any[];

  private startLoadNumber: number;
  private collCount: number;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private facsimileService: FacsimileService,
    private manuscriptService: ManuscriptService,
    private versionService: VersionService
  ) {
    this.selectedProjectName = localStorage.getItem('selectedProjectName');
    this.selectedSegment = 'collections';
    this.collectionList = [];
    this.startLoadNumber = 0;
    this.collCount = 0;
  }

  ngOnInit() {
    this.facsimileCollections = this.navParams.data.facsimileCollections;
    this.selectedPublicationId = this.navParams.data.selectedPublicationId;
    this.modalTitle = this.navParams.data.paramTitle;
    this.collCount = this.facsimileCollections.length;
    this.fixCollectionDisplay();
    this.getPublicationManuscripts();
    this.getPublicationVersions();
    this.getCollections();
  }

  ionViewDidEnter() {
    this.searchbar = document.querySelector('ion-searchbar');
    this.searchbar.addEventListener('ionInput', this.handleInput.bind(this));
  }

  ngOnChanges() {
    this.facsimileCollections = this.navParams.data.facsimileCollections;
    this.selectedPublicationId = this.navParams.data.selectedPublicationId;
    this.collCount = this.facsimileCollections.length;
    this.fixCollectionDisplay();
    this.getPublicationManuscripts();
    this.getPublicationVersions();
  }

  fixCollectionDisplay() {
    this.facsimileCollections.forEach(item => {
      item.display = true;
    });
  }

  handleInput(event) {
    const query = event.target.value.toLowerCase();
    requestAnimationFrame(() => {
      this.collCount = 1;
      this.facsimileCollections.forEach(item => {
        const shouldShow = item.title.toLowerCase().indexOf(query) > -1;
        item.display = shouldShow ? true : false;
        if ( shouldShow ) {
          this.collCount++;
        }
      });
      this.collectionList = [];
      this.startLoadNumber = 0;
      this.getCollections();
    });

  }

  segmentChanged( segment: any ) {
    this.selectedSegment = segment.detail.value;
  }

  createFacsimileCollection( formData: NgForm ) {
    if( formData.value['externalUrl'] === null || formData.value['externalUrl'] === "" ){
      delete(formData.value['externalUrl']);
    }
    this.facsimileService.createFacsimileCollection(this.selectedProjectName, formData.value).subscribe( (ret) => {
      this.facsimileCollections.push(ret.row);
      this.selectedFacsimileCollection = ret.row;
      this.selectedSegment = 'publication';
    } );
  }

  linkFacsimileCollection( formData: NgForm ) {
    const data = formData.value;
    data.publication_id = this.selectedPublicationId;
    data.publication_manuscript_id = this.selectedManuscriptId;
    data.publication_version_id = this.selectedVersionId;
    data.publication_facsimile_collection_id = this.selectedFacsimileCollection['id'];
    this.facsimileService.linkFacsimileCollection(this.selectedProjectName, data).subscribe( (ret) => {
      this.closeModal();
    } );
  }

  setSelectedFacsimileCollection(data: any) {
    this.selectedFacsimileCollection = data;
    this.selectedSegment = 'publication';
  }

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

  getPublicationManuscripts() {
    this.manuscriptService.getManuscripts(this.selectedProjectName, this.selectedPublicationId).subscribe( (ret) => {
      this.publicationManuscripts = ret;
    } );
  }

  getPublicationVersions() {
    this.versionService.getVersions(this.selectedProjectName, this.selectedPublicationId).subscribe( (ret) => {
      this.publicationVersions = ret;
    } );
  }

  setManuscriptId( e ) {
    this.manuscriptId = Number(e.detail.value);
    this.selectedManuscriptId = e.detail.value;
  }

  setVersionId( e ) {
    this.versionId = Number(e.detail.value);
    this.selectedVersionId = e.detail.value;
  }

  getCollections() {
    let i = this.startLoadNumber;
    while(this.collectionList.length < (this.startLoadNumber + 25) && i < (this.facsimileCollections.length)) {
      if (this.facsimileCollections[i]['display'] === true) {
        this.collectionList.push(this.facsimileCollections[i]);
      }
      this.facsimileCollections[i]['index'] = i;
      i++;
    }
    this.startLoadNumber += 25;
  }

  loadCollections(event) {
    // Using settimeout to simulate api call
    setTimeout(() => {
      // load more data
      this.getCollections();
      //Hide Infinite List Loader on Complete
      event.target.complete();
      //Rerender Virtual Scroll List After Adding New Data
      this.virtualScroll.checkEnd();
      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.collectionList.length === this.collCount) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
}
