<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;
</script>


<center>
    User Account
    <div>
        <p>Name: {data.session?.name}</p>
        <p>Role: {data.session?.role}</p>
        <p>Email: {data.session?.email}</p>
    </div>
</center>