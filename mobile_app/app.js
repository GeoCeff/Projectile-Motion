const g = 9.8;

function getArea(radius) {
  return Math.PI * radius * radius;
}

function simulateFall({ mass, radius, dragCoeff, rho, dt, tMax }) {
  const A = getArea(radius);
  const t = [];
  const yNoDrag = [];
  const vNoDrag = [];
  const aNoDrag = [];
  const yDrag = [];
  const vDrag = [];
  const aDrag = [];

  let y1 = 0;
  let v1 = 0;
  let y2 = 0;
  let v2 = 0;

  for (let time = 0; time <= tMax + 1e-9; time += dt) {
    t.push(time);

    const a1 = -g;
    v1 += a1 * dt;
    y1 += v1 * dt;
    yNoDrag.push(y1);
    vNoDrag.push(v1);
    aNoDrag.push(a1);

    const drag = (0.5 * dragCoeff * rho * A * v2 * Math.abs(v2)) / mass;
    const a2 = -g - drag;
    v2 += a2 * dt;
    y2 += v2 * dt;
    yDrag.push(y2);
    vDrag.push(v2);
    aDrag.push(a2);
  }

  return { t, yNoDrag, vNoDrag, aNoDrag, yDrag, vDrag, aDrag };
}

function simulateProjectile({ v0, angle, mass, radius, dragCoeff, rho, dt }) {
  const A = getArea(radius);
  const angleRad = (angle * Math.PI) / 180;
  const vx1 = v0 * Math.cos(angleRad);
  const vy1 = v0 * Math.sin(angleRad);
  const vx2 = v0 * Math.cos(angleRad);
  const vy2 = v0 * Math.sin(angleRad);

  const xNoDrag = [];
  const yNoDrag = [];
  const xDrag = [];
  const yDrag = [];

  let x1 = 0;
  let y1 = 0;
  let vxOne = vx1;
  let vyOne = vy1;
  let x2 = 0;
  let y2 = 0;
  let vxTwo = vx2;
  let vyTwo = vy2;

  while (y1 >= 0) {
    xNoDrag.push(x1);
    yNoDrag.push(y1);
    vyOne -= g * dt;
    x1 += vxOne * dt;
    y1 += vyOne * dt;
  }

  while (y2 >= 0) {
    xDrag.push(x2);
    yDrag.push(y2);
    const v = Math.sqrt(vxTwo * vxTwo + vyTwo * vyTwo);
    const dragX = (0.5 * dragCoeff * rho * A * vxTwo * Math.abs(v)) / mass;
    const dragY = (0.5 * dragCoeff * rho * A * vyTwo * Math.abs(v)) / mass;
    const ax = -dragX;
    const ay = -g - dragY;
    vxTwo += ax * dt;
    vyTwo += ay * dt;
    x2 += vxTwo * dt;
    y2 += vyTwo * dt;
  }

  return { xNoDrag, yNoDrag, xDrag, yDrag };
}

function createChart(context, config) {
  return new Chart(context, config);
}

function buildLineConfig(labels, datasets, title) {
  return {
    type: 'line',
    data: { labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: { display: true, text: title, color: '#f8fafc', font: { size: 16 } },
        legend: { labels: { color: '#cbd5e1' } }
      },
      scales: {
        x: { ticks: { color: '#cbd5e1' }, grid: { color: 'rgba(148,163,184,0.12)' } },
        y: { ticks: { color: '#cbd5e1' }, grid: { color: 'rgba(148,163,184,0.12)' } }
      }
    }
  };
}

function buildXYConfig(labels, datasets, title) {
  return {
    type: 'line',
    data: { labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: { display: true, text: title, color: '#f8fafc', font: { size: 16 } },
        legend: { labels: { color: '#cbd5e1' } }
      },
      scales: {
        x: { title: { display: true, text: 'Horizontal distance (m)', color: '#cbd5e1' }, ticks: { color: '#cbd5e1' }, grid: { color: 'rgba(148,163,184,0.12)' } },
        y: { title: { display: true, text: 'Vertical height (m)', color: '#cbd5e1' }, ticks: { color: '#cbd5e1' }, grid: { color: 'rgba(148,163,184,0.12)' }, reverse: true }
      }
    }
  };
}

function getInputValue(id) {
  return parseFloat(document.getElementById(id).value);
}

