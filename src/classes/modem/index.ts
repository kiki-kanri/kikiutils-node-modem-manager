import { parseResultData } from '../../library/utils';
import {
	Bearer,
	Exec,
	Gpp,
	Messaging,
	Signal,
	SimCard,
	Simple
} from '..';
import { Band, ModemInfo } from './types';

export default class Modem extends Exec {
	bearer: Bearer | null = null;
	enabled: boolean = false;
	gpp: Gpp;
	messaging: Messaging;
	number: number;
	path: string;
	signal: Signal;
	simCard: null | SimCard = null;
	simple: Simple;

	constructor(modemPath: string) {
		super();
		this.number = parseInt(modemPath.split('/').pop()!);
		this.path = modemPath;

		this.gpp = new Gpp(this);
		this.messaging = new Messaging(this);
		this.signal = new Signal(this);
		this.simple = new Simple(this);
	}

	/**
	 * Delete all bearers.
	 */
	async deleteAllBearers() {
		this.bearer = null;
		const { generic: { bearers } } = await this.info();
		bearers.forEach(async (bearerPath) => {
			try {
				await this.mmcli(`--delete-bearer=${bearerPath}`, false);
			} catch (error) { }
		});
	}

	/**
	 * Disable modem.
	 *
	 * This disconnects the existing connection(s) for the modem and puts it into a low power mode.
	 *
	 * If an error occurs, return false.
	 */
	async disable() {
		try {
			const result = await this.mmcli('-d', false);
			if (result === 'successfully disabled the modem') this.enabled = false;
			return this.enabled === false;
		} catch (error) { }
		return false;
	}

	/**
	 * Enable a given modem.
	 *
	 * This powers the antenna, starts the automatic registration process and in general prepares the modem to be connected.
	 */
	async enable() {
		const result = await this.mmcli('-e', false);
		return this.enabled = result === 'successfully enabled the modem';
	}

	/**
	 * Get first bearer.
	 */
	async getBearer() {
		if (this.bearer) return this.bearer;
		const { generic: { bearers } } = await this.info();
		if (bearers.length) return this.bearer = new Bearer(this, bearers[0]);
		return null;
	}

	/**
	 * Get first sim card.
	 */
	async getSimCard() {
		if (this.simCard) return this.simCard;
		const info = await this.info();
		this.simCard = new SimCard(this, info.generic.sim);
		return this.simCard;
	}

	/**
	 * Get base info.
	 */
	async info() {
		const { modem: data } = await this.mmcli();
		return parseResultData(data) as ModemInfo;
	}

	async mmcli(command: string = '', parse = true) {
		return await super.mmcli(`-m ${this.number} ${command}`, parse);
	}

	/**
	 * Set allow modes only 4G.
	 */
	async set4GMode() {
		await this.mmcli('--set-allowed-modes=4G', false);
	}

	/**
	 * Default bands is eutran-1, eutran-3 and eutran-7.
	 */
	async setCurrentBands(bands: Band[] = ['eutran-1', 'eutran-3', 'eutran-7']) {
		await this.mmcli(`--set-current-bands="${bands.join('|')}"`, false);
	}

	async simpleConnect(apn: string = 'internet', ipType: 'ipv4' | 'ipv6' | 'ipv4v6' = 'ipv4') {
		const result = await this.mmcli(`--simple-connect="apn=${apn},ip-type=${ipType}"`, false) as string;
		return result === 'successfully connected the modem';
	}

	/**
	 * Disconnect ALL connected bearers.
	 */
	async simpleDisconnect() {
		const result = await this.mmcli('--simple-disconnect', false);
		return result === 'successfully disconnected all bearers in the modem';
	}
}
