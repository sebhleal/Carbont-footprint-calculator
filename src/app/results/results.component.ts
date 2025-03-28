import { Component, Input } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {
  @Input() carbonFootprint: any;
  public chart: any;

  ngOnInit() {
    this.createChart();
  }

  createChart() {
    // Ensure data exists before creating chart
    if (!this.carbonFootprint) return;

    const ctx = document.getElementById('carbonChart') as HTMLCanvasElement;
    
    this.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: [
          'Home Energy', 
          'Transportation', 
          'Air Travel', 
          'Food', 
          'Waste'
        ],
        datasets: [{
          label: 'Carbon Emissions',
          data: [
            this.carbonFootprint.homeEnergy || 0,
            this.carbonFootprint.transportation || 0,
            this.carbonFootprint.airTravel || 0,
            this.carbonFootprint.food || 0,
            this.carbonFootprint.waste || 0
          ],
          backgroundColor: [
            '#3498db',  // Home Energy
            '#e74c3c',  // Transportation
            '#9b59b6',  // Air Travel
            '#f39c12',  // Food
            '#1abc9c'   // Waste
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Your Carbon Footprint Breakdown'
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }

  calculateTotalEmissions() {
    if (!this.carbonFootprint) return 0;
    return (
      (this.carbonFootprint.homeEnergy || 0) +
      (this.carbonFootprint.transportation || 0) +
      (this.carbonFootprint.airTravel || 0) +
      (this.carbonFootprint.food || 0) +
      (this.carbonFootprint.waste || 0)
    ).toFixed(2);
  }

  getEmissionCategory() {
    const total = parseFloat(this.calculateTotalEmissions());
    if (total < 5) return 'Low';
    if (total < 10) return 'Moderate';
    return 'High';
  }

  getRecommendations() {
    const category = this.getEmissionCategory();
    switch(category) {
      case 'Low':
        return [
          'Great job! You have a low carbon footprint.',
          'Continue your environmentally friendly practices.',
          'Share your tips with friends and family.'
        ];
      case 'Moderate':
        return [
          'You have a moderate carbon footprint.',
          'Consider reducing energy consumption.',
          'Try using public transportation more often.',
          'Explore plant-based meal options.'
        ];
      case 'High':
        return [
          'Your carbon footprint is high.',
          'Focus on significant lifestyle changes.',
          'Reduce meat consumption.',
          'Use energy-efficient appliances.',
          'Consider carpooling or using public transport.'
        ];
    }
  }
}