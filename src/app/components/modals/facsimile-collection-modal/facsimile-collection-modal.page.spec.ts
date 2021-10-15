import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FacsimileCollectionModalPage } from './facsimile-collection-modal.page';

describe('FacsimileCollectionModalPage', () => {
  let component: FacsimileCollectionModalPage;
  let fixture: ComponentFixture<FacsimileCollectionModalPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FacsimileCollectionModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FacsimileCollectionModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
