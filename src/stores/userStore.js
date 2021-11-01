import { writable } from "svelte/store";
import {db} from '../firebase'
import authStore from '../stores/authStore'
export const myTeam = writable([])

async function getMyTeam() {
    var teams = db.collection("teams");
    var query = teams.where("username", "==", "mtitterin@gmail.com").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            let temp = []
            if(doc.data().playerOneId) {
                temp.push({
                    id: doc.data().playerOneId,
                    name: doc.data().playerOneName
                })
            }
            if(doc.data().playerTwoId) {
                temp.push({
                    id: doc.data().playerTwoId,
                    name: doc.data().playerTwoName
                })
            }
            if(doc.data().playerThreeId) {
                temp.push({
                    id: doc.data().playerThreeId,
                    name: doc.data().playerThreeName
                })
            }
            if(doc.data().playerFourId) {
                temp.push({
                    id: doc.data().playerFourId,
                    name: doc.data().playerFourName
                })
            }
            if(doc.data().playerFiveId) {
                temp.push({
                    id: doc.data().playerFiveId,
                    name: doc.data().playerFiveName
                })
            }
            if(doc.data().playerSixId) {
                temp.push({
                    id: doc.data().playerSixId,
                    name: doc.data().playerSixName
                })
            }
            myTeam.set(temp)
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
}
getMyTeam()

export const signedPlayers = writable(["5f3d8fdd95f40596eae23d8f","5f3d8fdd95f40596eae23d91"])
