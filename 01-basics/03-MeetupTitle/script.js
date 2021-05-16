import Vue from './vendor/vue.esm.browser.js';


const app = new Vue({

  data(){

    return {
      meetupsAmount: 5,
      meetups: [],
    };

  },

  created(){
    for(let i = 1; i <= this.meetupsAmount; i++){
      this.meetups.push({
        id:i,
        title: null,
        checked: false,
      })
    }
  },

  methods:{
    async handleClick(e){
      const id = +e.target.value;
      const meetup = this.meetups
        .map((meetup) => {
          meetup.checked = false;
          return meetup;
        })
        .find((m) => m.id === id);
      if (!meetup) {
        return;
      }
      const response = await fetch(`https://course-vue.javascript.ru/api/meetups/${id}`).then((res) => res.json());
      meetup.checked = true;
      meetup.title = response.title;
    }
  }
});

app.$mount('#app');
