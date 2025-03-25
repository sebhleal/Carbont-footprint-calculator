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
    electricityOptions: ["Low", "Medium", "High"],
    gas: '',
    peopleArray: [1, 2, 3, 4],
  };
  transport = {
    km: 0,
    method: '',
    flights: 0,
    flightTime: 0
  };
  food = {
    meatDays: 0,
    meatDaysArray: [1,2,3,4,5,6,7],
  };
  waste = {
    recycling: false
  };
  tipsVisible: string = '';

  calculateFootprint() {
    // Lógica para calcular a pegada de carbono
    console.log('Calculando a pegada de carbono...');
  }

  showTips(section: string) {
    this.tipsVisible = section;
  }

  closeTips() {
    this.tipsVisible = '';
  }
}
