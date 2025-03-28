import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarbonCalculationService {
  calculateCarbonFootprint(data: any) {
    // Detailed calculation logic based on input data
    const homeEnergy = this.calculateHomeEnergy(data.household);
    const transportation = this.calculateTransportation(data.transport);
    const airTravel = this.calculateAirTravel(data.transport);
    const food = this.calculateFood(data.food);
    const waste = this.calculateWaste(data.waste);

    return {
      homeEnergy,
      transportation,
      airTravel,
      food,
      waste
    };
  }

  private calculateHomeEnergy(household: any): number {
    const peopleMultiplier = household.people ? parseInt(household.people) : 1;
    
    const electricityFactor: { [key: string]: number } = {
      '70': 1,
      '110': 1.5,
      '150': 2
    };
  
    const factor = electricityFactor[household.electricity] ?? 1;
    
    return factor * peopleMultiplier * 2;
  }

  private calculateTransportation(transport: any): number {
    const kmFactor: { [key: string]: number } = {
      '1': 1,
      '2': 2,
      '3': 3
    };
  
    // Safely access km factor with fallback
    const kmMultiplier = kmFactor[transport.km] ?? 1;
    
    return kmMultiplier * 1.5;
  }

  private calculateAirTravel(transport: any): number {
    return (transport.flights || 0) * 0.5;
  }

  private calculateFood(food: any): number {
    const meatDaysFactor = food.meatDays || 0;
    return meatDaysFactor * 0.7;
  }

  private calculateWaste(waste: any): number {
    return waste.recycling ? 0.5 : 1.5;
  }
}