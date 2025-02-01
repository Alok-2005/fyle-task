import { Component } from '@angular/core';
import { WorkoutListComponent } from './components/workout-list/workout-list.component';
import { WorkoutFormComponent } from './components/workout-form/workout-form.component';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WorkoutListComponent, WorkoutFormComponent],
  template: `
    <div class="app-container" [@fadeIn]>
      <header class="header">
        <div class="header-content">
          <h1 class="title">Health Challenge Tracker</h1>
          <p class="subtitle">Track your fitness journey, celebrate your progress</p>
        </div>
        <div class="wave"></div>
        <div class="floating-circles">
          <div class="circle circle-1"></div>
          <div class="circle circle-2"></div>
          <div class="circle circle-3"></div>
        </div>
      </header>
      <main class="main-content">
        <app-workout-form class="card hover-scale"></app-workout-form>
        <app-workout-list class="card hover-scale"></app-workout-list>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
      min-height: 100vh;
      background: #f8f9fa;
    }

    .header {
      text-align: center;
      margin-bottom: 3rem;
      position: relative;
      overflow: hidden;
      border-radius: 20px;
      padding: 3rem 0;
      background: linear-gradient(135deg, #4A90E2 0%, #6C5CE7 100%);
      box-shadow: 0 10px 30px rgba(108, 92, 231, 0.2);
    }

    .header-content {
      position: relative;
      z-index: 2;
    }

    .title {
      font-size: 3rem;
      font-weight: 800;
      letter-spacing: 1.5px;
      margin-bottom: 1rem;
      color: white;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
      animation: slideDown 0.8s ease-out;
    }

    .subtitle {
      font-size: 1.2rem;
      color: rgba(255, 255, 255, 0.9);
      margin-bottom: 2rem;
      animation: fadeIn 1s ease-out 0.3s both;
    }

    .wave {
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 100%;
      height: 100px;
      background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg"><path fill="%23f8f9fa" fill-opacity="1" d="M0,160L48,181.3C96,203,192,245,288,250.7C384,256,480,224,576,197.3C672,171,768,149,864,160C960,171,1056,213,1152,208C1248,203,1344,149,1392,122.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>');
      animation: wave 10s linear infinite;
    }

    .floating-circles {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      pointer-events: none;
    }

    .circle {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
    }

    .circle-1 {
      width: 100px;
      height: 100px;
      top: 20%;
      left: 10%;
      animation: float 6s infinite;
    }

    .circle-2 {
      width: 150px;
      height: 150px;
      top: 40%;
      right: 15%;
      animation: float 8s infinite;
    }

    .circle-3 {
      width: 70px;
      height: 70px;
      bottom: 30%;
      left: 20%;
      animation: float 7s infinite;
    }

    .main-content {
      display: grid;
      gap: 2rem;
      grid-template-columns: 1fr 2fr;
      animation: slideUp 0.8s ease-out;
    }

    .card {
      background: white;
      border-radius: 15px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.05);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .hover-scale:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.1);
    }

    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-20px); }
    }

    @keyframes wave {
      0% { background-position-x: 0; }
      100% { background-position-x: 1440px; }
    }

    @keyframes slideDown {
      from { transform: translateY(-50px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    @keyframes slideUp {
      from { transform: translateY(50px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @media (max-width: 1200px) {
      .main-content {
        grid-template-columns: 1fr;
      }

      .title {
        font-size: 2.5rem;
      }

      .header {
        padding: 2rem 0;
      }
    }

    @media (max-width: 768px) {
      .app-container {
        padding: 1rem;
      }

      .title {
        font-size: 2rem;
      }

      .subtitle {
        font-size: 1rem;
      }
    }
  `],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class AppComponent {
  title = 'health-tracker';
}