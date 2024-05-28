<script lang="ts">
    import type { LayoutData } from './$types';
    import '../app.css'
    import Icon from '@iconify/svelte'
    import Header from '$lib/components/Header/Header.svelte';

    export let data: LayoutData;
</script>


<div class="w-screen h-screen">
    <div class="flex flex-col h-full">
        
        <!-- Navigation bar -->
       <Header session={data.session} />

        <main class="flex flex-1">
            <slot />
        </main>


        <footer class="flex bg-gray-700">
            <div class="text-center w-full">
                <span class="text-gray-50"><a href="/">Bookland</a> &copy; Tous droits réservés</span>
            </div>
        </footer>

    </div>

</div>