function renderFall() {
  const payload = {
    mass: getInputValue('mass'),
    radius: getInputValue('radius'),
    dragCoeff: getInputValue('dragCoeff'),
    rho: getInputValue('rho'),
    dt: getInputValue('dt'),
    tMax: getInputValue('tMax')
  };

  const result = simulateFall(payload);
  const labels = result.t.map((value) => value.toFixed(2));

  const datasets = [
    {
      label: 'No Air Resistance',
      data: result.yNoDrag,
      borderColor: '#38bdf8',
      backgroundColor: 'rgba(56, 189, 248, 0.2)',
      tension: 0.25
    },
    {
      label: 'With Air Resistance',
      data: result.yDrag,
      borderColor: '#a855f7',
      backgroundColor: 'rgba(168, 85, 247, 0.2)',
      tension: 0.25
    }
  ];

  updateChart(chartY, buildLineConfig(labels, datasets, 'Position vs Time'));

  const vDatasets = [
    {
      label: 'No Air Resistance',
      data: result.vNoDrag,
      borderColor: '#38bdf8',
      backgroundColor: 'rgba(56, 189, 248, 0.2)',
      tension: 0.25
    },
    {
      label: 'With Air Resistance',
      data: result.vDrag,
      borderColor: '#a855f7',
      backgroundColor: 'rgba(168, 85, 247, 0.2)',
      tension: 0.25
    }
  ];
  updateChart(chartV, buildLineConfig(labels, vDatasets, 'Velocity vs Time'));

  const aDatasets = [
    {
      label: 'No Air Resistance',
      data: result.aNoDrag,
      borderColor: '#38bdf8',
      backgroundColor: 'rgba(56, 189, 248, 0.2)',
      tension: 0.25
    },
    {
      label: 'With Air Resistance',
      data: result.aDrag,
      borderColor: '#a855f7',
      backgroundColor: 'rgba(168, 85, 247, 0.2)',
      tension: 0.25
    }
  ];
  updateChart(chartA, buildLineConfig(labels, aDatasets, 'Acceleration vs Time'));
}

function renderProjectile() {
  const payload = {
    v0: getInputValue('v0'),
    angle: getInputValue('angle'),
    mass: getInputValue('mass2'),
    radius: getInputValue('radius'),
    dragCoeff: getInputValue('dragCoeff2'),
    rho: getInputValue('rho2'),
    dt: getInputValue('dt2')
  };

  const result = simulateProjectile(payload);
  const maxLength = Math.max(result.xNoDrag.length, result.xDrag.length);
  const labels = Array.from({ length: maxLength }, (_, i) => i + 1);

  const datasets = [
    {
      label: 'No Air Resistance',
      data: result.xNoDrag.map((x, index) => ({ x, y: result.yNoDrag[index] })),
      borderColor: '#38bdf8',
      backgroundColor: 'rgba(56, 189, 248, 0.2)',
      fill: false,
      tension: 0.25,
      showLine: true
    },
    {
      label: 'With Air Resistance',
      data: result.xDrag.map((x, index) => ({ x, y: result.yDrag[index] })),
      borderColor: '#a855f7',
      backgroundColor: 'rgba(168, 85, 247, 0.2)',
      fill: false,
      tension: 0.25,
      showLine: true
    }
  ];

  updateChart(chartXY, {
    type: 'scatter',
    data: { datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: { display: true, text: 'Projectile Path Comparison', color: '#f8fafc', font: { size: 16 } },
        legend: { labels: { color: '#cbd5e1' } }
      },
      scales: {
        x: { title: { display: true, text: 'Horizontal distance (m)', color: '#cbd5e1' }, ticks: { color: '#cbd5e1' }, grid: { color: 'rgba(148,163,184,0.12)' } },
        y: { title: { display: true, text: 'Vertical height (m)', color: '#cbd5e1' }, ticks: { color: '#cbd5e1' }, grid: { color: 'rgba(148,163,184,0.12)' } }
      }
    }
  });
}

function updateChart(chart, config) {
  chart.config.type = config.type;
  chart.config.data = config.data;
  chart.config.options = config.options;
  chart.update();
}

const chartY = createChart(document.getElementById('chartY').getContext('2d'), buildLineConfig([], [], ''));
const chartV = createChart(document.getElementById('chartV').getContext('2d'), buildLineConfig([], [], ''));
const chartA = createChart(document.getElementById('chartA').getContext('2d'), buildLineConfig([], [], ''));
const chartXY = createChart(document.getElementById('chartXY').getContext('2d'), { type: 'scatter', data: { datasets: [] }, options: { responsive: true, maintainAspectRatio: false } });

document.getElementById('runFall').addEventListener('click', renderFall);
document.getElementById('runProjectile').addEventListener('click', renderProjectile);

renderFall();
renderProjectile();
