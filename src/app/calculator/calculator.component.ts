import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarbonCalculationService } from '../carbon-calculation.service';

// Define interfaces for strong typing
interface ElectricityOption {
  label: string;
  value: string;
}

interface TransportOption {
  label: string;
  value: string;
}

interface Household {
  people: string;
  electricity: string;
  electricityOptions: ElectricityOption[];
  gas: string;
  peopleArray: number[];
}

interface Transport {
  km: string;
  kmOptions: TransportOption[];
  method: string;
  flights: number;
  flightTime: number;
}

interface Food {
  meatDays: string;
  meatDaysArray: number[];
}

interface Waste {
  recycling: boolean;
}

interface CarbonFootprintInput {
  household: Household;
  transport: Transport;
  food: Food;
  waste: Waste;
}

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  household: Household = {
    people: "",
    electricity: '',
    electricityOptions: [
      { label: "Low (≤ 70 kWh/month)", value: "70" },
      { label: "Medium (~110 kWh/month)", value: "110" },
      { label: "High (≥ 150 kWh/month)", value: "150" }
    ],
    gas: '',
    peopleArray: [1, 2, 3, 4, 5, 6],
  };

  transport: Transport = {
    km: '',
    kmOptions: [
      { label: "Low (≤ 50 km/week)", value: "1" },
      { label: "Medium (50-250 km/week)", value: "2" },
      { label: "High (≥ 250 km/week)", value: "3" }
    ],
    method: '',
    flights: 0,
    flightTime: 0
  };

  food: Food = {
    meatDays: "",
    meatDaysArray: [0, 1, 2, 3, 4, 5, 6, 7],
  };

  waste: Waste = {
    recycling: false
  };

  tipsVisible: string = '';

  showTips(section: string): void {
    this.tipsVisible = this.tipsVisible === section ? '' : section;
  }

  constructor(
    private carbonCalculationService: CarbonCalculationService,
    private router: Router
  ) {}

  calculateFootprint(): void {
    const carbonFootprintInput: CarbonFootprintInput = {
      household: this.household,
      transport: this.transport,
      food: this.food,
      waste: this.waste
    };

    const carbonFootprint = this.carbonCalculationService.calculateCarbonFootprint(carbonFootprintInput);

    // Navigate to results page with calculation data
    this.router.navigate(['/results'], { 
      state: { carbonFootprint: carbonFootprint } 
    });
  }
}