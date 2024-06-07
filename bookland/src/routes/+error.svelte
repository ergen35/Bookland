<script lang="ts">
    import { page } from '$app/stores';
</script>

<div class="w-full flex flex-row h-full">
    <center class="items-center content-center justify-center w-full">
        <div class="text-xl text-center">{$page.status}: {$page.error?.message}</div>
    </center>
</div>