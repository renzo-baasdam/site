import type { Terminal } from 'xterm';

export class CustomTerminal {
	public static async init(): Promise<CustomTerminal> {
		const xterm = await import('xterm'); // import when the dom is ready
		return new CustomTerminal(
			new xterm.Terminal({
				cursorBlink: true
			})
		);
	}

	public start(element: HTMLElement): CustomTerminal {
		this.terminal.open(element);
		this.terminal.focus();
		return this;
	}

	public terminal: Terminal;

	constructor(term: Terminal) {
		this.terminal = term;
		this.terminal.write('Hello \x1B[1;3;31muser\x1B[0m $ ');
		this.terminal.attachCustomKeyEventHandler(this.copyPasteEventHandler);
		this.terminal.onData(this.handleInput);
	}

	public copyPasteEventHandler = (arg: KeyboardEvent) => {
		if (arg.ctrlKey && arg.code === 'KeyC' && arg.type === 'keydown') {
			if (this.terminal.hasSelection()) {
				const selection = this.terminal.getSelection();
				navigator.clipboard.writeText(selection).then(
					() => console.log('Async: Copying to clipboard was successful!'),
					(err) => console.error('Async: Could not copy text: ', err)
				);
				return false;
			}
		}
		if (arg.ctrlKey && arg.code === 'KeyV' && arg.type === 'keydown') {
			return false;
		}
		return true;
	};

	handleInput = (input: string) => {
		console.log('handle input:', input);
		switch (input) {
			case '\u0003': // Ctrl+C without selection
				this.terminal.write('^C');
				this.prompt();
				break;
			case '\r': // Enter
				this.prompt();
				break;
			case '\u007F': // Backspace (DEL)
				// Todo: Do not delete the prompt
				this.terminal.write('\b \b');
				break;
			default:
				if (
					(input >= String.fromCharCode(0x20) && input <= String.fromCharCode(0x7e)) ||
					input >= '\u00a0'
				) {
					//command += e;
					this.terminal.write(input);
				}
		}
	};

	prompt = () => {
		this.terminal.write('\r\n$ ');
	};
}
