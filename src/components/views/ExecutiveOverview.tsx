import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { SiteId } from '../../types';
import {
  ShieldCheck,
  AlertTriangle,
  Activity,
  Cpu,
  Zap,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  TrendingDown,
  TrendingUp,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Layers,
  Sparkles,
  Building2,
  Calendar,
  Filter,
  Check,
  RefreshCw,
  Search,
  Radio,
  FileText
} from 'lucide-react';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { SeverityBadge, TrustScoreBadge } from '../common/Badge';

interface SiteProfileData {
  name: string;
  location: string;
  domain: string;
  criticalEventSummary: string;
  exposure: string;
  activeRecommendationId: string;
  recTitle: string;
  recDesc: string;
  recCost: string;
  recDowntime: string;
  recSavings: string;
  chartLabel: string;
  outputUnit: string;
  energyUnit: string;
  areas: string[];
  lines: string[];
  trustBreakdown: { name: string; value: number; color: string }[];
}

export const ExecutiveOverview: React.FC = () => {
  const {
    selectedSite,
    setSelectedSite,
    timeRange,
    setTimeRange,
    assets,
    events,
    approvalRequests,
    outcomes,
    openGuidedDemo,
    approveRequest,
    showToast
  } = useApp();

  const navigate = useNavigate();

  // Local area and line filters
  const [selectedAreaFilter, setSelectedAreaFilter] = useState('all');
  const [selectedLineFilter, setSelectedLineFilter] = useState('all');

  // Handle site change with visual feedback
  const handleSiteChange = (site: SiteId) => {
    setSelectedSite(site);
    setSelectedAreaFilter('all');
    setSelectedLineFilter('all');
    const siteNames: Record<SiteId, string> = {
      'all': 'All Facilities (Fleet Overview)',
      'riverside': 'Riverside Plant (Columbus, OH)',
      'water-station-7': 'Water Utility – Station 7 (Austin, TX)',
      'fulfillment-3': 'Fulfillment Center – Site 3 (Allentown, PA)'
    };
    showToast(`Active Facility switched to: ${siteNames[site]}`, 'info');
  };

  // Handle time range change with visual feedback
  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
    const rangeLabels: Record<string, string> = {
      '1h': '1 Hour (Real-Time)',
      '24h': '24 Hours (Day Shift)',
      '7d': '7 Days (Weekly)',
      '30d': '30 Days (Governed Monthly)'
    };
    showToast(`Dashboard re-computed for time window: ${rangeLabels[range] || range}`, 'info');
  };

  // Base profile info for each facility
  const siteBaseProfiles: Record<SiteId, SiteProfileData> = {
    riverside: {
      name: 'Riverside Plant',
      location: 'Columbus, OH',
      domain: 'Food & Beverage Continuous Processing',
      criticalEventSummary: 'TT-104A at 78.4°C (Trip: 85°C)',
      exposure: '$1,200,000 (Apex Beverage #4471)',
      activeRecommendationId: 'REQ-8812',
      recTitle: 'Pump P-104 Bearing Overhaul Tonight',
      recDesc: 'Sirach evaluated 4 operational paths. Recommends Option C: Execute 2.5h bearing replacement during scheduled 02:00 sanitation window.',
      recCost: '$18,000 (Parts in stock)',
      recDowntime: '0 hours unplanned downtime',
      recSavings: '$1,200,000 order protected',
      chartLabel: 'Bottling Line 2 OEE & Hourly Output',
      outputUnit: 'Cases/hr',
      energyUnit: 'kWh/case',
      trustBreakdown: [
        { name: 'High Trust (≥ 0.90)', value: 91.2, color: '#27B6A8' },
        { name: 'Medium Trust (0.75-0.89)', value: 6.4, color: '#E9AC45' },
        { name: 'Degraded / Flagged (< 0.75)', value: 2.4, color: '#E45D5D' },
      ],
      areas: ['Area A (Ingredients & Batching)', 'Area B (Packaging & Fill)'],
      lines: ['Line 1 (Syrup Preparation)', 'Line 2 (High-Speed Bottling)']
    },
    'water-station-7': {
      name: 'Water Utility – Station 7',
      location: 'Austin, TX',
      domain: 'Distributed Municipal Water Filtration & Trunk Pressure',
      criticalEventSummary: 'Discharge pressure 62.4 psi (< 65 psi SLA)',
      exposure: '45,000 municipal residents (< 50 psi risk)',
      activeRecommendationId: 'REQ-8809',
      recTitle: 'Divert Duty to Standby Pump 702',
      recDesc: 'Automate SCADA sequencing to transfer high-lift duty to Standby Pump 702. Pre-stage Trestara work order WO-4412 for scheduled Tuesday maintenance.',
      recCost: '$1,200 (SCADA dispatch)',
      recDowntime: '0 min pressure interruption',
      recSavings: '45,000 residents pressure protected',
      chartLabel: 'Trunk Line Delta Header Pressure & Flow',
      outputUnit: 'ML/hr',
      energyUnit: 'kWh/ML',
      trustBreakdown: [
        { name: 'High Trust (≥ 0.90)', value: 88.4, color: '#27B6A8' },
        { name: 'Medium Trust (0.75-0.89)', value: 7.8, color: '#E9AC45' },
        { name: 'Degraded / Flagged (< 0.75)', value: 3.8, color: '#E45D5D' },
      ],
      areas: ['Station 7 (Remote Pressure Hub)', 'Station 7B (Filtration Gallery)'],
      lines: ['Trunk Line Delta', 'High-Service Header']
    },
    'fulfillment-3': {
      name: 'Fulfillment Center – Site 3',
      location: 'Allentown, PA',
      domain: 'High-Speed Automated Logistics & Cross-Belt Sorting',
      criticalEventSummary: 'Photo-eye clarity dropped to 64.2%',
      exposure: '312 Prime Orders in Wave 4',
      activeRecommendationId: 'REQ-8795',
      recTitle: 'Reroute Wave 4 to Sorter 2 & Wipe Lens',
      recDesc: 'Reroute incoming 312 carton wave to parallel Sorter 2 (42% spare capacity). Execute 5-min optical photo-eye lens wipe on Sorter 3.',
      recCost: '$350 (Internal technician labor)',
      recDowntime: '0 packages delayed',
      recSavings: '312 Prime packages meet 16:30 cutoff',
      chartLabel: 'Sorter 3 Induct Throughput & Divert Success',
      outputUnit: 'Pkgs/hr',
      energyUnit: 'kWh/k-pkg',
      trustBreakdown: [
        { name: 'High Trust (≥ 0.90)', value: 98.1, color: '#27B6A8' },
        { name: 'Medium Trust (0.75-0.89)', value: 1.5, color: '#E9AC45' },
        { name: 'Degraded / Flagged (< 0.75)', value: 0.4, color: '#E45D5D' },
      ],
      areas: ['Induct & Sorting Hall', 'Palletizing Bay'],
      lines: ['Wave Sorter 3', 'Wave Sorter 2']
    },
    all: {
      name: 'All Facilities (Fleet Synthesis)',
      location: 'Multi-Site Tenancy',
      domain: 'Enterprise Operations Cockpit',
      criticalEventSummary: '3 Active Events across Fleet',
      exposure: '$1,624,000 total commercial exposure',
      activeRecommendationId: 'REQ-8812',
      recTitle: 'Fleet Priority: Approve Riverside P-104 Overhaul',
      recDesc: 'Primary operational bottleneck: P-104 overhaul scheduled for night shift to safeguard $1.2M Order #4471.',
      recCost: '$18,000',
      recDowntime: '0 hours unplanned downtime',
      recSavings: '$1,200,000 contract protected',
      chartLabel: 'Fleet Normalized Operating Efficiency & Throughput',
      outputUnit: 'Index (Base 100)',
      energyUnit: 'Fleet Index',
      trustBreakdown: [
        { name: 'High Trust (≥ 0.90)', value: 92.6, color: '#27B6A8' },
        { name: 'Medium Trust (0.75-0.89)', value: 5.2, color: '#E9AC45' },
        { name: 'Degraded / Flagged (< 0.75)', value: 2.2, color: '#E45D5D' },
      ],
      areas: [],
      lines: []
    }
  };

  const activeProfile = siteBaseProfiles[selectedSite] || siteBaseProfiles.all;

  // DYNAMIC KPI METRICS Matrix: modulated by BOTH selectedSite AND timeRange
  const dynamicKpis = useMemo(() => {
    // Lookup table for [site][timeRange]
    const matrix: Record<SiteId, Record<string, {
      coveragePct: number;
      coverageTrend: string;
      mappedTags: string;
      trustScore: number;
      trustDetail: string;
      availabilityPct: number;
      availabilityTrend: string;
      oeePct: number;
      oeeTrend: string;
      oeeTrendDir: 'up' | 'down';
      mtbfHours: number;
      mtbfTrend: string;
      mtbfSub: string;
      mttrHours: number;
      mttrTrend: string;
      energyValue: string;
      energyTrend: string;
      energyTrendDir: 'bad' | 'good';
    }>> = {
      riverside: {
        '1h': {
          coveragePct: 94.8,
          coverageTrend: '+0.1% in last hour',
          mappedTags: '12,450 / 13,100 tags',
          trustScore: 0.912,
          trustDetail: '1 stale feed (42s), 2 gaps',
          availabilityPct: 94.1,
          availabilityTrend: '-2.3% (P-104 friction drag)',
          oeePct: 78.2,
          oeeTrend: '-3.2% vs shift baseline',
          oeeTrendDir: 'down',
          mtbfHours: 38.2,
          mtbfTrend: '-21% short-term rolling',
          mtbfSub: 'Slurry bearing heating up',
          mttrHours: 2.2,
          mttrTrend: 'Pre-staged crew ready',
          energyValue: '21.4 kWh',
          energyTrend: '+3.1 kWh/case (Thermal drag)',
          energyTrendDir: 'bad'
        },
        '24h': {
          coveragePct: 94.8,
          coverageTrend: '+2.1% mapped (24h)',
          mappedTags: '12,450 / 13,100 tags',
          trustScore: 0.912,
          trustDetail: '1 stale feed (42s), 2 gaps',
          availabilityPct: 96.4,
          availabilityTrend: '+0.8% vs yesterday',
          oeePct: 81.4,
          oeeTrend: '-1.2% (Line 2 Bottling dip)',
          oeeTrendDir: 'down',
          mtbfHours: 42.5,
          mtbfTrend: '-14% (Degrading pump P-104)',
          mtbfSub: 'Traced to slurry bearing friction',
          mttrHours: 2.4,
          mttrTrend: '-0.4 h with pre-staged kits',
          energyValue: '19.8 kWh',
          energyTrend: '+1.3 kWh/case (Frictional drag)',
          energyTrendDir: 'bad'
        },
        '7d': {
          coveragePct: 95.1,
          coverageTrend: '+3.4% mapped this week',
          mappedTags: '12,480 / 13,100 tags',
          trustScore: 0.934,
          trustDetail: 'Historical 7d quality 93.4%',
          availabilityPct: 97.2,
          availabilityTrend: '+1.4% weekly average',
          oeePct: 83.8,
          oeeTrend: '+0.6% weekly average',
          oeeTrendDir: 'up',
          mtbfHours: 48.6,
          mtbfTrend: '-6.2% vs previous week',
          mtbfSub: 'Degradation isolated to Day 5-7',
          mttrHours: 2.5,
          mttrTrend: 'Consistent parts staging',
          energyValue: '19.1 kWh',
          energyTrend: '+0.4 kWh/case weekly avg',
          energyTrendDir: 'bad'
        },
        '30d': {
          coveragePct: 95.6,
          coverageTrend: '+5.2% mapped this month',
          mappedTags: '12,520 / 13,100 tags',
          trustScore: 0.948,
          trustDetail: 'Governed monthly trust rating',
          availabilityPct: 98.1,
          availabilityTrend: '+2.1% monthly operational SLA',
          oeePct: 85.8,
          oeeTrend: '+1.8% vs governed 85% target',
          oeeTrendDir: 'up',
          mtbfHours: 62.4,
          mtbfTrend: '+8.4% monthly baseline',
          mtbfSub: 'Governed multi-batch average',
          mttrHours: 2.7,
          mttrTrend: '-0.8h vs plant Q3 SLA',
          energyValue: '18.4 kWh',
          energyTrend: '-0.6 kWh/case vs baseline',
          energyTrendDir: 'good'
        }
      },
      'water-station-7': {
        '1h': {
          coveragePct: 92.4,
          coverageTrend: '0.0% in last hour',
          mappedTags: '4,120 / 4,450 tags',
          trustScore: 0.740,
          trustDetail: 'Cellular link stale 42s',
          availabilityPct: 91.8,
          availabilityTrend: '-2.4% during packet fade',
          oeePct: 79.5,
          oeeTrend: '-2.6% (Impeller wear drag)',
          oeeTrendDir: 'down',
          mtbfHours: 64.0,
          mtbfTrend: '-18% during link delay',
          mtbfSub: 'Cellular link stale 42s',
          mttrHours: 3.6,
          mttrTrend: 'Mobile crew in transit',
          energyValue: '334 kWh',
          energyTrend: '+38 kWh/ML (Recirculation)',
          energyTrendDir: 'bad'
        },
        '24h': {
          coveragePct: 92.4,
          coverageTrend: '+1.2% mapped (24h)',
          mappedTags: '4,120 / 4,450 tags',
          trustScore: 0.884,
          trustDetail: 'Cellular link recovered',
          availabilityPct: 94.2,
          availabilityTrend: '-1.1% 24h rolling',
          oeePct: 82.1,
          oeeTrend: '-0.9% (Pump 701 wear)',
          oeeTrendDir: 'down',
          mtbfHours: 72.0,
          mtbfTrend: '-8% on Remote Trunk Delta',
          mtbfSub: 'Impeller wear & recirculation',
          mttrHours: 3.8,
          mttrTrend: 'Mobile field crew transit',
          energyValue: '310 kWh',
          energyTrend: '+24 kWh/ML (Cavitation drag)',
          energyTrendDir: 'bad'
        },
        '7d': {
          coveragePct: 93.8,
          coverageTrend: '+2.8% mapped this week',
          mappedTags: '4,180 / 4,450 tags',
          trustScore: 0.912,
          trustDetail: '98.2% cellular link uptime',
          availabilityPct: 96.0,
          availabilityTrend: '+0.5% 7-day average',
          oeePct: 84.8,
          oeeTrend: '+1.2% weekly uptime',
          oeeTrendDir: 'up',
          mtbfHours: 79.5,
          mtbfTrend: '-2.4% vs previous week',
          mtbfSub: 'High seasonal demand cycle',
          mttrHours: 3.5,
          mttrTrend: 'Standard mobile protocol',
          energyValue: '298 kWh',
          energyTrend: '+12 kWh/ML weekly avg',
          energyTrendDir: 'bad'
        },
        '30d': {
          coveragePct: 94.2,
          coverageTrend: '+4.0% mapped this month',
          mappedTags: '4,200 / 4,450 tags',
          trustScore: 0.932,
          trustDetail: 'Monthly audit certified',
          availabilityPct: 97.4,
          availabilityTrend: '+1.8% monthly compliance',
          oeePct: 87.2,
          oeeTrend: '+2.2% monthly pumping target',
          oeeTrendDir: 'up',
          mtbfHours: 88.0,
          mtbfTrend: '+6.1% monthly maintenance',
          mtbfSub: 'Station 7 remote reliability',
          mttrHours: 3.2,
          mttrTrend: '-0.6h vs district SLA',
          energyValue: '286 kWh',
          energyTrend: '-14 kWh/ML vs monthly target',
          energyTrendDir: 'good'
        }
      },
      'fulfillment-3': {
        '1h': {
          coveragePct: 97.2,
          coverageTrend: '0.0% in last hour',
          mappedTags: '8,260 / 8,500 tags',
          trustScore: 0.965,
          trustDetail: 'Photo-eye clarity flagged',
          availabilityPct: 98.8,
          availabilityTrend: '-0.6% lens dust slowdown',
          oeePct: 86.4,
          oeeTrend: '-2.1% in current wave',
          oeeTrendDir: 'down',
          mtbfHours: 88.0,
          mtbfTrend: '-6% optical dust slowdown',
          mtbfSub: 'Sorter 3 Induct Lane B',
          mttrHours: 0.8,
          mttrTrend: 'Rapid shift response',
          energyValue: '15.1 kWh',
          energyTrend: '+0.9 kWh/k-pkg (Induct throttle)',
          energyTrendDir: 'bad'
        },
        '24h': {
          coveragePct: 97.2,
          coverageTrend: '+0.8% mapped (24h)',
          mappedTags: '8,260 / 8,500 tags',
          trustScore: 0.981,
          trustDetail: 'Optical clarity 64.2%',
          availabilityPct: 99.4,
          availabilityTrend: '+0.2% vs yesterday',
          oeePct: 88.5,
          oeeTrend: '+1.4% across 4 sorter halls',
          oeeTrendDir: 'up',
          mtbfHours: 94.0,
          mtbfTrend: '+4.2% on sorting lines',
          mtbfSub: 'Preventive optical cleaning',
          mttrHours: 1.2,
          mttrTrend: '-0.3h rapid lane intervention',
          energyValue: '14.2 kWh',
          energyTrend: '-0.8 kWh/k-pkg (VFD efficiency)',
          energyTrendDir: 'good'
        },
        '7d': {
          coveragePct: 98.0,
          coverageTrend: '+2.1% mapped this week',
          mappedTags: '8,330 / 8,500 tags',
          trustScore: 0.986,
          trustDetail: 'Optical scanners 99.8% read',
          availabilityPct: 99.6,
          availabilityTrend: '+0.4% weekly average',
          oeePct: 90.2,
          oeeTrend: '+2.1% weekly sortation SLA',
          oeeTrendDir: 'up',
          mtbfHours: 104.0,
          mtbfTrend: '+8.5% vs previous week',
          mtbfSub: 'Automated shoe divert uptime',
          mttrHours: 1.1,
          mttrTrend: 'Fast-lane tool kit',
          energyValue: '13.8 kWh',
          energyTrend: '-1.4 kWh/k-pkg weekly avg',
          energyTrendDir: 'good'
        },
        '30d': {
          coveragePct: 98.5,
          coverageTrend: '+3.5% mapped this month',
          mappedTags: '8,370 / 8,500 tags',
          trustScore: 0.990,
          trustDetail: 'Logistics SLA certified',
          availabilityPct: 99.8,
          availabilityTrend: '+0.6% monthly benchmark',
          oeePct: 91.8,
          oeeTrend: '+3.2% vs network SLA',
          oeeTrendDir: 'up',
          mtbfHours: 118.0,
          mtbfTrend: '+12.4% monthly baseline',
          mtbfSub: 'Peak season preparedness',
          mttrHours: 0.9,
          mttrTrend: '-0.4h vs regional hub SLA',
          energyValue: '13.4 kWh',
          energyTrend: '-2.1 kWh/k-pkg monthly avg',
          energyTrendDir: 'good'
        }
      },
      all: {
        '1h': {
          coveragePct: 94.8,
          coverageTrend: '+0.1% fleet last hour',
          mappedTags: '24,830 / 26,050 tags',
          trustScore: 0.892,
          trustDetail: '2 localized anomalies live',
          availabilityPct: 95.1,
          availabilityTrend: '-1.2% composite dip',
          oeePct: 80.8,
          oeeTrend: '-2.4% vs composite target',
          oeeTrendDir: 'down',
          mtbfHours: 51.2,
          mtbfTrend: '-12% fleet rolling',
          mtbfSub: 'Line 2 & Station 7 drag',
          mttrHours: 2.0,
          mttrTrend: 'Coordinated crew response',
          energyValue: '19.4 kWh',
          energyTrend: '+1.2% fleet energy index',
          energyTrendDir: 'bad'
        },
        '24h': {
          coveragePct: 94.8,
          coverageTrend: '+1.8% fleet mapped (24h)',
          mappedTags: '24,830 / 26,050 tags',
          trustScore: 0.926,
          trustDetail: '12,450 critical tags scored',
          availabilityPct: 96.8,
          availabilityTrend: '+0.5% fleet average',
          oeePct: 83.2,
          oeeTrend: '+0.4% aggregate OEE',
          oeeTrendDir: 'up',
          mtbfHours: 56.4,
          mtbfTrend: '-4.2% (Line 2 bottleneck)',
          mtbfSub: 'Multi-site normalized baseline',
          mttrHours: 2.1,
          mttrTrend: '-0.4h overall resolution',
          energyValue: '18.2 kWh',
          energyTrend: '-1.8% fleet energy intensity',
          energyTrendDir: 'good'
        },
        '7d': {
          coveragePct: 95.8,
          coverageTrend: '+2.9% fleet mapped (7d)',
          mappedTags: '24,990 / 26,050 tags',
          trustScore: 0.942,
          trustDetail: 'Fleet weekly quality 94.2%',
          availabilityPct: 97.4,
          availabilityTrend: '+0.9% weekly average',
          oeePct: 85.6,
          oeeTrend: '+1.6% weekly fleet trend',
          oeeTrendDir: 'up',
          mtbfHours: 64.2,
          mtbfTrend: '+2.1% vs previous week',
          mtbfSub: 'Strong Fulfillment Center uplift',
          mttrHours: 2.0,
          mttrTrend: 'Pre-staged spares verified',
          energyValue: '17.6 kWh',
          energyTrend: '-2.4% fleet energy intensity',
          energyTrendDir: 'good'
        },
        '30d': {
          coveragePct: 96.4,
          coverageTrend: '+4.2% fleet mapped (30d)',
          mappedTags: '25,090 / 26,050 tags',
          trustScore: 0.954,
          trustDetail: 'Enterprise 30-day compliance',
          availabilityPct: 98.3,
          availabilityTrend: '+1.5% monthly enterprise SLA',
          oeePct: 87.8,
          oeeTrend: '+2.8% vs enterprise 85% goal',
          oeeTrendDir: 'up',
          mtbfHours: 76.5,
          mtbfTrend: '+9.2% monthly baseline',
          mtbfSub: 'Normalized across 3 verticals',
          mttrHours: 1.9,
          mttrTrend: '-0.6h vs global target',
          energyValue: '17.1 kWh',
          energyTrend: '-3.2% fleet energy efficiency',
          energyTrendDir: 'good'
        }
      }
    };

    const siteTable = matrix[selectedSite] || matrix.all;
    return siteTable[timeRange] || siteTable['24h'];
  }, [selectedSite, timeRange]);

  // Dynamic Production & Output Performance Chart Data
  const chartData = useMemo(() => {
    if (selectedSite === 'riverside') {
      if (timeRange === '1h') {
        return [
          { time: '14:00', oee: 81.2, target: 85, output: 395 },
          { time: '14:12', oee: 80.8, target: 85, output: 390 },
          { time: '14:24', oee: 79.5, target: 85, output: 375 },
          { time: '14:36', oee: 78.4, target: 85, output: 362 },
          { time: '14:48', oee: 78.2, target: 85, output: 360 },
          { time: '15:00', oee: 78.5, target: 85, output: 365 },
        ];
      } else if (timeRange === '7d') {
        return [
          { time: 'Mon', oee: 86.2, target: 85, output: 430 },
          { time: 'Tue', oee: 85.8, target: 85, output: 425 },
          { time: 'Wed', oee: 84.0, target: 85, output: 410 },
          { time: 'Thu', oee: 81.5, target: 85, output: 385 },
          { time: 'Fri', oee: 78.2, target: 85, output: 360 },
          { time: 'Sat', oee: 80.4, target: 85, output: 380 },
          { time: 'Sun', oee: 81.0, target: 85, output: 390 },
        ];
      } else if (timeRange === '30d') {
        return [
          { time: 'Wk 1', oee: 87.0, target: 85, output: 440 },
          { time: 'Wk 2', oee: 86.4, target: 85, output: 435 },
          { time: 'Wk 3', oee: 84.1, target: 85, output: 415 },
          { time: 'Wk 4', oee: 80.5, target: 85, output: 380 },
          { time: 'Current', oee: 78.2, target: 85, output: 360 },
        ];
      } else {
        // 24h
        return [
          { time: '00:00', oee: 84.0, target: 85, output: 420 },
          { time: '04:00', oee: 83.2, target: 85, output: 415 },
          { time: '08:00', oee: 81.5, target: 85, output: 390 },
          { time: '12:00', oee: 78.0, target: 85, output: 360 },
          { time: '16:00', oee: 79.2, target: 85, output: 375 },
          { time: '20:00', oee: 80.4, target: 85, output: 385 },
        ];
      }
    } else if (selectedSite === 'water-station-7') {
      if (timeRange === '1h') {
        return [
          { time: '14:00', oee: 83.5, target: 85, output: 220 },
          { time: '14:12', oee: 82.8, target: 85, output: 215 },
          { time: '14:24', oee: 81.2, target: 85, output: 200 },
          { time: '14:36', oee: 79.5, target: 85, output: 185 },
          { time: '14:48', oee: 79.2, target: 85, output: 180 },
          { time: '15:00', oee: 79.8, target: 85, output: 188 },
        ];
      } else if (timeRange === '7d') {
        return [
          { time: 'Mon', oee: 87.1, target: 85, output: 240 },
          { time: 'Tue', oee: 86.4, target: 85, output: 235 },
          { time: 'Wed', oee: 85.0, target: 85, output: 225 },
          { time: 'Thu', oee: 83.2, target: 85, output: 210 },
          { time: 'Fri', oee: 82.1, target: 85, output: 195 },
          { time: 'Sat', oee: 84.0, target: 85, output: 215 },
          { time: 'Sun', oee: 84.5, target: 85, output: 220 },
        ];
      } else if (timeRange === '30d') {
        return [
          { time: 'Wk 1', oee: 88.5, target: 85, output: 250 },
          { time: 'Wk 2', oee: 87.8, target: 85, output: 245 },
          { time: 'Wk 3', oee: 86.2, target: 85, output: 230 },
          { time: 'Wk 4', oee: 84.1, target: 85, output: 210 },
          { time: 'Current', oee: 82.1, target: 85, output: 195 },
        ];
      } else {
        // 24h
        return [
          { time: '00:00', oee: 85.0, target: 85, output: 230 },
          { time: '04:00', oee: 84.2, target: 85, output: 225 },
          { time: '08:00', oee: 82.8, target: 85, output: 210 },
          { time: '12:00', oee: 80.5, target: 85, output: 190 },
          { time: '16:00', oee: 81.2, target: 85, output: 195 },
          { time: '20:00', oee: 82.1, target: 85, output: 205 },
        ];
      }
    } else if (selectedSite === 'fulfillment-3') {
      if (timeRange === '1h') {
        return [
          { time: '14:00', oee: 89.2, target: 85, output: 890 },
          { time: '14:12', oee: 88.6, target: 85, output: 875 },
          { time: '14:24', oee: 87.4, target: 85, output: 850 },
          { time: '14:36', oee: 86.4, target: 85, output: 830 },
          { time: '14:48', oee: 86.8, target: 85, output: 840 },
          { time: '15:00', oee: 87.5, target: 85, output: 860 },
        ];
      } else if (timeRange === '7d') {
        return [
          { time: 'Mon', oee: 91.5, target: 85, output: 950 },
          { time: 'Tue', oee: 90.8, target: 85, output: 935 },
          { time: 'Wed', oee: 90.2, target: 85, output: 920 },
          { time: 'Thu', oee: 89.4, target: 85, output: 900 },
          { time: 'Fri', oee: 88.5, target: 85, output: 880 },
          { time: 'Sat', oee: 89.8, target: 85, output: 910 },
          { time: 'Sun', oee: 90.5, target: 85, output: 930 },
        ];
      } else if (timeRange === '30d') {
        return [
          { time: 'Wk 1', oee: 92.4, target: 85, output: 980 },
          { time: 'Wk 2', oee: 91.8, target: 85, output: 960 },
          { time: 'Wk 3', oee: 90.5, target: 85, output: 930 },
          { time: 'Wk 4', oee: 89.2, target: 85, output: 900 },
          { time: 'Current', oee: 88.5, target: 85, output: 880 },
        ];
      } else {
        // 24h
        return [
          { time: '00:00', oee: 90.2, target: 85, output: 920 },
          { time: '04:00', oee: 89.5, target: 85, output: 905 },
          { time: '08:00', oee: 88.8, target: 85, output: 890 },
          { time: '12:00', oee: 87.2, target: 85, output: 850 },
          { time: '16:00', oee: 88.0, target: 85, output: 870 },
          { time: '20:00', oee: 88.5, target: 85, output: 885 },
        ];
      }
    } else {
      // Fleet All
      if (timeRange === '1h') {
        return [
          { time: '14:00', oee: 82.8, target: 85, output: 104 },
          { time: '14:12', oee: 82.2, target: 85, output: 102 },
          { time: '14:24', oee: 81.4, target: 85, output: 99 },
          { time: '14:36', oee: 80.8, target: 85, output: 97 },
          { time: '14:48', oee: 81.0, target: 85, output: 98 },
          { time: '15:00', oee: 81.5, target: 85, output: 100 },
        ];
      } else if (timeRange === '7d') {
        return [
          { time: 'Mon', oee: 87.5, target: 85, output: 112 },
          { time: 'Tue', oee: 86.8, target: 85, output: 110 },
          { time: 'Wed', oee: 85.8, target: 85, output: 108 },
          { time: 'Thu', oee: 84.2, target: 85, output: 103 },
          { time: 'Fri', oee: 83.2, target: 85, output: 100 },
          { time: 'Sat', oee: 84.6, target: 85, output: 104 },
          { time: 'Sun', oee: 85.2, target: 85, output: 106 },
        ];
      } else if (timeRange === '30d') {
        return [
          { time: 'Wk 1', oee: 89.0, target: 85, output: 115 },
          { time: 'Wk 2', oee: 88.2, target: 85, output: 113 },
          { time: 'Wk 3', oee: 86.8, target: 85, output: 109 },
          { time: 'Wk 4', oee: 84.5, target: 85, output: 104 },
          { time: 'Current', oee: 83.2, target: 85, output: 100 },
        ];
      } else {
        // 24h
        return [
          { time: '00:00', oee: 85.5, target: 85, output: 108 },
          { time: '04:00', oee: 84.8, target: 85, output: 106 },
          { time: '08:00', oee: 83.5, target: 85, output: 102 },
          { time: '12:00', oee: 81.8, target: 85, output: 98 },
          { time: '16:00', oee: 82.5, target: 85, output: 100 },
          { time: '20:00', oee: 83.2, target: 85, output: 102 },
        ];
      }
    }
  }, [selectedSite, timeRange]);

  // Dynamic Energy Intensity Trend Chart Data
  const energyTrendData = useMemo(() => {
    if (timeRange === '1h') {
      return [
        { label: '14:00', actual: 18.8, baseline: 18.5 },
        { label: '14:15', actual: 19.4, baseline: 18.5 },
        { label: '14:30', actual: 21.2, baseline: 18.5 },
        { label: '14:45', actual: 21.4, baseline: 18.5 },
        { label: '15:00', actual: 20.8, baseline: 18.5 },
      ];
    } else if (timeRange === '7d') {
      return [
        { label: 'Mon', actual: 18.2, baseline: 18.5 },
        { label: 'Tue', actual: 18.4, baseline: 18.5 },
        { label: 'Wed', actual: 18.9, baseline: 18.5 },
        { label: 'Thu', actual: 19.8, baseline: 18.5 },
        { label: 'Fri', actual: 21.4, baseline: 18.5 },
        { label: 'Sat', actual: 20.1, baseline: 18.5 },
        { label: 'Sun', actual: 19.8, baseline: 18.5 },
      ];
    } else if (timeRange === '30d') {
      return [
        { label: 'Wk 1', actual: 18.1, baseline: 18.5 },
        { label: 'Wk 2', actual: 18.3, baseline: 18.5 },
        { label: 'Wk 3', actual: 18.7, baseline: 18.5 },
        { label: 'Wk 4', actual: 20.2, baseline: 18.5 },
        { label: 'Current', actual: 19.8, baseline: 18.5 },
      ];
    } else {
      // 24h
      return [
        { label: '00:00', actual: 18.4, baseline: 18.5 },
        { label: '04:00', actual: 18.6, baseline: 18.5 },
        { label: '08:00', actual: 19.2, baseline: 18.5 },
        { label: '12:00', actual: 21.0, baseline: 18.5 },
        { label: '16:00', actual: 20.4, baseline: 18.5 },
        { label: '20:00', actual: 19.8, baseline: 18.5 },
      ];
    }
  }, [timeRange, selectedSite]);

  // Filtered Assets based on Site & local dropdowns
  const filteredAssets = useMemo(() => {
    return assets.filter(a => {
      const matchSite = selectedSite === 'all' || a.siteId === selectedSite;
      const matchArea = selectedAreaFilter === 'all' || a.area === selectedAreaFilter;
      const matchLine = selectedLineFilter === 'all' || a.line === selectedLineFilter;
      return matchSite && matchArea && matchLine;
    });
  }, [assets, selectedSite, selectedAreaFilter, selectedLineFilter]);

  // Filtered Events based on Site
  const filteredEvents = useMemo(() => {
    return events.filter(e => {
      return (selectedSite === 'all' || e.siteId === selectedSite) && e.status === 'active';
    });
  }, [events, selectedSite]);

  // Active pending request for the selected site
  const activeApprovalReq = useMemo(() => {
    return approvalRequests.find(r => r.id === activeProfile.activeRecommendationId) || approvalRequests[0];
  }, [approvalRequests, activeProfile]);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner: Guided Demo Trigger & Executive Context */}
      <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-slate-800 text-white p-5 rounded-2xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-navy-700">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono tracking-wider bg-primary/20 text-primary-light px-2 py-0.5 rounded">
              Closed-Loop Operational Intelligence
            </span>
            <span className="text-xs text-slate-300 font-mono">
              · Facility: <strong>{activeProfile.name}</strong> ({activeProfile.location})
            </span>
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            Executive Operations Cockpit · Seiretsu Ecosystem
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            {activeProfile.domain}. Luminix continuously ingests and trust-scores telemetry across plant systems without touching control paths.
          </p>
        </div>

        <button
          onClick={() => openGuidedDemo(0)}
          className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-navy-950 font-bold text-xs rounded-xl shadow flex items-center gap-2 shrink-0 transition"
        >
          <Sparkles className="w-4 h-4 text-navy-950" />
          <span>Launch Guided Demo Scenario</span>
        </button>
      </div>

      {/* DASHBOARD CONTROLS: Facility Switcher & Time Window Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-surface-border shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left: Facility Quick Switcher Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mr-1">
            <Building2 className="w-3.5 h-3.5 text-primary" />
            <span>Facility:</span>
          </span>
          {[
            { id: 'all', label: 'All Sites (Global)', count: 'Fleet View' },
            { id: 'riverside', label: 'Riverside Plant', count: 'Food & Bev' },
            { id: 'water-station-7', label: 'Water Utility Station 7', count: 'Water' },
            { id: 'fulfillment-3', label: 'Fulfillment Center 3', count: 'Logistics' },
          ].map(siteItem => {
            const isSelected = selectedSite === siteItem.id;
            return (
              <button
                key={siteItem.id}
                onClick={() => handleSiteChange(siteItem.id as SiteId)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-navy-900 text-white border-navy-900 shadow-sm font-bold'
                    : 'bg-slate-50 text-slate-600 border-surface-border hover:bg-slate-100 hover:text-navy-900'
                }`}
              >
                <span>{siteItem.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  isSelected ? 'bg-primary text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {siteItem.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right: Time Range Tab Selector (1h, 24h, 7d, 30d) */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Time Window:</span>
          </span>

          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-2xs">
            {[
              { id: '1h', label: '1h', full: 'Past 1 Hour (Real-Time)' },
              { id: '24h', label: '24h', full: 'Past 24 Hours (Day Shift)' },
              { id: '7d', label: '7d', full: 'Past 7 Days (Weekly View)' },
              { id: '30d', label: '30d', full: 'Past 30 Days (Governed Monthly)' },
            ].map(tab => {
              const isSelected = timeRange === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTimeRangeChange(tab.id)}
                  title={tab.full}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                    isSelected
                      ? 'bg-primary text-white shadow-xs font-bold ring-2 ring-primary/20'
                      : 'text-slate-600 hover:text-navy-900 hover:bg-white/60'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <span className="text-xs font-mono text-slate-500 hidden xl:inline bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
            Window: <strong className="text-navy-900">{timeRange.toUpperCase()}</strong>
          </span>
        </div>
      </div>

      {/* 8 Primary KPI Cards (Dynamically driven by selectedSite and timeRange) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        {/* 1. Context Coverage */}
        <div
          onClick={() => navigate('/assets')}
          className="bg-white p-4 rounded-xl border border-surface-border shadow-2xs hover:border-primary/50 hover:shadow-sm transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Context Coverage</span>
            <Cpu className="w-4 h-4 text-primary group-hover:scale-110 transition" />
          </div>
          <div className="text-2xl font-bold text-navy-900 mt-2 font-mono">
            {dynamicKpis.coveragePct}%
          </div>
          <div className="flex items-center gap-1 text-[11px] text-teal mt-1 font-medium">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>{dynamicKpis.coverageTrend}</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1">{dynamicKpis.mappedTags}</div>
        </div>

        {/* 2. Trusted Data Points */}
        <div
          onClick={() => navigate('/connect-trust')}
          className="bg-white p-4 rounded-xl border border-surface-border shadow-2xs hover:border-teal/50 hover:shadow-sm transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Trusted Data Points</span>
            <ShieldCheck className="w-4 h-4 text-teal group-hover:scale-110 transition" />
          </div>
          <div className="text-2xl font-bold text-navy-900 mt-2 font-mono">
            {(dynamicKpis.trustScore * 100).toFixed(1)}%
          </div>
          <div className="flex items-center gap-1 text-[11px] text-teal mt-1 font-medium">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Above 0.90 threshold</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1 truncate" title={dynamicKpis.trustDetail}>
            {dynamicKpis.trustDetail}
          </div>
        </div>

        {/* 3. Active Events */}
        <div
          onClick={() => navigate('/events')}
          className="bg-white p-4 rounded-xl border border-surface-border shadow-2xs hover:border-rose/50 hover:shadow-sm transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Active Events</span>
            <AlertTriangle className="w-4 h-4 text-rose group-hover:scale-110 transition" />
          </div>
          <div className="text-2xl font-bold text-rose-600 mt-2 font-mono">
            {filteredEvents.length} <span className="text-xs text-slate-400 font-sans font-normal">Active</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-rose-600 mt-1 font-medium truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping shrink-0" />
            <span className="truncate">{activeProfile.criticalEventSummary}</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1 truncate">Exposure: {activeProfile.exposure}</div>
        </div>

        {/* 4. Plant Availability */}
        <div
          onClick={() => navigate('/kpis')}
          className="bg-white p-4 rounded-xl border border-surface-border shadow-2xs hover:border-primary/50 hover:shadow-sm transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Plant Availability</span>
            <Activity className="w-4 h-4 text-primary group-hover:scale-110 transition" />
          </div>
          <div className="text-2xl font-bold text-navy-900 mt-2 font-mono">
            {dynamicKpis.availabilityPct}%
          </div>
          <div className="flex items-center gap-1 text-[11px] text-teal mt-1 font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{dynamicKpis.availabilityTrend}</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Target: 95.0% Operational SLA</div>
        </div>

        {/* 5. Overall OEE */}
        <div
          onClick={() => navigate('/kpis')}
          className="bg-white p-4 rounded-xl border border-surface-border shadow-2xs hover:border-amber/50 hover:shadow-sm transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Facility OEE</span>
            <BarChart className="w-4 h-4 text-amber group-hover:scale-110 transition" />
          </div>
          <div className="text-2xl font-bold text-navy-900 mt-2 font-mono">
            {dynamicKpis.oeePct}%
          </div>
          <div className={`flex items-center gap-1 text-[11px] mt-1 font-medium ${
            dynamicKpis.oeeTrendDir === 'down' ? 'text-rose-600' : 'text-teal'
          }`}>
            {dynamicKpis.oeeTrendDir === 'down' ? <TrendingDown className="w-3.5 h-3.5" /> : <TrendingUp className="w-3.5 h-3.5" />}
            <span>{dynamicKpis.oeeTrend}</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Governed formula v3.2.1 ({timeRange})</div>
        </div>

        {/* 6. MTBF */}
        <div
          onClick={() => navigate('/kpis')}
          className="bg-white p-4 rounded-xl border border-surface-border shadow-2xs hover:border-amber/50 hover:shadow-sm transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>MTBF Metric</span>
            <Clock className="w-4 h-4 text-amber group-hover:scale-110 transition" />
          </div>
          <div className="text-2xl font-bold text-navy-900 mt-2 font-mono">
            {dynamicKpis.mtbfHours} h
          </div>
          <div className="flex items-center gap-1 text-[11px] text-rose-600 mt-1 font-medium">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>{dynamicKpis.mtbfTrend}</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1">{dynamicKpis.mtbfSub}</div>
        </div>

        {/* 7. MTTR */}
        <div
          onClick={() => navigate('/kpis')}
          className="bg-white p-4 rounded-xl border border-surface-border shadow-2xs hover:border-teal/50 hover:shadow-sm transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Mean Time To Repair</span>
            <Clock className="w-4 h-4 text-teal group-hover:scale-110 transition" />
          </div>
          <div className="text-2xl font-bold text-navy-900 mt-2 font-mono">
            {dynamicKpis.mttrHours} h
          </div>
          <div className="flex items-center gap-1 text-[11px] text-teal mt-1 font-medium">
            <TrendingDown className="w-3.5 h-3.5 text-teal" />
            <span>{dynamicKpis.mttrTrend}</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Pre-staged spares verified</div>
        </div>

        {/* 8. Energy Intensity */}
        <div
          onClick={() => navigate('/kpis')}
          className="bg-white p-4 rounded-xl border border-surface-border shadow-2xs hover:border-primary/50 hover:shadow-sm transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Energy Intensity</span>
            <Zap className="w-4 h-4 text-primary group-hover:scale-110 transition" />
          </div>
          <div className="text-2xl font-bold text-navy-900 mt-2 font-mono">
            {dynamicKpis.energyValue}
          </div>
          <div className={`flex items-center gap-1 text-[11px] mt-1 font-medium ${
            dynamicKpis.energyTrendDir === 'bad' ? 'text-amber-600' : 'text-teal'
          }`}>
            {dynamicKpis.energyTrendDir === 'bad' ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
            <span className="truncate">{dynamicKpis.energyTrend}</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Normalized per {activeProfile.energyUnit}</div>
        </div>
      </div>

      {/* Main Grid: Charts & Operations Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Production Performance & Energy Trends & Filterable Assets */}
        <div className="lg:col-span-2 space-y-6">
          {/* Dynamic Production Performance Chart */}
          <div className="bg-white p-5 rounded-2xl border border-surface-border shadow-2xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-navy-900 flex items-center gap-2">
                  <span>{activeProfile.chartLabel}</span>
                  <span className="text-[10px] bg-primary/10 text-primary-dark px-2 py-0.5 rounded font-mono font-semibold uppercase">
                    Window: {timeRange}
                  </span>
                </h3>
                <p className="text-xs text-slate-500">
                  Real-time telemetry trend ({activeProfile.outputUnit}) mapped against governed 85% benchmark
                </p>
              </div>

              <span className="text-xs font-mono bg-teal-50 text-teal-800 border border-teal-200 px-2.5 py-1 rounded font-semibold self-start sm:self-auto">
                Read-Only Industrial OT Tap
              </span>
            </div>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="oeeGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4F7DF3" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#4F7DF3" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} />
                  <YAxis domain={[70, 95]} stroke="#94a3b8" fontSize={11} unit="%" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#101827', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                  />
                  <Area type="monotone" dataKey="oee" stroke="#4F7DF3" strokeWidth={2.5} fillOpacity={1} fill="url(#oeeGrad)" name="Actual OEE %" />
                  <Line type="monotone" dataKey="target" stroke="#E9AC45" strokeDasharray="4 4" strokeWidth={1.5} name="Target (85%)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Energy & Resource Consumption Trends Chart (New high-density card) */}
          <div className="bg-white p-5 rounded-2xl border border-surface-border shadow-2xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-navy-900 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>Energy & Resource Intensity Trends ({activeProfile.energyUnit})</span>
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">
                    Time Window: {timeRange}
                  </span>
                </h3>
                <p className="text-xs text-slate-500">
                  Monitors motor thermal dissipation drag and energy efficiency vs governed baseline (18.5)
                </p>
              </div>

              <span className={`text-xs font-mono px-2 py-0.5 rounded font-semibold ${
                dynamicKpis.energyTrendDir === 'bad' ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-teal-50 text-teal-800 border border-teal-200'
              }`}>
                Current: {dynamicKpis.energyValue}
              </span>
            </div>

            <div className="h-44 w-full pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={energyTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="label" stroke="#94a3b8" fontSize={11} />
                  <YAxis domain={[15, 25]} stroke="#94a3b8" fontSize={11} unit={` ${activeProfile.energyUnit.split('/')[0]}`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#101827', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                  />
                  <Bar dataKey="actual" fill="#4F7DF3" radius={[4, 4, 0, 0]} name="Actual Consumption" />
                  <Line type="monotone" dataKey="baseline" stroke="#27B6A8" strokeDasharray="3 3" strokeWidth={2} name="Governed Baseline" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Filterable Monitored Assets Table */}
          <div className="bg-white p-5 rounded-2xl border border-surface-border shadow-2xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-navy-900">
                  Monitored Assets at {activeProfile.name} ({filteredAssets.length})
                </h3>
                <p className="text-xs text-slate-500">Tier A & B physical assets under active continuous context surveillance</p>
              </div>

              {/* Area & Line Filters for current site */}
              {activeProfile.areas.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  <select
                    value={selectedAreaFilter}
                    onChange={e => setSelectedAreaFilter(e.target.value)}
                    className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs text-navy-900 focus:outline-none"
                  >
                    <option value="all">All Areas</option>
                    {activeProfile.areas.map(a => (
                      <option key={a} value={a}>{a.split('(')[0]}</option>
                    ))}
                  </select>

                  <select
                    value={selectedLineFilter}
                    onChange={e => setSelectedLineFilter(e.target.value)}
                    className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs text-navy-900 focus:outline-none"
                  >
                    <option value="all">All Lines</option>
                    {activeProfile.lines.map(l => (
                      <option key={l} value={l}>{l.split('(')[0]}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-surface-border">
                  <tr>
                    <th className="py-2.5 px-3">Asset</th>
                    <th className="py-2.5 px-3">Hierarchy / Line</th>
                    <th className="py-2.5 px-3">Health</th>
                    <th className="py-2.5 px-3">Key Sensor Telemetry</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-border">
                  {filteredAssets.map(asset => (
                    <tr key={asset.id} className="hover:bg-slate-50/60 transition">
                      <td className="py-3 px-3 font-medium text-navy-900">
                        <div className="flex items-center gap-2">
                          <Cpu className="w-4 h-4 text-slate-400" />
                          <span>{asset.name}</span>
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">{asset.code}</div>
                      </td>
                      <td className="py-3 px-3 text-slate-600">
                        <div>{asset.area}</div>
                        <div className="text-[10px] text-slate-400">{asset.line}</div>
                      </td>
                      <td className="py-3 px-3 font-mono">
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                          asset.healthScore < 70 ? 'bg-rose-100 text-rose-800' :
                          asset.healthScore < 85 ? 'bg-amber-100 text-amber-800' :
                          'bg-teal-100 text-teal-800'
                        }`}>
                          {asset.healthScore}%
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-mono text-navy-900 font-semibold">
                          {asset.sensors[0]?.tag}: {asset.sensors[0]?.currentValue} {asset.sensors[0]?.unit}
                        </div>
                        <div className="text-[10px] text-slate-400">{asset.sensors[0]?.rateOfChange}</div>
                      </td>
                      <td className="py-3 px-3">
                        <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${
                          asset.healthStatus === 'degrading' ? 'bg-rose-500 animate-ping' :
                          asset.healthStatus === 'good' ? 'bg-teal-500' : 'bg-emerald-500'
                        }`} />
                        <span className="capitalize text-slate-700">{asset.healthStatus}</span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => navigate('/assets')}
                          className="px-2 py-1 bg-slate-100 hover:bg-primary hover:text-white rounded text-[11px] text-slate-600 font-medium transition"
                        >
                          Context
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Col: Urgent Sirach Recommendation, Data Trust, Active Anomaly Feed & Outcomes */}
        <div className="space-y-6">
          {/* Site-Specific Sirach Recommendation Card */}
          <div className="bg-gradient-to-br from-white to-primary-light/40 p-5 rounded-2xl border border-primary/30 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-primary" />
                <span className="text-xs font-bold uppercase tracking-wide text-primary-dark">
                  Sirach Priority Action
                </span>
              </div>
              <span className="text-[10px] font-mono bg-primary text-white px-2 py-0.5 rounded font-bold">
                RECOMMENDED
              </span>
            </div>

            <h4 className="text-sm font-bold text-navy-900">
              {activeProfile.recTitle}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {activeProfile.recDesc}
            </p>

            <div className="bg-white/90 p-3 rounded-xl border border-primary/20 space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500">Est. Cost:</span>
                <span className="font-semibold text-navy-900">{activeProfile.recCost}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Production Impact:</span>
                <span className="font-semibold text-teal-dark">{activeProfile.recDowntime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Risk Protected:</span>
                <span className="font-semibold text-emerald-600 truncate ml-2">{activeProfile.recSavings}</span>
              </div>
            </div>

            {/* Action Buttons */}
            {activeApprovalReq && activeApprovalReq.status === 'pending' ? (
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => approveRequest(activeApprovalReq.id)}
                  className="flex-1 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-sm flex items-center justify-center gap-1.5 transition"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Authorize & Sign Off</span>
                </button>
                <button
                  onClick={() => navigate('/decisions')}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-xl transition"
                >
                  Compare
                </button>
              </div>
            ) : (
              <div className="p-2.5 bg-teal-50 border border-teal-200 rounded-xl text-xs text-teal-800 font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal" />
                <span>Action authorized and synchronized in business queue</span>
              </div>
            )}
          </div>

          {/* Active Anomalies & Event Feed (New high-priority operational widget) */}
          <div className="bg-white p-5 rounded-2xl border border-surface-border shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-500" />
                <h3 className="text-sm font-bold text-navy-900">Active Anomaly Feed</h3>
              </div>
              <button
                onClick={() => navigate('/events')}
                className="text-xs text-primary hover:underline font-medium"
              >
                All Events ({events.length})
              </button>
            </div>

            <div className="space-y-2.5">
              {filteredEvents.map(evt => (
                <div
                  key={evt.id}
                  className="p-3 bg-slate-50 hover:bg-slate-100/70 border border-slate-200/80 rounded-xl text-xs space-y-1.5 transition cursor-pointer"
                  onClick={() => navigate('/root-cause')}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-navy-900">{evt.name}</span>
                    <SeverityBadge severity={evt.severity} />
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    {evt.assetName} · {evt.area}
                  </div>
                  <div className="text-slate-600 line-clamp-2 leading-relaxed">
                    {evt.description}
                  </div>
                  <div className="flex items-center justify-between pt-1 text-[11px]">
                    <span className="text-rose-600 font-semibold font-mono">
                      Limit Breach: ~{evt.daysToLimit} days
                    </span>
                    <span className="text-primary hover:underline font-semibold flex items-center gap-1">
                      <span>RCA Timeline</span>
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Data Quality & Trust Score Donut Chart */}
          <div className="bg-white p-5 rounded-2xl border border-surface-border shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-navy-900">Data Trust Score (LX-04)</h3>
                <p className="text-xs text-slate-500">{activeProfile.name}</p>
              </div>
              <TrustScoreBadge score={dynamicKpis.trustScore} />
            </div>

            <div className="h-44 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={activeProfile.trustBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={48}
                    outerRadius={68}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {activeProfile.trustBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val) => [`${val}%`, 'Share']}
                    contentStyle={{ backgroundColor: '#101827', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-1 text-xs text-slate-600">
              {activeProfile.trustBreakdown.map(item => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-[11px]">{item.name}</span>
                  </div>
                  <span className="font-mono font-semibold">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Recorded Outcomes */}
          <div className="bg-white p-5 rounded-2xl border border-surface-border shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-navy-900">Recent Operational Outcomes</h3>
              <button
                onClick={() => navigate('/outcomes')}
                className="text-xs text-primary hover:underline font-medium"
              >
                View All
              </button>
            </div>
            <div className="space-y-2.5">
              {outcomes.slice(0, 2).map(outcome => (
                <div key={outcome.id} className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-navy-900">{outcome.assetName}</span>
                    <span className="text-[10px] text-teal-dark bg-teal-50 px-1.5 py-0.5 rounded font-medium border border-teal-200">
                      {outcome.result}
                    </span>
                  </div>
                  <div className="text-slate-600 line-clamp-1">{outcome.actionTaken}</div>
                  <div className="text-[11px] text-slate-500 font-mono pt-1 flex justify-between">
                    <span>{outcome.downtimeAvoided}</span>
                    <span className="text-teal font-semibold">{outcome.costIncurred}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
