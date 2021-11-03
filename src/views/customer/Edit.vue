<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>Edit Customer</h4>
                        <hr>

                        <form @submit.prevent="update">
                            <div class="form-group">
                                <label for="nama" class="font-weight-bold">Nama</label>
                                <input type="text" class="form-control" v-model="customer.nama" placeholder="Masukkan Nama">
                                <!-- validation -->
                                <div v-if="validation.nama" class="mt-2 alert alert-danger">
                                    {{ validation.nama[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="email" class="font-weight-bold">Email</label>
                                <input type="email" class="form-control" v-model="customer.email" placeholder="Masukkan Email">
                                <!-- validation -->
                                <div v-if="validation.email" class="mt-2 alert alert-danger">
                                    {{ validation.email[0] }}
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary">Simpan</button>
                        </form>                        

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

export default {

    setup() {

        //state posts
        const customer = reactive({
            nama: '',
            email: ''
        })

        //state validation
        const validation = ref([])

        //vue router
        const router = useRouter()

        //vue router
        const route = useRoute()

        //mounted
        onMounted(() => {

            //get API from Laravel Backend
            axios.get(`http://localhost:8000/api/customer/${route.params.id}`)
            .then(response => {
              
              //assign state posts with response data
              customer.nama    = response.data.data.nama  
              customer.email  = response.data.data.email  

            }).catch(error => {
                console.log(error.response.data.data)
            })

        })

        //method update
        function update() {

            let nama   = customer.nama
            let email   = customer.email

            axios.put(`http://localhost:8000/api/customer/${route.params.id}`, {
                nama: nama,
                email: email
            }).then(() => {

                //redirect ke post index
                router.push({
                    name: 'customer.index'
                })

            }).catch(error => {
                //assign state validation with error 
                validation.value = error.response.data.data
            })

        }

        //return
        return {
            customer,
            validation,
            router,
            update
        }

    }

}
</script>

<style>
    body{
        background: lightgray;
    }
</style>