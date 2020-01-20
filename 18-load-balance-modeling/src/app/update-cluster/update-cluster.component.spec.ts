import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateClusterComponent } from './update-cluster.component';

describe('UpdateClusterComponent', () => {
  let component: UpdateClusterComponent;
  let fixture: ComponentFixture<UpdateClusterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateClusterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateClusterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
