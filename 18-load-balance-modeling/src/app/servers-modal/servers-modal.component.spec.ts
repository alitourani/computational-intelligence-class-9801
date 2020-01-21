import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServersModalComponent } from './servers-modal.component';

describe('ServersModalComponent', () => {
  let component: ServersModalComponent;
  let fixture: ComponentFixture<ServersModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServersModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
