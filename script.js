const dayInput = document.getElementById('day');
const monthInput = document.getElementById('month');
const yearInput = document.getElementById('year');
const dayError = document.getElementById('dayError');
const monthError = document.getElementById('monthError');
const yearError = document.getElementById('yearError');
const yearsSpan = document.getElementById('yearsValue');
const monthsSpan = document.getElementById('monthsValue');
const daysSpan = document.getElementById('daysValue');
const form = document.getElementById('ageForm');
function clearUIErrors() {
  document.querySelectorAll('.dive2').forEach(el => {
    el.classList.remove('error');
  });
  dayError.innerText = '';
  monthError.innerText = '';
  yearError.innerText = '';
}
// pour l'erreur
function setError(input, errorElement, message) {
  input.parentElement.classList.add('error');
  errorElement.innerText = message;
}
// pour la date valide
function isValidDate(year, month, day) {
  const d = new Date(year, month - 1, day);
  return d.getFullYear() === year &&
         d.getMonth() === month - 1 &&
         d.getDate() === day;
}
//calcul de l'âge
function calculateAge(year, month, day) {
  const today = new Date();
  let years = today.getFullYear() - year;
  let months = today.getMonth() + 1 - month;
  let days = today.getDate() - day;
  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}
form.addEventListener('submit', function(e) {
  e.preventDefault();
  clearUIErrors();
  const day = parseInt(dayInput.value);
  const month = parseInt(monthInput.value);
  const year = parseInt(yearInput.value);
  const currentYear = new Date().getFullYear();
  let valid = true;
  // pour le required
  if (!day) {
    setError(dayInput, dayError, "Required");
    valid = false;
  }
  if (!month) {
    setError(monthInput, monthError, "Required");
    valid = false;
  }

  if (!year) {
    setError(yearInput, yearError, "Required");
    valid = false;
  }

  if (!valid) return;
  // jour
  if (isNaN(day) || day < 1 || day > 31) {
    setError(dayInput, dayError, "Must be a valid day");
    valid = false;
  }
  // mois
  if (isNaN(month) || month < 1 || month > 12) {
    setError(monthInput, monthError, "Must be a valid month");
    valid = false;
  }
  // année
  if (isNaN(year) || year > currentYear) {
    setError(yearInput, yearError, "Must be a valid year");
    valid = false;
  }

  if (!valid) return;
  // toutes les dates
  if (!isValidDate(year, month, day)) {
    setError(dayInput, dayError, "Invalid date");
    setError(monthInput, monthError, "");
    setError(yearInput, yearError, "");
    return;
  }
  // pour le calcul
  const age = calculateAge(year, month, day);
  yearsSpan.innerText = age.years;
  monthsSpan.innerText = age.months;
  daysSpan.innerText = age.days;
});