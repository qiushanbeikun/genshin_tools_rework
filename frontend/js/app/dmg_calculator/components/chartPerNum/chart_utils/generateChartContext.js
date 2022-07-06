import { baseChartData } from './baseChartUtils';
import { prevChartData } from './pervChartUtils';
import { GRAPH_COLORS_PRESETS } from '../../constants';
import { generateLabels } from './utils';

export const generateChartContext = async (panel, labels, boundary, type) => {
  const xAxis = generateLabels(boundary, type);
  const values =
    type === 'base'
      ? labels.map((field) => baseChartData(boundary, field, panel))
      : labels.map((field) => prevChartData(boundary, field, panel));

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: `Damage Delta Expectation (${type.toUpperCase()})`,
      },
    },
  };

  const data = {
    labels: xAxis,
    datasets: values.map((value, index) => {
      return {
        id: index,
        label: labels[index].value,
        fill: true,
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: value,
        borderColor: GRAPH_COLORS_PRESETS[index],
      };
    }),
  };

  return {
    options: options,
    data: data,
  };
};
