<script lang='ts'>
    import {Row, Col} from 'sveltestrap'
    import authStore from '../stores/authStore';
    import {googleProvider, auth} from '../firebase'
    
    async function loginWithGoogle() {
        try{

            await auth.signInWithPopup(googleProvider);

        } catch (e) {
            console.log(e)
        }
    }
</script>

<style>
    img {
        cursor: pointer;
    }
</style>

<Row>
    <Col>
        <h1>Login With Google</h1>
    </Col>
</Row>

<Row>
    <Col>
        {#if $authStore.isLoggedIn}
            <h1>Logged In As {$authStore.user.displayName}</h1>
        {:else}
            <img on:click={loginWithGoogle} src='/login_google.png' alt='login with google' />
        {/if}
    </Col>
</Row>