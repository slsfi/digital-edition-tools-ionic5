import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ComponentSelectorPage } from './component-selector.page';
import { PublisherToolComponent } from '../components/publisher-tool/publisher-tool.component';

describe('ComponentSelectorPage', () => {
  let component: ComponentSelectorPage;
  let publisherTool: ComponentFixture<PublisherToolComponent>;
  let fixture: ComponentFixture<ComponentSelectorPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentSelectorPage, PublisherToolComponent ],
      imports: [IonicModule.forRoot(), RouterModule.forRoot([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ComponentSelectorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    publisherTool = TestBed.createComponent(PublisherToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
