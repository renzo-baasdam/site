<script lang="ts">
  import { onMount, beforeUpdate, afterUpdate } from 'svelte';
  import { CustomTerminal } from './terminal';
  import 'xterm/css/xterm.css';
  let terminalBind: any; //creates a var to bind the dom element

  beforeUpdate(() => {
    console.log('Component before update stage!');
  })

  onMount(async () => {
    console.log('Component mounting stage!');
    const terminal = await CustomTerminal.init();
    terminal.start(terminalBind);
  });

  afterUpdate(() => {
    console.log('Component after update stage!');
  })
</script>

<svelte:head>
  <title>Terminal</title>
  <meta name="description" content="About this app" />
</svelte:head>

<div class="text-column">
  <div id="terminal" bind:this={terminalBind} />
</div>
