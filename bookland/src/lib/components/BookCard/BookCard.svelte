<script lang="ts">
    import type { Book } from "@prisma/client";

    export let book: Book | null = null;
</script>

<div>
    {#if book}
        <div>
            {book.title}
        </div>
    {:else}
        <div>Indisponible</div>
    {/if}
</div>