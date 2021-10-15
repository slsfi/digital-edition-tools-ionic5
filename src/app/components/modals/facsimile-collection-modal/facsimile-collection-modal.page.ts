import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSearchbar, IonSegment, ModalController, NavParams } from '@ionic/angular';
import { FacsimileService } from '../../../services/facsimile.service';
import { element } from 'protractor';
import { ManuscriptService } from '../../../services/manuscript.service';
import { VersionService } from '../../../services/version.service';

@Component({
  selector: 'app-facsimile-collection-modal',
  templateUrl: './facsimile-collection-modal.page.html',
  styleUrls: ['./facsimile-collection-modal.page.scss'],
})
export class FacsimileCollectionModalPage implements OnInit {

  public modalTitle: string;
  public selectedProjectName: string;
  public facsimileCollections: any[];
  public searchbar: HTMLIonSearchbarElement;
  public selectedSegment: string;
  public selectedFacsimileCollection: any[];
  public selectedPublicationId: any;

  public selectedManuscriptId: number;
  public selectedVersionId: number;
  public versionId: number;
  public manuscriptId: number;

  public publicationManuscripts: any[];
  public publicationVersions: any[];

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private facsimileService: FacsimileService,
    private manuscriptService: ManuscriptService,
    private versionService: VersionService
  ) {
    this.selectedProjectName = localStorage.getItem('selectedProjectName');
    this.selectedSegment = 'collections';
  }

  ngOnInit() {
    this.facsimileCollections = this.navParams.data.facsimileCollections;
    this.selectedPublicationId = this.navParams.data.selectedPublicationId;
    this.modalTitle = this.navParams.data.paramTitle;
    this.getPublicationManuscripts();
    this.getPublicationVersions();
  }

  ionViewDidEnter() {
    this.searchbar = document.querySelector('ion-searchbar');
    this.searchbar.addEventListener('ionInput', this.handleInput.bind(this));
  }

  ngOnChanges() {
    this.facsimileCollections = this.navParams.data.facsimileCollections;
    this.selectedPublicationId = this.navParams.data.selectedPublicationId;
    this.getPublicationManuscripts();
    this.getPublicationVersions();
  }

  handleInput(event) {
    const query = event.target.value.toLowerCase();

    requestAnimationFrame(() => {
      this.facsimileCollections.forEach(item => {
        const shouldShow = item.title.toLowerCase().indexOf(query) > -1;
        item.display = shouldShow ? true : false;
      });
    });
  }

  segmentChanged( segment: any ) {
    this.selectedSegment = segment.detail.value;
  }

  createFacsimileCollection( formData: NgForm ) {
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
      console.log(ret)
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
}
