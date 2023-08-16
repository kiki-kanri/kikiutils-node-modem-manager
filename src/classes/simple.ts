import Modem from './modem';

export class Simple {
	connected: boolean = false;
	modem: Modem;

	constructor(modem: Modem) {
		this.modem = modem;
	}

	/**
	 * Disconnect ALL connected bearers.
	 */
	async disconnect() {
		const result = await this.modem.mmcli('--simple-disconnect', false);
		return result === 'successfully disconnected all bearers in the modem';
	}
}

export default Simple;
