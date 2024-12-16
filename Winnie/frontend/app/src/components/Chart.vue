<template>
    <div class="chart-container mb-5">
      <h2>{{ title }}</h2>
      <canvas :id="chartId"></canvas>
    </div>
  </template>
  
  <script>
  import { Chart } from 'chart.js';
  
  export default {
    props: {
      data: Object,
      labels: Array,
      title: String,
      type: String
    },
    computed: {
      chartId() {
        return this.title.replace(/\s+/g, '') + 'Chart';
      }
    },
    watch: {
      data() {
        this.renderChart();
      },
      labels() {
        this.renderChart();
      }
    },
    methods: {
      renderChart() {
        const ctx = document.getElementById(this.chartId).getContext('2d');
        new Chart(ctx, {
          type: this.type,
          data: {
            labels: this.labels,
            datasets: [{
              data: Object.values(this.data),
              backgroundColor: this.type === 'pie' ? ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56'] : '#36a2eb',
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: { position: 'top' },
              title: { display: true, text: this.title }
            }
          }
        });
      }
    },
    mounted() {
      this.renderChart();
    }
  };
  </script>
  