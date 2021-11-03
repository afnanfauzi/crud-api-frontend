<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>Tambah Customer</h4>
                        <hr>

                        <form @submit.prevent="store">
                            <div class="form-group">
                                <label for="email" class="font-weight-bold">Nama</label>
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
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {

    setup() {

        //state customer
        const customer = reactive({
            nama: '',
            email: ''
        })

        //state validation
        const validation = ref([])

        //vue router
        const router = useRouter()

        //method store
        function store() {

            let nama  = customer.nama
            let email = customer.email

            axios.post('http://localhost:8000/api/customer', {
                nama: nama,
                email: email
            }).then(() => {

                //redirect ke customer index
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
            store
        }

    }

}
</script>

<style>
    body{
        background: lightgray;
    }
</style>