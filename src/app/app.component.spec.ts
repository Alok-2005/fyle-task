import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { WorkoutListComponent } from './components/workout-list/workout-list.component';
import { WorkoutFormComponent } from './components/workout-form/workout-form.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, WorkoutListComponent, WorkoutFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct title', () => {
    expect(component.title).toEqual('health-tracker');
  });

  it('should render the title in the header', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const titleElement = compiled.querySelector('.title');
    expect(titleElement?.textContent).toContain('Health Challenge Tracker');
  });

  it('should render the subtitle in the header', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const subtitleElement = compiled.querySelector('.subtitle');
    expect(subtitleElement?.textContent).toContain('Track your fitness journey, celebrate your progress');
  });

  it('should render the workout form and list components', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const workoutFormElement = compiled.querySelector('app-workout-form');
    const workoutListElement = compiled.querySelector('app-workout-list');
    expect(workoutFormElement).not.toBeNull();
    expect(workoutListElement).not.toBeNull();
  });
});