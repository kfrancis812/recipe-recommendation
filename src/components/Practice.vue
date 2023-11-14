<script>
export default{
    // template: '<h2>I am the template</h2>'
    data() {
        return {
            showBooks: true,
            title: 'The Final Empire',
            author: 'Brandon Sanderson',
            age: 45
        }
    },
    methods: {
        changeTitle() {
            this.title = 'words of randiance'
        },
        toggleShowBooks(){
            this.showBooks = !this.showBooks
        }
    }
}

</script>
<template>
    <p>{{title}} - {{author}} - {{age}}</p>
    <button v-on:click="age++">Increase Age</button>
    <button v-on:click="age--">Decrease Age</button>
    <div @click="title = 'something else'">Change book title</div>
    <div @click="changeTitle('Oath Bringer')">Change book title</div>
    <div v-if="showBooks"><p>{{title}} - {{author}} - {{age}}</p></div>
    <button @click="toggleShowBooks">
      <span v-if="showBooks"> Hide Books</span>
      <span v-if="!showBooks">Show Books</span>

    </button>
    <div v-show="showBooks">Currently Showing Books</div>
</template>