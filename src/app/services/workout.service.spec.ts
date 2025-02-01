import { TestBed } from '@angular/core/testing';
import { WorkoutService } from './workout.service';
import { User, Workout } from '../models/user.model';
import { of } from 'rxjs';

describe('WorkoutService', () => {
  let service: WorkoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with default users', () => {
    service.getUsers().subscribe(users => {
      expect(users.length).toBe(3);
      expect(users[0].name).toBe('John Doe');
    });
  });

  it('should add a new user', () => {
    const newUser: Partial<User> = {
      name: 'New User',
      workouts: [
        { type: 'New Workout', minutes: 10, date: new Date() }
      ]
    };
    service.addUser(newUser);
    service.getUsers().subscribe(users => {
      expect(users.length).toBe(4);
      expect(users[3].name).toBe('New User');
    });
  });

  it('should add a workout to an existing user', () => {
    const workout: Workout = { type: 'New Workout', minutes: 10, date: new Date() };
    service.addWorkoutToExistingUser(1, workout);
    service.getUsers().subscribe(users => {
      const user = users.find(u => u.id === 1);
      expect(user?.workouts.length).toBe(3);
      expect(user?.workouts[2].type).toBe('New Workout');
    });
  });

  it('should delete a workout from a user', () => {
    service.deleteWorkout(1, 0);
    service.getUsers().subscribe(users => {
      const user = users.find(u => u.id === 1);
      expect(user?.workouts.length).toBe(1);
      expect(user?.workouts[0].type).toBe('Cycling');
    });
  });

  it('should delete a user', () => {
    service.deleteUser(1);
    service.getUsers().subscribe(users => {
      expect(users.length).toBe(2);
      expect(users.find(u => u.id === 1)).toBeUndefined();
    });
  });

  it('should get workout types', () => {
    const types = service.getWorkoutTypes();
    expect(types.length).toBe(4);
    expect(types).toContain('Running');
    expect(types).toContain('Cycling');
    expect(types).toContain('Swimming');
    expect(types).toContain('Yoga');
  });

  it('should save to local storage', () => {
    const newUser: Partial<User> = {
      name: 'New User',
      workouts: [
        { type: 'New Workout', minutes: 10, date: new Date() }
      ]
    };
    service.addUser(newUser);
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(newUser));
    const storedUsers = localStorage.getItem('workout_users');
    expect(storedUsers).not.toBeNull();
    const parsedUsers = JSON.parse(storedUsers!);
    expect(parsedUsers.length).toBe(4);
  });

  it('should handle errors when parsing local storage', () => {
    spyOn(localStorage, 'getItem').and.returnValue('invalid json');
    service.getUsers().subscribe(users => {
      expect(users.length).toBe(3); // Defaults should be used
    });
  });
});