import Modem from './modem';

export class Gpp {
	modem: Modem;

	constructor(modem: Modem) {
		this.modem = modem;
	}

	/**
	 * Request a given modem to register in its home network.
	 *
	 * This registers with the default network(s) specified by the modem,
	 */
	async registerHome() {
		const result = await this.modem.mmcli('--3gpp-register-home', false);
		return result === 'successfully registered the modem';
	}
}

export default Gpp;
