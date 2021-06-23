import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { XmlEntitySelectorGridComponent } from './xml-entity-selector-grid.component';

describe('XmlEntitySelectorGridComponent', () => {
  let component: XmlEntitySelectorGridComponent;
  let fixture: ComponentFixture<XmlEntitySelectorGridComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ XmlEntitySelectorGridComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(XmlEntitySelectorGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
