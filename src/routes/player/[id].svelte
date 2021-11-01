<script context='module'>
    export async function load({page}) {
        const id = page.params.id;
        const url = 'https://zsr.octane.gg/players/'+id
        const res = await fetch(url);
        const playerInfo = await res.json();

        const url2 = 'https://zsr.octane.gg/stats/players?stat=score&player='+id
        const res2 = await fetch(url2);
        const playerScore = await res2.json();

        const url3 = 'https://zsr.octane.gg/stats/players?stat=goals&player='+id
        const res3 = await fetch(url3);
        const playerGoals = await res3.json();

        const url4 = 'https://zsr.octane.gg/stats/players?stat=assists&player='+id
        const res4 = await fetch(url4);
        const playerAssists = await res4.json();

        const url5 = 'https://zsr.octane.gg/stats/players?stat=saves&player='+id
        const res5 = await fetch(url5);
        const playerSaves = await res5.json();
        playerInfo.stats = {
            score: Math.round((playerScore.stats[0].stats.score/playerScore.stats[0].games.total) * 100) / 100,
            goals: Math.round((playerGoals.stats[0].stats.goals/playerScore.stats[0].games.total) * 100) / 100,
            assists: Math.round((playerAssists.stats[0].stats.assists/playerScore.stats[0].games.total) * 100) / 100,
            saves: Math.round((playerSaves.stats[0].stats.saves/playerScore.stats[0].games.total) * 100) / 100,
        }
        return {props:{playerInfo}}
    }
</script>
<script>
    import { Card, CardBody, CardTitle,CardHeader, Container, Col, Row, Button,Input } from 'sveltestrap';
    export let playerInfo
</script>


<Card class="mb-3 mt-3">
    <CardHeader>
        <CardTitle class="font-weight-bold text-center">{playerInfo.tag}</CardTitle>
    </CardHeader>
    <CardBody>
        <Row>
            <Col>
                <p class="font-weight-bold text-center">Score Per Game Alltime</p>
            </Col>
            <Col>
                <p class="font-weight-bold text-center">Goals Per Game Alltime</p>
            </Col>
            <Col>
                <p class="font-weight-bold text-center">Assists Per Game Alltime</p>
            </Col>
            <Col>
                <p class="font-weight-bold text-center">Saves Per Game Alltime</p>
            </Col>
        </Row>
        <Row>
            <Col>
                <p class="text-center">{playerInfo.stats.score}</p>
            </Col>
            <Col>
                <p class="text-center">{playerInfo.stats.goals}</p>
            </Col>
            <Col>
                <p class="text-center">{playerInfo.stats.assists}</p>
            </Col>
            <Col>
                <p class="text-center">{playerInfo.stats.saves}</p>
            </Col>
        </Row>
    </CardBody>
</Card>