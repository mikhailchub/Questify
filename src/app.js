const statusNode = document.getElementById('status');
const resetButton = document.getElementById('reset-demo');

function setMessage() {
  const current = new Date().toLocaleString();
  localStorage.setItem('kpi26-template-message', `Demo state reset at ${current}`);
  renderMessage();
}

function renderMessage() {
  const saved = localStorage.getItem('kpi26-template-message');
  statusNode.textContent = saved || 'No demo message stored yet.';
}

resetButton?.addEventListener('click', () => {
  setMessage();
});

renderMessage();
