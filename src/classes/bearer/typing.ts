import { NullableNumber, NullableString } from '../../typing';

export interface BearerInfo {
	dbusPath: string;
	ipv4Config: {
		address: NullableString;
		dns: string[];
		gateway: NullableString;
		method: NullableString;
		mtu: NullableString;
		prefix: NullableString;
	}

	ipv6Config: {
		address: NullableString;
		dns: string[];
		gateway: NullableString;
		method: NullableString;
		mtu: NullableString;
		prefix: NullableString;
	}

	properties: {
		accessTypePreference: NullableString;
		allowedAuth: string[],
		apn: string;
		apnType: NullableString;
		ipType: 'ipv4' | 'ipv6';
		password: NullableString;
		profileId: NullableString;
		rmProtocol: NullableString;
		roaming: 'allowed' | 'denied';
		roamingAllowance: NullableString;
		user: NullableString;
	}

	stats: {
		attempts: number;
		bytesRx: NullableNumber;
		bytesTx: NullableNumber;
		downlinkSpeed: NullableNumber;
		duration: NullableNumber;
		failedAttempts: NullableNumber;
		startDate: number;
		totalBytesRx: NullableNumber;
		totalBytesTx: NullableNumber;
		totalDuration: number;
		uplinkSpeed: NullableNumber;
	}

	status: {
		connected: boolean;
		connectionError: {
			message: NullableString;
			name: NullableString;
		}

		interface: string;
		ipTimeout: number;
		multiplexed: boolean;
		profileId: NullableString;
		suspended: boolean;
	}

	type: string;
}
