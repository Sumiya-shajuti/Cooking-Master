// API call
let mealsDataLoad = (userInput) => {

  if (userInput !== '') {
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${userInput}`
    fetch(url)
      .then(res => res.json())
      .then(data => {
        mealData(data.meals)
        document.getElementById('errorShow').innerHTML = ''
        document.getElementById('ingredientShow').innerHTML = ''
      }).catch(() => errorMessage())
  } else {
    errorMessage()
  }
}
// error Message
let errorMessage = () => {
  let errorShow = document.getElementById('errorShow')
  let message = `<h2 class ="text-center text-success mt-3">Sorry,This food is not available</h2>`
  errorShow.innerHTML = message
  document.getElementById('ingredientShow').innerHTML = ''
}
// data input
let userInput = () => {
  let searchFood = document.getElementById('searchFood')
  mealsDataLoad(searchFood.value)
  searchFood.value = ''
}
let Data = (mealName, imageSrc) => {
  let displayResult = document.getElementById('resultShow')
  let cardColumn = `
        <div class="col rounded-3">
            <div class="card h-100 cardDesign">
            <img src="${imageSrc}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title text-center">${mealName}</h5>
            </div>
            </div>
        </div>
    `
  displayResult.innerHTML = displayResult.innerHTML + cardColumn
}

let mealData = (data) => {
  data.map(meal => Data(meal.strMeal, meal.strMealThumb))

  // Event listener for search button
  cardsAddEvent()
}
document.getElementById('searchButton').addEventListener('click', () => {
  userInput()
  document.getElementById('resultShow').innerHTML = ''
})

let ingredientShow = (meal) => {
  let displayResult = document.getElementById('ingredientShow')
  let ingredientList = ''
  //Ingredient add list 
  for (let i = 1; i < 25; i++) {
    if (meal[`strIngredient${i}`].trim() !== '' || meal[`strMeasure${i}`].trim() !== '') {
      let ingredientText = `${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}`
      ingredientList += `<li><i class="fas fa-check-square checkIcon"></i> ${ingredientText}</li>`
    } else {
      break
    }
  }
  // card 
  let resultDiv = `
        <div class="card col-8 ingredientDesign">
            <img src="${meal.strMealThumb}" class="card-img-top" >
            <div class="card-body">
                <h3 class="card-title">${meal.strMeal}</h3>
                <h5 class="card-text">Ingredients</h5>
            </div>
            <ul class="list-group list-group-flush" >${ingredientList}</ul>
        </div>
        `
  displayResult.innerHTML = resultDiv
}

let uniqueCard = (mealName) => {
  let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
  fetch(url)
    .then(res => res.json())
    .then(data => {
      data.meals.forEach(mealsData => {
        if (mealsData.strMeal == mealName) {
          ingredientShow(mealsData)
        }
      })
    })
}
// Event listener for all
let cardsAddEvent = () => {
  let allCard = document.getElementsByClassName('cardDesign')
  let allCardDiv = [...allCard]
  allCardDiv.map(card => {
    card.addEventListener('click', (event) => {
      let mealName = event.currentTarget.children[1].innerText
      uniqueCard(mealName)
    })
  })
}