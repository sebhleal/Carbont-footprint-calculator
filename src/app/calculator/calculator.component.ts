import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  household = {
    people: 0,
    electricity: '',
    gas: ''
  };
  transport = {
    km: 0,
    method: '',
    flights: 0,
    flightTime: 0
  };
  food = {
    meatDays: 0
  };
  waste = {
    recycling: false
  };

  calculateFootprint() {
    // Lógica para calcular a pegada de carbono
    console.log('Calculando a pegada de carbono...');
  }
}