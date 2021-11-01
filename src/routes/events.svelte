<script context='module'>
    export async function load() {
        const url = 'https://zsr.octane.gg/events?name=RLCS&tier=A&region=NA&after=2021-10-01'
        const res = await fetch(url);
        const events = await res.json();
        return {props:{events}}
    }
</script>
<script>
    import { Card, CardBody, CardTitle, CardFooter,CardHeader } from 'sveltestrap';
    export let events 
</script>
<style>
    a {
        text-decoration: none;
        color: black
    }
</style>
{#each events['events'] as event}
    <a href='/event/{event._id}'>
        <Card class="mb-3 mt-3">
            <CardBody>{event.name}</CardBody>
            <CardFooter>{event.startDate.substring(0, event.startDate.length - 10)} - {event.endDate.substring(0, event.endDate.length - 10)}</CardFooter>
        </Card>
    </a>
{/each}