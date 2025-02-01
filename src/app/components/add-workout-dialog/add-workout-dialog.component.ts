import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Workout } from '../../models/user.model';

@Component({
  selector: 'app-add-workout-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatDialogModule,
    MatSelectModule,
    MatIconModule
  ],
  template: `
    <div class="dialog-container">
      <div class="dialog-header">
        <div class="header-icon">
          <mat-icon class="icon-pulse">fitness_center</mat-icon>
        </div>
        <h2 class="dialog-title">
          Add Workout for {{data.userName}}
          <span class="subtitle">Track your fitness journey</span>
        </h2>
      </div>

      <form #workoutForm="ngForm" (ngSubmit)="onSubmit()" class="workout-form">
        <div class="form-group">
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Workout Type</mat-label>
            <mat-select 
              [(ngModel)]="workout.type" 
              name="type" 
              required
              #typeControl="ngModel"
              class="workout-select">
              <mat-option *ngFor="let type of workoutTypes" [value]="type">
              
                {{type}}
              </mat-option>
            </mat-select>
            <mat-error *ngIf="typeControl.invalid && typeControl.touched">
              Please select a workout type
            </mat-error>
          </mat-form-field>
        </div>

        <div class="form-group">
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Duration (minutes)</mat-label>
            <input 
              matInput 
              type="number" 
              [(ngModel)]="workout.minutes" 
              name="minutes"
              required
              min="1"
              #minutesControl="ngModel"
              class="duration-input">
            <mat-error *ngIf="minutesControl.invalid && minutesControl.touched">
              Please enter a valid duration (minimum 1 minute)
            </mat-error>
          </mat-form-field>
        </div>

        <div class="dialog-actions">
          <button 
            mat-stroked-button 
            type="button"
            (click)="onCancel()"
            class="cancel-button">
            <mat-icon></mat-icon>
            Cancel
          </button>
          <button 
            mat-raised-button 
            color="primary"
            type="submit"
            [disabled]="!workoutForm.form.valid"
            class="submit-button">
            <mat-icon></mat-icon>
            Add Workout
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .dialog-container {
      min-width: 500px;
      padding: 2.5rem;
      background: linear-gradient(to bottom right, #ffffff, #f8f9fa);
      border-radius: 16px;
    }

    .dialog-header {
      display: flex;
      align-items: center;
      margin-bottom: 2.5rem;
      padding-bottom: 1.5rem;
      border-bottom: 2px solid rgba(0, 0, 0, 0.06);
    }

    .header-icon {
      background: linear-gradient(135deg, #4A90E2 0%, #357ABD 100%);
      border-radius: 12px;
      padding: 1rem;
      margin-right: 1.5rem;
      box-shadow: 0 4px 15px rgba(74, 144, 226, 0.2);
    }

    .icon-pulse {
      color: white;
      font-size: 2rem;
      height: 2rem;
      width: 2rem;
      animation: pulse 2s infinite;
    }

    .dialog-title {
      color: #2d3748;
      font-size: 1.75rem;
      font-weight: 700;
      line-height: 1.2;
      display: flex;
      flex-direction: column;
    }

    .subtitle {
      font-size: 1rem;
      color: #718096;
      font-weight: 400;
      margin-top: 0.5rem;
    }

    .workout-form {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .form-group {
      position: relative;
    }

    .workout-select {
      font-size: 1.1rem;
    }

    .type-icon {
      vertical-align: middle;
      margin-right: 0.75rem;
      font-size: 1.2rem;
    }

    .duration-input {
      font-size: 1.1rem;
      padding: 0.75rem;
    }

    .dialog-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1.5rem;
      margin-top: 2.5rem;
      padding-top: 2rem;
      border-top: 2px solid rgba(0, 0, 0, 0.06);
    }

    .cancel-button {
      border: 2px solid rgba(0, 0, 0, 0.12);
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
      transition: all 0.3s ease;
    }

    .cancel-button:hover {
      background: rgba(0, 0, 0, 0.04);
    }

    .submit-button {
      min-width: 160px;
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
      background: linear-gradient(135deg, #4A90E2 0%, #357ABD 100%);
      box-shadow: 0 4px 15px rgba(74, 144, 226, 0.2);
      transition: all 0.3s ease;
    }

    .submit-button:not(:disabled):hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(74, 144, 226, 0.3);
    }

    .submit-button:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    mat-form-field {
      width: 100%;
    }

    ::ng-deep .mat-form-field-wrapper {
      margin: 0;
      padding: 0;
    }

    ::ng-deep .mat-form-field-outline {
      background: white;
    }

    ::ng-deep .mat-form-field-infix {
      padding: 1rem 0;
    }

    mat-icon {
      margin-right: 0.5rem;
    }

    @keyframes pulse {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.1);
      }
      100% {
        transform: scale(1);
      }
    }

    @media (min-width: 768px) {
      .dialog-container {
        min-width: 600px;
      }
    }
  `]
})
export class AddWorkoutDialogComponent {
  workout: Partial<Workout> = {
    type: '',
    minutes: undefined
  };

  workoutTypes = [
    'Running',
    'Walking',
    'Cycling',
    'Swimming',
    'Weight Training',
    'Yoga',
    'HIIT',
    'Pilates',
    'Basketball',
    'Soccer'
  ];

  constructor(
    public dialogRef: MatDialogRef<AddWorkoutDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userId: number; userName: string }
  ) {}

  getWorkoutIcon(type: string): string {
    const iconMap: { [key: string]: string } = {
      'Running': 'directions_run',
      'Walking': 'directions_walk',
      'Cycling': 'directions_bike',
      'Swimming': 'pool',
      'Weight Training': 'fitness_center',
      'Yoga': 'self_improvement',
      'HIIT': 'timer',
      'Pilates': 'accessibility_new',
      'Basketball': 'sports_basketball',
      'Soccer': 'sports_soccer'
    };
    return iconMap[type] || 'fitness_center';
  }

  onSubmit(): void {
    if (this.workout.type && this.workout.minutes && this.workout.minutes > 0) {
      this.dialogRef.close(this.workout);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}