<script lang='ts'>
    import {
        Container,
        Collapse,
        Navbar,
        NavbarToggler,
        NavbarBrand,
        Nav,
        NavItem,
        NavLink,
        Dropdown,
        DropdownToggle,
        DropdownMenu,
        DropdownItem
    } from 'sveltestrap';
    import '@firebase/auth'
    import Navigation from '../components/Navigation.svelte'
    import {auth, db} from '../firebase'
    import {onMount} from 'svelte';
    import authStore from '../stores/authStore'
    let create = true;
    onMount(() => {
        auth.onAuthStateChanged((user)=>{
            authStore.set({
                isLoggedIn: user !== null,
                user,
                firebaseControlled: true
            })
            db.collection("users").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (doc.data().email === user.email){
                        create = false
                    }
                });
                if (create) {
                    db.collection("users").add({
                        email: user.email,
                        name: user.displayName,
                        username: user.email
                    })
                    .then((docRef) => {
                        console.log("Document written with ID: ", docRef.id);
                    })
                    .catch((error) => {
                        console.error("Error adding document: ", error);
                    });
                    db.collection("teams").add({
                        username: user.email
                    })
                    .then((docRef) => {
                        console.log("Document written with ID: ", docRef.id);
                    })
                    .catch((error) => {
                        console.error("Error adding document: ", error);
                    });
                    create = false
                }
            });
        });
    })
</script>
<svelte:head>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</svelte:head>
<Navigation/>
<Container color='dark' dark>
    <slot />
</Container>