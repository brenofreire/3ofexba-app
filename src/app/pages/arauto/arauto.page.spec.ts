import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ArautoPage } from './arauto.page';

describe('ArautoPage', () => {
  let component: ArautoPage;
  let fixture: ComponentFixture<ArautoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArautoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ArautoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
