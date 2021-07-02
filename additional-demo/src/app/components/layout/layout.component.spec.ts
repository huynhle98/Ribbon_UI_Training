import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LayoutComponent } from './layout.component';
import { ActiveDirective } from '../../directive/active/active.directive';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [LayoutComponent, ActiveDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have var(--blue-200) <li>', () => {
    const li: HTMLElement = fixture.nativeElement.querySelector('li');
    const bgColor = li.style.borderColor;
    expect(bgColor).toBe('var(--blue-200)');
  });

  it('should have routerLink="/directive"', () => {
    component.pathCurrent = '/directive';
    fixture.detectChanges();
    const arrDirective = fixture.debugElement.queryAll(By.directive(ActiveDirective));
    const ElActive = arrDirective.find(element => (element.attributes.routerLink === component.pathCurrent));
    const bgColor = ElActive?.nativeNode.style.borderColor;
    expect(bgColor).toBe('var(--blue-200)');
  });
});
