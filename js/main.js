/**
 * Physics 356 — ML/AI Lesson Site
 * main.js — Interactive demos and utilities
 */

/* =========================================================
   Utility: Mark active nav link
   ========================================================= */
(function markActiveNav() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav a').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

/* =========================================================
   Lesson 35 — Gradient Descent Interactive Demo
   ========================================================= */
function initGradientDescentDemo() {
  const canvas = document.getElementById('demo-chart-container');
  if (!canvas) return;

  let chart = null;
  let animFrame = null;
  let iterData = [];

  // Simple quadratic loss: L(w) = (w - 3)^2
  // True minimum at w* = 3
  const trueLoss = w => (w - 3) ** 2;
  const trueGrad = w => 2 * (w - 3);

  function runGD(lr, steps = 80, w0 = -4) {
    const ws = [w0];
    const ls = [trueLoss(w0)];
    let w = w0;
    for (let i = 0; i < steps; i++) {
      w = w - lr * trueGrad(w);
      ws.push(w);
      ls.push(trueLoss(w));
    }
    return { ws, ls };
  }

  function buildChart(lrValue) {
    const { ws, ls } = runGD(lrValue, 80, -4);
    iterData = ls;

    const labels = ls.map((_, i) => i);

    const lossData = {
      labels,
      datasets: [
        {
          label: 'Training Loss  L(w)',
          data: ls,
          borderColor: '#003087',
          backgroundColor: 'rgba(0,48,135,0.08)',
          borderWidth: 2.5,
          pointRadius: 0,
          fill: true,
          tension: 0.3,
        }
      ]
    };

    if (chart) chart.destroy();

    const ctx = document.getElementById('gd-chart').getContext('2d');
    chart = new Chart(ctx, {
      type: 'line',
      data: lossData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 400 },
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: {
            labels: { font: { family: "'Inter', sans-serif", size: 13 } }
          },
          tooltip: {
            callbacks: {
              label: ctx => ` Loss: ${ctx.parsed.y.toFixed(4)}`
            }
          }
        },
        scales: {
          x: {
            title: { display: true, text: 'Iteration', font: { size: 12 } },
            ticks: { maxTicksLimit: 10 }
          },
          y: {
            title: { display: true, text: 'Loss L(w)', font: { size: 12 } },
            min: 0
          }
        }
      }
    });

    updateInfo(lrValue, ls);
  }

  function updateInfo(lr, ls) {
    const finalLoss = ls[ls.length - 1];
    const converged = finalLoss < 0.01;
    document.getElementById('demo-final-loss').textContent = finalLoss.toFixed(4);
    document.getElementById('demo-status').textContent = converged
      ? '✓ Converged'
      : finalLoss > 1e6 ? '✗ Diverged (lr too large!)' : '~ Still descending';
    document.getElementById('demo-status').style.color = converged
      ? '#2e7d32'
      : finalLoss > 1e6 ? '#c62828' : '#e65100';
  }

  // Wire controls
  const lrSlider = document.getElementById('lr-slider');
  const lrDisplay = document.getElementById('lr-display');
  const runBtn = document.getElementById('run-btn');

  if (!lrSlider) return;

  lrSlider.addEventListener('input', () => {
    const val = parseFloat(lrSlider.value);
    lrDisplay.textContent = val.toFixed(3);
  });

  runBtn.addEventListener('click', () => {
    const lr = parseFloat(lrSlider.value);
    buildChart(lr);
  });

  // Initial render
  buildChart(parseFloat(lrSlider.value));
}

/* =========================================================
   Lesson 35 — Loss Surface 2D visualization
   ========================================================= */
function initLossSurface() {
  const el = document.getElementById('loss-surface-chart');
  if (!el) return;

  const lrSlider = document.getElementById('lr-slider');
  if (!lrSlider) return;

  // This is rendered inline in gd-chart; skip separate surface for now.
}

/* =========================================================
   DOMContentLoaded
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  initGradientDescentDemo();
  initLossSurface();
});
