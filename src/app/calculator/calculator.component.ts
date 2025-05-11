import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarbonCalculationService } from '../carbon-calculation.service';

// Define interfaces for strong typing
interface Option {
  label: string;
  value: string;
}

interface QuestionStep {
  question: string;
  options: Option[];
  key: keyof CarbonFootprintInput;
}

interface Household {
  people: string;
  electricity: string;
  gas: string;
}

interface Transport {
  km: string;
  method: string;
  flights: number;
  flightTime: number;
}

interface Food {
  meatDays: string;
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
  // Carbon footprint input data
  carbonData: CarbonFootprintInput = {
    household: { people: '', electricity: '', gas: '' },
    transport: { km: '', method: '', flights: 0, flightTime: 0 },
    food: { meatDays: '' },
    waste: { recycling: false }
  };

  // Steps array to manage questions dynamically
  steps: QuestionStep[] = [
    {
      question: "How many people live in your household?",
      options: [
        { label: "1 person", value: "1" },
        { label: "2 people", value: "2" },
        { label: "3 people", value: "3" },
        { label: "4+ people", value: "4" }
      ],
      key: "household"
    },
    {
      question: "How much electricity do you consume?",
      options: [
        { label: "Low (≤ 70 kWh/month)", value: "70" },
        { label: "Medium (~110 kWh/month)", value: "110" },
        { label: "High (≥ 150 kWh/month)", value: "150" }
      ],
      key: "household"
    },
    {
      question: "How many kilometers do you travel per week?",
      options: [
        { label: "Low (≤ 50 km/week)", value: "1" },
        { label: "Medium (50-250 km/week)", value: "2" },
        { label: "High (≥ 250 km/week)", value: "3" }
      ],
      key: "transport"
    },
    {
      question: "How many days a week do you eat meat?",
      options: [
        { label: "0-1 days", value: "1" },
        { label: "2-3 days", value: "2" },
        { label: "4-5 days", value: "3" },
        { label: "6-7 days", value: "4" }
      ],
      key: "food"
    }
  ];

  currentStepIndex = 0;

  constructor(
    private carbonCalculationService: CarbonCalculationService,
    private router: Router
  ) {}

  // Get current step
  get currentStep(): QuestionStep {
    return this.steps[this.currentStepIndex];
  }

  // Handle option selection
  selectOption(option: Option): void {
    const key = this.currentStep.key as keyof CarbonFootprintInput;
    if (typeof this.carbonData[key] === 'object') {
      (this.carbonData[key] as any)[Object.keys(this.carbonData[key] as object)[0]] = option.value;
    }
    if (this.currentStepIndex < this.steps.length - 1) {
      this.currentStepIndex++;
    } else {
      this.calculateFootprint();
    }
  }

  // Check if an option is selected
  isSelected(option: Option): boolean {
    const key = this.currentStep.key as keyof CarbonFootprintInput;
    return (this.carbonData[key] as any)[Object.keys(this.carbonData[key] as object)[0]] === option.value;
  }

  // Move to previous step
  prevStep(): void {
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
    }
  }

  // Calculate carbon footprint
  calculateFootprint(): void {
    this.router.navigate(['/results'], { 
      state: { carbonFootprint: this.carbonCalculationService.calculateCarbonFootprint(this.carbonData) }
    });
  }
}
