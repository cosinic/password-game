<template>
  <div class="container vh-100">
    <div class="row vh-100 justify-content-center align-items-center">
        <div class="col-12 col-md-6">
            <b-card class="text-center">
                <div v-if="error.statusCode === 404">
                    <h1>Uh Oh</h1>
                    <p class="lead">
                        It looks like you came across a page that doesn't exist.
                        <br />
                        Sorry about the mishap.
                    </p>
                </div>
                <div v-else>
                    <h1>Oops, something went wrong.</h1>                    
                    <p class="lead">
                        This page is giving some kind of error.
                        <br />
                        Sorry about the mishap.
                    </p>
                </div>
                <nuxt-link to="/">Back to Home</nuxt-link>
            </b-card>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error']
}
</script>