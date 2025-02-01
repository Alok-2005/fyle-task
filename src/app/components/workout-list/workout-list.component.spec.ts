import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { WorkoutListComponent } from './workout-list.component';
import { WorkoutService } from '../../services/workout.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { User, Workout } from '../../models/user.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

describe('WorkoutListComponent', () => {
  let component: WorkoutListComponent;
  let fixture: ComponentFixture<WorkoutListComponent>;
  let workoutService: jasmine.SpyObj<WorkoutService>;
  let dialog: jasmine.SpyObj<MatDialog>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  const mockUsers: User[] = [
    {
      id: 1,
      name: 'John Doe',
      workouts: [
        { type: 'Running', minutes: 30, date: new Date() },
        { type: 'Cycling', minutes: 45, date: new Date() }
      ]
    }
  ];

  beforeEach(async () => {
    const workoutServiceSpy = jasmine.createSpyObj('WorkoutService', ['getUsers', 'getWorkoutTypes', 'addWorkoutToExistingUser', 'deleteUser', 'deleteWorkout']);
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    workoutServiceSpy.getUsers.and.returnValue(of(mockUsers));
    workoutServiceSpy.getWorkoutTypes.and.returnValue(['Running', 'Cycling']);

    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [WorkoutListComponent],
      providers: [
        { provide: WorkoutService, useValue: workoutServiceSpy },
        { provide: MatDialog, useValue: dialogSpy },
        { provide: MatSnackBar, useValue: snackBarSpy }
      ]
    }).compileComponents();

    workoutService = TestBed.inject(WorkoutService) as jasmine.SpyObj<WorkoutService>;
    dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on init', () => {
    expect(workoutService.getUsers).toHaveBeenCalled();
    expect(component.dataSource.data).toEqual(mockUsers);
  });

  it('should filter users by search term', () => {
    component.searchTerm = 'John';
    component.applyFilter();
    expect(component.dataSource.filteredData.length).toBe(1);

    component.searchTerm = 'xyz';
    component.applyFilter();
    expect(component.dataSource.filteredData.length).toBe(0);
  });

  it('should filter users by workout type', () => {
    component.workoutTypeFilter = 'Running';
    component.applyFilter();
    expect(component.dataSource.filteredData.length).toBe(1);

    component.workoutTypeFilter = 'Swimming';
    component.applyFilter();
    expect(component.dataSource.filteredData.length).toBe(0);
  });

  it('should calculate total minutes correctly', () => {
    const total = component.getTotalMinutes(mockUsers[0].workouts);
    expect(total).toBe(75);
  });

  it('should get workout summary correctly', () => {
    const summary = component.getWorkoutSummary(mockUsers[0].workouts);
    expect(summary).toBe('Running, Cycling');
  });

  it('should open dialog when adding workout', fakeAsync(() => {
    dialog.open.and.returnValue({
      afterClosed: () => of({ type: 'Running', minutes: 30, date: new Date() })
    } as any);

    component.addWorkout(mockUsers[0]);
    tick();
    expect(dialog.open).toHaveBeenCalled();
    expect(workoutService.addWorkoutToExistingUser).toHaveBeenCalled();
  }));

  it('should delete a workout', () => {
    component.deleteWorkout(1, 0, new Event('click'));
    expect(workoutService.deleteWorkout).toHaveBeenCalledWith(1, 0);
    expect(snackBar.open).toHaveBeenCalled();
  });

  it('should delete a user', () => {
    component.deleteUser(1, new Event('click'));
    expect(workoutService.deleteUser).toHaveBeenCalledWith(1);
    expect(snackBar.open).toHaveBeenCalled();
  });

  it('should select a user and show chart', () => {
    component.selectUser(mockUsers[0]);
    expect(component.selectedUser).toBe(mockUsers[0]);
  });
});