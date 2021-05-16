import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByQueryComponent } from './search-by-query.component';

describe('SearchByQueryComponent', () => {
  let component: SearchByQueryComponent;
  let fixture: ComponentFixture<SearchByQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchByQueryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
