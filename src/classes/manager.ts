import Exec from './exec';
import Modem from './modem';

export const Manager = new (class Manager extends Exec {
	/**
	 * Retrieve the version of the currently running ModemManager daemon.
	 */
	async daemonVersion() {
		const result = await this.mmcli('-B', false);
		return result.trim().split(' ')[2];
	}

	/**
	 * List available modems.
	 */
	async list() {
		const data = await this.mmcli('-L');
		const modemPaths: string[] = data['modem-list'];
		return modemPaths.map((modemPath) => new Modem(modemPath));
	}

	/**
	 * Scan for any potential new modems.
	 *
	 * This is only useful when expecting pure RS232 modems, as they are not notified automatically by the kernel.
	 */
	async scan() {
		const result = await this.mmcli(`-S`, false);
		return result.toLowerCase() === 'successfully requested to scan devices';
	}

	/**
	 * Set the logging level in ModemManager daemon.
	 *
	 * For debugging information you can supply DEBUG.
	 *
	 * Each value above DEBUG provides less detail. In most cases ERR (for displaying errors) are the important messages.
	 *
	 * The default mode is ERR.
	 */
	async setLogging(level: 'DEBUG' | 'ERR' | 'INFO' | 'WARN' = 'ERR') {
		const result = await this.mmcli(`-G ${level}`, false);
		return result.toLowerCase() === 'successfully set logging level';
	}
})();

export default Manager;
