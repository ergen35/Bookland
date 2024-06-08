<script lang="ts">
    import Icon from '@iconify/svelte';
    import type { PageData } from './$types';
    
    export let data: PageData;
</script>

<div class="pt-4 px-5">
    <div class="mb-5">
        <span class="text-2xl font-bold text-slate-600">Mon Profile</span>
    </div>

    <div class="flex flex-col">

        <div class="flex flex-row">
            
            <div class="flex items-center justify-center">
                <Icon icon="majesticons:user-circle" height={95} width={95} />
            </div>

            <div class="flex flex-1">
                <div class="w-full bg-slate-100 shadow-md px-4 py-3 rounded-lg">
                    <form method="post">
                        <div class="space-y-6">
                           <div class="flex flex-row content-between space-x-5">
        
                                <div class="form-wrapper">
                                    <label for="fullname" class="mb-1 ms-1">Nom & Prénoms</label>
                                    <input type="text" placeholder="Nom & Prénoms" name="fullname" value={data.session?.name} class="form-input" id="fullname">
                                </div>
        
                                <div class="form-wrapper">
                                    <label for="email" class="mb-1 ms-1">Adresse e-mail</label>
                                    <input disabled type="text" placeholder="Adresse e-mail" name="email" value="{data.session?.email}" class="form-input" id="email">
                                </div>
                           </div>
    
                            <div class="form-wrapper flex flex-row content-center justify-center items-end">
                                <button type="button" class="bg-teal-800 w-32 text-white p-2 rounded-md hover:scale-110 transition duration-300">Enregistrer</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </div>

    </div>
</div>