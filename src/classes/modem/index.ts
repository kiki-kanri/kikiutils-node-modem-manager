import { parseResultData } from '../../library/utils';
import {
	Bearer,
	Exec,
	Gpp,
	Signal,
	SimCard,
	Simple
} from '..';
import { Band, ModemInfo } from './typing';

export default class Modem extends Exec {
	bearer: Bearer | null = null;
	enabled: boolean = false;
	gpp: Gpp;
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
		this.signal = new Signal(this);
		this.simple = new Simple(this);
	}

	async disable() {
		const result = await this.mmcli('-d', false);
		if (result === 'successfully disabled the modem') this.enabled = false;
		return this.enabled === false;
	}

	async enable() {
		const result = await this.mmcli('-e', false);
		return this.enabled = result === 'successfully enabled the modem';
	}

	async getOrCreateBearer(apn: string = 'internet', ipType: 'ipv4' | 'ipv6' | 'ipv4v6' = 'ipv4'): Promise<Bearer | null> {
		if (this.bearer) return this.bearer;
		const { generic: { bearers } } = await this.info();
		if (bearers.length) return this.bearer = new Bearer(this, bearers[0]);
		const result = await this.simpleConnect(apn, ipType);
		if (result) return await this.getOrCreateBearer();
		return null;
	}

	async getSimCard() {
		if (this.simCard) return this.simCard;
		const info = await this.info();
		this.simCard = new SimCard(this, info.generic.sim);
		return this.simCard;
	}

	async info() {
		const { modem: data } = await this.mmcli();
		return parseResultData(data) as ModemInfo;
	}

	async mmcli(command: string = '', parse = true) {
		return await super.mmcli(`-m ${this.number} ${command}`, parse);
	}

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
}
