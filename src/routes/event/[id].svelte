<script context='module'>
    export async function load({page}) {
        const id = page.params.id;
        const url = 'https://zsr.octane.gg/events/'+id+'/participants'
        const res = await fetch(url);
        const teams = await res.json();
        return {props:{teams}}
    }
</script>
<script>
    import authStore from '../../stores/authStore'
    import {myTeam, signedPlayers} from '../../stores/userStore'
    console.log($myTeam)
    import { Card, CardBody, CardTitle,CardHeader, Container, Col, Row, Button,Input } from 'sveltestrap';
    export let teams
    let participants = teams.participants
    let searchTerm = ""
    let filteredTeams = [];
    participants.forEach(team => {
        team.players.forEach(player => {
            if($signedPlayers.includes(player._id)) {
                player.signable = false
            }else{
                player.signable = true
            }
        });
    });
    $: {
        if(searchTerm) {
            filteredTeams = participants.filter(participants => participants.team.name.toLowerCase().includes(searchTerm.toLowerCase()))
        }else{
            filteredTeams = [... participants]
        }
        console.log(searchTerm)
    }
    const addPlayer = (team, name, id) => {
        if ($myTeam.length < 6){
            $myTeam = [
                ...$myTeam,
                {
                    id,
                    name,
                }
            ];
            $signedPlayers = [...$signedPlayers, id]
            console.log($signedPlayers)
            participants.forEach(team => {
                team.players.forEach(player => {
                    if($signedPlayers.includes(player._id)) {
                        player.signable = false
                    }else{
                        player.signable = true
                    }
                });
            });
            if(searchTerm) {
                filteredTeams = participants.filter(participants => participants.team.name.toLowerCase().includes(searchTerm.toLowerCase()))
            }else{
                filteredTeams = [... participants]
            }
        }
    };
    const removePlayer = id => {
        $myTeam = $myTeam.filter(i => i['id'] != id);
    };
</script>
<Container>
    <Row>
        <Col>
            <Input bind:value={searchTerm} type='text' class="mb-3 mt-3" placeholder='Search Teams' />
            {#each filteredTeams as team}
                <Card class="mb-3 mt-3">
                    <CardHeader>
                        <CardTitle class='text-center'>{team.team.name}</CardTitle>
                    </CardHeader>
                    <CardBody>
                            {#each team.players as player}
                                <Row class="mt-3 ml-3">
                                    <Col class='text-center'><a href='/player/{player._id}'><p>{player.tag}</p></a></Col>
                                    {#if $authStore.isLoggedIn && player.signable}
                                        <Col class='text-center'><Button color='primary' on:click={addPlayer(team.name, player.tag, player._id)}>Sign</Button></Col>
                                    {:else}
                                        <Col class='text-center'><Button color='primary' disabled>Sign</Button></Col>
                                    {/if}
                                </Row>
                            {/each}
                    </CardBody>
                </Card>
            {/each}
        </Col>
        {#if $authStore.isLoggedIn}
            <Col>
                <Card class="mb-3 mt-3">
                    <CardHeader>
                        <CardTitle class='text-center'>{$authStore.user.displayName}'s Team</CardTitle>
                    </CardHeader>
                    <CardBody>
                        {#each $myTeam as player}
                            <Row class="mt-3 ml-3">
                                <Col class='text-left text-center'><p>{player.name}</p></Col>
                                <Col class='text-left text-center'><Button on:click={removePlayer(player.id)} color='danger'>Release</Button></Col>
                            </Row>
                        {/each}
                        {#if $myTeam.length>0}
                            <Row><Col class='text-right mt-3'><Button color='danger'>Submit</Button></Col></Row>
                        {/if}
                    </CardBody>
                </Card>
            </Col>
        {/if}
    </Row>
</Container>