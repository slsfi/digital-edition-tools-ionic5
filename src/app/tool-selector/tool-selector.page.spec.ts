import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ToolSelectorPage } from './tool-selector.page';
import { PublisherToolComponent } from '../components/tools/publisher-tool/publisher-tool.component';

describe('ToolSelectorPage', () => {
  let component: ToolSelectorPage;
  let publisherTool: ComponentFixture<PublisherToolComponent>;
  let fixture: ComponentFixture<ToolSelectorPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolSelectorPage, PublisherToolComponent ],
      imports: [IonicModule.forRoot(), RouterModule.forRoot([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ToolSelectorPage);
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
