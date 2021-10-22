import { Component, Input, OnInit } from '@angular/core';
import { FacsimileService } from '../../../services/facsimile.service';
import { PublicationService } from '../../../services/publication.service';
import { CollectionService } from '../../../services/collection.service';
import { environment } from '../../../../environments/environment.example';
import { ModalController } from '@ionic/angular';
import { FacsimileCollectionModalPage } from '../../modals/facsimile-collection-modal/facsimile-collection-modal.page';

interface Facsimile {
  publication_facsimile_collection_id: any,
  first_page: number
}

interface FacsimileImage {
  number: number,
  url: string
}

@Component({
  selector: 'app-facsimile-tool',
  templateUrl: './facsimile-tool.component.html',
  styleUrls: ['./facsimile-tool.component.scss'],
})
export class FacsimileToolComponent implements OnInit {

  @Input() public selectedComponentTool: string;

  private selectedProjectName: string;
  public selectedCollectionId: string;
  public collectionId: number;

  public selectedPublicationId: string;
  public publicationId: number;

  public publications: any[];
  public collections: any[];
  public facsimilePublications: any[];
  public facsimileCollections: any[];

  public facsimileImageUrls: Array<FacsimileImage>;

  public selectedFacsimile: Facsimile;
  public dataReturned: any;


  constructor(  public facsimileService: FacsimileService,
                public publicationService: PublicationService,
                public collectionService: CollectionService,
                public modalController: ModalController) {
    this.selectedProjectName = localStorage.getItem('selectedProjectName');
    this.facsimileImageUrls = [];
    this.getPublicationCollections();
    this.getFacsimileCollections();
  }

  ngOnInit() {}

  // Available Facsimile Collections
  getPublicationFacsimileCollections(){

  }

  // All Collections
  getPublicationCollections() {
    this.collectionService.getCollections(this.selectedProjectName).subscribe( (collections) => {
      this.collections = collections;
    } );
  }

  // All Publications
  getPublications() {
    this.publicationService.getPublications( this.selectedProjectName, Number(this.selectedCollectionId)).subscribe( (publications) => {
      this.publications = publications;
    } );
  }

  // Publications already connected to Facsimile Collections
  getPublicationFacsimiles(){
    this.facsimileService.getFacsimilePublications( this.selectedProjectName, Number(this.selectedPublicationId)).subscribe( (facsimilePublications) => {
      this.facsimilePublications = facsimilePublications;
      console.log(this.facsimilePublications);
    } );
  }

  getFacsimileCollections() {
    this.facsimileService.getFacsimileCollections(this.selectedProjectName).subscribe( facsimileCollections => {
      this.facsimileCollections = facsimileCollections;
    });
  }

  setCollectionId( e ) {
    this.collectionId = Number(e.detail.value);
    this.selectedCollectionId = e.detail.value;
    this.getPublications();
  }

  setPublicationId( e ) {
    this.publicationId = Number(e.detail.value);
    this.selectedPublicationId = e.detail.value;
    this.getPublicationFacsimiles();
  }

  selectFacsimilePublication( facsimile?: any ) {
    if ( facsimile !== undefined ) {
      this.selectedFacsimile = facsimile;
    }

    this.facsimileImageUrls = [];
    for(let i = Number(this.selectedFacsimile['first_page']); i <= Number(this.selectedFacsimile['last_page']); i++) {
      let url = environment.api_url + '/' + environment.api_url_path + '/' +
                  this.selectedProjectName + '/facsimiles/' + this.selectedFacsimile['publication_facsimile_collection_id'] + '/' + i + '/1' + '?' + Date.now();
      this.facsimileImageUrls.push({'url': url, 'number': i});
    }
  }

  public async openFacsimileCollectionModal() {
    const modal = await this.modalController.create({
      component: FacsimileCollectionModalPage,
      componentProps: {
        "facsimileCollections": this.facsimileCollections,
        "selectedPublicationId": this.selectedPublicationId,
        "paramTitle": "Test Title"
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        this.getPublicationFacsimiles();
        //alert('Modal Sent Data :'+ dataReturned);
      }
    });

    return await modal.present();
  }
}
