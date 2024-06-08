<script lang="ts">
	import { type SessionInfos } from '$lib/models';
    import Icon from "@iconify/svelte";
    import * as Popover from "$lib/components/ui/popover";

    export let session: SessionInfos | null = null;

    async function disconnectUser(){
        const response = await fetch("/auth/logout", {
            method: 'POST',
        })

        if(response.ok){
            window.location.assign("/")
        }
    }
</script>


<div class="w-full flex flex-row h-auto bg-teal-700 py-2 px-3">
    <div class="flex flex-row w-full">
        <a href="/" class="italic text-3xl text-gray-100">Bookland</a>

        <div class="flex flex-1">
            <div class="w-full justify-end items-center flex flex-row space-x-3 px-2">
                <a class="navbar-item" href="/all">Catégories</a>
                <a class="navbar-item" href="/all">Mémoires</a>

                {#if session }

                    {#if session.role == 'basic'}
                        <Popover.Root>
                            <Popover.Trigger>
                                <div class="rounded-full border border-slate-500 p-1 shadow-sm bg-black cursor-pointer">
                                    <Icon icon="fluent:person-accounts-20-filled" height={26} width={26} class="text-white" />
                                </div>  
                            </Popover.Trigger>
                            <Popover.Content>
                                <div class="flex flex-col space-y-0 -m-4">
                                    <a href="/account" class="pop-menu-item">
                                        <Icon icon="mdi-light:account" class="flex text-blue-600" height={20} width={20} />
                                        <span class="flex-1 text-sm">Mon Compte</span>
                                    </a>
                                    
                                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                                    <div class="pop-menu-item" on:click|preventDefault|stopPropagation={disconnectUser}>
                                        <Icon icon="majesticons:logout-half-circle" class="flex text-red-600" height={20} width={20}/>
                                        <span class="flex-1 text-sm">Déconnexion</span>
                                    </div>
                                </div>
                            </Popover.Content>
                        </Popover.Root>
                    {:else if  session.role == 'admin'}
                        <Popover.Root>
                            <Popover.Trigger>
                                <div class="rounded-full border border-slate-500 p-1 shadow-sm bg-black cursor-pointer">
                                    <Icon icon="fluent:person-accounts-20-filled" height={26} width={26} class="text-white" />
                                </div>  
                            </Popover.Trigger>
                            <Popover.Content>
                                <div class="flex flex-col space-y-0 -m-4">
                                    <a href="/admin/dashboard" class="pop-menu-item">
                                        <Icon icon="mage:dashboard-chart-star" class="flex text-blue-600" height={20} width={20} />
                                        <span class="flex-1 text-sm">Tableau de bord</span>
                                    </a>
                                    
                                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                                    <div class="pop-menu-item" on:click|preventDefault|stopPropagation={disconnectUser}>
                                        <Icon icon="majesticons:logout-half-circle" class="flex text-red-600" height={20} width={20}/>
                                        <span class="flex-1 text-sm">Déconnexion</span>
                                    </div>
                                </div>
                            </Popover.Content>
                        </Popover.Root>
                    {:else}
                        <div></div>
                    {/if}
                    
                {:else}
                    <a href="/auth/login" data-sveltekit-reload
                        class="text-gray-200 border-white border px-2 py-1 rounded-sm hover:bg-white hover:text-teal-900 hover:transition-colors ease-in-out transition-colors duration-500">
                        <span class="flex flex-row space-x-1 items-center content-center">
                            <Icon icon="ant-design:login-outlined" class="" />
                            <span>Connexion</span>
                        </span>
                    </a>
                {/if}

            </div>
        </div>
    </div>
</div>