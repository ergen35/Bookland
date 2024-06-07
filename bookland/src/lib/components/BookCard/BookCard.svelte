<script lang="ts">
    import type { Book } from "@prisma/client";
    import ShipCard from "../Ship/ShipCard.svelte";
    
    export let showPayButton = false;
    export let book: Book | null = null;
</script>

<div class="mx-3 my-5 hover:scale-110 transition-all">
    {#if book}

        <div class="w-[250px] shadow-sm border-gray-300 bg-stone-300 h-fit rounded-sm">
            <div class="w-full h-full flex flex-col">
                <div class="flex flex-col">
                    <div class="text-center flex flex-col m-1 text-sm">
                        <!-- <span class="font-bold text-teal-700">Thème</span>  -->
                        <span class="border-stone-200 border bg-gray-200 shadow-md rounded-md p-1">{book.title}</span>
                    </div>
                    <div class="flex flex-col justify-center content-center items-center">
                        <div class="text-teal-700">Auteur</div>
                        <div class="flex flex-row overflow-hidden h-6">
                            {book.author}
                        </div>
                    </div>
                    <div class="flex flex-col justify-center content-center items-center mt-2">
                        <div class="text-teal-700">Mots clés</div>
                        <div class="flex flex-row flex-wrap space-x-1">
                            {#if book.tags}
                                {#each book.tags.split('|') as tag}
                                    <ShipCard title={tag} />
                                {:else}
                                    <span>Aucun mot clé</span>
                                {/each}
                            {:else}
                                 <!-- else content here -->
                            {/if}
                        </div>
                    </div>
                    <div class="flex flex-row mt-8 justify-between content-center items-center px-2">
                        {#if showPayButton}
                            <a href="/account/payment?book={book.id}" class="bg-teal-700 text-white font-bold py-2 px-4 rounded mb-2 text-sm">
                                Acheter
                            </a>
                        {/if}
                        <a href="/books/{book.id}" class="bg-teal-700 text-white font-bold py-1.5 px-2.5 rounded mb-2  text-sm">
                            Détails
                        </a>
                    </div>
                </div>
            </div>
        </div>
    {:else}
        <div>Indisponible</div>
    {/if}
</div>
