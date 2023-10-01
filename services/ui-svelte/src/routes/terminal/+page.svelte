<script lang="ts">
	import { onMount } from 'svelte';
	import { CustomTerminal } from './terminal';
	import 'xterm/css/xterm.css';
	let terminal: any; //creates a var to bind the dom element

	onMount(async () => {
		const term = await CustomTerminal.init();
		term.start(terminal);
	});
</script>

<svelte:head>
	<title>Terminal</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="text-column">
	<link rel="stylesheet" href="xterm/css/xterm.css" />
	<div id="terminal" bind:this={terminal} />
</div>
