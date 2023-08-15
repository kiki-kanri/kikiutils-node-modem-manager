import { parseResultData } from '@/library/utils';
import { NullableNumber } from '@/types';
import Modem from './modem';

interface SignalData {
	'5G': {
		errorRate: boolean;
		rsrp: NullableNumber;
		rsrq: NullableNumber;
		snr: NullableNumber;
	}

	cdma1X: {
		ecio: NullableNumber;
		errorRate: boolean;
		rssi: NullableNumber;
	}

	evdo: {
		ecio: NullableNumber;
		errorRate: boolean;
		io: NullableNumber;
		rssi: NullableNumber;
		sinr: NullableNumber;
	}

	gsm: {
		errorRate: boolean;
		rssi: NullableNumber;
	}

	lte: {
		errorRate: boolean;
		rsrp: NullableNumber;
		rsrq: NullableNumber;
		rssi: NullableNumber;
		snr: NullableNumber;
	}

	refresh: { rate: number };
	threshold: {
		errorRate: boolean;
		rssi: number;
	}

	umts: {
		ecio: NullableNumber;
		errorRate: boolean;
		rscp: NullableNumber;
		rssi: NullableNumber;
	}
}

export default class Signal {
	modem: Modem;

	constructor(modem: Modem) {
		this.modem = modem;
	}

	/**
	 * Retrieve the last extended signal quality information loaded.
	 */
	async get() {
		const { modem: { signal: data } } = await this.modem.mmcli('--signal-get');
		return parseResultData(data) as SignalData;
	}

	/**
	 * Setup extended signal quality information retrieval at the specified rate (in seconds).
	 *
	 * By default this is disabled (rate set to 0).
	 */
	async setup(seconds: number = 0) {
		if (!this.modem.enabled) await this.modem.enable();
		const result = await this.modem.mmcli(`--signal-setup=${seconds}`, false) as string;
		return result.toLowerCase() === 'successfully setup signal quality information polling';
	}
}
