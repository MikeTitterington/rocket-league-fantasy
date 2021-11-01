<script>
    import {
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
    import authStore from '../stores/authStore'
    import firebase from '@firebase/app';
    import '@firebase/auth'

    async function logout() {
        try{

            await firebase.auth().signOut();

        } catch (e) {
            console.log(e)
        }
    }
</script>
<style>
img {
    height: 80px;
    object-fit: contain;
}
</style>
<Navbar color='dark' dark expand='md'>
<NavbarBrand><img src='/denny.png' alt='denny'/></NavbarBrand>
    <Nav navbar>
        <NavItem>
            <NavLink href='/'>
                Home
            </NavLink>
        </NavItem>
        <NavItem>
            <NavLink href='/events'>
                Events
            </NavLink>
        </NavItem>
        <NavItem>
            <NavLink href='/teams'>
                Teams
            </NavLink>
        </NavItem>
        {#if $authStore.isLoggedIn}
            <Dropdown nav inNavbar>
                <DropdownToggle nav caret>{$authStore.user.displayName}</DropdownToggle>
                <DropdownMenu right>
                <DropdownItem href='/user'>Team</DropdownItem>
                <DropdownItem on:click={logout}>Logout</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        {:else}
            <NavItem>
                <NavLink href='/login'>
                    Login
                </NavLink>
            </NavItem>
        {/if}
    </Nav>
</Navbar>