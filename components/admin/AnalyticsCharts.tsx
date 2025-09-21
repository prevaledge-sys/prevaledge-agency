import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
  ScriptableContext,
} from 'chart.js';
import type { AIToolName, AIToolUsage, ContactSubmission } from '../../../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface AnalyticsChartsProps {
  aiToolUsage: AIToolUsage;
  contactSubmissions: ContactSubmission[];
}

const toolFriendlyNames: Record<AIToolName, string> = {
  strategyGenerator: 'Strategy Gen',
  websiteAnalyzer: 'Site Analyzer',
  adCopyGenerator: 'Ad Copy Gen',
  socialPostGenerator: 'Social Post Gen',
  blogIdeaGenerator: 'Blog Idea Gen',
  keywordClusterGenerator: 'Keyword Tool',
  roiCalculator: 'ROI Calc',
  auraSynthesizer: 'Brand Visualizer',
  brandSonifier: 'Sonic Identity',
};

const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({ aiToolUsage, contactSubmissions }) => {

  // --- AI Tool Usage Bar Chart Data & Options ---
  const toolUsageLabels = Object.keys(aiToolUsage).map(key => toolFriendlyNames[key as AIToolName]);
  const toolUsageDataPoints = Object.values(aiToolUsage);

  const barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'AI Tool Usage Statistics',
        color: '#e2e8f0',
        font: { size: 18, weight: 'bold' }
      },
      tooltip: {
        backgroundColor: '#1f2937', // bg-slate-800
        titleColor: '#e2e8f0',
        bodyColor: '#cbd5e1',
        callbacks: {
            label: (context) => `Usage: ${context.raw}`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(71, 85, 105, 0.5)' }, // slate-700
        ticks: { color: '#94a3b8' }, // slate-400
        title: {
          display: true,
          text: 'Times Used',
          color: '#cbd5e1',
        }
      },
      x: {
        grid: { color: 'rgba(71, 85, 105, 0.2)' },
        ticks: { color: '#94a3b8' }
      }
    }
  };

  const barChartData = {
    labels: toolUsageLabels,
    datasets: [{
      label: 'Usage Count',
      data: toolUsageDataPoints,
      backgroundColor: (context: ScriptableContext<'bar'>) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, context.chart.height);
        gradient.addColorStop(0, 'rgba(96, 165, 250, 0.8)'); // blue-400
        gradient.addColorStop(1, 'rgba(124, 58, 237, 0.8)'); // purple-600
        return gradient;
      },
      borderColor: 'rgba(96, 165, 250, 1)',
      borderWidth: 1,
      borderRadius: 4,
    }]
  };
  
  // --- Contact Submissions Line Chart Data & Options ---
  // Group submissions by date
  const submissionsByDate = contactSubmissions.reduce((acc, submission) => {
    const date = submission.submittedAt.toISOString().split('T')[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Create a continuous date range for an accurate time-series chart
  const submissionLabels: string[] = [];
  const submissionDataPoints: number[] = [];

  if (contactSubmissions.length > 0) {
    const dates = contactSubmissions.map(s => s.submittedAt);
    const minDate = new Date(Math.min(...dates.map(d => d.getTime())));
    const maxDate = new Date(Math.max(...dates.map(d => d.getTime())));
    
    // Set to midnight to avoid timezone issues
    minDate.setUTCHours(0, 0, 0, 0);
    maxDate.setUTCHours(0, 0, 0, 0);

    for (let d = new Date(minDate); d <= maxDate; d.setDate(d.getDate() + 1)) {
        const dateString = d.toISOString().split('T')[0];
        submissionLabels.push(new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric'}));
        submissionDataPoints.push(submissionsByDate[dateString] || 0);
    }
  }


  const lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
     plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Contact Form Submissions Over Time',
        color: '#e2e8f0',
        font: { size: 18, weight: 'bold' }
      },
       tooltip: {
        backgroundColor: '#1f2937',
        titleColor: '#e2e8f0',
        bodyColor: '#cbd5e1',
        callbacks: {
            label: (context) => `Submissions: ${context.raw}`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(71, 85, 105, 0.5)' },
        ticks: { color: '#94a3b8', stepSize: 1 },
         title: {
          display: true,
          text: 'Number of Submissions',
          color: '#cbd5e1',
        }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#94a3b8' }
      }
    }
  };
  
  const lineChartData = {
    labels: submissionLabels,
    datasets: [{
      label: 'Submissions',
      data: submissionDataPoints,
      fill: true,
      borderColor: 'rgba(96, 165, 250, 1)',
      backgroundColor: (context: ScriptableContext<'line'>) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, context.chart.height);
        gradient.addColorStop(0, 'rgba(96, 165, 250, 0.5)');
        gradient.addColorStop(1, 'rgba(124, 58, 237, 0.1)');
        return gradient;
      },
      tension: 0.3,
      pointBackgroundColor: '#e2e8f0',
      pointBorderColor: 'rgba(96, 165, 250, 1)',
    }]
  };


  return (
    <div className="space-y-12">
      {/* AI Tool Chart */}
      <section className="bg-slate-900/70 border border-slate-800 rounded-lg p-6 h-96">
        {toolUsageDataPoints.some(v => v > 0) ? (
          <Bar options={barChartOptions} data={barChartData} />
        ) : (
          <div className="flex items-center justify-center h-full text-slate-500">
            No AI tool usage data yet.
          </div>
        )}
      </section>

      {/* Submissions Chart */}
      <section className="bg-slate-900/70 border border-slate-800 rounded-lg p-6 h-96">
        {submissionDataPoints.length > 0 ? (
           <Line options={lineChartOptions} data={lineChartData} />
        ) : (
          <div className="flex items-center justify-center h-full text-slate-500">
            No contact submissions yet.
          </div>
        )}
      </section>
    </div>
  );
};

export default AnalyticsCharts;