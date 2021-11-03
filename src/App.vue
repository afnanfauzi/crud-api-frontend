<template>
  <Navbar />
  <Content />
</template>

<script>
import Navbar from "./components/Navbar.vue"
import Content from "./components/Content.vue"
import axios from "axios"
import {ref, onMounted} from "vue"

export default {
  name : "App",
  components : {
    Navbar, Content
  },

  setup() {
    const posts = ref([]);
    const loading = ref(false);
    const error = ref(null);

    onMounted(async() =>{
      try{
      loading.value = true;
      const response = await axios.get("http://127.0.0.1:8000/api/post");
      console.log(response.data.data);
      posts.value = response.data.data;
      loading.value = false;
      } catch(err){
        console.log(err);
        error.value = err;
        loading.value = false;
      }
    });
  }  

}
</script>

<style scope>

</style>
