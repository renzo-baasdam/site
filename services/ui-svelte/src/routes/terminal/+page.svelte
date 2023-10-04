<script lang="ts">
  import { onMount } from 'svelte';
  import { CustomTerminal } from './terminal';
  import 'xterm/css/xterm.css';
  let terminalBind: any; //creates a var to bind the dom element

  onMount(async () => {
    const terminal = await CustomTerminal.init();
    terminal.start(terminalBind);
  });
</script>

<svelte:head>
  <title>Terminal</title>
  <meta name="description" content="About this app" />
</svelte:head>

<div class="text-column">
  <div id="terminal" bind:this={terminalBind} />
</div>
