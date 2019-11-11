import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvexHullFooterComponent } from './convex-hull-footer.component';

describe('ConvexHullFooterComponent', () => {
  let component: ConvexHullFooterComponent;
  let fixture: ComponentFixture<ConvexHullFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConvexHullFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvexHullFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
