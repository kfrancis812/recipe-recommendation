import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')




// fetch('https://api.spoonacular.com/recipes/complexSearch?apiKey=8a0f3d601c924e3391225f684eafc5cd&query=pasta&maxFat=25&number=2', {
//     method: 'GET'
//     body: {
//         name: 'Recipe 1'
//     }
// })   
// .then(res => {
//     if (res.ok) {
//         console.log('SUCCESS')
//     } else {
//         console.log('Not Successful')
//     }
// }).then(data => console.log(data))
