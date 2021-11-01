<script lang='ts'>
    import {Row, Col} from 'sveltestrap'
    import authStore from '../stores/authStore'
</script>

<Row>
    <Col>
        <h1>Welcome to Fantasy RL</h1>
        {#if $authStore.isLoggedIn}
            {$authStore.user.email}
        {/if}
    </Col>
</Row>