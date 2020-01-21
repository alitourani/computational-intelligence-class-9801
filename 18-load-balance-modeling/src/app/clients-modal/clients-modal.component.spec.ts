import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsModalComponent } from './clients-modal.component';

describe('ClientsModalComponent', () => {
  let component: ClientsModalComponent;
  let fixture: ComponentFixture<ClientsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
