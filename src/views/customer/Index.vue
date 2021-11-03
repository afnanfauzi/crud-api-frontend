<template>
  <div class="container-fluid">
    <div class="row d-flex justify-content-center flex-nowrap">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <div class="header">
            <h4>Data Customer</h4>
            <router-link :to="{name: 'customer.create'}" class="btn btn-md btn-success">Tambah Customer</router-link>
            </div>
            <hr>
            <table class="table table-striped table-bordered mt-4">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Nama</th>
                  <th scope="col">Email</th>
                  <th scope="col" class="text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="loading">
                  <td colspan="3">Loading...</td>
                </tr>
                <tr v-else v-for="(cust, index) in customer" :key="cust.id">
                  <td>
                    {{ index + 1 }}
                  </td>
                  <td>
                    {{ cust.nama }}
                  </td>
                  <td>
                    {{ cust.email }}
                  </td>
                  <td class="text-center">
                    <router-link :to="{name: 'customer.edit', params:{id: cust.id }}" class="btn btn-sm btn-primary mr-1">Edit</router-link>
                    <button @click.prevent="customerDelete(cust.id)" class="btn btn-sm btn-danger ml-1">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import {ref, onMounted} from "vue"

export default {
 name: "content",
 setup() {
    const customer = ref([]);
    const loading = ref(false);
    const error = ref(null);

    onMounted(async() =>{
      try{
      loading.value = true;

      const response = await axios.get("http://127.0.0.1:8000/api/customer");
      console.log(response.data.data);
      customer.value = response.data.data;
      loading.value = false;
      
      } catch(err){
        console.log(err);
        error.value = err;
        loading.value = false;
      }
    });

    //method delete
    function customerDelete(id) {
                
      //delete data post by ID
      axios.delete(`http://127.0.0.1:8000/api/customer/${id}`)
      .then(() => {                  
          //splice customer 
          customer.value.splice(customer.value.indexOf(id), 1);

        }).catch(error => {
            console.log(error.response.data)
        })

    }
  
  return {
    customer,
    loading,
    error,
    customerDelete
  };
  }  
}
</script>

<style>
body{
        background: lightgray;
    }
    
.header{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>