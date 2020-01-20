import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateClusterModalComponent } from './create-cluster-modal.component';

describe('CreateClusterModalComponent', () => {
  let component: CreateClusterModalComponent;
  let fixture: ComponentFixture<CreateClusterModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateClusterModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateClusterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
