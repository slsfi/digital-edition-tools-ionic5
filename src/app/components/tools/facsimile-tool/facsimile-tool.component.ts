import { Component, Input, OnInit } from '@angular/core';
import { FacsimileService } from '../../../services/facsimile.service';
import { PublicationService } from '../../../services/publication.service';
import { CollectionService } from '../../../services/collection.service';
import { environment } from '../../../../environments/environment.example';

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

  public facsimileImageUrls: string[];

  public selectedFacsimile: any[];


  constructor(  public facsimileService: FacsimileService,
                public publicationService: PublicationService,
                public collectionService: CollectionService) {
    this.selectedProjectName = localStorage.getItem('selectedProjectName');
    this.facsimileImageUrls = [];
    this.getPublicationCollections();
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

  selectFacsimilePublication( facsimile: any ) {
    this.selectedFacsimile = facsimile;
    this.facsimileImageUrls = [];
    for(let i = Number(facsimile.first_page); i <= Number(facsimile.last_page); i++) {
      /*let url = environment.api_url + '/' + environment.api_url_path + '/' +
                  this.selectedProjectName + '/facsimiles/' + facsimile.publication_facsimile_collection_id + '/' + i + '/1';*/
      let url = 'https://api.sls.fi' + '/' + environment.api_url_path + '/' +
                  this.selectedProjectName + '/facsimiles/' + facsimile.publication_facsimile_collection_id + '/' + i + '/1';
      this.facsimileImageUrls.push(url);
    }
  }
}
