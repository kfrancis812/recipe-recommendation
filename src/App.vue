<script setup>
import { ref } from "vue";

const results = ref([]);
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

const page = ref("mealType");

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
</script>

<template>
  <div id="navbar">
    <a @click="page = 'mealType'" id="logo">Dish Decision</a>
    <div id="navbar-right">
      <a @click="page = 'mealType'">Start Over</a>
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
      <button class="itemRecipe" v-for="recipe in results" :key="recipe.id">
        <h2>{{ recipe.title }}</h2>
        <img :src="recipe.image" />
      </button>
    </div>
    <div class="subNav">
      <button @click="page = 'mealType'">Back</button
      ><button @click="page = 'cusine'">Next</button>
    </div>
  </div>
  <div id="footer">
    <p class="light">Created by Kristin Francis, see portfolio</p>
  </div>
</template>

<style scoped>
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
  text-align: center;
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

.itemRecipe img {
  flex-shrink: 1;
}

.subNav {
  margin: 20px;
  display: flex;
  justify-content: center;
}
.subNav button {
  margin-left: 10px;
  margin-right: 10px;
}

h2 {
  margin-top: 0px;
}

.light {
  font-size: 14px;
  color: #c3cbd7;
}
</style>
