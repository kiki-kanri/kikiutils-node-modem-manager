import { NullableNumber, NullableString } from '../../types';

export type Band = 'egsm' | 'dcs' | 'utran-1' | 'utran-5' | 'utran-8' | 'eutran-1' | 'eutran-3' | 'eutran-5' | 'eutran-7' | 'eutran-8' | 'eutran-20' | 'eutran-38' | 'eutran-40' | 'eutran-41';
export type Driver = 'option' | 'qmi_wwan';
export type IpType = 'ipv4' | 'ipv6' | 'ipv4v6';
export type SupportedMode = 'allowed: 2g; preferred: none' | 'allowed: 3g; preferred: none' | 'allowed: 4g; preferred: none' | 'allowed: 2g, 3g; preferred: 3g' | 'allowed: 2g, 3g; preferred: 2g' | 'allowed: 2g, 4g; preferred: 4g' | 'allowed: 2g, 4g; preferred: 2g' | 'allowed: 3g, 4g; preferred: 4g' | 'allowed: 3g, 4g; preferred: 3g' | 'allowed: 2g, 3g, 4g; preferred: 4g' | 'allowed: 2g, 3g, 4g; preferred: 3g' | 'allowed: 2g, 3g, 4g; preferred: 2g';

export interface ModemInfo {
	'3Gpp': {
		enabledLocks: any[];
		eps: {
			initialBearer: {
				dbusPath: string;
				settings: {
					apn: string;
					ipType: 'ipv4' | 'ipv6';
					password: NullableString;
					user: NullableString;
				}

				ueModeOperation: string;
			}
		}

		imei: string;
		operatorCode: NullableNumber;
		operatorName: NullableString;
		packetServiceState: 'attached' | 'detached';
		pco: NullableNumber;
		registrationState: 'home'
	}

	dbusPath: string;
	generic: {
		accessTechnologies: 'lte'[];
		bearers: string[];
		carrierConfiguration: string;
		carrierConfigurationRevision: number;
		currentBands: Band[],
		currentCapabilities: string[];
		currentModes: SupportedMode;
		device: string;
		deviceIdentifier: string;
		drivers: Driver[];
		equipmentIdentifier: number;
		hardwareRevision: number;
		manufacturer: string;
		model: string;
		ownNumbers: [],
		plugin: string;
		ports: string[];
		powerState: 'off' | 'on';
		primaryPort: string;
		primarySimSlot: number;
		revision: string;
		signalQuality: {
			recent: boolean;
			value: number;
		}

		sim: string;
		simSlots: string[];
		state: string;
		stateFailedReason: NullableString;
		supportedBands: Band[];
		supportedCapabilities: string[];
		supportedIpFamilies: IpType[];
		supportedModes: SupportedMode[];
		unlockRequired: string;
		unlockRetries: string[];
	}
}
