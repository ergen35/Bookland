<script lang="ts">
    import type { Book } from "@prisma/client";
    import ShipCard from "../Ship/ShipCard.svelte";

    export let book: Book | null = null;
</script>

<div>
    {#if book}

        <div class="w-[240px] shadow-sm border-gray-300 bg-stone-300 h-[240px] rounded-sm">
            <div class="w-full h-full flex flex-col">
                <div class="flex flex-col">
                    <div class="text-center flex flex-col m-1 text-sm">
                        <span class="font-bold text-teal-700">Thème</span> 
                        <span class="border-stone-200 border bg-gray-200 shadow-md rounded-md p-1">{book.title}</span>
                    </div>
                    <div class="flex flex-row overflow-hidden h-6">
                        <ShipCard title={book.author} />
                    </div>
                    Book {book.id}
                </div>
            </div>
        </div>
    {:else}
        <div>Indisponible</div>
    {/if}
</div>
