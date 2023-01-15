// Listen for submit button 
document.getElementById('loan-form').addEventListener('submit', function(e){
  //Hide results until the loader loads to a certain amount of time
  document.getElementById('results').style.display = 'none';
  //show the loader image immediately the submit is hit
  document.getElementById('loading').style.display = 'block';

  //Setting the number of seconds the loader should load
  setTimeout(calculateResult, 2000);

  e.preventDefault();
});

//Calculate Result function:
function calculateResult(){
  
  //Grabing all the variables that we need from the UI:
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment= document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const  totalInterest = document.getElementById('total-interest');

  const principle = parseFloat(amount.value);
  const calculateInterest = parseFloat(interest.value)/ 100/12;
  const calculatePayment  = parseFloat(years.value)*12;

  //computing monthly payment
  const x = Math.pow(1 + calculateInterest, calculatePayment);
  const monthly = (principle*x*calculateInterest)/(x-1);

  if(isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatePayment).toFixed(2);
    totalInterest.value = ((monthly*calculatePayment)-principle).toFixed(2);

    //Show results after loading
    document.getElementById('results').style.display = 'block';

    //Hiding the loader after loading
    document.getElementById('loading').style.display = 'none';
  }else{
    showError('please check your inputs');
  }
  
}

//ShowError function
function showError(error){ 
  //Hide  results when there wrong input
  document.getElementById('results').style.display = 'none';

  //Hiding the loader after displaying the error
  document.getElementById('loading').style.display = 'none';
  //creating  a div for the error display
  const errorDiv = document.createElement('div');

  //Getting element for the error display message to be above the heading "loan calculator"
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  //Adding a class name to the div element 
  errorDiv.className = 'alert alert-danger';

  //Then creating a text node to aappend to div
  errorDiv.appendChild(document.createTextNode(error));

  //To insert error above the heading
  card.insertBefore(errorDiv, heading);

  //Clear error after 3secs
  setTimeout(clearError, 3000);

}

//clear error function
function clearError(){
  document.querySelector('.alert').remove();
}