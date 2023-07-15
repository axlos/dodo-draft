import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturesSupportedComponent } from './features-supported.component';

describe('FeaturesSupportedComponent', () => {
  let component: FeaturesSupportedComponent;
  let fixture: ComponentFixture<FeaturesSupportedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturesSupportedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturesSupportedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
