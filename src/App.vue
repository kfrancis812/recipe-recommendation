<script setup>
import { ref } from "vue";

const results = ref([]);
const recipeList = ref([]);

const mealTypes = ref([
  "Main course",
  "Side dish",
  "Dessert",
  "Appetizer",
  "Salad",
  "Bread",
  "Breakfast",
  "Soup",
  "Beverage",
  "Sauce",
  "Marinade",
  "Fingerfood",
  "Snack",
  "Drink",
]);

const selectionMealType = ref(null);
const selectionRecipeId = ref(null);

const page = ref("mealType");

function isActive() {
  return selectionMealType.value !== null && selectionMealType.value !== "";
}

function isActiveRecipe() {
  return selectionRecipeId.value !== null && selectionRecipeId.value !== "";
}

function fetchData() {
  const apiKey = import.meta.env.VITE_SPOON_API_KEY;
  const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&type=${selectionMealType.value}&number=6`;
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      results.value = data.results || [];
    })
    .catch((err) => console.log(err.message));
}

function addData(mealType) {
  selectionMealType.value = mealType;
  console.log(selectionMealType.value);
}

function addRecipeData(recipeId) {
  selectionRecipeId.value = recipeId;
  console.log(selectionRecipeId.value);
}

function fetchRecipeData() {
  const apiKey = import.meta.env.VITE_SPOON_API_KEY;
  const url = `https://api.spoonacular.com/recipes/${selectionRecipeId.value}/information?apiKey=${apiKey}`;

  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      recipeList.value = data;
    })
    .catch((err) => console.log(err.message));
}

function startOver() {
  page.value = "mealType";
  selectionMealType.value = null;
  selectionRecipeId.value = null;
  console.log(selectionMealType.value);
}
</script>

<template>
  <div id="navbar">
    <a @click="page = 'mealType'" id="logo">Dish Decision</a>
    <div id="navbar-right">
      <a @click="startOver">Start Over</a>
    </div>
  </div>
  <!-- content section for meal type question -->

  <div class="content" v-if="page === 'mealType'">
    <div class="header">
      <h1>What specific dish are you planning to prepare?</h1>
    </div>

    <div class="wrapper">
      <button
        @click="addData(mealType)"
        class="item"
        :class="{ selected: selectionMealType === mealType }"
        v-for="(mealType, index) in mealTypes"
        :key="index"
      >
        {{ mealType }}
      </button>
    </div>
    <div class="subNav">
      <button
        @click="
          page = 'recipes';
          fetchData();
        "
        :disabled="!isActive()"
        :class="{ active: isActive() }"
      >
        Next
      </button>
    </div>
  </div>
  <!-- end meal type content-->

  <!--content section for recipes suggestions-->
  <div class="content" v-if="page === 'recipes'">
    <div class="header">
      <h1>Recipes based on your selection:</h1>
    </div>
    <div class="wrapper">
      <button
        @click="addRecipeData(recipe.id)"
        class="itemRecipe"
        :class="{ selected: selectionRecipeId === recipe.id }"
        v-for="recipe in results"
        :key="recipe.id"
      >
        <h2>{{ recipe.title }}</h2>
        <img class="recipeImage" :src="recipe.image" />
      </button>
    </div>
    <div class="subNav">
      <button @click="page = 'mealType'">Back</button
      ><button
        @click="
          page = 'recipeDetail';
          fetchRecipeData();
        "
        :disabled="!isActiveRecipe()"
        :class="{ active: isActiveRecipe() }"
      >
        Next
      </button>
    </div>
  </div>

  <!-- end recipe suggestions -->

  <!-- content section for recipe detail-->

  <div class="content" v-if="page === 'recipeDetail'">
    <div class="header">
      <h1>{{ recipeList.title }}</h1>
      <img class="recipeImage" :src="recipeList.image" />
      <!-- <div v-html="recipeList.summary"></div> -->
      <h2 class="recipeHeader">Ingredients</h2>
      <div
        v-for="ingredient in recipeList.extendedIngredients"
        :key="ingredient.id"
      >
        {{ ingredient.original }}
      </div>
      <h2>Instructions</h2>

      <div class="instructions" v-html="recipeList.instructions"></div>
    </div>
    <div class="wrapper"></div>
    <div class="subNav">
      <button @click="page = 'recipes'">Back</button>
      <button @click="startOver">Start Over</button>
    </div>
  </div>

  <!--end recipe detail-->
  <div id="footer">
    <p class="light">Created by Kristin Francis.</p>
  </div>
</template>

<style>
#navbar {
  background: #9ca8b8;
  /* height: 80px; */
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  padding: 20px;
}

#navbar #logo {
  font-size: 35px;
  font-weight: 600;
  display: flex;
  flex-direction: row;
  align-items: center;
}

#navbar-right {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}

#navbar-right a {
  padding: 10px 20px 10px 20px;
  border-radius: 4px;
}

#navbar-right a:hover {
  background-color: #ebf3ff;
  color: black;
}

#navbar-right a.active {
  background-color: #776281;
  color: white;
}

.header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.recipeImage {
  max-width: 100%;
  height: auto;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.active {
  border-radius: 8px;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  border: 1px solid transparent;
  transition: border-color 0.25s;
}

.active:hover {
  border-color: 1px solid transparent;
  background-color: #faba9e;
  color: black;
}

#footer {
  height: 50px;
  text-align: center;
}

.wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.item {
  width: 110px;
  height: 110px;
  text-align: center;
  background-color: #776281;
  margin: 10px;
  color: #fff;
}

.item:hover {
  border-color: #ebf3ff;
  background-color: #ebf3ff;
  border: 1px solid transparent;
  color: black;
}

.item:focus {
  border-color: #cdddf2;
  background-color: #cdddf2;
  color: black;
  border: 1px solid transparent;
  outline: 0;
}

.item.selected {
  border-color: #cdddf2;
  background-color: #cdddf2;
  color: black;
  border: 1px solid transparent;
  outline: 0;
}

.itemRecipe {
  width: 400px;
  height: 350px;
  text-align: center;
  background-color: #776281;
  margin: 10px;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.itemRecipe:hover {
  border-color: #ebf3ff;
  background-color: #ebf3ff;
  border: 1px solid transparent;
  color: black;
}

.itemRecipe:focus {
  border-color: #cdddf2;
  background-color: #cdddf2;
  color: black;
  border: 1px solid transparent;
  outline: 0;
}

.itemRecipe.selected {
  border-color: #cdddf2;
  background-color: #cdddf2;
  color: black;
  border: 1px solid transparent;
  outline: 0;
}

.subNav {
  margin: 20px;
  display: flex;
  justify-content: center;
}
button:disabled {
  cursor: not-allowed;
}

.subNav button {
  margin-left: 10px;
  margin-right: 10px;
}

.itemRecipe > h2 {
  margin-top: 0px;
}

.light {
  font-size: 14px;
  color: #c3cbd7;
}

.instructions {
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 40px;
  text-align: center;
  list-style-position: inside;
}

.instructions ol {
  padding-left: 0px;
}
</style>
