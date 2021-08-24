import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FacsimileCollectionGridComponent } from './facsimile-collection-grid.component';

describe('FacsimileCollectionGridComponent', () => {
  let component: FacsimileCollectionGridComponent;
  let fixture: ComponentFixture<FacsimileCollectionGridComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FacsimileCollectionGridComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FacsimileCollectionGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
