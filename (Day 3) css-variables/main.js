const inputs = document.querySelectorAll('.panel input');

function updateVariables() {
    const suffix = this.dataset.suffix || '';
    document.documentElement.style.setProperty('--' + this.name, this.value + suffix);
}

inputs.forEach(input => input.addEventListener('change', updateVariables));
inputs.forEach(input => input.addEventListener('mousemove', updateVariables));