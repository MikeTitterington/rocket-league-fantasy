<script>
    import authStore from '../stores/authStore'
    import {myTeam} from '../stores/userStore'
    import { Card, CardBody, CardTitle,CardHeader, Container, Col, Row, Button,Input } from 'sveltestrap';
    async function getStat(id) {
        console.log(id)
        const url = 'https://zsr.octane.gg/matches?event=614b6e37f8090ec74528642a&player='+id
        const res = await fetch(url);
        const matches = await res.json();
        let playerStats = {
            score: 0,
            goals: 0,
            assists: 0,
            saves: 0,
            shots: 0,
            games: 0
        }
        matches.matches.forEach(match => {
            match.blue.players.forEach(player => {
                if(player._id === id) {
                    playerStats.score += player.stats.core.score
                    playerStats.goals += player.stats.core.goals
                    playerStats.assists += player.stats.core.assists
                    playerStats.saves += player.stats.core.saves
                    playerStats.shots += player.stats.core.shots
                    playerStats.games += match.games.length
                }
            });
            match.orange.players.forEach(player => {
                if(player.player._id === id) {
                    playerStats.score += player.stats.core.score
                    playerStats.goals += player.stats.core.goals
                    playerStats.assists += player.stats.core.assists
                    playerStats.saves += player.stats.core.saves
                    playerStats.shots += player.stats.core.shots
                    playerStats.games += match.games.length
                }
            });
        });
        console.log(playerStats)
        return playerStats;
    }

    async function load() {
        console.log("loading")
        await Promise.all($myTeam.map(async (player) => {
            player.stats = await getStat(player['id'])
        }));
        console.log($myTeam)
    }

    load()
    const removePlayer = id => {
        $myTeam = $myTeam.filter(i => i['id'] != id);
    };
</script>
<Container>
    <Row>
        {#if $authStore.isLoggedIn}
            <Col>
                <Card class="mb-3 mt-3">
                    <CardHeader>
                        <CardTitle class='text-center'>{$authStore.user.displayName}'s Team</CardTitle>
                    </CardHeader>
                    <CardBody>
                        {#if $myTeam.length > 0 && $myTeam[0].stats}
                            {#each $myTeam as player}
                            <Row>
                                <Col>
                                    <Card class="mb-3 mt-3">
                                        <CardBody>
                                            <Row>
                                                <Col xs="auto">
                                                    <p class='font-weight-bold text-center'>Score Per Game</p>
                                                </Col>
                                                <Col>
                                                    <p class='font-weight-bold text-center'>Goals Per Game</p>
                                                </Col>
                                                <Col>
                                                    <p class='font-weight-bold text-center'>Assists Per Game</p>
                                                </Col>
                                                <Col>
                                                    <p class='font-weight-bold text-center'>Saves Per Game</p>
                                                </Col>
                                                <Col>
                                                    <p class='font-weight-bold text-center'>Shots Per Game</p>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <p>{Math.round((player.stats.score/player.stats.games)*100)/100}</p>
                                                </Col>
                                                <Col>
                                                    <p>{Math.round((player.stats.goals/player.stats.games)*100)/100}</p>
                                                </Col>
                                                <Col>
                                                    <p>{Math.round((player.stats.assists/player.stats.games)*100)/100}</p>
                                                </Col>
                                                <Col>
                                                    <p>{Math.round((player.stats.saves/player.stats.games)*100)/100}</p>
                                                </Col>
                                                <Col>
                                                    <p>{Math.round((player.stats.shots/player.stats.games)*100)/100}</p>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                            {/each}
                        {/if}
                    </CardBody>
                </Card>
            </Col>
        {/if}
    </Row>
</Container>